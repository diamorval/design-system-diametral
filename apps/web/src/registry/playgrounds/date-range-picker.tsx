import type { ComponentProps } from "react"

import { DateRangePicker } from "@diametral/ui/components/date-range-picker"

// `numberOfMonths` arrives as a string from the panel's select and has to be a number.
export default function DateRangePickerPlayground({
  numberOfMonths,
  ...rest
}: Omit<ComponentProps<typeof DateRangePicker>, "numberOfMonths"> & {
  numberOfMonths?: string
}) {
  const props = {
    ...rest,
    ...(numberOfMonths ? { numberOfMonths: Number(numberOfMonths) } : {}),
  }

  return (
    <DateRangePicker
      defaultValue={{
        from: new Date(2026, 6, 6),
        to: new Date(2026, 6, 17),
      }}
      {...props}
    />
  )
}
