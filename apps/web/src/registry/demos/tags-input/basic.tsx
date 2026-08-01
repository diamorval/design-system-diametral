import { TagsInput } from "@diametral/ui/components/tags-input"
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@diametral/ui/components/field"

export default function TagsInputBasic() {
  return (
    <Field className="max-w-sm">
      <FieldLabel id="tags-input-basic-keywords-label">Keywords</FieldLabel>
      <TagsInput
        defaultValue={["design-system", "react"]}
        placeholder="Add a keyword…"
        aria-labelledby="tags-input-basic-keywords-label"
      />
      <FieldDescription>Press Enter or comma to add a tag.</FieldDescription>
    </Field>
  )
}
