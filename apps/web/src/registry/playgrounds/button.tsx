import type { ComponentProps } from "react"

import { Button } from "@workspace/ui/components/button"

export default function ButtonPlayground(props: ComponentProps<typeof Button>) {
  return <Button {...props}>Save changes</Button>
}
