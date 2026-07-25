import {
  Timeline,
  TimelineContent,
  TimelineDescription,
  TimelineIndicator,
  TimelineItem,
  TimelineTime,
  TimelineTitle,
} from "@workspace/ui/components/timeline"

const EVENTS = [
  {
    title: "Brief reçu",
    time: "12 juin",
    description: "Périmètre et critères de succès validés avec le client.",
  },
  {
    title: "Maquettes",
    time: "28 juin",
    description: "Trois pistes présentées, la seconde retenue.",
  },
  {
    title: "Livraison",
    time: "15 juillet",
    description: "Design system livré avec sa documentation.",
  },
]

// The connecting line is a `::before` on each item, hidden on the last one — so
// items can be added or removed without touching the rail.
export default function TimelineBasic() {
  return (
    <Timeline className="max-w-md">
      {EVENTS.map((event, index) => (
        <TimelineItem key={event.title}>
          <TimelineIndicator>{index + 1}</TimelineIndicator>
          <TimelineContent>
            <TimelineTitle>{event.title}</TimelineTitle>
            <TimelineTime>{event.time}</TimelineTime>
            <TimelineDescription>{event.description}</TimelineDescription>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  )
}
