import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../lib/utils.js"

// Sets --tone for the dot and label to share; the six tones mirror
// tag/banner/alert's shared substrate (globals.css) so a status reading
// "danger" always means the same color everywhere in the system.
const statusVariants = cva("group/status inline-flex items-center gap-1.5", {
  variants: {
    tone: {
      success: "[--tone:var(--ds-success-ink)]",
      warning: "[--tone:var(--ds-warning-ink)]",
      danger: "[--tone:var(--ds-danger-ink)]",
      critical: "[--tone:var(--ds-critical-ink)]",
      neutral: "[--tone:var(--ds-neutral-ink)]",
      info: "[--tone:var(--ds-info-ink)]",
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
      className={cn(
        "relative inline-flex size-1.5 shrink-0 rounded-full bg-[var(--tone)]",
        className
      )}
      {...props}
    >
      {pulse && (
        <span className="absolute inset-0 rounded-full bg-[var(--tone)] motion-safe:animate-ping" />
      )}
    </span>
  )
}

function StatusLabel({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="status-label"
      className={cn("text-sm text-[var(--tone)]", className)}
      {...props}
    />
  )
}

export { Status, StatusIndicator, StatusLabel, statusVariants }
