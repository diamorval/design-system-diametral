import {
  Autocomplete,
  AutocompleteContent,
  AutocompleteEmpty,
  AutocompleteGroup,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteLabel,
  AutocompleteList,
  AutocompleteStatus,
} from "@workspace/ui/components/autocomplete"
import { Field, FieldLabel } from "@workspace/ui/components/field"

const GROUPED = [
  { value: "Actions", items: ["Button", "Toggle", "Toolbar"] },
  { value: "Overlays", items: ["Dialog", "Popover", "Tooltip"] },
]

// Grouped items come from the shape of `items`: each entry with an `items` array
// becomes a group, and the list's function child receives the group.
export default function AutocompleteGrouped() {
  return (
    <Field className="max-w-sm">
      <FieldLabel>Component</FieldLabel>
      <Autocomplete items={GROUPED}>
        <AutocompleteInput placeholder="Search components…" showClear />
        <AutocompleteContent>
          <AutocompleteEmpty>Nothing matches.</AutocompleteEmpty>
          <AutocompleteStatus>Suggestions</AutocompleteStatus>
          <AutocompleteList>
            {(group: { value: string; items: string[] }) => (
              <AutocompleteGroup key={group.value} items={group.items}>
                <AutocompleteLabel>{group.value}</AutocompleteLabel>
                {group.items.map((name) => (
                  <AutocompleteItem key={name} value={name}>
                    {name}
                  </AutocompleteItem>
                ))}
              </AutocompleteGroup>
            )}
          </AutocompleteList>
        </AutocompleteContent>
      </Autocomplete>
    </Field>
  )
}
