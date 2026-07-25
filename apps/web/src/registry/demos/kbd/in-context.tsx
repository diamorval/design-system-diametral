import { MagnifyingGlassIcon } from "@phosphor-icons/react"

import { Button } from "@diametral/ui/components/button"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@diametral/ui/components/input-group"
import { Kbd, KbdGroup } from "@diametral/ui/components/kbd"

// Kbd restyles itself from its container — `in-data-[slot=input-group]` swaps
// the muted background for the input fill so it reads as inset, not stacked.
export default function KbdInContext() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <InputGroup>
        <InputGroupAddon>
          <MagnifyingGlassIcon />
        </InputGroupAddon>
        <InputGroupInput placeholder="Search the system…" />
        <InputGroupAddon align="inline-end">
          <KbdGroup>
            <Kbd>⌘</Kbd>
            <Kbd>K</Kbd>
          </KbdGroup>
        </InputGroupAddon>
      </InputGroup>

      <Button variant="outline" className="justify-between">
        Save changes
        <KbdGroup>
          <Kbd>⌘</Kbd>
          <Kbd>S</Kbd>
        </KbdGroup>
      </Button>
    </div>
  )
}
