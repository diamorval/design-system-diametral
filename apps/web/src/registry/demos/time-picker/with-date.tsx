import * as React from "react"

import { Calendar } from "@diametral/ui/components/calendar"
import {
  DatePicker,
  DatePickerContent,
  DatePickerTrigger,
} from "@diametral/ui/components/date-picker"
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@diametral/ui/components/field"
import {
  TimePicker,
  type TimeValue,
} from "@diametral/ui/components/time-picker"

export default function TimePickerWithDate() {
  const [date, setDate] = React.useState<Date | undefined>(
    new Date(2026, 2, 14)
  )
  const [time, setTime] = React.useState<TimeValue>({ hours: 9, minutes: 30 })
  const [open, setOpen] = React.useState(false)

  const scheduled = React.useMemo(() => {
    if (!date) return undefined
    const next = new Date(date)
    next.setHours(time.hours, time.minutes, time.seconds ?? 0, 0)
    return next
  }, [date, time])

  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <Field>
        <FieldLabel>Publish on</FieldLabel>
        <DatePicker open={open} onOpenChange={setOpen}>
          <DatePickerTrigger value={date} />
          <DatePickerContent>
            <Calendar
              mode="single"
              selected={date}
              defaultMonth={date}
              onSelect={(value) => {
                setDate(value)
                setOpen(false)
              }}
            />
          </DatePickerContent>
        </DatePicker>
      </Field>
      <Field className="w-fit">
        <FieldLabel>At</FieldLabel>
        <TimePicker value={time} onValueChange={setTime} />
        <FieldDescription>
          {scheduled
            ? scheduled.toLocaleString("fr-FR", {
                dateStyle: "long",
                timeStyle: "short",
              })
            : "Pick a date to schedule."}
        </FieldDescription>
      </Field>
    </div>
  )
}
