import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@diametral/ui/components/field"
import {
  NumberField,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
} from "@diametral/ui/components/number-field"

// A real number field, not `<input type="number">`: it clamps to min/max, honours
// step on the arrow keys, and formats with Intl rather than raw digits.
export default function NumberFieldBasic() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-8">
      <Field>
        <FieldLabel>Seats</FieldLabel>
        <NumberField defaultValue={3} min={1} max={20}>
          <NumberFieldGroup>
            <NumberFieldDecrement />
            <NumberFieldInput />
            <NumberFieldIncrement />
          </NumberFieldGroup>
        </NumberField>
        <FieldDescription>Between 1 and 20.</FieldDescription>
      </Field>

      <Field>
        <FieldLabel>Day rate</FieldLabel>
        <NumberField
          defaultValue={850}
          step={50}
          format={{ style: "currency", currency: "EUR" }}
        >
          <NumberFieldGroup>
            <NumberFieldDecrement />
            <NumberFieldInput />
            <NumberFieldIncrement />
          </NumberFieldGroup>
        </NumberField>
      </Field>
    </div>
  )
}
