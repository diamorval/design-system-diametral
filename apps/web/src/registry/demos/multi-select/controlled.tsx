import * as React from "react"

import { MultiSelect } from "@diametral/ui/components/multi-select"
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@diametral/ui/components/field"

const SCOPES = [
  { value: "read:tokens", label: "read:tokens" },
  { value: "write:tokens", label: "write:tokens" },
  { value: "read:components", label: "read:components" },
  { value: "publish", label: "publish" },
]

// A controlled `value` lets the page react to a selection — here, just a count.
export default function MultiSelectControlled() {
  const [value, setValue] = React.useState<string[]>(["read:tokens"])

  return (
    <Field className="max-w-sm">
      <FieldLabel>Scopes</FieldLabel>
      <MultiSelect options={SCOPES} value={value} onValueChange={setValue} />
      <FieldDescription>{value.length} scope(s) selected.</FieldDescription>
    </Field>
  )
}
