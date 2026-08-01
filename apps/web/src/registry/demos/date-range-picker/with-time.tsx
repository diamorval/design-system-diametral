import { DateRangePicker } from "@diametral/ui/components/date-range-picker"
import { Field, FieldLabel } from "@diametral/ui/components/field"

// `showTime` renders a Time Picker under each end of the range, disabled
// until that end has a date — this is the chain's reason for depending on
// Time Picker rather than a plain text field.
export default function DateRangePickerWithTime() {
  return (
    <Field className="w-fit">
      <FieldLabel>Booking window</FieldLabel>
      <DateRangePicker
        defaultValue={{
          from: new Date(2026, 6, 6, 9, 0),
          to: new Date(2026, 6, 6, 17, 30),
        }}
        showTime
        numberOfMonths={1}
      />
    </Field>
  )
}
