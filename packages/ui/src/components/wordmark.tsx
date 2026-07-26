import * as React from "react"
import horizontal from "@diametral/assets/logo/diametral-lockup-horizontal.svg?raw"
import square from "@diametral/assets/logo/diametral-lockup-square.svg?raw"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../lib/utils.js"

// Both lockups are `stroke`/`fill="currentColor"` already, so inlining them
// (rather than an <img src>) lets `text-*` recolour the mark exactly like
// the rest of the system — an <img> can't inherit currentColor from its page.
const lockups = { horizontal, square } satisfies Record<string, string>

const wordmarkVariants = cva("inline-flex items-center text-foreground", {
  variants: {
    variant: {
      horizontal: "[&_svg]:h-5 [&_svg]:w-auto",
      square: "[&_svg]:size-8",
    },
  },
  defaultVariants: {
    variant: "horizontal",
  },
})

function Wordmark({
  className,
  variant = "horizontal",
  ...props
}: Omit<React.ComponentProps<"span">, "children" | "dangerouslySetInnerHTML"> &
  VariantProps<typeof wordmarkVariants>) {
  return (
    <span
      data-slot="wordmark"
      data-variant={variant}
      className={cn(wordmarkVariants({ variant }), className)}
      dangerouslySetInnerHTML={{ __html: lockups[variant ?? "horizontal"] }}
      {...props}
    />
  )
}

export { Wordmark, wordmarkVariants }
