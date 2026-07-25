import * as React from "react"

import { Button } from "@diametral/ui/components/button"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@diametral/ui/components/command"
import { Kbd, KbdGroup } from "@diametral/ui/components/kbd"

const COMPONENTS = ["Button", "Badge", "Dialog", "Popover", "Tooltip"]

// `CommandDialog` takes Dialog's props but supplies its own content wrapper, so
// the palette sits at a third of the viewport height rather than dead centre.
export default function CommandDialogDemo() {
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        setOpen((value) => !value)
      }
    }
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [])

  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>
        Open palette
        <KbdGroup>
          <Kbd>⌘</Kbd>
          <Kbd>K</Kbd>
        </KbdGroup>
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command>
          <CommandInput placeholder="Search components…" />
          <CommandList>
            <CommandEmpty>No components match.</CommandEmpty>
            <CommandGroup heading="Components">
              {COMPONENTS.map((name) => (
                <CommandItem key={name} onSelect={() => setOpen(false)}>
                  {name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  )
}
