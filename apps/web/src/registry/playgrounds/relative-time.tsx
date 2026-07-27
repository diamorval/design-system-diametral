import type { ComponentProps } from "react"

import { RelativeTime } from "@diametral/ui/components/relative-time"

// Captured once at module load, not per render — reading the clock during
// render is impure.
const NOW = Date.now()

const OFFSETS_MS: Record<string, number> = {
  "5 seconds ago": -5_000,
  "12 minutes ago": -12 * 60_000,
  "3 hours ago": -3 * 3_600_000,
  "2 days ago": -2 * 86_400_000,
}

// The real prop is a `Date` or ISO string; `date` here just picks a preset
// offset so the panel has something to select from.
export default function RelativeTimePlayground({
  date = "12 minutes ago",
  ...props
}: Omit<ComponentProps<typeof RelativeTime>, "date"> & { date?: string }) {
  const offset = OFFSETS_MS[date] ?? OFFSETS_MS["12 minutes ago"]
  return <RelativeTime date={new Date(NOW + offset)} {...props} />
}
