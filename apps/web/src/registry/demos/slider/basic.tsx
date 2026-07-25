import { Field, FieldLabel } from "@workspace/ui/components/field"
import { Slider } from "@workspace/ui/components/slider"

// The component reads `value` / `defaultValue` to decide how many thumbs to
// render, so a single number gives one and an array gives one per entry.
export default function SliderBasic() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-8">
      <Field>
        <FieldLabel>Opacity</FieldLabel>
        <Slider defaultValue={60} />
      </Field>
      <Field>
        <FieldLabel>Step of 10</FieldLabel>
        <Slider defaultValue={40} step={10} />
      </Field>
      <Field>
        <FieldLabel>Disabled</FieldLabel>
        <Slider defaultValue={25} disabled />
      </Field>
    </div>
  )
}
