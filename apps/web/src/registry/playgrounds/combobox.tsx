import type { ComponentProps } from "react"

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@diametral/ui/components/combobox"

const CITIES = ["Bordeaux", "Lille", "Lyon", "Nantes", "Paris", "Toulouse"]

// The controls drive `ComboboxInput`, which owns this system's own additions —
// `showTrigger` and `showClear` — rather than Base UI's root props.
export default function ComboboxPlayground(
  props: ComponentProps<typeof ComboboxInput>
) {
  return (
    <Combobox items={CITIES}>
      <ComboboxInput
        className="w-full max-w-3xs"
        placeholder="Search a city…"
        {...props}
      />
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
  )
}
