import { CaretDownIcon, RocketLaunchIcon } from "@phosphor-icons/react"

import { Button } from "@diametral/ui/components/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@diametral/ui/components/dropdown-menu"

export default function DropdownMenuMixedRows() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" size="sm" />}>
        Deploy <CaretDownIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuLabel inset>charte-web</DropdownMenuLabel>
          <DropdownMenuItem>
            <RocketLaunchIcon /> Deploy to staging
          </DropdownMenuItem>
          <DropdownMenuItem inset>Re-run last build</DropdownMenuItem>
          <DropdownMenuItem inset disabled>
            Promote to production
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem inset>
          Build log
          <DropdownMenuShortcut>⌘L</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
