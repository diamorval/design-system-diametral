import { Avatar, AvatarFallback } from "@diametral/ui/components/avatar"
import { Bubble, BubbleContent } from "@diametral/ui/components/bubble"
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageGroup,
  MessageHeader,
} from "@diametral/ui/components/message"

// `Message` reverses its own flex direction on `align="end"`, so the avatar moves
// to the trailing side without reordering the markup.
export default function MessageBasic() {
  return (
    <MessageGroup className="max-w-md">
      <Message>
        <MessageAvatar>
          <Avatar size="sm">
            <AvatarFallback>CR</AvatarFallback>
          </Avatar>
        </MessageAvatar>
        <MessageContent>
          <MessageHeader>Camille</MessageHeader>
          <Bubble variant="muted">
            <BubbleContent>
              The palette is locked. Eight tones, no exceptions.
            </BubbleContent>
          </Bubble>
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
            <BubbleContent>Understood — updating the tokens now.</BubbleContent>
          </Bubble>
        </MessageContent>
      </Message>
    </MessageGroup>
  )
}
