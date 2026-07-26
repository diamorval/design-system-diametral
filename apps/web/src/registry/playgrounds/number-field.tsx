import type { ComponentProps } from "react"

import {
  NumberField,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
} from "@diametral/ui/components/number-field"

// `step` and the bounds arrive from the panel as strings, so they are coerced
// before Base UI sees them.
export default function NumberFieldPlayground({
  step,
  min,
  max,
  ...rest
}: Omit<ComponentProps<typeof NumberField>, "step" | "min" | "max"> & {
  step?: string
  min?: string
  max?: string
}) {
  const props = {
    ...rest,
    ...(step ? { step: Number(step) } : {}),
    ...(min ? { min: Number(min) } : {}),
    ...(max ? { max: Number(max) } : {}),
  }

  return (
    <NumberField className="max-w-3xs" defaultValue={3} {...props}>
      <NumberFieldGroup>
        <NumberFieldDecrement />
        <NumberFieldInput aria-label="Number field preview" />
        <NumberFieldIncrement />
      </NumberFieldGroup>
    </NumberField>
  )
}
