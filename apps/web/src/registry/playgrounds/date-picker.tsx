import type { ComponentProps } from "react"

import { Calendar } from "@workspace/ui/components/calendar"
import {
  DatePicker,
  DatePickerContent,
  DatePickerTrigger,
} from "@workspace/ui/components/date-picker"

// The controls drive the trigger, which is where this component adds anything of
// its own: `DatePicker` is just `Popover`, and the Calendar inside stays yours.
export default function DatePickerPlayground(
  props: ComponentProps<typeof DatePickerTrigger>
) {
  return (
    <DatePicker>
      <DatePickerTrigger value={new Date(2026, 6, 15)} {...props} />
      <DatePickerContent>
        <Calendar mode="single" defaultMonth={new Date(2026, 6)} />
      </DatePickerContent>
    </DatePicker>
  )
}
