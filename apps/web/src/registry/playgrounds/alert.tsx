import type { ComponentProps } from "react"
import { BellIcon } from "@phosphor-icons/react"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@diametral/ui/components/alert"

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
    </Alert>
  )
}
