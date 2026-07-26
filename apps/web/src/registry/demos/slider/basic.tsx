import { Field, FieldLabel } from "@diametral/ui/components/field"
import { Slider } from "@diametral/ui/components/slider"

// The component reads `value` / `defaultValue` to decide how many thumbs to
// render, so a single number gives one and an array gives one per entry.
export default function SliderBasic() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-8">
      <Field>
        <FieldLabel id="slider-basic-opacity-label">Opacity</FieldLabel>
        <Slider
          defaultValue={60}
          aria-labelledby="slider-basic-opacity-label"
        />
      </Field>
      <Field>
        <FieldLabel id="slider-basic-step-label">Step of 10</FieldLabel>
        <Slider
          defaultValue={40}
          step={10}
          aria-labelledby="slider-basic-step-label"
        />
      </Field>
      <Field>
        <FieldLabel id="slider-basic-disabled-label">Disabled</FieldLabel>
        <Slider
          defaultValue={25}
          disabled
          aria-labelledby="slider-basic-disabled-label"
        />
      </Field>
    </div>
  )
}
