import { MultiSelect } from "@diametral/ui/components/multi-select"
import { Field, FieldLabel } from "@diametral/ui/components/field"

const SKILLS = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "svelte", label: "Svelte" },
  { value: "angular", label: "Angular" },
  { value: "solid", label: "Solid" },
]

// `options` is the whole API — value/label pairs in, a string[] out. Internally
// this is Combobox in `multiple` mode, so filtering and chip removal come free.
export default function MultiSelectBasic() {
  return (
    <Field className="max-w-sm">
      <FieldLabel id="multi-select-basic-skills-label">Skills</FieldLabel>
      <MultiSelect
        options={SKILLS}
        defaultValue={["react"]}
        aria-labelledby="multi-select-basic-skills-label"
      />
    </Field>
  )
}
