import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@workspace/ui/components/combobox"
import { Field, FieldLabel } from "@workspace/ui/components/field"

const CITIES = [
  "Bordeaux",
  "Lille",
  "Lyon",
  "Marseille",
  "Nantes",
  "Paris",
  "Strasbourg",
  "Toulouse",
]

// `items` on the root is what gives Base UI the list to filter — the rendered
// `ComboboxItem`s are the view, not the source of truth.
export default function ComboboxBasic() {
  return (
    <Field className="max-w-sm">
      <FieldLabel>City</FieldLabel>
      <Combobox items={CITIES}>
        <ComboboxInput placeholder="Search a city…" showClear />
        <ComboboxContent>
          <ComboboxEmpty>No city found.</ComboboxEmpty>
          <ComboboxList>
            {(city: string) => (
              <ComboboxItem key={city} value={city}>
                {city}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </Field>
  )
}
