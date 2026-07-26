import type { ComponentProps } from "react"

import { MultiSelect } from "@diametral/ui/components/multi-select"

const OPTIONS = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "svelte", label: "Svelte" },
  { value: "angular", label: "Angular" },
]

export default function MultiSelectPlayground(
  props: ComponentProps<typeof MultiSelect>
) {
  return <MultiSelect options={OPTIONS} {...props} />
}
