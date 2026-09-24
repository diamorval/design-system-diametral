import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../lib/utils.js"

// A dashboard tile: bordered surface, uppercase faint label, a title-voiced
// figure, an optional signed delta and a spark slot — the compound-component
// take on v1's StatCard (css/components/stat-card.css).
function StatCard({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="stat-card"
      className={cn(
        "flex flex-col border border-border bg-card px-5 py-4 text-card-foreground",
        className
      )}
      {...props}
    />
  )
}

function StatCardLabel({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="stat-card-label"
      className={cn(
        "text-[0.6875rem] font-normal tracking-wider text-muted-foreground uppercase",
        className
      )}
      {...props}
    />
  )
}

function StatCardValue({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="stat-card-value"
      className={cn(
        "mt-2 font-heading text-2xl font-semibold tracking-tight tabular-nums",
        className
      )}
      {...props}
    />
  )
}

const statCardDeltaVariants = cva(
  "mt-1 inline-flex w-fit items-center gap-1 text-xs text-muted-foreground tabular-nums",
  {
    variants: {
      tone: {
        // The `-ink` variants, not the bare tones: --ds-success is tuned as a
        // surface colour and only reaches 3.82:1 on dark's --ds-bg, which fails
        // AA as text. --ds-success-ink is the text-weight value (6.75:1).
        positive: "text-[var(--ds-success-ink)]",
        negative: "text-[var(--ds-danger-ink)]",
        neutral: "",
      },
    },
  }
)

// `direction` draws the arrow; `tone` says whether that is good news. They
// default together (up is positive), and split for metrics where up is bad —
// churn, cost, latency: `direction="up" tone="negative"`.
function StatCardDelta({
  className,
  direction,
  tone = direction === "up"
    ? "positive"
    : direction === "down"
      ? "negative"
      : undefined,
  children,
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof statCardDeltaVariants> & {
    direction?: "up" | "down" | null
  }) {
  return (
    <div
      data-slot="stat-card-delta"
      className={cn(statCardDeltaVariants({ tone }), className)}
      {...props}
    >
      {direction && (
        <span aria-hidden="true">{direction === "up" ? "▲" : "▼"}</span>
      )}
      {children}
    </div>
  )
}

function StatCardSpark({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="stat-card-spark"
      className={cn("mt-3 leading-none", className)}
      {...props}
    />
  )
}

export {
  StatCard,
  StatCardLabel,
  StatCardValue,
  StatCardDelta,
  StatCardSpark,
  statCardDeltaVariants,
}
