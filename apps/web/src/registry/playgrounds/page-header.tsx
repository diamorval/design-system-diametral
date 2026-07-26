import type { ComponentProps } from "react"
import { PlusIcon } from "@phosphor-icons/react"

import { Button } from "@diametral/ui/components/button"
import {
  PageHeader,
  PageHeaderActions,
  PageHeaderDescription,
  PageHeaderHeading,
  PageHeaderTitle,
} from "@diametral/ui/components/page-header"

export default function PageHeaderPlayground({
  children,
  ...props
}: ComponentProps<typeof PageHeader>) {
  return (
    <PageHeader {...props} className="w-full">
      <PageHeaderHeading>
        <div className="flex flex-col gap-1">
          <PageHeaderTitle>{children}</PageHeaderTitle>
          <PageHeaderDescription>
            Manage members, roles and billing.
          </PageHeaderDescription>
        </div>
        <PageHeaderActions>
          <Button size="sm">
            <PlusIcon /> Invite
          </Button>
        </PageHeaderActions>
      </PageHeaderHeading>
    </PageHeader>
  )
}
