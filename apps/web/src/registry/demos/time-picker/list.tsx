import { Field, FieldLabel } from "@diametral/ui/components/field"
import { TimePicker } from "@diametral/ui/components/time-picker"

export default function TimePickerList() {
  return (
    <Field className="w-fit">
      <FieldLabel>Cut-off</FieldLabel>
      <TimePicker
        picker="list"
        defaultValue={{ hours: 17, minutes: 0, seconds: 0 }}
        showSeconds
      />
    </Field>
  )
}
