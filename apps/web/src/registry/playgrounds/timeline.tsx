import type { ComponentProps } from "react"

import {
  Timeline,
  TimelineContent,
  TimelineDescription,
  TimelineIndicator,
  TimelineItem,
  TimelineTitle,
} from "@workspace/ui/components/timeline"

// `Timeline` itself is an `ol` with no props of its own — the state that changes
// anything visually is `data-state` on the item, so that is the subject.
export default function TimelinePlayground({
  children,
  ...props
}: ComponentProps<typeof TimelineItem>) {
  return (
    <Timeline className="w-full max-w-sm">
      <TimelineItem {...props}>
        <TimelineIndicator>1</TimelineIndicator>
        <TimelineContent>
          <TimelineTitle>{children}</TimelineTitle>
          <TimelineDescription>
            Périmètre et critères de succès validés.
          </TimelineDescription>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineIndicator>2</TimelineIndicator>
        <TimelineContent>
          <TimelineTitle>Maquettes</TimelineTitle>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  )
}
