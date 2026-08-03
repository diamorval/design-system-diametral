// Prune sandcastle logs — the only thing this command touches. Worktrees,
// branches, containers and the image are deliberately out of scope: a leftover
// worktree is a crash artifact and the only place uncommitted lane work can
// live, so `sc status` reports it and nothing deletes it.
//
// Logs are append-only with nothing rotating them (~2 MB per run, most of it
// the implementer), so the default is truncate-to-last-run rather than delete:
// the most recent run is the only one anyone debugs, and it always survives.
//
// Usage:
//   pnpm sc clean              # truncate every log to its last run segment
//   pnpm sc clean --all        # delete every log file (confirms)
//   pnpm sc clean --all --yes  # ...without the confirm

import { readFileSync, rmSync, writeFileSync } from "node:fs"
import { confirm } from "../prompts.mts"
import { isRunLive, logInventory } from "../state.mts"

// The library writes "\n--- Run started: <iso> ---\n" ahead of each run
// (FileDisplay, flag "a"), so this string is the segment boundary.
const DELIMITER = "--- Run started:"

const argv = process.argv.slice(2)
const all = argv.includes("--all")
const yes = argv.includes("--yes")

// Anything else is a typo, and a typo must not silently pick the other
// behaviour — `sc clean --all-logs` would otherwise truncate while the operator
// read it as delete.
const unknown = argv.filter((a) => a !== "--all" && a !== "--yes")
if (unknown.length > 0) {
  console.error(
    `unknown option: ${unknown[0]}\nusage: pnpm sc clean [--all] [--yes]`
  )
  process.exit(1)
}

/** Byte counts as the summary line prints them: `1.9 MB`, `640 B`. */
function human(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  const kb = bytes / 1024
  return kb < 1024 ? `${kb.toFixed(1)} KB` : `${(kb / 1024).toFixed(1)} MB`
}

const summary = (before: number, after: number, n: number, deleted: boolean) =>
  console.log(
    `logs: ${human(before)} → ${human(after)} ` +
      `(${human(before - after)} reclaimed, ${n} files${deleted ? " deleted" : ""})`
  )

// One inventory, two consumers: `sc status` reports what this acts on. Do not
// re-derive "which files are logs" here.
const logs = logInventory()
const before = logs.reduce((sum, log) => sum + log.size, 0)

if (logs.length === 0) {
  console.log("logs: none")
  process.exit(0)
}

if (all) {
  // Whole-file destruction refuses while a run is live; truncation below does
  // not. That split is the standing rule for the CLI, not a quirk of logs.
  const { live } = isRunLive()
  if (live) {
    console.error(
      "run in progress — sc clean trims prior runs, or wait for it to finish"
    )
    process.exit(1)
  }

  if (!yes) {
    if (!process.stdin.isTTY) {
      console.error("sc clean --all needs a TTY to confirm; pass --yes")
      process.exit(1)
    }
    const go = await confirm(
      `Delete all ${logs.length} log files (${human(before)})?`
    )
    if (!go) {
      console.log("nothing deleted")
      process.exit(0)
    }
  }

  for (const log of logs) rmSync(log.path)
  summary(before, 0, logs.length, true)
  process.exit(0)
}

// Truncation is correct mid-run: the last delimiter belongs to the live run, so
// only completed prior runs go. Logs are appended per line (open, append,
// close), no descriptor is held across writes, so the next line lands at the
// new EOF — no lock, no sparse hole.
let reclaimed = 0
let touched = 0

for (const log of logs) {
  // Buffers, not utf8 strings: slicing bytes keeps the file identical from the
  // delimiter on, where a decode/re-encode round trip would rewrite any
  // malformed sequence in an agent's raw output as U+FFFD.
  const buf = readFileSync(log.path)
  const i = buf.lastIndexOf(DELIMITER)
  // i === 0 is an already-truncated file and i === -1 a log with no delimiter
  // at all; both must be left exactly as they are rather than emptied.
  if (i <= 0) continue
  writeFileSync(log.path, buf.subarray(i))
  reclaimed += i
  touched++
}

summary(before, before - reclaimed, touched, false)
