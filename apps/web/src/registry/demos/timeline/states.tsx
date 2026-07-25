import { CheckIcon } from "@phosphor-icons/react"

import {
  Timeline,
  TimelineContent,
  TimelineDescription,
  TimelineIndicator,
  TimelineItem,
  TimelineTitle,
} from "@diametral/ui/components/timeline"

const STEPS = [
  { title: "Devis signé", state: "completed" },
  { title: "Acompte reçu", state: "completed" },
  { title: "Production", state: "active" },
  { title: "Facturation", state: undefined },
]

// `data-state` goes on the *item*; the indicator styles itself from it with
// `group-data-[state=…]`. Putting it on the indicator does nothing.
export default function TimelineStates() {
  return (
    <Timeline className="max-w-md">
      {STEPS.map((step) => (
        <TimelineItem key={step.title} data-state={step.state}>
          <TimelineIndicator>
            {step.state === "completed" ? <CheckIcon /> : null}
          </TimelineIndicator>
          <TimelineContent>
            <TimelineTitle>{step.title}</TimelineTitle>
            {step.state === "active" && (
              <TimelineDescription>En cours</TimelineDescription>
            )}
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  )
}
