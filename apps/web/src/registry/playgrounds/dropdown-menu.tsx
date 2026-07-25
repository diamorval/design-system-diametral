import type { ComponentProps } from "react"
import {
  DotsThreeIcon,
  PencilSimpleIcon,
  TrashIcon,
} from "@phosphor-icons/react"

import { Button } from "@diametral/ui/components/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@diametral/ui/components/dropdown-menu"

export default function DropdownMenuPlayground(
  props: ComponentProps<typeof DropdownMenuContent>
) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="outline" size="icon-sm" aria-label="Actions" />
        }
      >
        <DotsThreeIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent {...props}>
        {/* A label is a *group* part in Base UI, so it has to sit inside a
            DropdownMenuGroup — placing it directly in the content throws on open. */}
        <DropdownMenuGroup>
          <DropdownMenuLabel>Document</DropdownMenuLabel>
          <DropdownMenuItem>
            <PencilSimpleIcon /> Rename
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">
          <TrashIcon /> Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
