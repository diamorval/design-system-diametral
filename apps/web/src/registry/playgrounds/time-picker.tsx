import type { ComponentProps } from "react"

import { TimePicker } from "@diametral/ui/components/time-picker"

export default function TimePickerPlayground(
  props: ComponentProps<typeof TimePicker>
) {
  return <TimePicker defaultValue={{ hours: 9, minutes: 30 }} {...props} />
}
