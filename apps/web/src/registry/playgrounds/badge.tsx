import type { ComponentProps } from "react"

import { Badge } from "@workspace/ui/components/badge"

export default function BadgePlayground(props: ComponentProps<typeof Badge>) {
  return <Badge {...props}>In review</Badge>
}
