import * as React from "react"
import {
  BellIcon,
  CheckIcon,
  CopyIcon,
  type Icon as PhosphorIcon,
} from "@phosphor-icons/react"

// A typed name → component registry over @phosphor-icons/react. Add an entry
// here (import + key) as a consuming component needs one — only the icons
// listed get bundled, unlike v1's hand-drawn SVG map which shipped every icon
// unconditionally.
const icons = {
  bell: BellIcon,
  check: CheckIcon,
  copy: CopyIcon,
} satisfies Record<string, PhosphorIcon>

type IconName = keyof typeof icons

function Icon({
  name,
  ...props
}: { name: IconName } & React.ComponentProps<PhosphorIcon>) {
  const Component = icons[name]
  return <Component data-slot="icon" {...props} />
}

export { Icon, icons }
export type { IconName }
