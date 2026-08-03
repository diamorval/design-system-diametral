// Print the resolved config — defaults with env and flags applied — and
// persist nothing. ../config.mts stays the source of truth; there is no config
// file, no `set`/`get`, no extra precedence layer.
//
// Usage: pnpm sc config
//
// The plain import is deliberate (unlike commands/custom.mts's ?picker read):
// cli.mts splices the subcommand out of process.argv before importing this
// module, so `config` here is already resolved. Nothing is launched afterwards,
// so there is no second instance to keep un-loaded.

import { config } from "../config.mts"
import { cyan, dim } from "../prompts.mts"

const DEFAULT = "default"

/**
 * An override's origin is its mere presence, exactly as withEnvOverrides
 * decides: unset and empty both fall through to the default.
 */
function envOrigin(name: "SC_LOOPS" | "SC_CONCURRENCY" | "SC_MODEL"): string {
  return process.env[name] ? name : DEFAULT
}

/** The raw value a flag was given, mirroring config.mts's own argv parsing. */
function flagValue(name: string): string | undefined {
  const args = process.argv.slice(2)
  for (const [i, arg] of args.entries()) {
    if (arg === `--${name}`) return args[i + 1]
    if (arg.startsWith(`--${name}=`)) return arg.slice(`--${name}=`.length)
  }
  return undefined
}

const unset = (v: string | undefined) => v ?? "(unset)"

type Row = readonly [path: string, value: string, origin: string]

// Field order follows the SandcastleConfig interface, and each path is what you
// would edit in config.mts. Facts hardcoded outside that interface — image tag,
// log dir, branch strategy, prompt paths — belong to other commands or are
// structure, not knobs, so they stay out.
const rows: Row[] = [
  [
    "issues",
    unset(config.issues?.join(",")),
    config.issues ? "--issue" : DEFAULT,
  ],
  ["maxIterations", String(config.maxIterations), envOrigin("SC_LOOPS")],
  ["concurrency", String(config.concurrency), envOrigin("SC_CONCURRENCY")],
  ["cpus", String(config.cpus), DEFAULT],
  ["baseBranch", unset(config.baseBranch), DEFAULT],
  [
    "delivery",
    config.delivery,
    flagValue("delivery") === undefined ? DEFAULT : "--delivery",
  ],
  ...Object.entries(config.phases).flatMap(([phase, p]): Row[] => [
    [`phases.${phase}.model`, p.model, envOrigin("SC_MODEL")],
    [`phases.${phase}.effort`, p.effort, DEFAULT],
    [`phases.${phase}.maxIterations`, String(p.maxIterations), DEFAULT],
  ]),
  ["logging.verbose", String(config.logging.verbose), DEFAULT],
]

const overrides = [
  ...(["SC_LOOPS", "SC_CONCURRENCY", "SC_MODEL"] as const)
    .filter((name) => process.env[name])
    .map((name) => `${name}=${process.env[name]}`),
  ...(config.issues ? [`--issue ${config.issues.join(",")}`] : []),
  ...(flagValue("delivery") === undefined
    ? []
    : [`--delivery ${config.delivery}`]),
]

// Pad on the plain strings: the ANSI codes below would count towards the width.
const pathWidth = Math.max(...rows.map(([path]) => path.length))
const valueWidth = Math.max(...rows.map(([, value]) => value.length))

console.log()
for (const [path, value, origin] of rows) {
  const shown = origin === DEFAULT ? dim(origin) : cyan(origin)
  console.log(
    `  ${path.padEnd(pathWidth)}  ${value.padEnd(valueWidth)}  ${shown}`
  )
}
console.log()
console.log(`  ${dim("overrides:")} ${overrides.join(", ") || dim("none")}`)
console.log()
