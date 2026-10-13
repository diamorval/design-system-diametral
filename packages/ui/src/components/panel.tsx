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
      className={cn("ds-panel", className)}
      {...props}
    />
  )
}

function PanelHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="panel-header"
      className={cn("ds-panel-header", className)}
      {...props}
    />
  )
}

function PanelTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="panel-title"
      className={cn("ds-panel-title", className)}
      {...props}
    />
  )
}

function PanelContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="panel-content"
      className={cn("ds-panel-content", className)}
      {...props}
    />
  )
}

function PanelFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="panel-footer"
      className={cn("ds-panel-footer", className)}
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
      className={cn("ds-panel-row", className)}
      {...props}
    />
  )
}

export { Panel, PanelHeader, PanelTitle, PanelContent, PanelFooter, PanelRow }
