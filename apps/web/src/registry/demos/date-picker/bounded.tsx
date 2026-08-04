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

const ORDERED = new Date(2026, 6, 6)
const LATEST = new Date(2026, 8, 30)

export default function DatePickerBounded() {
  const [date, setDate] = React.useState<Date | undefined>()
  const [open, setOpen] = React.useState(false)

  return (
    <Field className="max-w-sm">
      <FieldLabel>Delivery date</FieldLabel>
      <DatePicker open={open} onOpenChange={setOpen}>
        <DatePickerTrigger
          value={date}
          dateFormat="PPPP"
          placeholder="Choose a delivery date"
          className="w-72"
        />
        <DatePickerContent>
          <Calendar
            mode="single"
            selected={date}
            defaultMonth={ORDERED}
            startMonth={ORDERED}
            endMonth={LATEST}
            disabled={[{ before: ORDERED }, { after: LATEST }]}
            onSelect={(value) => {
              setDate(value)
              setOpen(false)
            }}
          />
        </DatePickerContent>
      </DatePicker>
      <FieldDescription>Between 6 July and 30 September 2026.</FieldDescription>
    </Field>
  )
}
