import { Checkbox } from "@workspace/ui/components/checkbox"
import { CheckboxGroup } from "@workspace/ui/components/checkbox-group"
import {
  Field,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@workspace/ui/components/field"

const TOPICS = [
  { value: "releases", label: "Release notes" },
  { value: "charter", label: "Charter changes" },
  { value: "incidents", label: "Incidents" },
]

// Each child `Checkbox` takes a `value`; the group owns the array. Disabling the
// group disables every box through `data-disabled`, with no per-box prop.
export default function CheckboxGroupBasic() {
  return (
    <FieldSet className="max-w-sm">
      <FieldLegend>Notifications</FieldLegend>
      <CheckboxGroup defaultValue={["releases"]}>
        {TOPICS.map((topic) => (
          <Field key={topic.value} orientation="horizontal">
            <Checkbox
              id={`checkbox-group-${topic.value}`}
              value={topic.value}
            />
            <FieldLabel htmlFor={`checkbox-group-${topic.value}`}>
              {topic.label}
            </FieldLabel>
          </Field>
        ))}
      </CheckboxGroup>
    </FieldSet>
  )
}
