import type { ComponentProps } from "react"

import { Badge } from "@workspace/ui/components/badge"

export default function BadgePlayground({
  children,
  ...props
}: ComponentProps<typeof Badge>) {
  return <Badge {...props}>{children}</Badge>
}
