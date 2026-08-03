import * as React from "react"

import { Button } from "@diametral/ui/components/button"
import { Calendar } from "@diametral/ui/components/calendar"
import {
  DatePicker,
  DatePickerContent,
  DatePickerTrigger,
} from "@diametral/ui/components/date-picker"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@diametral/ui/components/field"
import { Form } from "@diametral/ui/components/form"
import { Input } from "@diametral/ui/components/input"

function toInputValue(date: Date | undefined) {
  return date ? date.toISOString().slice(0, 10) : ""
}

export default function DatePickerInForm() {
  const [date, setDate] = React.useState<Date | undefined>(new Date(2026, 6, 6))
  const [open, setOpen] = React.useState(false)
  const [sent, setSent] = React.useState<string>()

  return (
    <Form
      className="max-w-sm"
      onSubmit={(event) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget)
        setSent(`${data.get("reason")} — ${data.get("leave-date")}`)
      }}
    >
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="date-picker-form-reason">Reason</FieldLabel>
          <Input
            id="date-picker-form-reason"
            name="reason"
            defaultValue="Congés"
          />
        </Field>

        <Field>
          <FieldLabel>Day off</FieldLabel>
          <DatePicker open={open} onOpenChange={setOpen}>
            <DatePickerTrigger value={date} />
            <DatePickerContent>
              <Calendar
                mode="single"
                selected={date}
                defaultMonth={date}
                onSelect={(value) => {
                  setDate(value)
                  setOpen(false)
                }}
              />
            </DatePickerContent>
          </DatePicker>
          <input type="hidden" name="leave-date" value={toInputValue(date)} />
          <FieldDescription>
            Submitted as an ISO date alongside the other fields.
          </FieldDescription>
        </Field>
      </FieldGroup>

      <Button type="submit" className="self-start">
        Request
      </Button>

      {sent && (
        <output className="text-sm text-muted-foreground">{sent}</output>
      )}
    </Form>
  )
}
