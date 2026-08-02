// Interactive custom run — pick issues, tweak one-off overrides on a settings
// board, confirm, run. Writes nothing to disk; persistent defaults live in
// config.mts. UI primitives adapted from ~/code/cli/lib/prompts.js.
//
// Usage: pnpm sandcastle:custom

import { execFileSync, spawnSync } from "node:child_process"
import readline from "node:readline"
import { config } from "./config.mts"

// --- ANSI styling (gated on TTY + NO_COLOR, same as the cli repo) -----------

const on = process.stdout.isTTY && !process.env.NO_COLOR
const wrap = (code: number) => (s: string) =>
  on ? `\x1b[${code}m${s}\x1b[0m` : s
const dim = wrap(2)
const bold = wrap(1)
const cyan = wrap(36)
const green = wrap(32)

// --- Prompt primitives -------------------------------------------------------

type Key = { name?: string; ctrl?: boolean }

/** Raw-mode keypress loop shared by every prompt: draw, handle, cleanup. */
function keyLoop<T>(
  handle: (key: Key, done: (value: T) => void) => void,
  draw: () => string[]
): Promise<T> {
  return new Promise((resolve) => {
    const out = process.stdout
    let rendered = 0

    const render = () => {
      const lines = draw()
      if (rendered) out.write(`\x1b[${rendered}A`)
      out.write("\x1b[0J")
      out.write(lines.join("\n") + "\n")
      rendered = lines.length
    }

    const cleanup = () => {
      process.stdin.removeListener("keypress", onKey)
      process.stdin.setRawMode(false)
      process.stdin.pause()
      out.write("\x1b[?25h")
    }

    const onKey = (_str: string, key: Key) => {
      if (key.ctrl && key.name === "c") {
        cleanup()
        out.write("\n")
        process.exit(130)
      }
      handle(key, (value) => {
        cleanup()
        resolve(value)
      })
      render()
    }

    readline.emitKeypressEvents(process.stdin)
    process.stdin.setRawMode(true)
    process.stdin.resume()
    out.write("\x1b[?25l")
    process.stdin.on("keypress", onKey)
    render()
  })
}

interface Choice {
  readonly name: string
  readonly title: string
  readonly hint?: string
}

/** Arrow-key checklist: ↑/↓ move, space toggle, `a` all, enter confirm. */
function multiselect(
  message: string,
  choices: readonly Choice[],
  footer: (sel: ReadonlySet<string>) => string
): Promise<string[]> {
  const sel = new Set<string>()
  let cursor = 0
  const help = dim("(↑/↓ move · space toggle · a all · enter confirm)")

  return keyLoop<string[]>(
    (key, done) => {
      const n = choices.length
      switch (true) {
        case key.name === "up" || key.name === "k":
          cursor = (cursor - 1 + n) % n
          break
        case key.name === "down" || key.name === "j":
          cursor = (cursor + 1) % n
          break
        case key.name === "space": {
          const name = choices[cursor]!.name
          sel.has(name) ? sel.delete(name) : sel.add(name)
          break
        }
        case key.name === "a": {
          const all = choices.every((c) => sel.has(c.name))
          choices.forEach((c) => (all ? sel.delete(c.name) : sel.add(c.name)))
          break
        }
        case key.name === "return" || key.name === "enter":
          done([...sel])
      }
    },
    () => [
      `${cyan("?")} ${bold(message)} ${help}`,
      "",
      ...choices.map((ch, i) => {
        const here = i === cursor
        const pointer = here ? cyan("❯") : " "
        const box = sel.has(ch.name) ? green("◉") : "◯"
        const title = here ? bold(ch.title) : ch.title
        return `${pointer} ${box} ${title}${ch.hint ? dim(` — ${ch.hint}`) : ""}`
      }),
      "",
      `  ${footer(sel)}`,
    ]
  )
}

interface Field {
  readonly key: string
  readonly label: string
  readonly options: readonly { title: string; value: string | number }[]
  readonly value: string | number
  readonly hint?: string
}

/**
 * Settings board — every field on one screen. ↑/↓ move between fields,
 * ←/→ (or space) cycle the focused field's value, enter saves.
 */
function board(
  message: string,
  fields: readonly Field[]
): Promise<Record<string, string | number>> {
  const idx = fields.map((f) => {
    const i = f.options.findIndex((o) => o.value === f.value)
    return i < 0 ? 0 : i
  })
  let row = 0
  const help = dim("(↑/↓ field · ←/→ change · enter launch prompt)")
  const width = Math.max(...fields.map((f) => f.label.length))

  return keyLoop<Record<string, string | number>>(
    (key, done) => {
      const nf = fields.length
      const cycle = (delta: number) => {
        const n = fields[row]!.options.length
        idx[row] = (idx[row]! + delta + n) % n
      }
      switch (true) {
        case key.name === "up" || key.name === "k":
          row = (row - 1 + nf) % nf
          break
        case key.name === "down" || key.name === "j":
          row = (row + 1) % nf
          break
        case key.name === "right" || key.name === "l" || key.name === "space":
          cycle(1)
          break
        case key.name === "left" || key.name === "h":
          cycle(-1)
          break
        case key.name === "return" || key.name === "enter": {
          const result: Record<string, string | number> = {}
          fields.forEach((f, i) => (result[f.key] = f.options[idx[i]!]!.value))
          done(result)
        }
      }
    },
    () => [
      `${cyan("?")} ${bold(message)} ${help}`,
      "",
      ...fields.map((f, i) => {
        const here = i === row
        const pointer = here ? cyan("❯") : " "
        const label = f.label.padEnd(width)
        const opt = f.options[idx[i]!]!
        const value = here
          ? `${cyan("‹")} ${green(opt.title)} ${cyan("›")}`
          : dim(`‹ ${opt.title} ›`)
        const hint = f.hint && here ? dim(`  ${f.hint}`) : ""
        return `  ${pointer} ${here ? bold(label) : label}   ${value}${hint}`
      }),
    ]
  )
}

/** Yes/No confirm, default no. */
function confirm(message: string): Promise<boolean> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })
  return new Promise((resolve) => {
    rl.question(`${cyan("?")} ${message} ${dim("[y/N]")} `, (a) => {
      rl.close()
      resolve(a.trim().toLowerCase().startsWith("y"))
    })
  })
}

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
