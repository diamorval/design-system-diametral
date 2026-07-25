import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@workspace/ui/components/field"
import {
  NumberField,
  NumberFieldGroup,
  NumberFieldInput,
  NumberFieldScrubArea,
} from "@workspace/ui/components/number-field"

// `NumberFieldScrubArea` turns its children into a drag handle — press and move
// sideways, the way a design tool's numeric inputs behave. It reads the root's
// context, so it has to sit *inside* `NumberField`, not beside it.
export default function NumberFieldWithScrub() {
  return (
    <Field className="max-w-xs">
      <NumberField defaultValue={0} step={0.05} min={-0.5} max={0.5}>
        <NumberFieldScrubArea>
          <FieldLabel>Letter spacing</FieldLabel>
        </NumberFieldScrubArea>
        <NumberFieldGroup>
          <NumberFieldInput className="ps-0 text-start" />
        </NumberFieldGroup>
      </NumberField>
      <FieldDescription>Drag the label left or right.</FieldDescription>
    </Field>
  )
}
