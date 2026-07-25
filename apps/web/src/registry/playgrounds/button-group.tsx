import type { ComponentProps } from "react"

import { Button } from "@diametral/ui/components/button"
import {
  ButtonGroup,
  ButtonGroupSeparator,
} from "@diametral/ui/components/button-group"

export default function ButtonGroupPlayground(
  props: ComponentProps<typeof ButtonGroup>
) {
  return (
    <ButtonGroup {...props}>
      <Button variant="outline">Copy</Button>
      <ButtonGroupSeparator />
      <Button variant="outline">Paste</Button>
    </ButtonGroup>
  )
}
