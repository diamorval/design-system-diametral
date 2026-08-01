import type { ReactNode } from "react"
import { GearIcon, UsersIcon } from "@phosphor-icons/react"

import { Button } from "@diametral/ui/components/button"
import {
  PageHeader,
  PageHeaderActions,
  PageHeaderDescription,
  PageHeaderHeading,
  PageHeaderIcon,
  PageHeaderTitle,
} from "@diametral/ui/components/page-header"

const ICONS = { UsersIcon, GearIcon }

// The panel passes the icon through as a component *name*; `{icon}` below is the
// marker it substitutes as `<UsersIcon />` in the generated snippet, so the
// element has to be built here rather than written inline.
export default function PageHeaderPlayground({
  children,
  icon: iconName = "UsersIcon",
  description = "Manage members, roles and billing.",
  action = "Invite",
}: {
  children?: ReactNode
  icon?: keyof typeof ICONS
  description?: string
  action?: string
}) {
  const IconComponent = ICONS[iconName]
  const icon = <IconComponent />

  return (
    <PageHeader className="w-full">
      <PageHeaderHeading>
        <div className="flex items-start gap-3">
          <PageHeaderIcon>
            {icon}
          </PageHeaderIcon>
          <div className="flex flex-col gap-1">
            <PageHeaderTitle>{children}</PageHeaderTitle>
            <PageHeaderDescription>{description}</PageHeaderDescription>
          </div>
        </div>
        <PageHeaderActions>
          <Button size="sm">{action}</Button>
        </PageHeaderActions>
      </PageHeaderHeading>
    </PageHeader>
  )
}
