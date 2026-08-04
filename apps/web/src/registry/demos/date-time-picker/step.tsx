import { useState } from "react"

import { DateTimePicker } from "@diametral/ui/components/date-time-picker"
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@diametral/ui/components/field"

export default function DateTimePickerStep() {
  const [slot, setSlot] = useState<Date | undefined>(
    new Date(2026, 7, 12, 10, 30)
  )

  return (
    <Field className="max-w-md">
      <FieldLabel>Delivery window</FieldLabel>
      <DateTimePicker value={slot} onChange={setSlot} step={15} />
      <FieldDescription>
        Minutes snap down to the nearest quarter hour on commit, so a typed
        10:37 lands on 10:30.
      </FieldDescription>
    </Field>
  )
}
