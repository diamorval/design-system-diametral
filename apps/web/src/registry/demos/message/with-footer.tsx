import { Avatar, AvatarFallback } from "@diametral/ui/components/avatar"
import { Bubble, BubbleContent } from "@diametral/ui/components/bubble"
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageGroup,
} from "@diametral/ui/components/message"

// When a footer is present the avatar lifts by 2rem to stay level with the
// bubble instead of the timestamp — `group-has-data-[slot=message-footer]`.
export default function MessageWithFooter() {
  return (
    <MessageGroup className="max-w-md">
      <Message>
        <MessageAvatar>
          <Avatar size="sm">
            <AvatarFallback>CR</AvatarFallback>
          </Avatar>
        </MessageAvatar>
        <MessageContent>
          <Bubble variant="muted">
            <BubbleContent>Sent you the export.</BubbleContent>
          </Bubble>
          <MessageFooter>14:02</MessageFooter>
        </MessageContent>
      </Message>

      <Message align="end">
        <MessageAvatar>
          <Avatar size="sm">
            <AvatarFallback>AM</AvatarFallback>
          </Avatar>
        </MessageAvatar>
        <MessageContent>
          <Bubble align="end">
            <BubbleContent>Got it, thanks.</BubbleContent>
          </Bubble>
          <MessageFooter>14:03 · Read</MessageFooter>
        </MessageContent>
      </Message>
    </MessageGroup>
  )
}
