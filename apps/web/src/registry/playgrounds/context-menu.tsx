import type { ComponentProps } from "react"
import { CopyIcon, TrashIcon } from "@phosphor-icons/react"

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@diametral/ui/components/context-menu"

export default function ContextMenuPlayground(
  props: ComponentProps<typeof ContextMenuContent>
) {
  return (
    <ContextMenu>
      <ContextMenuTrigger
        render={
          <div className="flex h-28 w-full max-w-3xs items-center justify-center border border-dashed border-border text-sm text-muted-foreground" />
        }
      >
        Right-click here
      </ContextMenuTrigger>
      <ContextMenuContent {...props}>
        <ContextMenuItem>
          <CopyIcon /> Duplicate
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem variant="destructive">
          <TrashIcon /> Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}
