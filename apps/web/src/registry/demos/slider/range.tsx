import * as React from "react"

import { Field, FieldLabel } from "@diametral/ui/components/field"
import { Slider } from "@diametral/ui/components/slider"

// An array value gives a range: two thumbs and an indicator between them. Base UI
// hands the callback the whole array, so read both ends from it.
export default function SliderRange() {
  const [budget, setBudget] = React.useState([20, 70])

  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <Field>
        <FieldLabel id="slider-range-budget-label">
          Budget — {budget[0]}k to {budget[1]}k €
        </FieldLabel>
        <Slider
          value={budget}
          onValueChange={(value) => setBudget(value as number[])}
          aria-labelledby="slider-range-budget-label"
        />
      </Field>

      <div className="flex h-40 items-start gap-8">
        <span id="slider-range-vertical-value-label" className="sr-only">
          Vertical value
        </span>
        <Slider
          orientation="vertical"
          defaultValue={45}
          aria-labelledby="slider-range-vertical-value-label"
        />
        <span id="slider-range-vertical-range-label" className="sr-only">
          Vertical range
        </span>
        <Slider
          orientation="vertical"
          defaultValue={[20, 80]}
          aria-labelledby="slider-range-vertical-range-label"
        />
      </div>
    </div>
  )
}
