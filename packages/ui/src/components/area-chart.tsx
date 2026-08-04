"use client"

import * as React from "react"
import {
  Area,
  AreaChart as RechartsAreaChart,
  CartesianGrid,
  XAxis,
} from "recharts"

import { seriesColor } from "../lib/chart-series.js"
import { cn } from "../lib/utils.js"
import {
  CHART_ANIMATION_ACTIVE,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "./chart.js"

// `LineChart` read as a volume, standing in for v1's hand-rolled SVG AreaChart
// (react/components/AreaChart.js). Same props, same `config`-driven colouring,
// same v1 mapping — see the header of `line-chart.tsx` for that table — with
// one addition: `stacked`, because two areas drawn over each other are usually
// meant to sum rather than to overlap.
function AreaChart({
  className,
  config,
  data,
  xAxisKey,
  grid = true,
  dots = false,
  legend,
  stacked = false,
  margin = { top: 8, right: 20, bottom: 0, left: 20 },
  children,
  ...props
}: Omit<React.ComponentProps<typeof ChartContainer>, "config" | "children"> & {
  config: ChartConfig
  data: Record<string, unknown>[]
  /** Row field the x axis reads its categories from. Omitted, there is no axis. */
  xAxisKey?: string
  grid?: boolean
  /** Off by default: an area already carries its own outline. */
  dots?: boolean
  /** Defaults on once `config` names more than one series. */
  legend?: boolean
  /** Sum the series into one band instead of overlaying them. */
  stacked?: boolean
  margin?: React.ComponentProps<typeof RechartsAreaChart>["margin"]
  /** Extra recharts children — a `ReferenceLine`, a second axis. */
  children?: React.ReactNode
}) {
  const series = Object.keys(config)

  return (
    <ChartContainer
      config={config}
      className={cn("h-56 w-full", className)}
      {...props}
    >
      <RechartsAreaChart accessibilityLayer data={data} margin={margin}>
        {grid ? <CartesianGrid vertical={false} /> : null}
        {xAxisKey ? (
          <XAxis
            dataKey={xAxisKey}
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            interval="preserveStartEnd"
            minTickGap={16}
          />
        ) : null}
        <ChartTooltip content={<ChartTooltipContent />} />
        {(legend ?? series.length > 1) ? (
          <ChartLegend content={<ChartLegendContent />} />
        ) : null}
        {series.map((key, i) => (
          <Area
            key={key}
            dataKey={key}
            stackId={stacked ? "stack" : undefined}
            stroke={seriesColor(key, i)}
            fill={seriesColor(key, i)}
            // The stroke stays at full strength while the band goes faint, so
            // the boundary of a series survives being overlaid by the next.
            fillOpacity={0.18}
            strokeWidth={2}
            dot={dots}
            activeDot={{ r: 4 }}
            isAnimationActive={CHART_ANIMATION_ACTIVE}
          />
        ))}
        {children}
      </RechartsAreaChart>
    </ChartContainer>
  )
}

export { AreaChart }
