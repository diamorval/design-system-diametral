import type { ComponentProps } from "react"
import { MagnifyingGlassIcon } from "@phosphor-icons/react"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@workspace/ui/components/input-group"

export default function InputGroupPlayground(
  props: ComponentProps<typeof InputGroupAddon>
) {
  return (
    <InputGroup className="w-full max-w-sm">
      <InputGroupAddon {...props}>
        <MagnifyingGlassIcon />
      </InputGroupAddon>
      <InputGroupInput placeholder="Search components…" />
    </InputGroup>
  )
}
