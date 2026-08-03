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

export default function NumberFieldBasic() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-8">
      <Field>
        <FieldLabel id="number-field-basic-seats-label">Seats</FieldLabel>
        <NumberField defaultValue={3} min={1} max={20}>
          <NumberFieldGroup>
            <NumberFieldDecrement />
            <NumberFieldInput aria-labelledby="number-field-basic-seats-label" />
            <NumberFieldIncrement />
          </NumberFieldGroup>
        </NumberField>
        <FieldDescription>Between 1 and 20.</FieldDescription>
      </Field>

      <Field>
        <FieldLabel id="number-field-basic-day-rate-label">Day rate</FieldLabel>
        <NumberField
          defaultValue={850}
          step={50}
          format={{ style: "currency", currency: "EUR" }}
        >
          <NumberFieldGroup>
            <NumberFieldDecrement />
            <NumberFieldInput aria-labelledby="number-field-basic-day-rate-label" />
            <NumberFieldIncrement />
          </NumberFieldGroup>
        </NumberField>
      </Field>
    </div>
  )
}
