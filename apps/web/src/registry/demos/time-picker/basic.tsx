import { TimePicker } from "@diametral/ui/components/time-picker"
import { Field, FieldLabel } from "@diametral/ui/components/field"

export default function TimePickerBasic() {
  return (
    <Field className="w-fit">
      <FieldLabel>Start time</FieldLabel>
      <TimePicker defaultValue={{ hours: 9, minutes: 30 }} />
    </Field>
  )
}
