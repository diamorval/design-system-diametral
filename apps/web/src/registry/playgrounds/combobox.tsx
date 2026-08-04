import type { ComponentProps } from "react"

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
  ComboboxSeparator,
} from "@diametral/ui/components/combobox"

type Region = { value: string; items: string[] }

const REGIONS: Region[] = [
  { value: "Nouvelle-Aquitaine", items: ["Bordeaux", "Bayonne"] },
  { value: "Occitanie", items: ["Toulouse", "Montpellier"] },
  { value: "Île-de-France", items: ["Paris", "Versailles"] },
]

const COUNT = REGIONS.reduce((total, region) => total + region.items.length, 0)

// The controls drive `ComboboxInput`, which owns this system's own additions —
// `showTrigger` and `showClear` — rather than Base UI's root props.
export default function ComboboxPlayground(
  props: ComponentProps<typeof ComboboxInput>
) {
  return (
    <Combobox items={REGIONS}>
      <ComboboxInput
        className="w-full max-w-3xs"
        placeholder="Search a city…"
        {...props}
      />
      <ComboboxContent>
        <ComboboxEmpty>No city found.</ComboboxEmpty>
        <ComboboxList>
          {(region: Region) => (
            <ComboboxGroup key={region.value} items={region.items}>
              <ComboboxLabel>{region.value}</ComboboxLabel>
              <ComboboxCollection>
                {(city: string) => (
                  <ComboboxItem key={city} value={city}>
                    {city}
                  </ComboboxItem>
                )}
              </ComboboxCollection>
            </ComboboxGroup>
          )}
        </ComboboxList>
        <ComboboxSeparator />
        <p className="px-3 py-2 text-xs text-muted-foreground">
          {COUNT} cities
        </p>
      </ComboboxContent>
    </Combobox>
  )
}
