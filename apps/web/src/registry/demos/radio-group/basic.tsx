import {
  Field,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@workspace/ui/components/field"
import {
  RadioGroup,
  RadioGroupItem,
} from "@workspace/ui/components/radio-group"

const SPEEDS = [
  { value: "standard", label: "Standard — 5 days" },
  { value: "express", label: "Express — 2 days" },
  { value: "same-day", label: "Same day" },
]

// Base UI renders each radio as a `span` with `role="radio"`, not an `input`, so
// style hooks are `data-checked` rather than `:checked`.
export default function RadioGroupBasic() {
  return (
    <FieldSet className="max-w-sm">
      <FieldLegend>Delivery</FieldLegend>
      <RadioGroup defaultValue="express">
        {SPEEDS.map((speed) => (
          <Field key={speed.value} orientation="horizontal">
            <RadioGroupItem id={`radio-${speed.value}`} value={speed.value} />
            <FieldLabel htmlFor={`radio-${speed.value}`}>
              {speed.label}
            </FieldLabel>
          </Field>
        ))}
      </RadioGroup>
    </FieldSet>
  )
}
