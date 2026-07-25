import * as React from "react"

import { Button } from "@workspace/ui/components/button"
import { Bubble, BubbleContent } from "@workspace/ui/components/bubble"
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@workspace/ui/components/message-scroller"

// `scrollAnchor` on the last item is what pins the view to the bottom as
// messages arrive — and releases it once the reader scrolls up.
export default function MessageScrollerAutoscroll() {
  const [messages, setMessages] = React.useState(() =>
    Array.from({ length: 6 }, (_, index) => `Message ${index + 1}`)
  )

  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <div className="h-56 border border-border">
        <MessageScrollerProvider autoScroll>
          <MessageScroller>
            <MessageScrollerViewport className="p-4">
              <MessageScrollerContent className="gap-2">
                {messages.map((text, index) => (
                  <MessageScrollerItem
                    key={text}
                    messageId={text}
                    scrollAnchor={index === messages.length - 1}
                  >
                    <Bubble variant="muted">
                      <BubbleContent>{text}</BubbleContent>
                    </Bubble>
                  </MessageScrollerItem>
                ))}
              </MessageScrollerContent>
            </MessageScrollerViewport>
            <MessageScrollerButton />
          </MessageScroller>
        </MessageScrollerProvider>
      </div>

      <Button
        variant="outline"
        size="sm"
        className="self-start"
        onClick={() =>
          setMessages((current) => [
            ...current,
            `Message ${current.length + 1}`,
          ])
        }
      >
        Append message
      </Button>
    </div>
  )
}
