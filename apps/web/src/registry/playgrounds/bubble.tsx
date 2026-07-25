import type { ComponentProps } from "react"

import {
  Bubble,
  BubbleContent,
  BubbleGroup,
} from "@workspace/ui/components/bubble"

export default function BubblePlayground({
  children,
  ...props
}: ComponentProps<typeof Bubble>) {
  return (
    <BubbleGroup className="w-full max-w-sm">
      <Bubble {...props}>
        <BubbleContent>{children}</BubbleContent>
      </Bubble>
    </BubbleGroup>
  )
}
