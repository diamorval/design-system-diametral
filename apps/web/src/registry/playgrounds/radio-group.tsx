import type { ComponentProps } from "react"

import { Field, FieldLabel } from "@diametral/ui/components/field"
import {
  RadioGroup,
  RadioGroupItem,
} from "@diametral/ui/components/radio-group"

const SPEEDS = ["standard", "express", "same-day"]

export default function RadioGroupPlayground(
  props: ComponentProps<typeof RadioGroup>
) {
  return (
    <RadioGroup className="max-w-sm" defaultValue="express" {...props}>
      {SPEEDS.map((speed) => (
        <Field key={speed} orientation="horizontal">
          <RadioGroupItem id={`pg-radio-${speed}`} value={speed} />
          <FieldLabel htmlFor={`pg-radio-${speed}`}>{speed}</FieldLabel>
        </Field>
      ))}
    </RadioGroup>
  )
}
