import * as React from "react"

import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@diametral/ui/components/menubar"

export default function MenubarWithState() {
  const [showRail, setShowRail] = React.useState(true)
  const [theme, setTheme] = React.useState("system")

  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>View</MenubarTrigger>
        <MenubarContent>
          <MenubarCheckboxItem checked={showRail} onCheckedChange={setShowRail}>
            Show sidebar rail
          </MenubarCheckboxItem>
          <MenubarSeparator />
          {/* The label is a group part, so it goes *inside* the radio group it
              labels — outside it there is no group context and it throws. */}
          <MenubarRadioGroup value={theme} onValueChange={setTheme}>
            <MenubarLabel>Theme</MenubarLabel>
            <MenubarRadioItem value="light">Light</MenubarRadioItem>
            <MenubarRadioItem value="dark">Dark</MenubarRadioItem>
            <MenubarRadioItem value="system">System</MenubarRadioItem>
          </MenubarRadioGroup>
        </MenubarContent>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger>Help</MenubarTrigger>
        <MenubarContent>
          <MenubarSub>
            <MenubarSubTrigger>Documentation</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>Getting started</MenubarItem>
              <MenubarItem>Charter tokens</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarItem>Keyboard shortcuts</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}
