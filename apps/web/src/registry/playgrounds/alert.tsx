import type { ComponentProps } from "react"
import { BellIcon, XIcon } from "@phosphor-icons/react"

import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@diametral/ui/components/alert"
import { Button } from "@diametral/ui/components/button"

export default function AlertPlayground({
  children,
  ...props
}: ComponentProps<typeof Alert>) {
  return (
    <Alert {...props}>
      <BellIcon />
      <AlertTitle>{children}</AlertTitle>
      <AlertDescription>
        Tokens are wired to the Diametral charter.
      </AlertDescription>
      <AlertAction>
        <Button variant="ghost" size="icon-xs" aria-label="Dismiss">
          <XIcon />
        </Button>
      </AlertAction>
    </Alert>
  )
}
