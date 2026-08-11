import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../lib/utils.js"

// Sets --tone for the dot and label to share; the six tones mirror
// tag/banner/alert's shared substrate (globals.css) so a status reading
// "danger" always means the same color everywhere in the system.
const statusVariants = cva("group/status ds-status", {
  variants: {
    tone: {
      success: "ds-status--success",
      warning: "ds-status--warning",
      danger: "ds-status--danger",
      critical: "ds-status--critical",
      neutral: "ds-status--neutral",
      info: "ds-status--info",
    },
  },
  defaultVariants: {
    tone: "neutral",
  },
})

function Status({
  className,
  tone,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof statusVariants>) {
  return (
    <span
      data-slot="status"
      className={cn(statusVariants({ tone }), className)}
      {...props}
    />
  )
}

function StatusIndicator({
  className,
  pulse,
  ...props
}: React.ComponentProps<"span"> & { pulse?: boolean }) {
  return (
    <span
      data-slot="status-indicator"
      aria-hidden="true"
      className={cn("ds-status-indicator", className)}
      {...props}
    >
      {pulse && <span className="ds-status-indicator-ping" />}
    </span>
  )
}

function StatusLabel({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="status-label"
      className={cn("ds-status-label", className)}
      {...props}
    />
  )
}

export { Status, StatusIndicator, StatusLabel, statusVariants }
