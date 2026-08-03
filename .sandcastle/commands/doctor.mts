// Can this machine run sandcastle at all? Four preflight checks whose answers
// change roughly never — run it first thing, or when something breaks.
//
// Reports, never repairs. Every repair doctor might perform already has an
// owner: the image is `sc image`, logs are `sc clean`, auth is `gh auth login`.
// A repairing doctor would be a third caller of logic living in two other
// commands and would need its own confirm prompts for the destructive paths.
// Diagnosis and repair stay one paste apart — hence the → fix line.
//
// Exit 1 if any check fails, so `pnpm sc doctor && pnpm sc run` gates.
//
// Usage: pnpm sc doctor

import { execFileSync } from "node:child_process"
import { readFileSync } from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { bold, dim, green, red } from "../prompts.mts"
import { imageInputsHash } from "../state.mts"

const here = path.dirname(fileURLToPath(import.meta.url))
const envPath = path.join(here, "..", ".env")

const IMAGE = "sandcastle:design-system-diametral"

interface Check {
  readonly label: string
  readonly ok: boolean
  /** One line of state. Never a token value. */
  readonly detail: string
  /** Printed under the label when the check fails: the command that fixes it. */
  readonly fix: string
}

/** Exit status of a command, with a missing binary counting as failure. */
const succeeds = (cmd: string, args: string[]): boolean => {
  try {
    execFileSync(cmd, args, { stdio: "ignore" })
    return true
  } catch {
    return false
  }
}

const dockerCheck = (): Check => {
  const ok = succeeds("docker", ["info"])
  return {
    label: "docker",
    ok,
    detail: ok ? "running" : "not running",
    fix: "open -a Docker",
  }
}

/**
 * Three distinguishable states: missing (inspect fails), stale (label absent or
 * built from different inputs), current. A missing label counts as stale — an
 * image built before `sc image` started stamping `sc.inputs` cannot be shown to
 * match the current lockfile, and rebuilding is a minute.
 */
const imageCheck = (): Check => {
  const fix = "pnpm sc image"
  let label: string
  try {
    label = execFileSync(
      "docker",
      ["inspect", "-f", '{{index .Config.Labels "sc.inputs"}}', IMAGE],
      { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }
    ).trim()
  } catch {
    return { label: "image", ok: false, detail: "missing", fix }
  }

  const ok = label === imageInputsHash()
  return {
    label: "image",
    ok,
    detail: ok ? "current" : "stale vs pnpm-lock.yaml",
    fix,
  }
}

const ghCheck = (): Check => {
  const ok = succeeds("gh", ["auth", "status"])
  return {
    label: "gh auth",
    ok,
    detail: ok ? "logged in" : "not logged in",
    fix: "gh auth login",
  }
}

/**
 * `.sandcastle/.env` must carry an agent credential and a GitHub token. Either
 * auth key satisfies the first: `.env.example` names CLAUDE_CODE_OAUTH_TOKEN as
 * canonical with ANTHROPIC_API_KEY as a commented alternative, so demanding the
 * API key would report a false failure on every OAuth machine.
 */
const envCheck = (): Check => {
  const fix = "cp .sandcastle/.env.example .sandcastle/.env, then fill it"
  let text: string
  try {
    text = readFileSync(envPath, "utf8")
  } catch {
    return { label: ".sandcastle/.env", ok: false, detail: "not found", fix }
  }

  const set = new Set<string>()
  for (const line of text.split("\n")) {
    // Commented-out placeholders are the file's default state; a `#` line is
    // not a value. `export FOO=bar` is still an assignment.
    const m = /^\s*(?:export\s+)?([A-Z_][A-Z0-9_]*)\s*=\s*(.*)$/.exec(line)
    if (!m) continue
    const value = m[2]!.trim().replace(/^(['"])(.*)\1$/, "$2")
    if (value !== "") set.add(m[1]!)
  }

  const authKey = ["CLAUDE_CODE_OAUTH_TOKEN", "ANTHROPIC_API_KEY"].find((k) =>
    set.has(k)
  )
  const missing = [
    ...(authKey ? [] : ["CLAUDE_CODE_OAUTH_TOKEN or ANTHROPIC_API_KEY"]),
    ...(set.has("GH_TOKEN") ? [] : ["GH_TOKEN"]),
  ]
  return {
    label: ".sandcastle/.env",
    ok: missing.length === 0,
    // Names the key that satisfied the check, never its value.
    detail:
      missing.length === 0 ? `${authKey} set` : `missing ${missing.join(", ")}`,
    fix,
  }
}

// --- Main --------------------------------------------------------------------

const checks = [dockerCheck(), imageCheck(), ghCheck(), envCheck()]
const width = Math.max(...checks.map((c) => c.label.length))

console.log("")
for (const c of checks) {
  const mark = c.ok ? green("✓") : red("✗")
  console.log(`  ${mark} ${c.label.padEnd(width)}  ${c.detail}`)
  if (!c.ok) console.log(`  ${" ".repeat(width + 2)}  ${dim("→")} ${c.fix}`)
}

const failed = checks.filter((c) => !c.ok).length
console.log(
  failed === 0
    ? `\n  ${green("all good.")}\n`
    : `\n  ${bold(`${failed} problem${failed === 1 ? "" : "s"}.`)} exit 1\n`
)
process.exit(failed === 0 ? 0 : 1)
