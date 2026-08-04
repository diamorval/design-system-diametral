import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@diametral/ui/components/field"
import { Input } from "@diametral/ui/components/input"
import { Wizard } from "@diametral/ui/components/wizard"

const STEPS = [
  {
    label: "Workspace",
    content: (
      <Field>
        <FieldLabel htmlFor="wizard-basic-name">Workspace name</FieldLabel>
        <Input id="wizard-basic-name" defaultValue="Atelier Perrin" />
        <FieldDescription>Visible to everyone you invite.</FieldDescription>
      </Field>
    ),
  },
  {
    label: "Members",
    content: (
      <Field>
        <FieldLabel htmlFor="wizard-basic-invite">Invite by email</FieldLabel>
        <Input id="wizard-basic-invite" placeholder="camille@perrin.fr" />
      </Field>
    ),
  },
  {
    label: "Review",
    content: (
      <p className="text-sm text-muted-foreground">
        Atelier Perrin, one invitation pending. Nothing is created until you
        finish.
      </p>
    ),
  },
]

export default function WizardBasic() {
  return <Wizard steps={STEPS} className="max-w-lg" />
}
