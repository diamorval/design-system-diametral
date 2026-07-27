"use client"

import { format } from "date-fns"
import { CalendarBlankIcon } from "@phosphor-icons/react"

import { cn } from "../lib/utils.js"
import { useControllableValue } from "../hooks/use-controllable-value.js"
import { Button } from "./button.js"
import { Calendar } from "./calendar.js"
import { Popover, PopoverContent, PopoverTrigger } from "./popover.js"
import { TimePicker, type TimeValue } from "./time-picker.js"

// Structurally identical to react-day-picker's `DateRange` — declared locally
// since Calendar's own range mode is a passthrough, not a type this package owns.
type DateRange = { from: Date | undefined; to?: Date | undefined }

// Unlike DatePicker (Popover only, Calendar left to the caller), this owns its
// own range state — the `showTime` pair of Time Pickers is why it needs to.
function DateRangePicker({
  className,
  value,
  defaultValue,
  onValueChange,
  placeholder = "Pick a date range",
  dateFormat = "PP",
  showTime = false,
  numberOfMonths = 2,
}: {
  value?: DateRange
  defaultValue?: DateRange
  onValueChange?: (value: DateRange) => void
  placeholder?: string
  dateFormat?: string
  showTime?: boolean
  numberOfMonths?: number
  className?: string
}) {
  const [range, setRange] = useControllableValue<DateRange>({
    value,
    defaultValue: defaultValue ?? { from: undefined, to: undefined },
    onChange: onValueChange,
  })

  const label = range.from
    ? range.to
      ? `${format(range.from, dateFormat)} – ${format(range.to, dateFormat)}`
      : format(range.from, dateFormat)
    : undefined

  const setTime = (part: "from" | "to") => (time: TimeValue) => {
    const current = range[part]
    if (!current) return
    const next = new Date(current)
    next.setHours(time.hours, time.minutes, time.seconds ?? 0)
    setRange({ ...range, [part]: next })
  }

  return (
    <Popover>
      <PopoverTrigger
        data-slot="date-range-picker-trigger"
        render={<Button variant="outline" />}
        className={cn(
          "w-72 justify-between font-normal tracking-normal normal-case",
          className
        )}
      >
        <span className={cn(!label && "text-muted-foreground")}>
          {label ?? placeholder}
        </span>
        <CalendarBlankIcon
          data-icon="inline-end"
          className="pointer-events-none text-muted-foreground"
        />
      </PopoverTrigger>
      <PopoverContent
        data-slot="date-range-picker-content"
        align="start"
        className="w-auto gap-3 p-0"
      >
        <Calendar
          mode="range"
          numberOfMonths={numberOfMonths}
          selected={range}
          onSelect={(next) =>
            setRange(next ?? { from: undefined, to: undefined })
          }
        />
        {showTime && (
          <div
            data-slot="date-range-picker-times"
            className="flex items-center justify-between gap-3 border-t border-border px-3 pb-3"
          >
            <TimePicker
              aria-label="Start time"
              value={{
                hours: range.from?.getHours() ?? 0,
                minutes: range.from?.getMinutes() ?? 0,
              }}
              onValueChange={setTime("from")}
              disabled={!range.from}
            />
            <span aria-hidden="true" className="text-muted-foreground">
              –
            </span>
            <TimePicker
              aria-label="End time"
              value={{
                hours: range.to?.getHours() ?? 0,
                minutes: range.to?.getMinutes() ?? 0,
              }}
              onValueChange={setTime("to")}
              disabled={!range.to}
            />
          </div>
        )}
      </PopoverContent>
    </Popover>
  )
}

export { DateRangePicker }
export type { DateRange }
