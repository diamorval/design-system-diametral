import * as React from "react"
import { Link, Outlet, useLocation } from "react-router"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@workspace/ui/components/sidebar"

import { ThemeToggle } from "@/components/theme-toggle"
import { DocsSearch } from "@/docs/docs-search"
import { componentsByCategory } from "@/registry/registry"

function matches(query: string) {
  const needle = query.trim().toLowerCase()
  if (!needle) return () => true
  return (component: { name: string; slug: string; category: string }) =>
    component.name.toLowerCase().includes(needle) ||
    component.slug.includes(needle) ||
    component.category.toLowerCase().includes(needle)
}

export function DocsLayout() {
  const [query, setQuery] = React.useState("")
  const { pathname } = useLocation()

  const groups = React.useMemo(() => {
    const predicate = matches(query)
    return componentsByCategory()
      .map((group) => ({ ...group, items: group.items.filter(predicate) }))
      .filter((group) => group.items.length > 0)
  }, [query])

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="gap-3">
          <Link to="/" className="flex flex-col">
            <span className="font-heading text-sm font-semibold tracking-wider uppercase">
              Diametral
            </span>
            <span className="text-xs text-muted-foreground">
              Design system · 72 components
            </span>
          </Link>
          <SidebarInput
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Filter components…"
            aria-label="Filter components"
          />
        </SidebarHeader>
        <SidebarContent>
          {groups.length === 0 ? (
            <p className="px-4 py-3 text-xs text-muted-foreground">
              No component matches “{query}”.
            </p>
          ) : null}
          {groups.map((group) => (
            <SidebarGroup key={group.category}>
              <SidebarGroupLabel>{group.category}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {group.items.map((component) => {
                    const to = `/docs/${component.slug}`
                    const count = component.examples?.length ?? 0
                    return (
                      <SidebarMenuItem key={component.slug}>
                        <SidebarMenuButton
                          isActive={pathname === to}
                          render={<Link to={to} />}
                        >
                          {component.name}
                        </SidebarMenuButton>
                        {/* The example count doubles as the coverage map: a
                            missing badge means the page has no usages yet. */}
                        {count > 0 ? (
                          <SidebarMenuBadge>{count}</SidebarMenuBadge>
                        ) : null}
                      </SidebarMenuItem>
                    )
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </SidebarContent>
      </Sidebar>

      <SidebarInset>
        <header className="sticky top-0 z-10 flex items-center gap-3 border-b border-border bg-background/85 px-6 py-3 backdrop-blur">
          <SidebarTrigger />
          <DocsSearch />
          <div className="flex-1" />
          <Link
            to="/showcase"
            className="text-xs text-muted-foreground underline-offset-4 hover:underline"
          >
            Legacy showcase
          </Link>
          <ThemeToggle />
        </header>
        <main className="mx-auto w-full max-w-5xl px-6 py-10">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
