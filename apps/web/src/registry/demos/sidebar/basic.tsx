import { FileTextIcon, GearIcon, HouseIcon } from "@phosphor-icons/react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@diametral/ui/components/sidebar"

export default function SidebarBasic() {
  return (
    <SidebarProvider className="min-h-56 w-full border border-border">
      <Sidebar collapsible="none" className="w-52">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Workspace</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton isActive>
                    <HouseIcon /> Dashboard
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <FileTextIcon /> Documents
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <GearIcon /> Settings
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarInset className="p-4">
        <p className="text-sm text-muted-foreground">Inset content area.</p>
      </SidebarInset>
    </SidebarProvider>
  )
}
