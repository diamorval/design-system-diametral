// Parallel Planner with Review — four-phase orchestration loop
//
// This template drives a multi-phase workflow:
//   Phase 1 (Plan):             An agent analyzes open issues, builds a
//                               dependency graph, and outputs a <plan> JSON
//                               listing unblocked issues with branch names.
//   Phase 2 (Execute + Review): For each issue, a sandbox is created via
//                               createSandbox(). The implementer runs first.
//                               If it produces commits, a reviewer runs in the
//                               same sandbox on the same branch. Lanes run
//                               concurrently, capped at config.concurrency.
//   Phase 3 (Merge):            A single agent merges all completed branches
//                               into the current branch.
//
// The outer loop repeats up to config.maxIterations times so that newly
// unblocked issues are picked up after each round of merges.
//
// Every knob lives in ./config.mts — this file holds orchestration only.
//
// Usage:
//   pnpm sandcastle
//   pnpm sandcastle --issue 9        # skip the planner, work issue #9 only
//   pnpm sandcastle --issue 9,12     # skip the planner, two lanes
//   pnpm sandcastle --delivery merge # merge into this branch instead of PRs
//   SC_LOOPS=1 SC_CONCURRENCY=2 pnpm sandcastle   # one-off smoke run
//
// The sandbox image must be built from the repo root (not `sandcastle docker
// build-image`, whose context is .sandcastle/) so the Dockerfile's pnpm fetch
// layer can see the lockfile:
//   pnpm sandcastle:image

import { execFileSync } from "node:child_process"
import * as sandcastle from "@ai-hero/sandcastle"
import { docker } from "@ai-hero/sandcastle/sandboxes/docker"
import { z } from "zod"
import { config, type PhaseConfig } from "./config.mts"

// The planner emits its plan as JSON inside <plan> tags; Output.object extracts
// and validates it against this schema. We use Zod here, but any Standard
// Schema validator works just as well — Valibot, ArkType, etc. See
// https://standardschema.dev.
const planSchema = z.object({
  issues: z.array(
    z.object({ id: z.string(), title: z.string(), branch: z.string() })
  ),
})

// ---------------------------------------------------------------------------
// Wiring — turns config into the shapes each sandcastle call expects
// ---------------------------------------------------------------------------

const agentFor = (phase: PhaseConfig) =>
  sandcastle.claudeCode(phase.model, { effort: phase.effort })

const sandbox = () => docker({ cpus: config.cpus })

// The store is baked into the image (Dockerfile: pnpm fetch), so this resolves
// offline. --prefer-offline rather than --offline: a lane whose agent adds a
// dependency mid-run can still reach the registry on the next iteration.
const hooks = {
  sandbox: { onSandboxReady: [{ command: "pnpm install --prefer-offline" }] },
}

// Branch names contain a slash; flatten it so the log path stays a single file.
const logging = (name: string) =>
  ({
    type: "file",
    path: `.sandcastle/logs/${name.replace(/\//g, "-")}.log`,
    verbose: config.logging.verbose,
  }) as const

// docker() defaults to branchStrategy { type: "head" }, which bind-mounts the
// host working directory itself — an install there would overwrite the
// developer's node_modules with Linux binaries. Every phase therefore runs in
// a git worktree instead.
const branchStrategy = { type: "merge-to-head" } as const

// The branch this run was launched from. Lanes fork from it (baseBranch
// defaults to HEAD) and, in PR delivery, pull requests target it. Resolved on
// the host because sandboxes check out temp branches.
const departureBranch = execFileSync(
  "git",
  ["rev-parse", "--abbrev-ref", "HEAD"],
  {
    encoding: "utf8",
  }
).trim()

/**
 * Build the lane list for `--issue` without the planner: the issues are already
 * chosen, so all that's missing is each title. The branch name must match the
 * format in plan-prompt.md or a targeted re-run forks a fresh branch and loses
 * whatever the previous run committed.
 */
const issuesFromCli = (ids: readonly string[]) =>
  ids.map((id) => {
    const json = execFileSync("gh", ["issue", "view", id, "--json", "title"], {
      encoding: "utf8",
    })
    return {
      id,
      title: JSON.parse(json).title as string,
      branch: `sandcastle/issue-${id}`,
    }
  })

/**
 * Promise.allSettled with a concurrency cap: keeps `limit` lanes in flight and
 * starts the next as soon as a slot frees, rather than waiting on a whole wave.
 */
async function allSettledWithLimit<T, R>(
  items: readonly T[],
  limit: number,
  fn: (item: T) => Promise<R>
): Promise<PromiseSettledResult<R>[]> {
  const results = new Array<PromiseSettledResult<R>>(items.length)
  let next = 0

  const worker = async () => {
    for (let i = next++; i < items.length; i = next++) {
      try {
        results[i] = { status: "fulfilled", value: await fn(items[i]!) }
      } catch (reason) {
        results[i] = { status: "rejected", reason }
      }
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(limit, items.length) }, worker)
  )
  return results
}

// ---------------------------------------------------------------------------
// Main loop
// ---------------------------------------------------------------------------

for (let iteration = 1; iteration <= config.maxIterations; iteration++) {
  console.log(`\n=== Iteration ${iteration}/${config.maxIterations} ===\n`)

  // -------------------------------------------------------------------------
  // Phase 1: Plan
  //
  // The planning agent reads the open issue list, builds a dependency graph,
  // and selects the issues that can be worked in parallel right now (i.e., no
  // blocking dependencies on other open issues).
  //
  // It outputs a <plan> JSON block — Output.object parses and validates it.
  //
  // `--issue` skips this phase entirely: the selection is already made, so
  // there is no graph to build and no label or open-state filter to satisfy.
  // -------------------------------------------------------------------------
  const issues = config.issues
    ? issuesFromCli(config.issues)
    : (
        await sandcastle.run({
          // No install hook: the planner only reads issues through `gh` and
          // reasons, so it never needs node_modules.
          branchStrategy,
          sandbox: sandbox(),
          name: "planner",
          // One iteration is enough: the planner just needs to read and reason,
          // not write code. (Structured output requires maxIterations: 1.)
          maxIterations: config.phases.planner.maxIterations,
          agent: agentFor(config.phases.planner),
          promptFile: "./.sandcastle/plan-prompt.md",
          logging: logging("planner"),
          // Extract and validate the <plan> JSON into a typed object. Throws
          // StructuredOutputError if the tag is missing, the JSON is malformed,
          // or validation fails — which aborts the loop.
          output: sandcastle.Output.object({ tag: "plan", schema: planSchema }),
        })
      ).output.issues

  if (issues.length === 0) {
    // No unblocked work — either everything is done or everything is blocked.
    console.log("No unblocked issues to work on. Exiting.")
    break
  }

  console.log(
    `Planning complete. ${issues.length} issue(s) to work, ${config.concurrency} at a time:`
  )
  for (const issue of issues) {
    console.log(`  ${issue.id}: ${issue.title} → ${issue.branch}`)
  }

  // -------------------------------------------------------------------------
  // Phase 2: Execute + Review
  //
  // For each issue, create a sandbox via createSandbox() so the implementer
  // and reviewer share the same sandbox instance per branch. The implementer
  // runs first; if it produces commits, the reviewer runs in the same sandbox.
  //
  // allSettledWithLimit means one failing lane doesn't cancel the others, and
  // no more than config.concurrency containers run at once.
  // -------------------------------------------------------------------------

  const settled = await allSettledWithLimit(
    issues,
    config.concurrency,
    async (issue) => {
      const sbx = await sandcastle.createSandbox({
        branch: issue.branch,
        baseBranch: config.baseBranch,
        sandbox: sandbox(),
        hooks,
      })

      try {
        // Run the implementer
        const implement = await sbx.run({
          name: "implementer",
          maxIterations: config.phases.implementer.maxIterations,
          agent: agentFor(config.phases.implementer),
          promptFile: "./.sandcastle/implement-prompt.md",
          logging: logging(`${issue.branch}-implementer`),
          promptArgs: {
            TASK_ID: issue.id,
            ISSUE_TITLE: issue.title,
            BRANCH: issue.branch,
          },
        })

        // Only review if the implementer produced commits
        if (implement.commits.length > 0) {
          const review = await sbx.run({
            name: "reviewer",
            maxIterations: config.phases.reviewer.maxIterations,
            agent: agentFor(config.phases.reviewer),
            promptFile: "./.sandcastle/review-prompt.md",
            logging: logging(`${issue.branch}-reviewer`),
            promptArgs: {
              BRANCH: issue.branch,
            },
          })

          // Merge commits from both runs so the merge phase sees all of them.
          // Each run() only returns commits from its own run.
          return {
            ...review,
            commits: [...implement.commits, ...review.commits],
          }
        }

        return implement
      } finally {
        await sbx.close()
      }
    }
  )

  // Log any agents that threw (network error, sandbox crash, etc.).
  for (const [i, outcome] of settled.entries()) {
    if (outcome.status === "rejected") {
      console.error(
        `  ✗ ${issues[i]!.id} (${issues[i]!.branch}) failed: ${outcome.reason}`
      )
    }
  }

  // Only pass branches that actually produced commits to the merge phase.
  // An agent that ran successfully but made no commits has nothing to merge.
  const completedIssues = settled
    .map((outcome, i) => ({ outcome, issue: issues[i]! }))
    .filter(
      (entry) =>
        entry.outcome.status === "fulfilled" &&
        entry.outcome.value.commits.length > 0
    )
    .map((entry) => entry.issue)

  const completedBranches = completedIssues.map((i) => i.branch)

  console.log(
    `\nExecution complete. ${completedBranches.length} branch(es) with commits:`
  )
  for (const branch of completedBranches) {
    console.log(`  ${branch}`)
  }

  if (completedBranches.length === 0) {
    // All agents ran but none made commits — nothing to merge this cycle.
    console.log("No commits produced. Nothing to merge.")
    if (config.issues) {
      // Fixed issue list: a commit-less round means every lane is either done
      // or stuck — re-running the identical lanes can't change that. (Planner
      // mode continues instead: the next plan may select different issues.)
      console.log("Fixed issue list converged. Exiting.")
      break
    }
    continue
  }

  // -------------------------------------------------------------------------
  // Phase 3: Merge
  //
  // One agent merges all completed branches into the current branch,
  // resolving any conflicts and running tests to confirm everything works.
  //
  // The {{BRANCHES}} and {{ISSUES}} prompt arguments are lists that the agent
  // uses to know which branches to merge and which issues to close.
  // -------------------------------------------------------------------------
  await sandcastle.run({
    // PR delivery only pushes and calls gh — it never needs node_modules.
    ...(config.delivery === "merge" ? { hooks } : {}),
    branchStrategy,
    sandbox: sandbox(),
    name: "merger",
    maxIterations: config.phases.merger.maxIterations,
    agent: agentFor(config.phases.merger),
    promptFile:
      config.delivery === "pr"
        ? "./.sandcastle/pr-prompt.md"
        : "./.sandcastle/merge-prompt.md",
    logging: logging("merger"),
    promptArgs: {
      // A markdown list of branch names, one per line.
      BRANCHES: completedBranches.map((b) => `- ${b}`).join("\n"),
      // A markdown list of issue IDs and titles, one per line.
      ISSUES: completedIssues.map((i) => `- ${i.id}: ${i.title}`).join("\n"),
      // PR delivery: the branch pull requests target.
      BASE_BRANCH: departureBranch,
    },
  })

  console.log(
    config.delivery === "pr" ? "\nPull requests opened." : "\nBranches merged."
  )
}

console.log("\nAll done.")
