import type { ComponentProps } from "react"

import { Avatar, AvatarFallback } from "@workspace/ui/components/avatar"

export default function AvatarPlayground({
  children,
  ...props
}: ComponentProps<typeof Avatar>) {
  return (
    <Avatar {...props}>
      <AvatarFallback>{children}</AvatarFallback>
    </Avatar>
  )
}
