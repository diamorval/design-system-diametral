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
      direction: {
        up: "text-[var(--ds-success)]",
        down: "text-[var(--ds-danger)]",
      },
    },
  }
)

function StatCardDelta({
  className,
  direction,
  children,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof statCardDeltaVariants>) {
  return (
    <div
      data-slot="stat-card-delta"
      className={cn(statCardDeltaVariants({ direction }), className)}
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
