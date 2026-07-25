import {
  Bubble,
  BubbleContent,
  BubbleGroup,
  BubbleReactions,
} from "@workspace/ui/components/bubble"

// Reactions are absolutely positioned and overhang the bubble, ringed in the
// card colour so they punch a hole through the edge rather than sitting beside it.
export default function BubbleWithReactions() {
  return (
    <BubbleGroup className="max-w-md gap-6 bg-card">
      <Bubble variant="muted">
        <BubbleContent>Shipping the charter update tonight.</BubbleContent>
        <BubbleReactions>🎉 2</BubbleReactions>
      </Bubble>
      <Bubble align="end">
        <BubbleContent>Reviewed — go ahead.</BubbleContent>
        <BubbleReactions side="top" align="start">
          👍
        </BubbleReactions>
      </Bubble>
    </BubbleGroup>
  )
}
