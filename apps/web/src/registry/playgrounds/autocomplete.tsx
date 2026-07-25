import type { ComponentProps } from "react"

import {
  Autocomplete,
  AutocompleteContent,
  AutocompleteEmpty,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteList,
} from "@workspace/ui/components/autocomplete"

const TAGS = ["accessibility", "charter", "colour", "tokens", "typography"]

export default function AutocompletePlayground(
  props: ComponentProps<typeof AutocompleteInput>
) {
  return (
    <Autocomplete items={TAGS}>
      <AutocompleteInput
        className="w-full max-w-3xs"
        placeholder="Start typing…"
        {...props}
      />
      <AutocompleteContent>
        <AutocompleteEmpty>No suggestion.</AutocompleteEmpty>
        <AutocompleteList>
          {(tag: string) => (
            <AutocompleteItem key={tag} value={tag}>
              {tag}
            </AutocompleteItem>
          )}
        </AutocompleteList>
      </AutocompleteContent>
    </Autocomplete>
  )
}
