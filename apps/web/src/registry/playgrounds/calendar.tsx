import { Calendar } from "@workspace/ui/components/calendar"

// `numberOfMonths` arrives as a string and has to be a number. `startMonth` and
// `endMonth` are hardcoded because `captionLayout="dropdown"` needs a bounded
// range to build its year select from.
export default function CalendarPlayground({
  numberOfMonths = "1",
  ...rest
}: {
  numberOfMonths?: string
  captionLayout?: "label" | "dropdown" | "dropdown-months" | "dropdown-years"
  showOutsideDays?: boolean
  disabled?: boolean
}) {
  const props = { ...rest, numberOfMonths: Number(numberOfMonths) }

  return (
    <Calendar
      mode="single"
      startMonth={new Date(2020, 0)}
      endMonth={new Date(2030, 11)}
      className="w-fit border border-border"
      {...props}
    />
  )
}
