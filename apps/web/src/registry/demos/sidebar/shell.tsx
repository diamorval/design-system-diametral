import {
  DotsThreeIcon,
  FileTextIcon,
  HouseIcon,
  LifebuoyIcon,
  PlusIcon,
  UsersIcon,
} from "@phosphor-icons/react"

import { Avatar, AvatarFallback } from "@diametral/ui/components/avatar"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
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
            <SidebarGroupAction aria-label="New document">
              <PlusIcon />
            </SidebarGroupAction>
            <SidebarGroupContent>
              <SidebarMenu>
                {WORKSPACE.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton isActive={item.active}>
                      <item.icon /> {item.title}
                    </SidebarMenuButton>
                    <SidebarMenuAction aria-label={`Options for ${item.title}`}>
                      <DotsThreeIcon />
                    </SidebarMenuAction>
                  </SidebarMenuItem>
                ))}
                {/* What a menu row looks like before its data arrives. */}
                <SidebarMenuItem>
                  <SidebarMenuSkeleton showIcon />
                </SidebarMenuItem>
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
