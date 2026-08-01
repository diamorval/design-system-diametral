"use client"

import * as React from "react"
import { ClockIcon } from "@phosphor-icons/react"

import { cn } from "../lib/utils.js"
import { useControllableValue } from "../hooks/use-controllable-value.js"
import { NumberField, NumberFieldInput } from "./number-field.js"
import { Popover, PopoverContent, PopoverTrigger } from "./popover.js"

type TimeValue = {
  hours: number
  minutes: number
  seconds?: number
}

const DEFAULT_VALUE: TimeValue = { hours: 0, minutes: 0 }

const pad = (value: number) => String(value).padStart(2, "0")

const FACE = 208
const OUTER_RING = 82
const INNER_RING = 50

// Twelve positions round the face, 0 at the top — the dial is 24-hour like the
// segments, so hours 12–23 sit on an inner ring rather than sharing a mark.
function polar(index: number, radius: number) {
  const angle = (index / 12) * 2 * Math.PI - Math.PI / 2
  return {
    left: FACE / 2 + radius * Math.cos(angle),
    top: FACE / 2 + radius * Math.sin(angle),
  }
}

const EASE = "cubic-bezier(0.22,1,0.36,1)"

// The 24-hour ring is the secondary read: smaller and muted so 0–11 still
// scans as a clock face rather than 24 numbers competing at one weight.
const markClassName =
  "absolute flex -translate-x-1/2 -translate-y-1/2 items-center justify-center tabular-nums outline-none transition-colors duration-150 hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring/30 aria-pressed:bg-foreground aria-pressed:text-background"
const outerMarkClassName = "size-7 text-xs"
const innerMarkClassName = "size-6 text-[0.6875rem] text-muted-foreground"

// The hand sweeps, so it needs a continuous angle rather than a modular one:
// 55 → 00 minutes has to travel 30° forward, not 330° back. The accumulation
// lives in state and advances in an effect so render stays pure — the CSS
// transition already runs a frame late, so folding the target in post-commit is
// invisible.
function useSweptAngle(target: number) {
  const [angle, setAngle] = React.useState(target)
  React.useEffect(() => {
    setAngle((prev) => prev + ((((target - prev) % 360) + 540) % 360) - 180)
  }, [target])
  return angle
}

function TimeDial({
  value,
  onValueChange,
  onDone,
}: {
  value: TimeValue
  onValueChange: (value: TimeValue) => void
  onDone: () => void
}) {
  const [mode, setMode] = React.useState<"hours" | "minutes">("hours")
  const isHours = mode === "hours"

  // ponytail: minutes land on the 5s from the dial; the segments above take
  // the exact value when one is needed.
  const marks = isHours
    ? Array.from({ length: 24 }, (_, hour) => hour)
    : Array.from({ length: 12 }, (_, index) => index * 5)

  const handAngle = useSweptAngle(
    isHours ? (value.hours % 12) * 30 : (value.minutes / 60) * 360
  )
  // Retracting to the inner ring is a scale of one fixed-length hand, so the
  // sweep and the retraction ride the same transform transition.
  const handScale = isHours && value.hours >= 12 ? INNER_RING / OUTER_RING : 1

  const select = (mark: number) => {
    if (isHours) {
      onValueChange({ ...value, hours: mark })
      setMode("minutes")
      return
    }
    onValueChange({ ...value, minutes: mark })
    // Let the hand reach the mark before the popover leaves — closing on the
    // same frame hides the only confirmation the click has.
    window.setTimeout(onDone, 220)
  }

  return (
    <div data-slot="time-picker-dial" className="flex flex-col items-center">
      <div className="flex items-baseline text-2xl tabular-nums">
        <button
          type="button"
          aria-pressed={isHours}
          onClick={() => setMode("hours")}
          className="px-1 transition-colors outline-none not-aria-pressed:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring/30 aria-pressed:text-foreground"
        >
          {pad(value.hours)}
        </button>
        <span aria-hidden="true" className="text-muted-foreground">
          :
        </span>
        <button
          type="button"
          aria-pressed={!isHours}
          onClick={() => setMode("minutes")}
          className="px-1 transition-colors outline-none not-aria-pressed:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring/30 aria-pressed:text-foreground"
        >
          {pad(value.minutes)}
        </button>
      </div>
      <div
        role="group"
        aria-label={isHours ? "Hours" : "Minutes"}
        className="relative mt-3 rounded-full border border-border"
        style={{ width: FACE, height: FACE }}
      >
        <span
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground"
        />
        <span
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 w-px bg-foreground transition-transform duration-300 motion-reduce:transition-none"
          style={{
            height: OUTER_RING,
            transformOrigin: "top center",
            transitionTimingFunction: EASE,
            transform: `translateX(-50%) rotate(${handAngle + 180}deg) scaleY(${handScale})`,
          }}
        />
        {/* Keyed on mode so the two mark sets cross-fade instead of swapping
            values under the pointer. */}
        <div
          key={mode}
          className="absolute inset-0 animate-in duration-200 fade-in-0 zoom-in-95 motion-reduce:animate-none"
          style={{ animationTimingFunction: EASE }}
        >
          {marks.map((mark) => {
            const inner = isHours && mark >= 12
            const index = isHours ? mark % 12 : mark / 5
            return (
              <button
                key={mark}
                type="button"
                aria-pressed={mark === (isHours ? value.hours : value.minutes)}
                onClick={() => select(mark)}
                className={cn(
                  markClassName,
                  inner ? innerMarkClassName : outerMarkClassName
                )}
                style={polar(index, inner ? INNER_RING : OUTER_RING)}
              >
                {pad(mark)}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

const COLUMN_HEIGHT = 224
const ITEM_HEIGHT = 32

function TimeColumn({
  label,
  count,
  value,
  onSelect,
}: {
  label: string
  count: number
  value: number
  onSelect: (mark: number) => void
}) {
  const viewport = React.useRef<HTMLDivElement>(null)
  const settled = React.useRef(false)

  // The column opens already parked on its value; only later changes are worth
  // a scroll animation, and only when the user hasn't asked for less motion.
  React.useLayoutEffect(() => {
    const node = viewport.current
    if (!node) return
    const top = value * ITEM_HEIGHT
    if (settled.current) {
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches
      node.scrollTo({ top, behavior: reduced ? "instant" : "smooth" })
      return
    }
    settled.current = true
    // The popover only gets its box once Base UI has positioned it; a scroll
    // issued before that frame lands on a zero-height element and is dropped.
    const frame = requestAnimationFrame(() =>
      node.scrollTo({ top, behavior: "instant" })
    )
    return () => cancelAnimationFrame(frame)
  }, [value])

  return (
    <div
      ref={viewport}
      role="group"
      aria-label={label}
      className="no-scrollbar flex w-13 snap-y snap-mandatory flex-col overflow-y-auto overscroll-contain"
      style={{
        height: COLUMN_HEIGHT,
        paddingBlock: (COLUMN_HEIGHT - ITEM_HEIGHT) / 2,
      }}
    >
      {Array.from({ length: count }, (_, mark) => (
        <button
          key={mark}
          type="button"
          aria-pressed={value === mark}
          onClick={() => onSelect(mark)}
          className="h-8 shrink-0 snap-center text-xs tabular-nums transition-colors duration-150 outline-none hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring/30 aria-pressed:bg-foreground aria-pressed:text-background"
        >
          {pad(mark)}
        </button>
      ))}
    </div>
  )
}

function TimeList({
  value,
  onValueChange,
  showSeconds,
}: {
  value: TimeValue
  onValueChange: (value: TimeValue) => void
  showSeconds: boolean
}) {
  const columns = [
    { part: "hours", label: "Hours", count: 24 },
    { part: "minutes", label: "Minutes", count: 60 },
    ...(showSeconds
      ? [{ part: "seconds", label: "Seconds", count: 60 } as const]
      : []),
  ] as const

  return (
    <div data-slot="time-picker-list" className="flex gap-1">
      {columns.map((column) => (
        <TimeColumn
          key={column.part}
          label={column.label}
          count={column.count}
          value={value[column.part] ?? 0}
          onSelect={(mark) => onValueChange({ ...value, [column.part]: mark })}
        />
      ))}
    </div>
  )
}

// Segmented hour/minute/second fields on top of NumberField, so clamping,
// zero-padding and arrow-key stepping all come from Base UI rather than being
// hand-rolled — no visible increment/decrement buttons, just the input. The
// clock button beside them opens the same value as a dial or a scrolling list.
function TimePicker({
  className,
  value,
  defaultValue = DEFAULT_VALUE,
  onValueChange,
  showSeconds = false,
  picker = "dial",
  disabled = false,
  ...props
}: Omit<React.ComponentProps<"div">, "onChange" | "defaultValue"> & {
  value?: TimeValue
  defaultValue?: TimeValue
  onValueChange?: (value: TimeValue) => void
  showSeconds?: boolean
  picker?: "dial" | "list" | "none"
  disabled?: boolean
}) {
  const [time, setTime] = useControllableValue<TimeValue>({
    value,
    defaultValue,
    onChange: onValueChange,
  })
  const [open, setOpen] = React.useState(false)
  const surface = React.useRef<HTMLDivElement>(null)

  const setPart = (part: keyof TimeValue) => (next: number | null) => {
    setTime({ ...time, [part]: next ?? 0 })
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <div
        data-slot="time-picker"
        data-disabled={disabled || undefined}
        className={cn(
          "flex h-10 w-fit items-center gap-0.5 border border-transparent border-b-input bg-transparent px-2 tabular-nums transition-[color,border-color] focus-within:border-b-ring data-disabled:pointer-events-none data-disabled:opacity-50",
          className
        )}
        {...props}
      >
        <NumberField
          min={0}
          max={23}
          format={{ minimumIntegerDigits: 2 }}
          value={time.hours}
          onValueChange={setPart("hours")}
          disabled={disabled}
          className="w-auto"
        >
          <NumberFieldInput
            aria-label="Hours"
            className="w-8 px-0 text-center"
          />
        </NumberField>
        <span aria-hidden="true" className="text-muted-foreground">
          :
        </span>
        <NumberField
          min={0}
          max={59}
          format={{ minimumIntegerDigits: 2 }}
          value={time.minutes}
          onValueChange={setPart("minutes")}
          disabled={disabled}
          className="w-auto"
        >
          <NumberFieldInput
            aria-label="Minutes"
            className="w-8 px-0 text-center"
          />
        </NumberField>
        {showSeconds && (
          <>
            <span aria-hidden="true" className="text-muted-foreground">
              :
            </span>
            <NumberField
              min={0}
              max={59}
              format={{ minimumIntegerDigits: 2 }}
              value={time.seconds ?? 0}
              onValueChange={setPart("seconds")}
              disabled={disabled}
              className="w-auto"
            >
              <NumberFieldInput
                aria-label="Seconds"
                className="w-8 px-0 text-center"
              />
            </NumberField>
          </>
        )}
        {picker !== "none" && (
          <PopoverTrigger
            data-slot="time-picker-trigger"
            aria-label="Choose a time"
            disabled={disabled}
            className="ms-1 flex size-7 items-center justify-center text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/30 aria-expanded:text-foreground"
          >
            <ClockIcon className="size-4" />
          </PopoverTrigger>
        )}
      </div>
      <PopoverContent
        data-slot="time-picker-content"
        align="start"
        className="w-auto p-3"
        initialFocus={surface}
      >
        {/* Base UI otherwise opens on the first mark, and focusing a mark
            scrolls its column back to the top. */}
        <div ref={surface} tabIndex={-1} className="outline-none">
          {picker === "list" ? (
            <TimeList
              value={time}
              onValueChange={setTime}
              showSeconds={showSeconds}
            />
          ) : (
            <TimeDial
              value={time}
              onValueChange={setTime}
              onDone={() => setOpen(false)}
            />
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}

export { TimePicker }
export type { TimeValue }
