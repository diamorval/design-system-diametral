import { Cell, Pie, PieChart } from "recharts"

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@diametral/ui/components/chart"

const DATA = [
  { channel: "direct", visitors: 4200 },
  { channel: "search", visitors: 3100 },
  { channel: "social", visitors: 1800 },
  { channel: "referral", visitors: 900 },
]

const CONFIG = {
  visitors: { label: "Visitors" },
  direct: { label: "Direct", color: "var(--ds-chart-1)" },
  search: { label: "Search", color: "var(--ds-chart-2)" },
  social: { label: "Social", color: "var(--ds-chart-3)" },
  referral: { label: "Referral", color: "var(--ds-chart-4)" },
} satisfies ChartConfig

export default function ChartPie() {
  return (
    <ChartContainer config={CONFIG} className="h-64 w-full">
      <PieChart>
        <ChartTooltip content={<ChartTooltipContent nameKey="channel" />} />
        <Pie data={DATA} dataKey="visitors" nameKey="channel" innerRadius={45}>
          {DATA.map((entry) => (
            <Cell
              key={entry.channel}
              fill={`var(--color-${entry.channel})`}
            />
          ))}
        </Pie>
        <ChartLegend content={<ChartLegendContent nameKey="channel" />} />
      </PieChart>
    </ChartContainer>
  )
}
