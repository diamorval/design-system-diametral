import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../lib/utils.js"

// Absorbs v1's Chip (css/components/chip.css): a boxed, tinted label, as
// opposed to Badge's bare typographic one. Chip's only axis was a boolean
// `warn`; here that becomes `tone="warning"`, folded into the same six-tone
// family status/banner/alert share instead of a second component.
const tagVariants = cva("ds-tag", {
  variants: {
    tone: {
      neutral: "ds-tag--neutral",
      success: "ds-tag--success",
      warning: "ds-tag--warning",
      danger: "ds-tag--danger",
      critical: "ds-tag--critical",
      info: "ds-tag--info",
    },
  },
  defaultVariants: {
    tone: "neutral",
  },
})

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
