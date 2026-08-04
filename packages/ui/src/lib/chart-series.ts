/**
 * Shared colour resolution for the finished chart wrappers (LineChart,
 * AreaChart, BarChart, StackedBar, PieChart, DonutChart), ported from the
 * single `SERIES_COLORS` array v1 copied into each of its chart files.
 */

/** Fallback ramp, as CSS var references so both themes track the token. */
export const SERIES_COLORS = [
  "var(--ds-chart-1)",
  "var(--ds-chart-2)",
  "var(--ds-chart-3)",
  "var(--ds-chart-4)",
  "var(--ds-chart-5)",
  "var(--ds-chart-6)",
]

/**
 * `key` reaches here as a series name or, for the per-slice charts, as arbitrary
 * row text — "Signed up", "eu-west", "Closed won". A CSS custom property cannot
 * hold a space, and an invalid `var()` name does not fall back, it fails
 * outright: `var(--color-Signed up, …)` paints black rather than the ramp slot.
 * Folding anything that is not ident-safe to a dash is what keeps the fallback
 * reachable. `ChartStyle` emits its declarations through the same function, so
 * the two always agree on the name.
 */
export function colorVarName(key: string) {
  return `--color-${key.replace(/[^a-zA-Z0-9_-]/g, "-")}`
}

/**
 * The colour to paint series `key` with. `ChartContainer` only emits
 * `--color-<key>` for a config entry that carries a colour, so the var's own
 * fallback is what gives an uncoloured series its ramp slot — no config
 * rewriting, and a `theme` entry still wins.
 */
export function seriesColor(key: string, index: number) {
  return `var(${colorVarName(key)}, ${SERIES_COLORS[index % SERIES_COLORS.length]})`
}

/**
 * A pie or donut is coloured per slice, not per series, so the colour rides on
 * each row as recharts' own `fill` field — keyed by the slice name so a
 * `config` entry still wins and the legend swatch matches.
 */
export function withSliceColors(
  data: Record<string, unknown>[],
  nameKey: string
) {
  return data.map((row, i) => ({
    ...row,
    fill: row.fill ?? seriesColor(String(row[nameKey]), i),
  }))
}

/** Semantic bar tints, for the `status` axis v1's BarChart carried. */
export const STATUS_COLORS = {
  success: "var(--ds-success)",
  warning: "var(--ds-warning)",
  danger: "var(--ds-danger)",
  info: "var(--ds-info)",
} as const

export type ChartStatus = keyof typeof STATUS_COLORS
