import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@workspace/ui/components/chart"

const DATA = [
  { month: "Jan", visitors: 1200 },
  { month: "Feb", visitors: 1800 },
  { month: "Mar", visitors: 1500 },
  { month: "Apr", visitors: 2400 },
  { month: "May", visitors: 2100 },
  { month: "Jun", visitors: 2900 },
]

const CONFIG = {
  visitors: { label: "Visitors", color: "var(--ds-chart-2)" },
} satisfies ChartConfig

export default function ChartArea() {
  return (
    <ChartContainer config={CONFIG} className="h-56 w-full">
      <AreaChart data={DATA}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="month" tickLine={false} axisLine={false} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Area
          dataKey="visitors"
          stroke="var(--color-visitors)"
          fill="var(--color-visitors)"
          fillOpacity={0.18}
          strokeWidth={2}
        />
      </AreaChart>
    </ChartContainer>
  )
}
