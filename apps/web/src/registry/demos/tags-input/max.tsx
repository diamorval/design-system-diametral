import { TagsInput } from "@diametral/ui/components/tags-input"
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@diametral/ui/components/field"

// `max` stops new tags once the count is reached — existing tags stay
// removable, only `addTag` is blocked.
export default function TagsInputMax() {
  return (
    <Field className="max-w-sm">
      <FieldLabel>Recipients (max 3)</FieldLabel>
      <TagsInput
        defaultValue={["alice@diametral.com", "bob@diametral.com"]}
        max={3}
        placeholder="Add an email…"
      />
      <FieldDescription>No more than three recipients.</FieldDescription>
    </Field>
  )
}
