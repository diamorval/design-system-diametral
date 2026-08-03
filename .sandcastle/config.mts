// Knob surface for the sandcastle orchestration loop.
// Decisions recorded on wayfinder map #24: shape (#25), models (#26),
// pnpm strategy (#27), runtime topology (#28).

export type Effort = "low" | "medium" | "high" | "xhigh" | "max"

export interface PhaseConfig {
  readonly model: string
  readonly effort: Effort
  readonly maxIterations: number
}

export interface SandcastleConfig {
  /**
   * Explicit issue numbers from `--issue`. When set the planner is skipped and
   * exactly these issues are worked — no label filter, no open-state filter.
   */
  readonly issues?: readonly string[]
  /** Outer plan→execute→merge cycles per run. Override: SC_LOOPS. */
  readonly maxIterations: number
  /** Lanes running at once in the execute phase. Override: SC_CONCURRENCY. */
  readonly concurrency: number
  /** CPU cap per container (docker --cpus). */
  readonly cpus: number
  /** Fork point for new lane branches; undefined = HEAD (the checked-out branch). */
  readonly baseBranch?: string
  /**
   * How finished branches are delivered. "pr" pushes each branch and opens a
   * pull request onto the departure branch (the branch you launched from);
   * "merge" merges them straight into it. Override: --delivery pr|merge.
   */
  readonly delivery: "pr" | "merge"
  /**
   * Per-phase agent settings. SC_MODEL_<PHASE> overrides one phase; SC_MODEL
   * forces every phase that has no scoped override.
   */
  readonly phases: {
    readonly planner: PhaseConfig
    readonly implementer: PhaseConfig
    readonly reviewer: PhaseConfig
    readonly merger: PhaseConfig
  }
  /** verbose: also append the agent's raw stdout to the per-run log file. */
  readonly logging: { readonly verbose: boolean }
}

const defaults: SandcastleConfig = {
  maxIterations: 10,
  // 5 lanes × 2 cpus = the Docker VM's 10 cores, ~1.5 GB RAM per lane.
  concurrency: 5,
  cpus: 2,
  baseBranch: undefined,
  delivery: "pr",
  phases: {
    // Structured output requires the planner to stay at maxIterations: 1.
    planner: { model: "claude-opus-5", effort: "xhigh", maxIterations: 1 },
    implementer: { model: "claude-opus-5", effort: "high", maxIterations: 100 },
    reviewer: { model: "claude-sonnet-5", effort: "high", maxIterations: 1 },
    // The merger keeps a strong model: a bad conflict resolution silently
    // deletes another lane's work and self-conceals by closing its issue.
    merger: { model: "claude-opus-5", effort: "high", maxIterations: 1 },
  },
  logging: { verbose: true },
}

// Hot overrides — one-off run tweaks without dirtying the committed config,
// e.g. `SC_LOOPS=1 SC_MODEL=claude-haiku-4-5-20251001 pnpm sandcastle`.
function positiveInt(name: string): number | undefined {
  const raw = process.env[name]
  if (raw === undefined || raw === "") return undefined
  const n = Number(raw)
  if (!Number.isInteger(n) || n < 1) {
    throw new Error(`${name} must be a positive integer, got "${raw}"`)
  }
  return n
}

/** `--issue 9`, `--issue=9`, `--issue 9,12`, or repeated flags. */
function cliIssues(): readonly string[] | undefined {
  const args = process.argv.slice(2)
  const ids: string[] = []

  for (const [i, arg] of args.entries()) {
    const raw =
      arg === "--issue"
        ? args[i + 1]
        : arg.startsWith("--issue=")
          ? arg.slice("--issue=".length)
          : undefined
    if (raw === undefined) continue

    for (const part of raw.split(",")) {
      const id = part.trim().replace(/^#/, "")
      if (!/^\d+$/.test(id)) {
        throw new Error(`--issue expects issue numbers, got "${part}"`)
      }
      ids.push(id)
    }
  }

  return ids.length > 0 ? ids : undefined
}

/** `--delivery pr` or `--delivery=merge`. */
function cliDelivery(): "pr" | "merge" | undefined {
  const args = process.argv.slice(2)
  for (const [i, arg] of args.entries()) {
    const raw =
      arg === "--delivery"
        ? args[i + 1]
        : arg.startsWith("--delivery=")
          ? arg.slice("--delivery=".length)
          : undefined
    if (raw === undefined) continue
    if (raw !== "pr" && raw !== "merge") {
      throw new Error(`--delivery expects "pr" or "merge", got "${raw}"`)
    }
    return raw
  }
  return undefined
}

/** Scoped SC_MODEL_<PHASE> beats blanket SC_MODEL, which beats the default. */
function withModel(
  phase: keyof SandcastleConfig["phases"],
  base: PhaseConfig
): PhaseConfig {
  const model =
    process.env[`SC_MODEL_${phase.toUpperCase()}`] || process.env.SC_MODEL
  return model ? { ...base, model } : base
}

function withEnvOverrides(base: SandcastleConfig): SandcastleConfig {
  const issues = cliIssues()
  return {
    ...base,
    issues,
    maxIterations: positiveInt("SC_LOOPS") ?? base.maxIterations,
    concurrency: positiveInt("SC_CONCURRENCY") ?? base.concurrency,
    delivery: cliDelivery() ?? base.delivery,
    phases: {
      planner: withModel("planner", base.phases.planner),
      implementer: withModel("implementer", base.phases.implementer),
      reviewer: withModel("reviewer", base.phases.reviewer),
      merger: withModel("merger", base.phases.merger),
    },
  }
}

export const config: SandcastleConfig = withEnvOverrides(defaults)
