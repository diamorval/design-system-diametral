"use client"

import { Meter as MeterPrimitive } from "@base-ui/react/meter"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../lib/utils.js"

// Tone rides on the root as --tone so the internally-rendered indicator can
// read it — the caller never gets a handle on MeterIndicator when using the
// composed <Meter>. Left unset by default so the bar stays --primary; the
// six keys are the shared family from globals.css, the same one
// status/tag/banner read.
const meterVariants = cva("flex flex-wrap gap-3", {
  variants: {
    tone: {
      neutral: "[--tone:var(--ds-neutral-ink)]",
      success: "[--tone:var(--ds-success-ink)]",
      warning: "[--tone:var(--ds-warning-ink)]",
      danger: "[--tone:var(--ds-danger-ink)]",
      critical: "[--tone:var(--ds-critical-ink)]",
      info: "[--tone:var(--ds-info-ink)]",
    },
  },
})

function Meter({
  className,
  children,
  tone,
  ...props
}: MeterPrimitive.Root.Props & VariantProps<typeof meterVariants>) {
  return (
    <MeterPrimitive.Root
      data-slot="meter"
      className={cn(meterVariants({ tone }), className)}
      {...props}
    >
      {children}
      <MeterTrack>
        <MeterIndicator />
      </MeterTrack>
    </MeterPrimitive.Root>
  )
}

function MeterTrack({ className, ...props }: MeterPrimitive.Track.Props) {
  return (
    <MeterPrimitive.Track
      data-slot="meter-track"
      className={cn(
        "relative flex h-0.5 w-full items-center overflow-x-hidden rounded-none bg-muted",
        className
      )}
      {...props}
    />
  )
}

function MeterIndicator({
  className,
  ...props
}: MeterPrimitive.Indicator.Props) {
  return (
    <MeterPrimitive.Indicator
      data-slot="meter-indicator"
      className={cn(
        "h-full bg-[var(--tone,var(--primary))] transition-all",
        className
      )}
      {...props}
    />
  )
}

function MeterLabel({ className, ...props }: MeterPrimitive.Label.Props) {
  return (
    <MeterPrimitive.Label
      data-slot="meter-label"
      className={cn("text-xs font-semibold tracking-wide uppercase", className)}
      {...props}
    />
  )
}

function MeterValue({ className, ...props }: MeterPrimitive.Value.Props) {
  return (
    <MeterPrimitive.Value
      data-slot="meter-value"
      className={cn(
        "ms-auto text-sm text-muted-foreground tabular-nums",
        className
      )}
      {...props}
    />
  )
}

export {
  Meter,
  MeterTrack,
  MeterIndicator,
  MeterLabel,
  MeterValue,
  meterVariants,
}
