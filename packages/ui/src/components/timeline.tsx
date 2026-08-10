import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../lib/utils.js"

// Tone sits on the item, not the indicator: a timeline's semantics are
// per-event ("this deploy failed"), and the indicator is the only slot that
// can carry colour without competing with the content's own type styles.
// Unset leaves the rail on --primary, which is what every existing demo shows.
const timelineItemVariants = cva("ds-timeline-item pb-8 last:pb-0", {
  variants: {
    tone: {
      neutral: "ds-timeline-item--neutral",
      info: "ds-timeline-item--info",
      success: "ds-timeline-item--success",
      warning: "ds-timeline-item--warning",
      danger: "ds-timeline-item--danger",
      critical: "ds-timeline-item--critical",
    },
  },
})

function Timeline({ className, ...props }: React.ComponentProps<"ol">) {
  return (
    <ol
      data-slot="timeline"
      className={cn("ds-timeline", className)}
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
      className={cn("ds-timeline-indicator", className)}
      {...props}
    />
  )
}

function TimelineContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="timeline-content"
      className={cn("ds-timeline-content", className)}
      {...props}
    />
  )
}

function TimelineTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="timeline-title"
      className={cn("ds-timeline-title", className)}
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
      className={cn("ds-timeline-description", className)}
      {...props}
    />
  )
}

function TimelineTime({ className, ...props }: React.ComponentProps<"time">) {
  return (
    <time
      data-slot="timeline-time"
      className={cn("ds-timeline-time", className)}
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
