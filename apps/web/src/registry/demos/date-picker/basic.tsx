import * as React from "react"

import { Calendar } from "@diametral/ui/components/calendar"
import {
  DatePicker,
  DatePickerContent,
  DatePickerTrigger,
} from "@diametral/ui/components/date-picker"
import { Field, FieldLabel } from "@diametral/ui/components/field"

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
