import * as React from "react"

import {
  ThemeSwitcher,
  type ThemeSwitcherMode,
} from "@diametral/ui/components/theme-switcher"

// Fully controlled, so the demo holds its own state rather than touching
// the real app theme — clicking this preview never flips the docs site.
export default function ThemeSwitcherBasic() {
  const [mode, setMode] = React.useState<ThemeSwitcherMode>("system")

  return <ThemeSwitcher value={mode} onValueChange={setMode} />
}
