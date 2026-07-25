import { ArrowRightIcon } from "@phosphor-icons/react"

import { Button } from "@workspace/ui/components/button"
import {
  ButtonGroup,
  ButtonGroupText,
} from "@workspace/ui/components/button-group"
import { Input } from "@workspace/ui/components/input"

export default function ButtonGroupWithText() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <ButtonGroup>
        <ButtonGroupText>diametral.com/</ButtonGroupText>
        <Input defaultValue="charte" aria-label="Slug" />
      </ButtonGroup>

      <ButtonGroup>
        <Input placeholder="you@diametral.com" aria-label="Email" />
        <Button variant="outline" aria-label="Continue">
          <ArrowRightIcon />
        </Button>
      </ButtonGroup>
    </div>
  )
}
