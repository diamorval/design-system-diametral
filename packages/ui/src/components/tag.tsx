import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../lib/utils.js"

// Absorbs v1's Chip (css/components/chip.css): a boxed, tinted label, as
// opposed to Badge's bare typographic one. Chip's only axis was a boolean
// `warn`; here that becomes `tone="warning"`, folded into the same six-tone
// family status/banner/alert share instead of a second component.
const tagVariants = cva(
  "group/tag inline-flex w-fit shrink-0 items-center gap-1.5 rounded-none bg-[var(--tone-bg)] px-3 py-1.5 text-xs font-medium text-[var(--tone-ink)] tabular-nums",
  {
    variants: {
      tone: {
        neutral:
          "[--tone-bg:var(--ds-neutral-bg)] [--tone-ink:var(--ds-neutral-ink)]",
        success:
          "[--tone-bg:var(--ds-success-bg)] [--tone-ink:var(--ds-success-ink)]",
        warning:
          "[--tone-bg:var(--ds-warning-bg)] [--tone-ink:var(--ds-warning-ink)]",
        danger:
          "[--tone-bg:var(--ds-danger-bg)] [--tone-ink:var(--ds-danger-ink)]",
        critical:
          "[--tone-bg:var(--ds-critical-bg)] [--tone-ink:var(--ds-critical-ink)]",
        info: "[--tone-bg:var(--ds-info-bg)] [--tone-ink:var(--ds-info-ink)]",
      },
    },
    defaultVariants: {
      tone: "neutral",
    },
  }
)

function Tag({
  className,
  tone,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof tagVariants>) {
  return (
    <span
      data-slot="tag"
      className={cn(tagVariants({ tone }), className)}
      {...props}
    />
  )
}

export { Tag, tagVariants }
