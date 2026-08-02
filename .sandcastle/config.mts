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
  /** Outer plan→execute→merge cycles per run. Override: SC_LOOPS. */
  readonly maxIterations: number
  /** Lanes running at once in the execute phase. Override: SC_CONCURRENCY. */
  readonly concurrency: number
  /** CPU cap per container (docker --cpus). */
  readonly cpus: number
  /** Fork point for new lane branches; undefined = HEAD (the checked-out branch). */
  readonly baseBranch?: string
  /** Per-phase agent settings. SC_MODEL forces one model across all phases. */
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
  phases: {
    // Structured output requires the planner to stay at maxIterations: 1.
    planner: { model: "claude-fable-5", effort: "xhigh", maxIterations: 1 },
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

function withEnvOverrides(base: SandcastleConfig): SandcastleConfig {
  const model = process.env.SC_MODEL
  return {
    ...base,
    maxIterations: positiveInt("SC_LOOPS") ?? base.maxIterations,
    concurrency: positiveInt("SC_CONCURRENCY") ?? base.concurrency,
    phases: model
      ? {
          planner: { ...base.phases.planner, model },
          implementer: { ...base.phases.implementer, model },
          reviewer: { ...base.phases.reviewer, model },
          merger: { ...base.phases.merger, model },
        }
      : base.phases,
  }
}

export const config: SandcastleConfig = withEnvOverrides(defaults)
