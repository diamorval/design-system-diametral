import * as React from "react"

import { cn } from "../lib/utils.js"

function Panel({
  className,
  size = "default",
  ...props
}: React.ComponentProps<"div"> & { size?: "default" | "sm" }) {
  return (
    <div
      data-slot="panel"
      data-size={size}
      className={cn(
        "flex flex-col gap-(--panel-spacing) border border-border bg-card py-(--panel-spacing) text-sm text-card-foreground [--panel-spacing:--spacing(4)] data-[size=sm]:[--panel-spacing:--spacing(2.5)]",
        className
      )}
      {...props}
    />
  )
}

function PanelHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="panel-header"
      className={cn(
        "flex items-center justify-between gap-4 px-(--panel-spacing) [.border-b]:pb-(--panel-spacing)",
        className
      )}
      {...props}
    />
  )
}

function PanelTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="panel-title"
      className={cn(
        "font-heading text-sm font-semibold tracking-wider uppercase",
        className
      )}
      {...props}
    />
  )
}

function PanelContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="panel-content"
      className={cn("px-(--panel-spacing)", className)}
      {...props}
    />
  )
}

function PanelFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="panel-footer"
      className={cn(
        "flex items-center px-(--panel-spacing) [.border-t]:pt-(--panel-spacing)",
        className
      )}
      {...props}
    />
  )
}

// A tight, dividing row for input-row content (settings toggles, key/value
// pairs) — the case v1's Panel handled with a `rows` boolean; here it is its
// own part instead of a variant flag.
function PanelRow({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="panel-row"
      className={cn(
        "flex items-center justify-between gap-4 border-b border-border px-(--panel-spacing) py-2.5 last:border-b-0",
        className
      )}
      {...props}
    />
  )
}

export { Panel, PanelHeader, PanelTitle, PanelContent, PanelFooter, PanelRow }
