// What the runs left behind, and whether one is going right now. Four local
// facts, ranked by how often each changes a decision; PR state is opt-in
// because it is the only network call.
//
// Reports, never judges: the exit code is always 0. There is no defensible
// threshold for "unhealthy repo state", and a status that exits 1 for being
// messy cannot be piped. Machine health is `sc doctor`.
//
// Usage: pnpm sc status [--prs]

import { execFileSync } from "node:child_process"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { bold, cyan, dim, green } from "../prompts.mts"
import { isRunLive, logInventory } from "../state.mts"

const here = path.dirname(fileURLToPath(import.meta.url))

// A log is stale past 24 h. Not a design decision handed down — fixed here so
// "is there old stuff worth pruning" is answerable from mtimes alone, without
// reading megabytes of log content on a command meant to be run reflexively.
const STALE_MS = 24 * 60 * 60 * 1000

const git = (args: string[]): string => {
  try {
    return execFileSync("git", args, {
      encoding: "utf8",
      cwd: here,
      stdio: ["ignore", "pipe", "ignore"],
    })
  } catch {
    return ""
  }
}

const lines = (out: string): string[] =>
  out.split("\n").filter((l) => l.trim() !== "")

const humanSize = (bytes: number): string => {
  const units = ["B", "KB", "MB", "GB"]
  let n = bytes
  let unit = 0
  while (n >= 1024 && unit < units.length - 1) {
    n /= 1024
    unit++
  }
  return `${unit === 0 ? n : n.toFixed(1)} ${units[unit]}`
}

/**
 * Lane worktrees only. `git worktree list` also returns this repo's
 * `.claude/worktrees/` agent lanes — a different tool's live state, which
 * sandcastle must never invite anyone to remove. Matched on the path segment
 * rather than a prefix of this file's repo root, so the count is the same read
 * from the main checkout or from inside a lane worktree.
 */
const laneWorktrees = (): string[] => {
  const marker = `${path.sep}.sandcastle${path.sep}worktrees${path.sep}`
  return lines(git(["worktree", "list", "--porcelain"]))
    .filter((l) => l.startsWith("worktree "))
    .map((l) => l.slice("worktree ".length))
    .filter((p) => p.includes(marker))
}

/** Branch → PR summary, from the one `gh` call this command can make. */
const prByBranch = (): Map<string, string> => {
  const out = execFileSync(
    "gh",
    [
      "pr",
      "list",
      "--state",
      "all",
      "--limit",
      "100",
      "--json",
      "number,headRefName,state,isDraft",
    ],
    { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }
  )
  const prs: {
    number: number
    headRefName: string
    state: string
    isDraft: boolean
  }[] = JSON.parse(out)

  const byBranch = new Map<string, string>()
  // Newest first from gh, so the first entry for a branch wins — a reopened
  // lane branch shows its current PR, not the one merged three rounds ago.
  for (const pr of prs) {
    if (byBranch.has(pr.headRefName)) continue
    const state = pr.isDraft && pr.state === "OPEN" ? "DRAFT" : pr.state
    byBranch.set(pr.headRefName, `#${pr.number} ${state.toLowerCase()}`)
  }
  return byBranch
}

// --- Main --------------------------------------------------------------------

const withPrs = process.argv.slice(2).includes("--prs")

const { live, lanes } = isRunLive()
const branches = lines(
  git(["branch", "--list", "sandcastle/*", "--format=%(refname:short)"])
)
const worktrees = laneWorktrees()
const logs = logInventory()
const stale = logs.filter((l) => Date.now() - l.mtime.getTime() > STALE_MS)
const bytes = logs.reduce((sum, l) => sum + l.size, 0)

let prs: Map<string, string> | undefined
if (withPrs) {
  try {
    prs = prByBranch()
  } catch {
    console.log(`\n  ${dim("gh pr list failed — PR state unavailable")}`)
  }
}

console.log(
  live
    ? `\n  ${green("●")} ${bold("RUN LIVE")}  ${lanes} ${lanes === 1 ? "lane" : "lanes"}`
    : `\n  ${dim("○")} ${dim("idle")}`
)

// Counts right-aligned in their own column, details all starting at the same
// one, so the numbers read down the page.
const count = (n: number) => String(n).padStart(2)
const row = (name: string, n: number, detail: string) =>
  console.log(`  ${name.padEnd(9)}  ${count(n)}  ${detail}`.trimEnd())
const DETAIL_INDENT = " ".repeat(2 + 9 + 2 + 2 + 2)

console.log("")
// With --prs every branch gets its own line; without, the first one rides the
// count line — the common case is one lane branch and no second line.
const branchWidth = Math.max(0, ...branches.map((b) => b.length))
row("branches", branches.length, prs ? "" : (branches[0] ?? ""))
for (const [i, branch] of branches.entries()) {
  if (i === 0 && !prs) continue
  if (!prs) {
    console.log(`${DETAIL_INDENT}${branch}`)
    continue
  }
  console.log(
    `${DETAIL_INDENT}${branch.padEnd(branchWidth)}  ${prs.get(branch) ?? dim("no PR")}`
  )
}
row("worktrees", worktrees.length, dim("(.sandcastle/worktrees/)"))
// "7 files" reads as one phrase, so this row breaks the two-space detail gap.
console.log(
  `  ${"logs".padEnd(9)}  ${count(logs.length)} files · ${humanSize(bytes)} · ${stale.length} stale`
)

if (!withPrs && branches.length > 0) {
  console.log(
    `\n  ${cyan("→")} pnpm sc status --prs   ${dim("PR state for each branch")}`
  )
}
console.log("")
