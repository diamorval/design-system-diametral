"use client"

import * as React from "react"
import { Menu as MenuPrimitive } from "@base-ui/react/menu"
import { XIcon } from "@phosphor-icons/react"

import { Button } from "./button.js"
import { cn } from "../lib/utils.js"

// A floating action button whose actions fan out on open, ported from daisyUI's
// `fab` (https://daisyui.com/components/fab/). daisyUI builds it out of CSS
// alone: a `tabindex="0"` div plus `:focus-within`, which has no Escape, no
// focus return and no menu role. That mechanism is dropped for Base UI's Menu —
// the same primitive `DropdownMenu` runs on — so the keyboard contract comes
// free and only the layout is ported.
//
// The trigger is the root: it carries the positioning, so `className` moves the
// dial. The default is `fixed`, which is what a FAB wants; a demo or a scoped
// region overrides it with `absolute` and tailwind-merge drops the `fixed`.
function SpeedDial({
  label,
  icon,
  tone,
  children,
  side = "top",
  align = "end",
  sideOffset = 8,
  className,
  ...props
}: Omit<MenuPrimitive.Root.Props, "children"> & {
  /** `SpeedDialAction`s, revealed on open. */
  children?: React.ReactNode
  /** Accessible name for the trigger, which has no visible text. */
  label: string
  /** The closed-state glyph. Swapped for an X while open. */
  icon?: React.ReactNode
  tone?: React.ComponentProps<typeof Button>["tone"]
  side?: MenuPrimitive.Positioner.Props["side"]
  align?: MenuPrimitive.Positioner.Props["align"]
  sideOffset?: number
  className?: string
}) {
  return (
    <MenuPrimitive.Root {...props}>
      <MenuPrimitive.Trigger
        render={
          <Button
            data-slot="speed-dial"
            size="icon-lg"
            tone={tone}
            aria-label={label}
            className={cn("fixed end-6 bottom-6 z-40", className)}
          >
            {/* Both glyphs render and CSS picks one: `aria-expanded` lands on
                the trigger, so the swap needs no open state of its own. */}
            <span className="contents group-aria-expanded/button:hidden">
              {icon}
            </span>
            <XIcon className="hidden group-aria-expanded/button:block" />
          </Button>
        }
      />
      <MenuPrimitive.Portal>
        <MenuPrimitive.Positioner
          className="isolate z-50 outline-none"
          side={side}
          align={align}
          sideOffset={sideOffset}
        >
          <MenuPrimitive.Popup
            data-slot="speed-dial-actions"
            className="flex flex-col items-end gap-2 rounded-none bg-transparent outline-none data-open:animate-in data-open:fade-in-0 data-open:slide-in-from-bottom-2 data-closed:animate-out data-closed:fade-out-0 data-closed:slide-out-to-bottom-2"
          >
            {children}
          </MenuPrimitive.Popup>
        </MenuPrimitive.Positioner>
      </MenuPrimitive.Portal>
    </MenuPrimitive.Root>
  )
}

// One action: its label as a chip and its glyph in a box the size of the
// trigger, so the column lines up under the dial. The whole row is the
// menuitem — the visible label is the accessible name, which is why the glyph
// needs none of its own.
function SpeedDialAction({
  icon,
  children,
  className,
  ...props
}: MenuPrimitive.Item.Props & {
  icon?: React.ReactNode
}) {
  return (
    <MenuPrimitive.Item
      data-slot="speed-dial-action"
      className={cn(
        "group/speed-dial-action flex cursor-default items-center gap-2 rounded-none outline-none data-disabled:pointer-events-none data-disabled:opacity-50",
        className
      )}
      {...props}
    >
      <span className="bg-foreground px-3 py-1.5 text-xs font-semibold tracking-widest text-background uppercase">
        {children}
      </span>
      <span className="flex size-11 shrink-0 items-center justify-center border border-border bg-background text-foreground transition-colors group-focus/speed-dial-action:border-foreground group-focus/speed-dial-action:bg-foreground group-focus/speed-dial-action:text-background [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0">
        {icon}
      </span>
    </MenuPrimitive.Item>
  )
}

export { SpeedDial, SpeedDialAction }
