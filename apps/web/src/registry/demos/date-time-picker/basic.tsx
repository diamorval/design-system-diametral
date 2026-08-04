import { useState } from "react"

import { DateTimePicker } from "@diametral/ui/components/date-time-picker"
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@diametral/ui/components/field"

export default function DateTimePickerBasic() {
  const [when, setWhen] = useState<Date | undefined>()

  return (
    <Field className="max-w-md">
      <FieldLabel>Publish at</FieldLabel>
      <DateTimePicker value={when} onChange={setWhen} />
      <FieldDescription>
        {when
          ? when.toLocaleString()
          : "The clock stays inert until a day is picked."}
      </FieldDescription>
    </Field>
  )
}
