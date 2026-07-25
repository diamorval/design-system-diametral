import * as React from "react"

import { Button } from "@workspace/ui/components/button"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@workspace/ui/components/field"
import { Form } from "@workspace/ui/components/form"
import { Input } from "@workspace/ui/components/input"

type Errors = { email?: string; siret?: string }

// Base UI's `errors` prop keys off `Field.Root`'s `name` — but this system's
// `Field` is a plain div, so wire errors yourself: hold them in state, pass them
// to `FieldError`, and set `aria-invalid` on the control.
export default function FormValidation() {
  const [errors, setErrors] = React.useState<Errors>({})

  return (
    <Form
      className="max-w-sm"
      onFormSubmit={(values) => {
        const email = String(values.email ?? "")
        const siret = String(values.siret ?? "")
        setErrors({
          email: email.includes("@")
            ? undefined
            : "Enter a valid email address.",
          siret: /^\d{14}$/.test(siret) ? undefined : "A SIRET is 14 digits.",
        })
      }}
    >
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="form-v-email">Email</FieldLabel>
          <Input
            id="form-v-email"
            name="email"
            defaultValue="camille"
            aria-invalid={errors.email ? true : undefined}
          />
          <FieldError errors={[{ message: errors.email }]} />
        </Field>

        <Field>
          <FieldLabel htmlFor="form-v-siret">SIRET</FieldLabel>
          <Input
            id="form-v-siret"
            name="siret"
            defaultValue="123"
            aria-invalid={errors.siret ? true : undefined}
          />
          <FieldError errors={[{ message: errors.siret }]} />
        </Field>
      </FieldGroup>

      <Button type="submit" className="self-start">
        Validate
      </Button>
    </Form>
  )
}
