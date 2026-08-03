import { FileTextIcon, GearIcon, HouseIcon } from "@phosphor-icons/react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@diametral/ui/components/sidebar"

const ITEMS = [
  { title: "Dashboard", icon: HouseIcon, active: true },
  { title: "Documents", icon: FileTextIcon, active: false },
  { title: "Settings", icon: GearIcon, active: false },
]

export default function SidebarCollapsibleIcon() {
  return (
    <SidebarProvider className="min-h-56 w-full border border-border">
      <Sidebar collapsible="icon">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {ITEMS.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      isActive={item.active}
                      tooltip={item.title}
                    >
                      <item.icon /> {item.title}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        {/* The rail is the sidebar's own edge: it needs a collapsible sidebar to
            position against, which is why it lives here rather than in the shell. */}
        <SidebarRail />
      </Sidebar>
      <SidebarInset className="p-4">
        <SidebarTrigger />
        <p className="mt-3 text-sm text-muted-foreground">
          Toggle the trigger, or the rail down the sidebar’s edge, to collapse
          it to icons.
        </p>
      </SidebarInset>
    </SidebarProvider>
  )
}
