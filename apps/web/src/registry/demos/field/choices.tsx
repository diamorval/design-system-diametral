import { Checkbox } from "@workspace/ui/components/checkbox"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@workspace/ui/components/field"
import { Switch } from "@workspace/ui/components/switch"

export default function FieldChoices() {
  return (
    <div className="w-full max-w-sm">
      <FieldGroup>
        <Field orientation="horizontal">
          <Checkbox id="field-choices-terms" defaultChecked />
          <FieldLabel htmlFor="field-choices-terms">
            Accept the charter
          </FieldLabel>
        </Field>
        <Field orientation="horizontal">
          <Switch id="field-choices-notify" />
          <div className="flex flex-col gap-1">
            <FieldLabel htmlFor="field-choices-notify">
              Email notifications
            </FieldLabel>
            <FieldDescription>Sent once per deploy.</FieldDescription>
          </div>
        </Field>
      </FieldGroup>
    </div>
  )
}
