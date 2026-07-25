import type { ComponentProps } from "react"

import { Avatar, AvatarFallback } from "@workspace/ui/components/avatar"
import { Bubble, BubbleContent } from "@workspace/ui/components/bubble"
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageGroup,
} from "@workspace/ui/components/message"

export default function MessagePlayground({
  children,
  ...props
}: ComponentProps<typeof Message>) {
  return (
    <MessageGroup className="w-full max-w-sm">
      <Message {...props}>
        <MessageAvatar>
          <Avatar size="sm">
            <AvatarFallback>CR</AvatarFallback>
          </Avatar>
        </MessageAvatar>
        <MessageContent>
          <Bubble variant="muted">
            <BubbleContent>{children}</BubbleContent>
          </Bubble>
          <MessageFooter>14:02</MessageFooter>
        </MessageContent>
      </Message>
    </MessageGroup>
  )
}
