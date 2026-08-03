import { SlidersHorizontalIcon } from "@phosphor-icons/react"

import { Button } from "@diametral/ui/components/button"
import { Field, FieldLabel } from "@diametral/ui/components/field"
import { Input } from "@diametral/ui/components/input"
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@diametral/ui/components/popover"
import { Switch } from "@diametral/ui/components/switch"

export default function PopoverWithForm() {
  return (
    <Popover>
      <PopoverTrigger render={<Button variant="outline" size="sm" />}>
        <SlidersHorizontalIcon /> Display
      </PopoverTrigger>
      <PopoverContent align="start" className="w-80">
        <PopoverHeader>
          <PopoverTitle>Display options</PopoverTitle>
        </PopoverHeader>
        <Field>
          <FieldLabel htmlFor="popover-rows">Rows per page</FieldLabel>
          <Input id="popover-rows" type="number" defaultValue={25} />
        </Field>
        <Field orientation="horizontal">
          <Switch id="popover-dense" defaultChecked />
          <FieldLabel htmlFor="popover-dense">Dense rows</FieldLabel>
        </Field>
      </PopoverContent>
    </Popover>
  )
}
