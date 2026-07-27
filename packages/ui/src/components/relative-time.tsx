"use client"

import * as React from "react"

import { cn } from "../lib/utils.js"

// Promotes the `relativeTime` helper Ophelie's NotificationBell hand-rolled
// (layout/Topbar/components/NotificationBell) to a reusable component: a
// locale-aware "time ago" that falls back to an absolute date past a week.
function formatRelativeTime(date: Date, locale?: string): string {
  const diffSec = Math.round((date.getTime() - Date.now()) / 1000)
  const abs = Math.abs(diffSec)
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" })
  if (abs < 60) return rtf.format(diffSec, "second")
  if (abs < 3600) return rtf.format(Math.round(diffSec / 60), "minute")
  if (abs < 86_400) return rtf.format(Math.round(diffSec / 3600), "hour")
  if (abs < 604_800) return rtf.format(Math.round(diffSec / 86_400), "day")
  return date.toLocaleDateString(locale, {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

function RelativeTime({
  className,
  date,
  locale,
  live = true,
  updateIntervalMs = 60_000,
  ...props
}: Omit<React.ComponentProps<"time">, "dateTime" | "children"> & {
  date: Date | string
  locale?: string
  /** Re-renders on an interval so the text keeps advancing while mounted. */
  live?: boolean
  updateIntervalMs?: number
}) {
  const parsed = React.useMemo(
    () => (date instanceof Date ? date : new Date(date)),
    [date]
  )
  const [, setTick] = React.useState(0)

  React.useEffect(() => {
    if (!live) return
    const id = setInterval(() => setTick((n) => n + 1), updateIntervalMs)
    return () => clearInterval(id)
  }, [live, updateIntervalMs])

  return (
    <time
      data-slot="relative-time"
      dateTime={parsed.toISOString()}
      title={parsed.toLocaleString(locale, {
        dateStyle: "long",
        timeStyle: "short",
      })}
      className={cn("tabular-nums", className)}
      {...props}
    >
      {formatRelativeTime(parsed, locale)}
    </time>
  )
}

export { RelativeTime, formatRelativeTime }
