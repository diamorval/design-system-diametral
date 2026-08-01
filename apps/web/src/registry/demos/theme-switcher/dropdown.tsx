import * as React from "react"

import {
  ThemeSwitcher,
  type ThemeSwitcherMode,
} from "@diametral/ui/components/theme-switcher"

// Every mode is one click away and visible before choosing — the trade
// against the cycle form, which is narrower but reveals one mode at a time.
export default function ThemeSwitcherDropdown() {
  const [mode, setMode] = React.useState<ThemeSwitcherMode>("system")

  return (
    <ThemeSwitcher variant="dropdown" value={mode} onValueChange={setMode} />
  )
}
