import { TagsInput } from "@diametral/ui/components/tags-input"
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@diametral/ui/components/field"

// Enter or comma commits the draft as a tag; Backspace on an empty draft
// removes the last one. There is no fixed option list — any typed value works.
export default function TagsInputBasic() {
  return (
    <Field className="max-w-sm">
      <FieldLabel>Keywords</FieldLabel>
      <TagsInput
        defaultValue={["design-system", "react"]}
        placeholder="Add a keyword…"
      />
      <FieldDescription>Press Enter or comma to add a tag.</FieldDescription>
    </Field>
  )
}
