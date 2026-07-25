import { PaperPlaneTiltIcon, PaperclipIcon } from "@phosphor-icons/react"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "@workspace/ui/components/input-group"

// `block-start` / `block-end` stack the addon above or below instead of beside,
// which turns the group into a composer. The group switches to a column itself.
export default function InputGroupBlockAlign() {
  return (
    <InputGroup className="w-full max-w-sm">
      <InputGroupTextarea placeholder="Write a message…" rows={3} />
      <InputGroupAddon align="block-end">
        <InputGroupButton size="icon-xs" aria-label="Attach a file">
          <PaperclipIcon />
        </InputGroupButton>
        <InputGroupButton
          className="ms-auto"
          variant="outline"
          aria-label="Send"
        >
          <PaperPlaneTiltIcon /> Send
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  )
}
