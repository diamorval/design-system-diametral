import * as React from "react"

import { cn } from "../lib/utils.js"
import { CheckIcon } from "@phosphor-icons/react"

// A stepper only ever runs one of two ways, so the axis is a boolean rather
// than the string `orientation` the rest of the library takes. `vertical`
// rather than `horizontal` because it defaults to false: a default-true boolean
// cannot be driven from the docs Workbench panel, which can only add props.
// The rendered `data-orientation` is unchanged — every style below keys off it.
function Stepper({
  className,
  vertical = false,
  ...props
}: React.ComponentProps<"div"> & {
  vertical?: boolean
}) {
  return (
    <div
      data-slot="stepper"
      data-orientation={vertical ? "vertical" : "horizontal"}
      // A steps rail holds no focusable content of its own, so once the
      // horizontal variant becomes a scroll container it is unreachable by
      // keyboard — a pointer is the only way to pan it. Making the container
      // itself a tab stop is the standard remedy (axe
      // `scrollable-region-focusable`). Vertical never scrolls, so it stays out
      // of the tab order rather than adding a stop that does nothing.
      tabIndex={vertical ? undefined : 0}
      className={cn(
        // Horizontal steps wrap their labels when squeezed, but a rail narrower
        // than the wrapped minimum has to scroll rather than spill over whatever
        // sits beside it.
        "group/stepper flex w-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring data-horizontal:flex-row data-horizontal:items-center data-horizontal:overflow-x-auto data-vertical:flex-col data-vertical:items-stretch",
        className
      )}
      {...props}
    />
  )
}

function StepperItem({
  className,
  state = "inactive",
  ...props
}: React.ComponentProps<"div"> & {
  state?: "inactive" | "active" | "completed"
}) {
  return (
    <div
      data-slot="stepper-item"
      data-state={state}
      className={cn(
        "group/stepper-item flex items-center gap-3 group-data-vertical/stepper:items-start",
        className
      )}
      {...props}
    />
  )
}

function StepperIndicator({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="stepper-indicator"
      className={cn(
        "flex size-8 shrink-0 items-center justify-center rounded-none border border-border bg-background text-xs font-semibold text-muted-foreground [&_svg:not([class*='size-'])]:size-3.5",
        "group-data-[state=active]/stepper-item:border-primary group-data-[state=active]/stepper-item:text-foreground",
        "group-data-[state=completed]/stepper-item:border-primary group-data-[state=completed]/stepper-item:bg-primary group-data-[state=completed]/stepper-item:text-primary-foreground",
        className
      )}
      {...props}
    >
      <span className="group-data-[state=completed]/stepper-item:hidden">
        {children}
      </span>
      <CheckIcon className="hidden group-data-[state=completed]/stepper-item:block" />
    </div>
  )
}

function StepperContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="stepper-content"
      className={cn("flex flex-col gap-0.5", className)}
      {...props}
    />
  )
}

function StepperTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="stepper-title"
      className={cn(
        "text-xs font-semibold tracking-wider uppercase group-data-[state=inactive]/stepper-item:text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

function StepperDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="stepper-description"
      className={cn(
        "text-sm leading-normal text-muted-foreground normal-case",
        className
      )}
      {...props}
    />
  )
}

function StepperSeparator({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="stepper-separator"
      className={cn(
        // `min-w-6` in horizontal: `flex-1` means basis 0, so a squeezed row
        // shrinks the connector to nothing before the steps give up any width.
        "shrink-0 bg-border group-data-horizontal/stepper:mx-3 group-data-horizontal/stepper:h-px group-data-horizontal/stepper:min-w-6 group-data-horizontal/stepper:flex-1 group-data-vertical/stepper:my-1 group-data-vertical/stepper:ms-4 group-data-vertical/stepper:h-6 group-data-vertical/stepper:w-px",
        className
      )}
      {...props}
    />
  )
}

export {
  Stepper,
  StepperItem,
  StepperIndicator,
  StepperContent,
  StepperTitle,
  StepperDescription,
  StepperSeparator,
}
