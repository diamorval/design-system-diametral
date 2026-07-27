import * as React from "react"

import { cn } from "../lib/utils.js"

// A two-column key/value grid (auto label column, 1fr value column). `dt`/`dd`
// pairs flow as consecutive grid children — no explicit row wrapper needed —
// matching v1's DescriptionList (css/components/description-list.css).
function DescriptionList({ className, ...props }: React.ComponentProps<"dl">) {
  return (
    <dl
      data-slot="description-list"
      className={cn("grid grid-cols-[auto_1fr] gap-x-6", className)}
      {...props}
    />
  )
}

function DescriptionTerm({ className, ...props }: React.ComponentProps<"dt">) {
  return (
    <dt
      data-slot="description-term"
      className={cn(
        "border-t border-border py-2.5 text-[0.6875rem] font-normal tracking-wider whitespace-nowrap text-muted-foreground uppercase first-of-type:border-t-0",
        className
      )}
      {...props}
    />
  )
}

function DescriptionDetail({
  className,
  ...props
}: React.ComponentProps<"dd">) {
  return (
    <dd
      data-slot="description-detail"
      className={cn(
        "border-t border-border py-2.5 text-sm text-foreground tabular-nums first-of-type:border-t-0",
        className
      )}
      {...props}
    />
  )
}

export { DescriptionList, DescriptionTerm, DescriptionDetail }
