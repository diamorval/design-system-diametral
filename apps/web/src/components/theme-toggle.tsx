import { MonitorIcon, MoonIcon, SunIcon } from "@phosphor-icons/react"

import {
  ToggleGroup,
  ToggleGroupItem,
} from "@diametral/ui/components/toggle-group"

import { useTheme, type Theme } from "@/components/theme-provider"

const MODES = [
  { value: "light", label: "Light", Icon: SunIcon },
  { value: "dark", label: "Dark", Icon: MoonIcon },
  { value: "system", label: "System", Icon: MonitorIcon },
] satisfies { value: Theme; label: string; Icon: typeof SunIcon }[]

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <ToggleGroup
      variant="outline"
      size="sm"
      // gap-0 joins the three cells into one control; -ms-px then collapses the
      // doubled seam where two 1px borders meet.
      className="gap-0"
      value={[theme]}
      onValueChange={(next) => {
        // Base UI unpresses an already-pressed item, which would leave the
        // group empty — a theme is never "none", so that click is a no-op.
        const [value] = next
        if (value) setTheme(value as Theme)
      }}
      aria-label="Theme"
    >
      {MODES.map(({ value, label, Icon }) => (
        <ToggleGroupItem
          key={value}
          value={value}
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
