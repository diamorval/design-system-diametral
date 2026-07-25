import { Bubble, BubbleContent } from "@workspace/ui/components/bubble"
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@workspace/ui/components/message-scroller"

const HISTORY = Array.from({ length: 18 }, (_, index) => ({
  id: `m${index}`,
  mine: index % 3 === 0,
  text:
    index % 3 === 0
      ? "Understood."
      : `Message ${index + 1} — the charter defines the palette, the components only read it.`,
}))

// `MessageScrollerProvider` is required: it holds the scroll state that Root,
// Viewport and Button all consume. Without it they throw on a missing context.
export default function MessageScrollerBasic() {
  return (
    <div className="h-72 w-full max-w-md border border-border">
      <MessageScrollerProvider>
        <MessageScroller>
          <MessageScrollerViewport className="p-4">
            <MessageScrollerContent className="gap-2">
              {HISTORY.map((message) => (
                <MessageScrollerItem key={message.id} messageId={message.id}>
                  <Bubble
                    align={message.mine ? "end" : "start"}
                    variant={message.mine ? "default" : "muted"}
                  >
                    <BubbleContent>{message.text}</BubbleContent>
                  </Bubble>
                </MessageScrollerItem>
              ))}
            </MessageScrollerContent>
          </MessageScrollerViewport>
          <MessageScrollerButton />
        </MessageScroller>
      </MessageScrollerProvider>
    </div>
  )
}
