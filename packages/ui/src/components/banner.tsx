import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../lib/utils.js"

// Tone axis over the shared six-tone family in globals.css — the same
// --ds-<tone>-bg / --ds-<tone>-ink pair button.tsx's `tone` variant reads,
// so a new tone never needs a bespoke colour here.
const bannerVariants = cva(
  "group/banner flex w-full items-start gap-3 rounded-none bg-[var(--tone-bg)] px-4 py-3 text-sm text-[var(--tone-ink)] *:[svg]:mt-0.5 *:[svg]:shrink-0 *:[svg:not([class*='size-'])]:size-4",
  {
    variants: {
      tone: {
        neutral:
          "[--tone-bg:var(--ds-neutral-bg)] [--tone-ink:var(--ds-neutral-ink)]",
        info: "[--tone-bg:var(--ds-info-bg)] [--tone-ink:var(--ds-info-ink)]",
        success:
          "[--tone-bg:var(--ds-success-bg)] [--tone-ink:var(--ds-success-ink)]",
        warning:
          "[--tone-bg:var(--ds-warning-bg)] [--tone-ink:var(--ds-warning-ink)]",
        danger:
          "[--tone-bg:var(--ds-danger-bg)] [--tone-ink:var(--ds-danger-ink)]",
        critical:
          "[--tone-bg:var(--ds-critical-bg)] [--tone-ink:var(--ds-critical-ink)]",
      },
    },
    defaultVariants: {
      tone: "neutral",
    },
  }
)

function Banner({
  className,
  tone = "neutral",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof bannerVariants>) {
  return (
    <div
      data-slot="banner"
      role="status"
      className={cn(bannerVariants({ tone }), className)}
      {...props}
    />
  )
}

function BannerContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="banner-content"
      className={cn("flex flex-1 flex-col gap-0.5", className)}
      {...props}
    />
  )
}

function BannerTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="banner-title"
      className={cn("font-medium", className)}
      {...props}
    />
  )
}

function BannerDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="banner-description"
      className={cn("opacity-90", className)}
      {...props}
    />
  )
}

function BannerAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="banner-action"
      className={cn("flex shrink-0 items-center gap-2", className)}
      {...props}
    />
  )
}

export {
  Banner,
  BannerContent,
  BannerTitle,
  BannerDescription,
  BannerAction,
  bannerVariants,
}
