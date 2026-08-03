import {
  FileTextIcon,
  HouseIcon,
  LifebuoyIcon,
  UsersIcon,
} from "@phosphor-icons/react"

import { Avatar, AvatarFallback } from "@diametral/ui/components/avatar"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarSeparator,
} from "@diametral/ui/components/sidebar"

const WORKSPACE = [
  { title: "Dashboard", icon: HouseIcon, active: true },
  { title: "Documents", icon: FileTextIcon, active: false },
  { title: "Members", icon: UsersIcon, active: false },
]

export default function SidebarShell() {
  return (
    <SidebarProvider className="min-h-72 w-full border border-border">
      <Sidebar collapsible="none" className="w-56">
        <SidebarHeader>
          <SidebarInput
            aria-label="Search the workspace"
            placeholder="Search…"
          />
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Workspace</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {WORKSPACE.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton isActive={item.active}>
                      <item.icon /> {item.title}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarSeparator />
          <SidebarGroup>
            <SidebarGroupLabel>Support</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <LifebuoyIcon /> Help centre
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg">
                <Avatar className="size-7">
                  <AvatarFallback>CR</AvatarFallback>
                </Avatar>
                <span className="flex flex-col text-start">
                  <span>Camille Roux</span>
                  <span className="text-xs text-muted-foreground">
                    camille@diametral.fr
                  </span>
                </span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset className="p-4">
        <p className="text-sm text-muted-foreground">
          Nine documents updated since Monday.
        </p>
      </SidebarInset>
    </SidebarProvider>
  )
}
