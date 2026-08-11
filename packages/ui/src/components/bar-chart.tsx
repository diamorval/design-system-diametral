"use client"

import * as React from "react"
import {
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts"

import {
  seriesColor,
  STATUS_COLORS,
  type ChartStatus,
} from "../lib/chart-series.js"
import { cn } from "../lib/utils.js"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "./chart.js"

// The finished bar chart over v2's recharts primitives, standing in for v1's
// CSS-flex BarChart (react/components/BarChart.js). It follows LineChart's
// shape so the six wrappers read alike; v1's own props land like this:
//
//   v1 `value` / `label`  ->  a `config` key per measure, and `xAxisKey` for
//                              the row field holding the category
//   v1 `max`              ->  `max`, which pins the value axis rather than
//                              letting the tallest bar define the ceiling
//   v1 `horizontal`       ->  `horizontal`, kept under v1's name; recharts
//                              calls the same thing `layout="vertical"`
//   v1 `status`           ->  `statusKey`, a row field naming a semantic tone
//
// `status` is per-row rather than per-series: it rides along on the row as
// recharts' own `fill` field, which paints every series in that row. That
// matches v1, whose data rows carried one value each — pair `statusKey` with a
// single-series `config`.
function BarChart({
  className,
  config,
  data,
  xAxisKey,
  statusKey,
  max,
  horizontal = false,
  grid = true,
  legend,
  stacked = false,
  margin = { top: 8, right: 20, bottom: 0, left: 20 },
  children,
  ...props
}: Omit<React.ComponentProps<typeof ChartContainer>, "config" | "children"> & {
  config: ChartConfig
  data: Record<string, unknown>[]
  /** Row field the category axis reads its labels from. */
  xAxisKey?: string
  /** Row field naming a `ChartStatus`, which tints that bar on its own. */
  statusKey?: string
  /** Ceiling for the value axis. Left off, the tallest bar sets it. */
  max?: number
  /** Lay the bars out as rows rather than columns. */
  horizontal?: boolean
  grid?: boolean
  /** Defaults on once `config` names more than one series. */
  legend?: boolean
  /** Sum the series into one bar instead of grouping them side by side. */
  stacked?: boolean
  margin?: React.ComponentProps<typeof RechartsBarChart>["margin"]
  /** Extra recharts children — a `ReferenceLine`, a second axis. */
  children?: React.ReactNode
}) {
  const series = Object.keys(config)
  const domain: [number, number | "auto"] = [0, max ?? "auto"]

  // Recharts reads `fill` off the datum, which is how a per-row tone reaches
  // one bar without a deprecated <Cell> per entry.
  const rows = statusKey
    ? data.map((row) => {
        const status = row[statusKey] as ChartStatus | undefined
        return status ? { ...row, fill: STATUS_COLORS[status] } : row
      })
    : data

  // Recharts names the axes by their own orientation, not the bars': the
  // category axis is X for columns and Y for rows, and they swap wholesale.
  const categoryAxis = xAxisKey ? (
    horizontal ? (
      <YAxis
        type="category"
        dataKey={xAxisKey}
        tickLine={false}
        axisLine={false}
        tickMargin={8}
        width={80}
      />
    ) : (
      <XAxis
        type="category"
        dataKey={xAxisKey}
        tickLine={false}
        axisLine={false}
        tickMargin={8}
        interval="preserveStartEnd"
        minTickGap={16}
      />
    )
  ) : null

  const valueAxis = horizontal ? (
    <XAxis type="number" domain={domain} tickLine={false} axisLine={false} />
  ) : (
    <YAxis type="number" domain={domain} tickLine={false} axisLine={false} />
  )

  return (
    <ChartContainer
      config={config}
      className={cn("h-56 w-full", className)}
      {...props}
    >
      <RechartsBarChart
        accessibilityLayer
        data={rows}
        margin={margin}
        layout={horizontal ? "vertical" : "horizontal"}
      >
        {grid ? (
          <CartesianGrid vertical={horizontal} horizontal={!horizontal} />
        ) : null}
        {categoryAxis}
        {valueAxis}
        <ChartTooltip content={<ChartTooltipContent />} />
        {(legend ?? series.length > 1) ? (
          <ChartLegend content={<ChartLegendContent />} />
        ) : null}
        {series.map((key, i) => (
          <Bar
            key={key}
            dataKey={key}
            stackId={stacked ? "stack" : undefined}
            fill={seriesColor(key, i)}
          />
        ))}
        {children}
      </RechartsBarChart>
    </ChartContainer>
  )
}

export { BarChart }
