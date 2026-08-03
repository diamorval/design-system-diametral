// Read or follow a lane log: a segment-aware `tail` with a picker on top.
//
// Usage: pnpm sc logs [substring] [--no-follow]
//
// Logs are append-only (`flag: "a"`), so each file is a stack of
// `--- Run started: <ISO> ---` segments and nothing else in the repo knows
// where those begin — that boundary is the capability plain `tail` lacks. The
// picker earns its place on the other axis: you cannot know which issue ids
// have logs until you look.
//
// Imports nothing from ../config.mts (the log directory is hardcoded in
// main.mts), and takes no live-run guard: reading is safe mid-run.

import { spawnSync } from "node:child_process"
import { readFileSync } from "node:fs"
import { bold, dim, green, select } from "../prompts.mts"
import { logInventory, type LogFile } from "../state.mts"

// 20 rather than tail's 10: the median lane log line is ~196 chars, so 20
// lines is ~4 KB — one screen of real context, still nowhere near a flood.
const BACKLOG_LINES = 20
// "Is this file being written", which is a different question from
// isRunLive()'s "is a run happening".
const LIVE_WINDOW_MS = 10_000
const NAME_WIDTH = 24

// --- Formatting ---------------------------------------------------------------

function fmtSize(bytes: number): string {
  const units = ["B", "KB", "MB", "GB"]
  let n = bytes
  let u = 0
  while (n >= 1024 && u < units.length - 1) {
    n /= 1024
    u++
  }
  // Size, not line count: size predicts flood risk, the hazard that bites.
  return `${u === 0 || n >= 10 ? Math.round(n) : n.toFixed(1)} ${units[u]}`
}

function fmtAge(mtime: Date): string {
  const s = Math.max(0, Math.round((Date.now() - mtime.getTime()) / 1000))
  if (s < 60) return `${s}s ago`
  if (s < 3600) return `${Math.round(s / 60)}m ago`
  if (s < 86_400) return `${Math.round(s / 3600)}h ago`
  return `${Math.round(s / 86_400)}d ago`
}

/** Display form of a filename: every log ends in `.log`, so the suffix is noise. */
function label(name: string): string {
  const stem = name.replace(/\.log$/, "")
  return stem.length > NAME_WIDTH ? `${stem.slice(0, NAME_WIDTH - 1)}…` : stem
}

// --- Resolve the file ----------------------------------------------------------

const argv = process.argv.slice(2)
const follow = !argv.includes("--no-follow")
const needle = argv.find((a) => !a.startsWith("-"))

// logInventory() is mtime-desc, and both halves of this command lean on that
// one ordering: the picker's top row is exactly what a bare substring match
// would pick, so they cannot disagree.
const files = logInventory()
if (files.length === 0) {
  console.log("no logs")
  process.exit(0)
}

/** The log to read: newest substring match, or the picker when none was given. */
async function resolve(): Promise<LogFile> {
  if (needle !== undefined) {
    // Newest match wins, and that is not an arbitrary tiebreak: phases are
    // strictly sequential within a lane (main.mts — the reviewer only starts
    // after the implementer returns), so newest-mtime is the phase you mean —
    // the live one mid-run, the last-finished one after.
    const match = files.filter((f) => f.name.includes(needle)).at(0)
    if (match) return match
    console.error(`no log matches ${bold(needle)}. Available:`)
    for (const f of files) {
      console.error(
        `  ${label(f.name).padEnd(NAME_WIDTH)}  ${dim(fmtAge(f.mtime))}`
      )
    }
    process.exit(1)
  }

  if (!process.stdin.isTTY || !process.stdout.isTTY) {
    console.error(
      "sc logs without an argument is interactive. " +
        "Pass a name substring: pnpm sc logs <substring> [--no-follow]"
    )
    process.exit(1)
  }

  const width = Math.max(...files.map((f) => label(f.name).length))
  const picked = await select(
    "Pick a log",
    files.map((f) => {
      // Per-file liveness, deliberately not isRunLive().
      const live = Date.now() - f.mtime.getTime() < LIVE_WINDOW_MS
      const cols = [
        label(f.name).padEnd(width),
        fmtSize(f.size).padStart(8),
        fmtAge(f.mtime).padStart(8),
      ].join("  ")
      return {
        name: f.name,
        title: live ? `${cols}  ${green("● live")}` : cols,
      }
    })
  )
  // "" is select()'s quit. The find() cannot miss; folding both into one exit
  // keeps the return type a plain LogFile.
  const chosen = files.find((f) => f.name === picked)
  if (!chosen) process.exit(0)
  return chosen
}

const file = await resolve()

// --- Tail it -------------------------------------------------------------------

// Byte offsets, so a Buffer rather than a utf8 string: agent output is full of
// multi-byte glyphs and `tail -c` counts bytes, not UTF-16 code units.
const buf = readFileSync(file.path)
// Zero delimiters found → -1 + 1 = 0, i.e. treat the whole file as one segment.
const segAt = buf.lastIndexOf("\n--- Run started:") + 1
let backAt = buf.length
for (let n = 0; n < BACKLOG_LINES && backAt > 0; n++) {
  backAt = buf.lastIndexOf(0x0a, backAt - 1)
}
// Two independent guards — which run, and how much. Both are lower bounds on
// what is safe to print, so the max() direction is load-bearing: min() would
// happily replay the previous run. --no-follow is the explicit opt-in to the
// whole segment, which you would pipe to a pager or grep anyway.
const off = follow ? Math.max(segAt, backAt + 1) : segAt

// One spawn covers backlog and follow both, and stdio "inherit" gets Ctrl-C,
// backpressure and truncation handling from the OS for free. Growth between
// computing the offset and spawning is harmless: tail reads forward from it.
const res = spawnSync(
  "tail",
  ["-c", `+${off + 1}`, ...(follow ? ["-f"] : []), file.path],
  { stdio: "inherit" }
)
if (res.error) {
  console.error(`error: ${res.error.message}`)
  process.exit(1)
}
if (res.status) process.exit(res.status)
