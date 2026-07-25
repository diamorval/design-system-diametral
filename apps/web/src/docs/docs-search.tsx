import * as React from "react"
import { useNavigate } from "react-router"
import { MagnifyingGlassIcon } from "@phosphor-icons/react"

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@diametral/ui/components/command"
import { Kbd, KbdGroup } from "@diametral/ui/components/kbd"

import { componentsByCategory } from "@/registry/registry"

// cmdk does the filtering, so the full grouped list is built once.
const GROUPS = componentsByCategory()

export function DocsSearch() {
  const [open, setOpen] = React.useState(false)
  const navigate = useNavigate()

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
      {/* Shaped like the Input rather than the Button: this is a field
          affordance, and Button's uppercase industrial type would read wrong on
          a placeholder. */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex h-9 w-full max-w-56 items-center gap-2 border border-transparent border-b-input bg-transparent text-sm text-muted-foreground transition-[color,border-color] outline-none hover:border-b-ring focus-visible:border-b-ring"
      >
        <MagnifyingGlassIcon className="size-3.5 shrink-0" />
        <span className="flex-1 text-start">Search components…</span>
        <KbdGroup>
          <Kbd>⌘</Kbd>
          <Kbd>K</Kbd>
        </KbdGroup>
      </button>

      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        title="Search components"
        description="Find a component by name, slug or category."
      >
        <Command>
          <CommandInput placeholder="Search components…" />
          <CommandList>
            <CommandEmpty>No component matches.</CommandEmpty>
            {GROUPS.map((group) => (
              <CommandGroup key={group.category} heading={group.category}>
                {group.items.map((component) => {
                  const count = component.examples?.length ?? 0
                  return (
                    <CommandItem
                      key={component.slug}
                      // cmdk searches the item's text content by default, which
                      // would match on the usage count; an explicit value keeps
                      // the haystack to name, slug and category.
                      value={`${component.name} ${component.slug} ${group.category}`}
                      onSelect={() => {
                        setOpen(false)
                        navigate(`/docs/${component.slug}`)
                      }}
                    >
                      {component.name}
                      {count > 0 ? (
                        <CommandShortcut>{count}</CommandShortcut>
                      ) : null}
                    </CommandItem>
                  )
                })}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  )
}
