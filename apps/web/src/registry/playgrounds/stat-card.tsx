import type { ComponentProps } from "react"

import {
  StatCard,
  StatCardDelta,
  StatCardLabel,
  StatCardValue,
} from "@diametral/ui/components/stat-card"

// The axis (up/down) belongs to StatCardDelta, so it is routed there rather
// than spread onto the root.
export default function StatCardPlayground({
  children,
  direction,
  ...props
}: ComponentProps<typeof StatCard> & {
  direction?: ComponentProps<typeof StatCardDelta>["direction"]
}) {
  return (
    <StatCard className="w-56" {...props}>
      <StatCardLabel>{children}</StatCardLabel>
      <StatCardValue>1 284</StatCardValue>
      <StatCardDelta direction={direction}>
        {direction === "down" ? "-4.2%" : "+12.4%"}
      </StatCardDelta>
    </StatCard>
  )
}
