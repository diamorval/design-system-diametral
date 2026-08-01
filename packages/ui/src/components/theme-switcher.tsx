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
      // the doubled seam where two 1px borders meet. relative anchors the
      // sliding indicator.
      className={cn("relative gap-0", className)}
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
      {/* The muted fill slides between cells instead of teleporting. Pitch is
          w-9 minus the 1px seam each non-first cell pulls back with -ms-px.
          First in the DOM so the cells' borders and icons paint above it. */}
      <span
        aria-hidden="true"
        style={
          {
            "--index": MODES.findIndex((m) => m.value === value),
          } as React.CSSProperties
        }
        className="absolute inset-y-0 start-0 w-9 translate-x-[calc(var(--index)*(--spacing(9)-1px))] bg-muted transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none rtl:-translate-x-[calc(var(--index)*(--spacing(9)-1px))]"
      />
      {MODES.map(({ value: mode, label, Icon }) => (
        <ToggleGroupItem
          key={mode}
          value={mode}
          aria-label={label}
          title={label}
          // The sliding indicator owns the pressed fill, so the item's own
          // bg-muted is switched off — otherwise the fill would appear on the
          // target cell before the indicator arrives. relative keeps the cell
          // painting above the positioned indicator (DOM order decides).
          className="relative -ms-px w-9 px-0 text-muted-foreground first:ms-0 aria-pressed:bg-transparent data-[state=on]:bg-transparent"
        >
          <Icon weight={mode === value ? "fill" : "regular"} />
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  )
}

export { ThemeSwitcher }
export type { ThemeSwitcherMode }
