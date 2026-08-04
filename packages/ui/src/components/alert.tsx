import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { XIcon } from "@phosphor-icons/react"

import { cn } from "../lib/utils.js"
import { IconButton } from "./icon-button.js"

const alertVariants = cva(
  "group/alert relative grid w-full gap-1 border bg-background px-4 py-3 text-start text-sm after:absolute after:-inset-y-px after:-start-px after:w-0.5 has-data-[slot=alert-action]:relative has-data-[slot=alert-action]:pe-18 has-[>svg]:grid-cols-[auto_1fr] has-[>svg]:gap-x-2.5 *:[svg]:row-span-2 *:[svg]:translate-y-0.5 *:[svg]:text-current *:[svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground after:bg-foreground",
        destructive:
          "bg-card text-destructive after:bg-destructive *:data-[slot=alert-description]:text-destructive/90 *:[svg]:text-current",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Alert({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  )
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        "text-sm font-semibold group-has-[>svg]/alert:col-start-2 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground",
        className
      )}
      {...props}
    />
  )
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "text-sm text-balance text-muted-foreground md:text-pretty [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4",
        className
      )}
      {...props}
    />
  )
}

function AlertAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-action"
      className={cn("absolute end-3 top-2.5", className)}
      {...props}
    />
  )
}

// The close affordance v2 was missing. Deliberately stateless: Alert does not
// hide itself, because a dismissed alert usually has to stay dismissed, and
// only the caller knows where that fact lives. Pass `onClick`.
function AlertDismiss({
  className,
  label = "Dismiss",
  ...props
}: Omit<React.ComponentProps<typeof IconButton>, "label" | "children"> & {
  label?: string
}) {
  return (
    <IconButton
      data-slot="alert-dismiss"
      label={label}
      variant="ghost"
      size="icon-xs"
      className={cn("absolute end-3 top-2.5", className)}
      {...props}
    >
      <XIcon />
    </IconButton>
  )
}

export { Alert, AlertTitle, AlertDescription, AlertAction, AlertDismiss }
