import { TimePicker } from "@diametral/ui/components/time-picker"
import { Field, FieldLabel } from "@diametral/ui/components/field"

// Each segment is a NumberField with no visible increment/decrement buttons —
// arrow keys still step it, and typing digits clamps and zero-pads.
export default function TimePickerBasic() {
  return (
    <Field className="w-fit">
      <FieldLabel>Start time</FieldLabel>
      <TimePicker defaultValue={{ hours: 9, minutes: 30 }} />
    </Field>
  )
}
