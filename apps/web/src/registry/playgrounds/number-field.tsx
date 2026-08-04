import type { ComponentProps } from "react"

import {
  NumberField,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
  NumberFieldScrubArea,
} from "@diametral/ui/components/number-field"

// `step` and the bounds arrive from the panel as strings, so they are coerced
// before Base UI sees them. The label sits inside NumberFieldScrubArea because
// that part has no chrome of its own — whatever it wraps becomes the drag
// handle, and the label is the usual choice. It names the input through
// `aria-labelledby` rather than a fixed `aria-label`, so the editable text and
// the accessible name cannot drift apart.
export default function NumberFieldPlayground({
  step,
  min,
  max,
  label = "Seats",
  ...rest
}: Omit<ComponentProps<typeof NumberField>, "step" | "min" | "max"> & {
  step?: string
  min?: string
  max?: string
  label?: string
}) {
  const props = {
    ...rest,
    ...(step ? { step: Number(step) } : {}),
    ...(min ? { min: Number(min) } : {}),
    ...(max ? { max: Number(max) } : {}),
  }

  return (
    <NumberField className="max-w-3xs" defaultValue={3} {...props}>
      <NumberFieldScrubArea>
        <span id="number-field-playground-label" className="text-sm">
          {label}
        </span>
      </NumberFieldScrubArea>
      <NumberFieldGroup>
        <NumberFieldDecrement />
        <NumberFieldInput aria-labelledby="number-field-playground-label" />
        <NumberFieldIncrement />
      </NumberFieldGroup>
    </NumberField>
  )
}
