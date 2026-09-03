import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../lib/utils.js"

// Tone sits on the item, not the indicator: a timeline's semantics are
// per-event ("this deploy failed"), and the indicator is the only slot that
// can carry colour without competing with the content's own type styles.
// Unset leaves the rail on --primary, which is what every existing demo shows.
const timelineItemVariants = cva(
  "group/timeline-item relative flex gap-4 pb-8 before:absolute before:start-3 before:top-6 before:bottom-0 before:w-px before:-translate-x-1/2 before:bg-border before:content-[''] last:pb-0 last:before:hidden rtl:before:translate-x-1/2",
  {
    variants: {
      tone: {
        neutral: "[--tone:var(--ds-neutral-ink)]",
        info: "[--tone:var(--ds-info-ink)]",
        success: "[--tone:var(--ds-success-ink)]",
        warning: "[--tone:var(--ds-warning-ink)]",
        danger: "[--tone:var(--ds-danger-ink)]",
        critical: "[--tone:var(--ds-critical-ink)]",
      },
    },
  }
)

function Timeline({ className, ...props }: React.ComponentProps<"ol">) {
  return (
    <ol
      data-slot="timeline"
      className={cn("flex w-full flex-col", className)}
      {...props}
    />
  )
}

function TimelineItem({
  className,
  tone,
  ...props
}: React.ComponentProps<"li"> & VariantProps<typeof timelineItemVariants>) {
  return (
    <li
      data-slot="timeline-item"
      className={cn(timelineItemVariants({ tone }), className)}
      {...props}
    />
  )
}

function TimelineIndicator({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="timeline-indicator"
      className={cn(
        "z-10 flex size-6 shrink-0 items-center justify-center rounded-none border border-border bg-background text-[10px] font-semibold text-muted-foreground [&_svg:not([class*='size-'])]:size-3",
        "group-data-[state=completed]/timeline-item:border-[var(--tone,var(--primary))] group-data-[state=completed]/timeline-item:bg-[var(--tone,var(--primary))] group-data-[state=completed]/timeline-item:text-primary-foreground",
        "group-data-[state=active]/timeline-item:border-[var(--tone,var(--primary))] group-data-[state=active]/timeline-item:text-foreground",
        className
      )}
      {...props}
    />
  )
}

function TimelineContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="timeline-content"
      className={cn("flex flex-1 flex-col gap-1 pt-0.5", className)}
      {...props}
    />
  )
}

function TimelineTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="timeline-title"
      className={cn(
        "flex items-center gap-2 text-xs font-semibold tracking-wider uppercase",
        className
      )}
      {...props}
    />
  )
}

function TimelineDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="timeline-description"
      className={cn(
        "text-sm leading-normal text-muted-foreground normal-case",
        className
      )}
      {...props}
    />
  )
}

function TimelineTime({ className, ...props }: React.ComponentProps<"time">) {
  return (
    <time
      data-slot="timeline-time"
      className={cn(
        "text-xs tracking-wide text-muted-foreground tabular-nums",
        className
      )}
      {...props}
    />
  )
}

export {
  Timeline,
  TimelineItem,
  TimelineIndicator,
  TimelineContent,
  TimelineTitle,
  TimelineDescription,
  TimelineTime,
  timelineItemVariants,
}
