import * as React from "react"

import { cn } from "../lib/utils.js"

function Timeline({ className, ...props }: React.ComponentProps<"ol">) {
  return (
    <ol
      data-slot="timeline"
      className={cn("flex w-full flex-col", className)}
      {...props}
    />
  )
}

function TimelineItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="timeline-item"
      className={cn(
        "group/timeline-item relative flex gap-4 pb-8 last:pb-0",
        "before:absolute before:top-6 before:bottom-0 before:start-3 before:w-px before:-translate-x-1/2 before:bg-border before:content-[''] last:before:hidden rtl:before:translate-x-1/2",
        className
      )}
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
        "group-data-[state=completed]/timeline-item:border-primary group-data-[state=completed]/timeline-item:bg-primary group-data-[state=completed]/timeline-item:text-primary-foreground",
        "group-data-[state=active]/timeline-item:border-primary group-data-[state=active]/timeline-item:text-foreground",
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
}
