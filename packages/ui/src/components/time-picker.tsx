"use client"

import { cn } from "../lib/utils.js"
import { useControllableValue } from "../hooks/use-controllable-value.js"
import { NumberField, NumberFieldInput } from "./number-field.js"

type TimeValue = {
  hours: number
  minutes: number
  seconds?: number
}

const DEFAULT_VALUE: TimeValue = { hours: 0, minutes: 0 }

// Segmented hour/minute/second fields on top of NumberField, so clamping,
// zero-padding and arrow-key stepping all come from Base UI rather than being
// hand-rolled — no visible increment/decrement buttons, just the input.
function TimePicker({
  className,
  value,
  defaultValue = DEFAULT_VALUE,
  onValueChange,
  showSeconds = false,
  disabled = false,
  ...props
}: Omit<React.ComponentProps<"div">, "onChange" | "defaultValue"> & {
  value?: TimeValue
  defaultValue?: TimeValue
  onValueChange?: (value: TimeValue) => void
  showSeconds?: boolean
  disabled?: boolean
}) {
  const [time, setTime] = useControllableValue<TimeValue>({
    value,
    defaultValue,
    onChange: onValueChange,
  })

  const setPart = (part: keyof TimeValue) => (next: number | null) => {
    setTime({ ...time, [part]: next ?? 0 })
  }

  return (
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
        <NumberFieldInput aria-label="Hours" className="w-8 px-0 text-center" />
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
    </div>
  )
}

export { TimePicker }
export type { TimeValue }
