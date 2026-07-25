import { CheckIcon } from "@phosphor-icons/react"

import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
} from "@workspace/ui/components/avatar"

// `AvatarBadge` sizes itself from the avatar's `data-size` rather than taking a
// size of its own, and hides its icon at `sm` where it would be illegible.
export default function AvatarSizes() {
  return (
    <div className="flex items-end gap-4">
      <Avatar size="sm">
        <AvatarFallback>SM</AvatarFallback>
        <AvatarBadge />
      </Avatar>
      <Avatar>
        <AvatarFallback>MD</AvatarFallback>
        <AvatarBadge>
          <CheckIcon />
        </AvatarBadge>
      </Avatar>
      <Avatar size="lg">
        <AvatarFallback>LG</AvatarFallback>
        <AvatarBadge>
          <CheckIcon />
        </AvatarBadge>
      </Avatar>
    </div>
  )
}
