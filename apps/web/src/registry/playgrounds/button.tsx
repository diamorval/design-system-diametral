import type { ComponentProps } from "react"

import { Button } from "@workspace/ui/components/button"

export default function ButtonPlayground({
  children,
  ...props
}: ComponentProps<typeof Button>) {
  return <Button {...props}>{children}</Button>
}
