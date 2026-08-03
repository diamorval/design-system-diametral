// Interactive custom run — pick issues, tweak one-off overrides on a settings
// board, confirm, run. Writes nothing to disk; persistent defaults live in
// config.mts. UI primitives live in ./prompts.mts.
//
// Usage: pnpm sandcastle:custom

import { execFileSync, spawnSync } from "node:child_process"
import { config } from "./config.mts"
import { board, bold, confirm, cyan, dim, multiselect } from "./prompts.mts"

// --- Main --------------------------------------------------------------------

if (!process.stdin.isTTY || !process.stdout.isTTY) {
  console.error(
    "sandcastle:custom is interactive. In scripts, call `pnpm sandcastle` " +
      "with SC_* env vars and --issue directly."
  )
  process.exit(1)
}

const title = "sandcastle custom"
const barLine = "─".repeat(title.length + 4)
console.log(`\n  ${cyan("╭" + barLine + "╮")}`)
console.log(`  ${cyan("│")}  ${bold(title)}  ${cyan("│")}`)
console.log(`  ${cyan("╰" + barLine + "╯")}\n`)

const issueList: { number: number; title: string; labels: string[] }[] =
  JSON.parse(
    execFileSync(
      "gh",
      [
        "issue",
        "list",
        "--state",
        "open",
        "--limit",
        "100",
        "--json",
        "number,title,labels",
      ],
      { encoding: "utf8" }
    )
  ).map((i: { number: number; title: string; labels: { name: string }[] }) => ({
    ...i,
    labels: i.labels.map((l) => l.name),
  }))

const picked = await multiselect(
  "Issues to work",
  issueList.map((i) => ({
    name: String(i.number),
    title: `#${i.number}  ${i.title}`,
    hint: i.labels.join(","),
  })),
  (sel) =>
    sel.size === 0
      ? dim("none selected → planner decides (all open Sandcastle issues)")
      : dim(`${sel.size} selected → planner skipped`)
)

const auto = picked.length === 0

const settings = await board("Overrides (one-off, nothing saved)", [
  {
    key: "delivery",
    label: "Delivery",
    options: [
      { title: "pull requests", value: "pr" },
      { title: "merge to branch", value: "merge" },
    ],
    value: config.delivery,
    hint: "pr = one PR per branch · merge = straight into this branch",
  },
  {
    key: "concurrency",
    label: "Concurrency",
    // "default" (value 0) = don't emit SC_CONCURRENCY. The lane runner already
    // caps in-flight lanes at the issue count, so fewer issues than the
    // default just means fewer containers — no need to lower it here.
    options: [
      { title: `default (${config.concurrency})`, value: 0 },
      ...[1, 2, 3, 4, 6, 8].map((n) => ({ title: String(n), value: n })),
    ],
    value: 0,
    hint: "lanes at once",
  },
  {
    key: "model",
    label: "Model",
    options: [
      { title: "per-phase defaults", value: "" },
      { title: "claude-opus-5", value: "claude-opus-5" },
      { title: "claude-sonnet-5", value: "claude-sonnet-5" },
      { title: "claude-haiku-4-5", value: "claude-haiku-4-5-20251001" },
    ],
    value: "",
    hint: "forces ALL phases",
  },
  {
    key: "loops",
    label: "Max loops",
    // "default" (value 0) = don't emit SC_LOOPS, keep the config.mts default.
    // It's a cap either way: the run stops early once nothing is left to do
    // (empty plan, or a --issue round that lands no commits).
    options: [
      { title: `default (${config.maxIterations})`, value: 0 },
      ...[1, 2, 3, 5, 10].map((n) => ({ title: String(n), value: n })),
    ],
    value: 0,
    hint: "cap on plan→work→merge rounds · stops early when done",
  },
])

// Value 0 (or "" for model) means "default" — emit nothing, config.mts rules.
const env: Record<string, string> = {}
if (settings.concurrency) env.SC_CONCURRENCY = String(settings.concurrency)
if (settings.model) env.SC_MODEL = String(settings.model)
if (settings.loops) env.SC_LOOPS = String(settings.loops)

const args = [
  "sandcastle",
  ...(auto ? [] : ["--issue", picked.join(",")]),
  ...(settings.delivery !== config.delivery
    ? ["--delivery", String(settings.delivery)]
    : []),
]
const shown = [
  ...Object.entries(env).map(([k, v]) => `${k}=${v}`),
  "pnpm",
  ...args,
].join(" ")

console.log(`\n  ${bold(shown)}\n`)

if (!(await confirm("Launch?"))) process.exit(0)

const { status } = spawnSync("pnpm", args, {
  stdio: "inherit",
  env: { ...process.env, ...env },
})
process.exit(status ?? 1)
