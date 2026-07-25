import * as React from "react"

import { Button } from "@diametral/ui/components/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@diametral/ui/components/field"
import { Form } from "@diametral/ui/components/form"
import { Input } from "@diametral/ui/components/input"
import { Textarea } from "@diametral/ui/components/textarea"

// `Form` is the layout and submit wrapper: a flex column with a generous gap, plus
// Base UI's `onFormSubmit`, which collects the values and calls preventDefault.
export default function FormBasic() {
  const [submitted, setSubmitted] = React.useState<string>()

  return (
    <Form
      className="max-w-sm"
      onFormSubmit={(values) => setSubmitted(JSON.stringify(values))}
    >
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="form-name">Name</FieldLabel>
          <Input id="form-name" name="name" defaultValue="Camille Roux" />
        </Field>

        <Field>
          <FieldLabel htmlFor="form-brief">Brief</FieldLabel>
          <Textarea id="form-brief" name="brief" rows={3} />
          <FieldDescription>
            Submitting logs the collected values below.
          </FieldDescription>
        </Field>
      </FieldGroup>

      <Button type="submit" className="self-start">
        Send
      </Button>

      {submitted && (
        <output className="font-mono text-xs break-all text-muted-foreground">
          {submitted}
        </output>
      )}
    </Form>
  )
}
