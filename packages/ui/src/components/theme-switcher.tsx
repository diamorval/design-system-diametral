import * as React from "react"
import { MonitorIcon, MoonIcon, SunIcon } from "@phosphor-icons/react"

import { cn } from "../lib/utils.js"
import { ToggleGroup, ToggleGroupItem } from "./toggle-group.js"

type ThemeSwitcherMode = "light" | "dark" | "system"

const MODES = [
  { value: "light", label: "Light", Icon: SunIcon },
  { value: "dark", label: "Dark", Icon: MoonIcon },
  { value: "system", label: "System", Icon: MonitorIcon },
] satisfies { value: ThemeSwitcherMode; label: string; Icon: typeof SunIcon }[]

// Fully controlled: the theme itself (storage, media-query sync, system
// resolution) is app wiring, not the design system's job — the consumer
// owns a useTheme()-style hook and passes it straight through.
function ThemeSwitcher({
  value,
  onValueChange,
  className,
  ...props
}: {
  value: ThemeSwitcherMode
  onValueChange: (value: ThemeSwitcherMode) => void
} & Omit<
  React.ComponentProps<typeof ToggleGroup>,
  "value" | "onValueChange" | "children"
>) {
  return (
    <ToggleGroup
      data-slot="theme-switcher"
      variant="outline"
      size="sm"
      // gap-0 joins the three cells into one control; -ms-px then collapses
      // the doubled seam where two 1px borders meet.
      className={cn("gap-0", className)}
      value={[value]}
      onValueChange={(next) => {
        // Base UI unpresses an already-pressed item, which would leave the
        // group empty — a theme is never "none", so that click is a no-op.
        const [nextValue] = next
        if (nextValue) onValueChange(nextValue as ThemeSwitcherMode)
      }}
      aria-label="Theme"
      {...props}
    >
      {MODES.map(({ value: mode, label, Icon }) => (
        <ToggleGroupItem
          key={mode}
          value={mode}
          aria-label={label}
          title={label}
          className="-ms-px w-9 px-0 first:ms-0"
        >
          <Icon />
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  )
}

export { ThemeSwitcher }
export type { ThemeSwitcherMode }
