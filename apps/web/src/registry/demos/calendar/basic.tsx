import * as React from "react"

import { Calendar } from "@workspace/ui/components/calendar"

// Built on react-day-picker. `--cell-radius: 0` is set on the root, which is how
// range ends stay square while the library still reasons about rounded corners.
export default function CalendarBasic() {
  const [selected, setSelected] = React.useState<Date | undefined>(
    new Date(2026, 6, 15)
  )

  return (
    <Calendar
      mode="single"
      selected={selected}
      onSelect={setSelected}
      className="w-fit border border-border"
    />
  )
}
