import * as React from "react"

import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@workspace/ui/components/context-menu"

export default function ContextMenuWithSubmenu() {
  const [pinned, setPinned] = React.useState(true)

  return (
    <ContextMenu>
      <ContextMenuTrigger
        render={
          <div className="flex h-32 w-full max-w-sm items-center justify-center border border-dashed border-border text-sm text-muted-foreground" />
        }
      >
        Right-click for more
      </ContextMenuTrigger>
      <ContextMenuContent>
        {/* A label is a group part in Base UI, so it needs a group around it —
            directly in the content it throws when the menu opens. */}
        <ContextMenuGroup>
          <ContextMenuLabel>charte-2026.pdf</ContextMenuLabel>
          <ContextMenuCheckboxItem checked={pinned} onCheckedChange={setPinned}>
            Pinned
          </ContextMenuCheckboxItem>
        </ContextMenuGroup>
        <ContextMenuSeparator />
        <ContextMenuSub>
          <ContextMenuSubTrigger>Move to</ContextMenuSubTrigger>
          <ContextMenuSubContent>
            <ContextMenuItem>Projects</ContextMenuItem>
            <ContextMenuItem>Archive</ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuItem>Download</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}
