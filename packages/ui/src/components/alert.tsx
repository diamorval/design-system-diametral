import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { XIcon } from "@phosphor-icons/react"

import { cn } from "../lib/utils.js"
import { IconButton } from "./icon-button.js"

// The accent rail reads one variable, --tone-ink, rather than each axis
// setting `after:bg-*` itself: two utilities of the same specificity would
// otherwise resolve by stylesheet order, not by the order they appear in the
// class string, so `variant` and `tone` would fight non-deterministically.
const alertVariants = cva(
  "group/alert relative grid w-full gap-1 border bg-background px-4 py-3 text-start text-sm after:absolute after:-inset-y-px after:-start-px after:w-0.5 after:bg-[var(--tone-ink,var(--foreground))] has-data-[slot=alert-action]:relative has-data-[slot=alert-action]:pe-18 has-[>svg]:grid-cols-[auto_1fr] has-[>svg]:gap-x-2.5 *:data-[slot=alert-title]:text-[var(--tone-ink,inherit)] *:[svg]:row-span-2 *:[svg]:translate-y-0.5 *:[svg]:text-current *:[svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground",
        destructive:
          "bg-card text-destructive [--tone-ink:var(--destructive)] *:data-[slot=alert-description]:text-destructive/90 *:[svg]:text-current",
      },
      /* Semantic axis, over the shared --ds-<tone>-ink family. Unlike Banner,
         which tints the whole block, Alert keeps its card surface and spends
         the tone on the rail and the title only — the description stays muted,
         so the two components read as different objects rather than duplicates. */
      tone: {
        neutral: "[--tone-ink:var(--ds-neutral-ink)]",
        info: "[--tone-ink:var(--ds-info-ink)]",
        success: "[--tone-ink:var(--ds-success-ink)]",
        warning: "[--tone-ink:var(--ds-warning-ink)]",
        danger: "[--tone-ink:var(--ds-danger-ink)]",
        critical: "[--tone-ink:var(--ds-critical-ink)]",
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
  tone,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant, tone }), className)}
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

export {
  Alert,
  AlertTitle,
  AlertDescription,
  AlertAction,
  AlertDismiss,
  alertVariants,
}
