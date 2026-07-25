import type { ComponentProps } from "react"

import {
  ToggleGroup,
  ToggleGroupItem,
} from "@diametral/ui/components/toggle-group"

// `variant` and `size` come from `toggleVariants`, which lives in toggle.tsx —
// so they cannot be auto-extracted here and are declared by hand instead.
// `spacing` is a number, so it is coerced off the panel's string value.
export default function ToggleGroupPlayground({
  spacing,
  ...rest
}: Omit<ComponentProps<typeof ToggleGroup>, "spacing"> & { spacing?: string }) {
  const props = {
    ...rest,
    ...(spacing ? { spacing: Number(spacing) } : {}),
  }

  return (
    <ToggleGroup {...props}>
      <ToggleGroupItem value="week">Week</ToggleGroupItem>
      <ToggleGroupItem value="month">Month</ToggleGroupItem>
      <ToggleGroupItem value="quarter">Quarter</ToggleGroupItem>
    </ToggleGroup>
  )
}
