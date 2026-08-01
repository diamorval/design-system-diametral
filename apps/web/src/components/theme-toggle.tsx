import { ThemeSwitcher } from "@diametral/ui/components/theme-switcher"

import { useTheme } from "@/components/theme-provider"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return <ThemeSwitcher value={theme} onValueChange={setTheme} />
}
