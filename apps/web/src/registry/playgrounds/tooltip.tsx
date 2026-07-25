import type { ComponentProps } from "react"

import { Button } from "@diametral/ui/components/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@diametral/ui/components/tooltip"

// The panel drives the content's positioning, so hover the trigger to see it.
export default function TooltipPlayground({
  children,
  ...props
}: ComponentProps<typeof TooltipContent>) {
  return (
    <Tooltip>
      <TooltipTrigger render={<Button variant="outline" />}>
        Hover me
      </TooltipTrigger>
      <TooltipContent {...props}>{children}</TooltipContent>
    </Tooltip>
  )
}
