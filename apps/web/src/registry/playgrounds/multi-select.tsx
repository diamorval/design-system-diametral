import type { ComponentProps } from "react"

import { MultiSelect } from "@diametral/ui/components/multi-select"

const OPTIONS = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "svelte", label: "Svelte" },
  { value: "angular", label: "Angular" },
]

export default function MultiSelectPlayground(
  props: Omit<ComponentProps<typeof MultiSelect>, "options">
) {
  return <MultiSelect options={OPTIONS} aria-label="Frameworks" {...props} />
}
