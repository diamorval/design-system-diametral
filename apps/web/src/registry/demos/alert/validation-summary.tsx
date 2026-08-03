import { WarningCircleIcon } from "@phosphor-icons/react"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@diametral/ui/components/alert"
import { Button } from "@diametral/ui/components/button"
import { Field, FieldLabel } from "@diametral/ui/components/field"
import { Input } from "@diametral/ui/components/input"

export default function AlertValidationSummary() {
  return (
    <form
      className="flex w-full max-w-md flex-col gap-4"
      onSubmit={(event) => event.preventDefault()}
    >
      <Alert variant="destructive">
        <WarningCircleIcon />
        <AlertTitle>This invoice was not saved</AlertTitle>
        <AlertDescription>
          Two fields need attention: the reference is already in use, and the
          due date falls before the issue date.
        </AlertDescription>
      </Alert>
      <Field>
        <FieldLabel htmlFor="alert-summary-reference">Reference</FieldLabel>
        <Input
          id="alert-summary-reference"
          defaultValue="INV-014"
          aria-invalid
        />
      </Field>
      <Field>
        <FieldLabel htmlFor="alert-summary-due">Due date</FieldLabel>
        <Input
          id="alert-summary-due"
          type="date"
          defaultValue="2026-06-30"
          aria-invalid
        />
      </Field>
      <Button type="submit" size="sm" className="self-start">
        Save invoice
      </Button>
    </form>
  )
}
