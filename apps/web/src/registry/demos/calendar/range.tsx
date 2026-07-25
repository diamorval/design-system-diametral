import * as React from "react"

import { Calendar } from "@diametral/ui/components/calendar"

// Structurally identical to react-day-picker's `DateRange`. Declared locally
// because the demo app depends on @diametral/ui, not on the library underneath it.
type Range = { from: Date | undefined; to?: Date | undefined }

// `captionLayout="dropdown"` swaps the month label for month and year selects,
// which is what makes a distant date reachable without paging to it.
export default function CalendarRange() {
  const [range, setRange] = React.useState<Range | undefined>({
    from: new Date(2026, 6, 6),
    to: new Date(2026, 6, 17),
  })

  return (
    <Calendar
      mode="range"
      selected={range}
      onSelect={setRange}
      numberOfMonths={2}
      captionLayout="dropdown"
      startMonth={new Date(2020, 0)}
      endMonth={new Date(2030, 11)}
      className="w-fit border border-border"
    />
  )
}
