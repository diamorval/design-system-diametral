import { DateRangePicker } from "@diametral/ui/components/date-range-picker"
import { Field, FieldLabel } from "@diametral/ui/components/field"

export default function DateRangePickerBasic() {
  return (
    <Field className="w-fit">
      <FieldLabel>Mission dates</FieldLabel>
      <DateRangePicker
        defaultValue={{
          from: new Date(2026, 6, 6),
          to: new Date(2026, 6, 17),
        }}
      />
    </Field>
  )
}
