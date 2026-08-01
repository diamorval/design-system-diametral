import * as React from "react"

import {
  ThemeSwitcher,
  type ThemeSwitcherMode,
} from "@diametral/ui/components/theme-switcher"

// The icon shows the CURRENT mode; the accessible name announces the action
// ("Switch to dark"), because a click advances light → dark → system → light.
export default function ThemeSwitcherCycle() {
  const [mode, setMode] = React.useState<ThemeSwitcherMode>("light")

  return <ThemeSwitcher variant="cycle" value={mode} onValueChange={setMode} />
}
