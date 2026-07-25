import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@diametral/ui/components/chart"

const DATA = [
  { week: "W1", deploys: 4 },
  { week: "W2", deploys: 7 },
  { week: "W3", deploys: 5 },
  { week: "W4", deploys: 11 },
  { week: "W5", deploys: 9 },
]

const CONFIG = {
  deploys: { label: "Deploys", color: "var(--ds-chart-3)" },
} satisfies ChartConfig

export default function ChartLine() {
  return (
    <ChartContainer config={CONFIG} className="h-56 w-full">
      <LineChart data={DATA}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="week" tickLine={false} axisLine={false} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Line
          dataKey="deploys"
          stroke="var(--color-deploys)"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ChartContainer>
  )
}
