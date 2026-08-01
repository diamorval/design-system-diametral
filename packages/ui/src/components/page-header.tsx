import * as React from "react"

import { cn } from "../lib/utils.js"

function PageHeader({ className, ...props }: React.ComponentProps<"header">) {
  return (
    <header
      data-slot="page-header"
      className={cn(
        "flex flex-col gap-4 border-b border-border pb-6 has-data-[slot=page-header-tabs]:pb-0",
        className
      )}
      {...props}
    />
  )
}

function PageHeaderHeading({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="page-header-heading"
      className={cn(
        "flex flex-wrap items-start justify-between gap-4",
        className
      )}
      {...props}
    />
  )
}

function PageHeaderIcon({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="page-header-icon"
      className={cn(
        "flex h-8 shrink-0 items-center text-muted-foreground [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-6",
        className
      )}
      {...props}
    />
  )
}

function PageHeaderTitle({ className, ...props }: React.ComponentProps<"h1">) {
  return (
    <h1
      data-slot="page-header-title"
      className={cn(
        "font-heading text-2xl font-semibold tracking-wide",
        className
      )}
      {...props}
    />
  )
}

function PageHeaderDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="page-header-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

function PageHeaderActions({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="page-header-actions"
      className={cn("flex items-center gap-2", className)}
      {...props}
    />
  )
}

// Only a slot marker: its presence flips `PageHeader`'s `has-data-[slot=…]`
// selector so the bottom rule sits flush under the tab strip instead of the
// title row.
function PageHeaderTabs({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="page-header-tabs" className={cn(className)} {...props} />
  )
}

export {
  PageHeader,
  PageHeaderHeading,
  PageHeaderIcon,
  PageHeaderTitle,
  PageHeaderDescription,
  PageHeaderActions,
  PageHeaderTabs,
}
