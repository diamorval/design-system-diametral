import type { ComponentProps } from "react"

import { Button } from "@workspace/ui/components/button"
import { Field, FieldGroup, FieldLabel } from "@workspace/ui/components/field"
import { Form } from "@workspace/ui/components/form"
import { Input } from "@workspace/ui/components/input"

export default function FormPlayground(props: ComponentProps<typeof Form>) {
  return (
    <Form className="w-full max-w-sm" {...props}>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="pg-form-email">Email</FieldLabel>
          <Input
            id="pg-form-email"
            name="email"
            type="email"
            required
            placeholder="you@diametral.com"
          />
        </Field>
      </FieldGroup>
      <Button type="submit" className="self-start">
        Send
      </Button>
    </Form>
  )
}
