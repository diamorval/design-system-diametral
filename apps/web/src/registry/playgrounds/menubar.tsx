import type { ComponentProps } from "react"

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@diametral/ui/components/menubar"

export default function MenubarPlayground(
  props: ComponentProps<typeof Menubar>
) {
  return (
    <Menubar {...props}>
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            New project <MenubarShortcut>⌘N</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem variant="destructive">Close project</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Edit</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            Undo <MenubarShortcut>⌘Z</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}
