import type { ComponentProps } from "react"
import { HouseIcon } from "@phosphor-icons/react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@diametral/ui/components/sidebar"

export default function SidebarPlayground({
  children,
  ...props
}: ComponentProps<typeof SidebarMenuButton>) {
  return (
    <SidebarProvider className="min-h-40 w-full border border-border">
      <Sidebar collapsible="none" className="w-52">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton {...props}>
                    <HouseIcon /> {children}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  )
}
