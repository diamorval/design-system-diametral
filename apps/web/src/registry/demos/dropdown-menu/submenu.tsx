import { ShareNetworkIcon, UserPlusIcon } from "@phosphor-icons/react"

import { Button } from "@workspace/ui/components/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu"

// Submenus open to `inline-end` by default, which flips with direction — an RTL
// locale gets them on the correct side with no extra prop.
export default function DropdownMenuSubmenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" size="sm" />}>
        Share
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <UserPlusIcon /> Invite by email
        </DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <ShareNetworkIcon /> Copy link
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem>Anyone with the link</DropdownMenuItem>
            <DropdownMenuItem>Only my organisation</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Restricted</DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
