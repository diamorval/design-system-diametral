import type { ComponentProps } from "react"

import { ColorPicker } from "@diametral/ui/components/color-picker"

export default function ColorPickerPlayground(
  props: ComponentProps<typeof ColorPicker>
) {
  return <ColorPicker {...props} />
}
