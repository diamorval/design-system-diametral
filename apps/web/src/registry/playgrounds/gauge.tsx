import type { ComponentProps } from "react"

import { Gauge } from "@diametral/ui/components/gauge"

export default function GaugePlayground({
  value = "62",
  label,
  ...props
}: Omit<ComponentProps<typeof Gauge>, "value" | "label"> & {
  value?: string
  label?: string
}) {
  return <Gauge value={Number(value)} label={label} size={160} {...props} />
}
