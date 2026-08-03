import * as React from "react"

import { cn } from "../lib/utils.js"

function Textarea({
  className,
  rows,
  style,
  ...props
}: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      rows={rows}
      // field-sizing-content makes the browser ignore `rows`, so re-create it as a
      // floor: `rows` line boxes plus --textarea-chrome (this element's own vertical
      // padding + border, which border-box min-height has to account for).
      style={
        rows
          ? { minHeight: `calc(${rows} * 1lh + var(--textarea-chrome))`, ...style }
          : style
      }
      className={cn(
        "flex field-sizing-content w-full resize-none rounded-none border border-transparent border-b-input bg-transparent px-0 py-3 text-base [--textarea-chrome:calc(1.5rem+2px)] transition-[color,border-color] outline-none placeholder:text-muted-foreground focus-visible:border-b-ring disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-b-destructive md:text-sm dark:aria-invalid:border-b-destructive/50",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
