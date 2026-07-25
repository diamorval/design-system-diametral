import type { ComponentProps } from "react"

import { Checkbox } from "@diametral/ui/components/checkbox"
import { Field, FieldLabel } from "@diametral/ui/components/field"

export default function FieldPlayground({
  children,
  ...props
}: ComponentProps<typeof Field>) {
  return (
    <Field className="w-full max-w-sm" {...props}>
      <Checkbox id="field-playground" defaultChecked />
      <FieldLabel htmlFor="field-playground">{children}</FieldLabel>
    </Field>
  )
}
