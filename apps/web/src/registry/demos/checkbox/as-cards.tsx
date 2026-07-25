import { Checkbox } from "@workspace/ui/components/checkbox"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from "@workspace/ui/components/field"

const PLANS = [
  {
    id: "audit",
    title: "Technical audit",
    description: "Two weeks, one report, no code.",
  },
  {
    id: "system",
    title: "Design system",
    description: "Tokens, components and documentation.",
  },
]

// A `FieldLabel` that *contains* a `Field` becomes the card: it grows to full
// width, gains a border, and tints itself on `has-data-checked`.
export default function CheckboxAsCards() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      {PLANS.map((plan) => (
        <FieldLabel key={plan.id} htmlFor={`checkbox-card-${plan.id}`}>
          <Field orientation="horizontal">
            <Checkbox id={`checkbox-card-${plan.id}`} />
            <FieldContent>
              <FieldTitle>{plan.title}</FieldTitle>
              <FieldDescription>{plan.description}</FieldDescription>
            </FieldContent>
          </Field>
        </FieldLabel>
      ))}
    </div>
  )
}
