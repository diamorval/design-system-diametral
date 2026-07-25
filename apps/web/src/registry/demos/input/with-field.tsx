import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@workspace/ui/components/field"
import { Input } from "@workspace/ui/components/input"

export default function InputWithField() {
  return (
    <div className="w-full max-w-sm">
      <Field>
        <FieldLabel htmlFor="input-with-field-email">Email</FieldLabel>
        <Input
          id="input-with-field-email"
          type="email"
          placeholder="you@diametral.com"
        />
        <FieldDescription>We never share it.</FieldDescription>
      </Field>
    </div>
  )
}
