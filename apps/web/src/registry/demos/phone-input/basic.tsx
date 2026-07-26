import { PhoneInput } from "@diametral/ui/components/phone-input"
import { Field, FieldLabel } from "@diametral/ui/components/field"

// The value is one string (`+33612345678`) — the dial code and national
// number are split from it for editing, then rejoined on every change.
export default function PhoneInputBasic() {
  return (
    <Field className="max-w-sm">
      <FieldLabel>Phone</FieldLabel>
      <PhoneInput defaultValue="+33612345678" />
    </Field>
  )
}
