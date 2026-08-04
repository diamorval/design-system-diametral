import type { ComponentProps } from "react"
import { GearIcon, PaletteIcon, PlusIcon } from "@phosphor-icons/react"

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@diametral/ui/components/command"

// cmdk's own props: turning `shouldFilter` off is how you hand filtering to a
// server, and `loop` wraps arrow-key selection at the ends of the list.
export default function CommandPlayground(
  props: ComponentProps<typeof Command>
) {
  return (
    <Command className="w-full max-w-3xs border border-border" {...props}>
      <CommandInput placeholder="Type a command…" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Actions">
          <CommandItem>
            <PlusIcon /> New project
            <CommandShortcut>⌘N</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <PaletteIcon /> Change theme
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem>
            <GearIcon /> Preferences
            <CommandShortcut>⌘,</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  )
}
