import * as React from "react"

import { PhoneInput } from "@diametral/ui/components/phone-input"
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@diametral/ui/components/field"

// `defaultCountry` seeds the dial code before any digits are typed — useful
// when the field starts empty rather than pre-filled.
export default function PhoneInputWithField() {
  const [value, setValue] = React.useState("")

  return (
    <Field className="max-w-sm">
      <FieldLabel>Mobile</FieldLabel>
      <PhoneInput value={value} onValueChange={setValue} defaultCountry="BE" />
      <FieldDescription>{value || "No number yet."}</FieldDescription>
    </Field>
  )
}
