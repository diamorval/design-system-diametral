import * as React from "react"

import { Calendar } from "@workspace/ui/components/calendar"
import {
  DatePicker,
  DatePickerContent,
  DatePickerTrigger,
} from "@workspace/ui/components/date-picker"
import { Field, FieldLabel } from "@workspace/ui/components/field"

// `DatePicker` *is* `Popover` — the component only adds a trigger that formats the
// date and a content wrapper with the padding stripped. The Calendar stays yours.
export default function DatePickerBasic() {
  const [date, setDate] = React.useState<Date | undefined>()
  const [open, setOpen] = React.useState(false)

  return (
    <Field className="max-w-sm">
      <FieldLabel>Start date</FieldLabel>
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
  )
}
