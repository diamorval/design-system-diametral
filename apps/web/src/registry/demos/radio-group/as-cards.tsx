import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from "@diametral/ui/components/field"
import {
  RadioGroup,
  RadioGroupItem,
} from "@diametral/ui/components/radio-group"

const TIERS = [
  {
    value: "starter",
    title: "Starter",
    description: "One project, community support.",
  },
  {
    value: "studio",
    title: "Studio",
    description: "Ten projects, priority review of token changes.",
  },
]

export default function RadioGroupAsCards() {
  return (
    <RadioGroup defaultValue="studio" className="max-w-sm">
      {TIERS.map((tier) => (
        <FieldLabel key={tier.value} htmlFor={`radio-card-${tier.value}`}>
          <Field orientation="horizontal">
            <RadioGroupItem
              id={`radio-card-${tier.value}`}
              value={tier.value}
            />
            <FieldContent>
              <FieldTitle>{tier.title}</FieldTitle>
              <FieldDescription>{tier.description}</FieldDescription>
            </FieldContent>
          </Field>
        </FieldLabel>
      ))}
    </RadioGroup>
  )
}
