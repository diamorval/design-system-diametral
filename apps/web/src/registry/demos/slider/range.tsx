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
        <FieldLabel>
          Budget — {budget[0]}k to {budget[1]}k €
        </FieldLabel>
        <Slider
          value={budget}
          onValueChange={(value) => setBudget(value as number[])}
        />
      </Field>

      <div className="flex h-40 items-start gap-8">
        <Slider orientation="vertical" defaultValue={45} />
        <Slider orientation="vertical" defaultValue={[20, 80]} />
      </div>
    </div>
  )
}
