import type { ComponentProps } from "react"

import { DateTimePicker } from "@diametral/ui/components/date-time-picker"

// `step` arrives from the panel as a string, so it is converted into one bag
// above the JSX — the code strip reprints the element carrying `{...props}`,
// so a conversion written inline would print as source.
export default function DateTimePickerPlayground({
  step,
  ...rest
}: Partial<Omit<ComponentProps<typeof DateTimePicker>, "step">> & {
  step?: string
}) {
  const props = {
    ...rest,
    ...(step ? { step: Number(step) } : {}),
  }

  return <DateTimePicker {...props} />
}
