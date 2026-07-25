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
  SidebarTrigger,
} from "@workspace/ui/components/sidebar"

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
                    {/* `tooltip` is what keeps the label reachable once the
                        sidebar collapses to a rail of icons. */}
                    <SidebarMenuButton isActive={item.active} tooltip={item.title}>
                      <item.icon /> {item.title}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarInset className="p-4">
        <SidebarTrigger />
        <p className="mt-3 text-sm text-muted-foreground">
          Toggle the trigger to collapse the sidebar to icons.
        </p>
      </SidebarInset>
    </SidebarProvider>
  )
}
