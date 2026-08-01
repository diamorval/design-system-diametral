import { TimePicker } from "@diametral/ui/components/time-picker"
import { Field, FieldLabel } from "@diametral/ui/components/field"

export default function TimePickerSeconds() {
  return (
    <Field className="w-fit">
      <FieldLabel>Duration</FieldLabel>
      <TimePicker
        defaultValue={{ hours: 0, minutes: 5, seconds: 30 }}
        showSeconds
      />
    </Field>
  )
}
