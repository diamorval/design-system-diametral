import type { ComponentProps } from "react"
import { BellIcon } from "@phosphor-icons/react"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@workspace/ui/components/alert"

export default function AlertPlayground(props: ComponentProps<typeof Alert>) {
  return (
    <Alert {...props}>
      <BellIcon />
      <AlertTitle>Heads up</AlertTitle>
      <AlertDescription>
        Tokens are wired to the Diametral charter.
      </AlertDescription>
    </Alert>
  )
}
