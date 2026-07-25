import { Checkbox } from "@workspace/ui/components/checkbox"
import { CheckboxGroup } from "@workspace/ui/components/checkbox-group"
import { Field, FieldLabel } from "@workspace/ui/components/field"

const SCOPES = ["read:tokens", "write:tokens", "publish"]

// `allValues` on the group plus `parent` on one checkbox gives select-all for
// free: the parent computes checked / indeterminate itself, with no derived state.
export default function CheckboxGroupWithParent() {
  return (
    <CheckboxGroup
      allValues={SCOPES}
      defaultValue={["read:tokens"]}
      className="max-w-sm"
    >
      <Field orientation="horizontal">
        <Checkbox id="checkbox-parent" parent />
        <FieldLabel htmlFor="checkbox-parent">All scopes</FieldLabel>
      </Field>
      <div className="ms-6 flex flex-col gap-3">
        {SCOPES.map((scope) => (
          <Field key={scope} orientation="horizontal">
            <Checkbox id={`checkbox-${scope}`} value={scope} />
            <FieldLabel htmlFor={`checkbox-${scope}`}>{scope}</FieldLabel>
          </Field>
        ))}
      </div>
    </CheckboxGroup>
  )
}
