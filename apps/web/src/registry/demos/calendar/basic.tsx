import * as React from "react"

import { Calendar } from "@diametral/ui/components/calendar"

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
