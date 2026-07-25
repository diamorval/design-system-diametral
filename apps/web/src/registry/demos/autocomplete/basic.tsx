import {
  Autocomplete,
  AutocompleteContent,
  AutocompleteEmpty,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteList,
} from "@workspace/ui/components/autocomplete"
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@workspace/ui/components/field"

const TAGS = [
  "accessibility",
  "animation",
  "charter",
  "colour",
  "documentation",
  "tokens",
  "typography",
]

// Unlike Combobox, Autocomplete is a free-text input with suggestions: whatever is
// typed stays the value even if it matches nothing in the list.
export default function AutocompleteBasic() {
  return (
    <Field className="max-w-sm">
      <FieldLabel>Tag</FieldLabel>
      <Autocomplete items={TAGS}>
        <AutocompleteInput placeholder="Start typing…" showClear />
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
      <FieldDescription>
        Pick a suggestion, or invent a new tag.
      </FieldDescription>
    </Field>
  )
}
