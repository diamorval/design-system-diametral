import {
  Combobox,
  ComboboxCollection,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
} from "@diametral/ui/components/combobox"
import { Field, FieldLabel } from "@diametral/ui/components/field"

type Team = { value: string; items: string[] }

const TEAMS: Team[] = [
  {
    value: "Design",
    items: ["Augustin Morval", "Camille Ferrand", "Inès Ruiz"],
  },
  {
    value: "Engineering",
    items: ["Bastien Lefort", "Dorra Ben Salah", "Noé Guérin"],
  },
  { value: "Product", items: ["Salomé Vidal"] },
]

export default function ComboboxGrouped() {
  return (
    <Field className="max-w-sm">
      <FieldLabel>Assignee</FieldLabel>
      <Combobox items={TEAMS}>
        <ComboboxInput placeholder="Search people…" showClear />
        <ComboboxContent>
          <ComboboxEmpty>Nobody matches.</ComboboxEmpty>
          <ComboboxList>
            {(team: Team) => (
              <ComboboxGroup key={team.value} items={team.items}>
                <ComboboxLabel>{team.value}</ComboboxLabel>
                <ComboboxCollection>
                  {(person: string) => (
                    <ComboboxItem key={person} value={person}>
                      {person}
                    </ComboboxItem>
                  )}
                </ComboboxCollection>
              </ComboboxGroup>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </Field>
  )
}
