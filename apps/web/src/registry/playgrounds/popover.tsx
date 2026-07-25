import type { ComponentProps } from "react"

import { Button } from "@workspace/ui/components/button"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@workspace/ui/components/popover"

export default function PopoverPlayground({
  children,
  ...props
}: ComponentProps<typeof PopoverContent>) {
  return (
    <Popover>
      <PopoverTrigger render={<Button variant="outline" />}>
        Open popover
      </PopoverTrigger>
      <PopoverContent {...props}>
        <PopoverHeader>
          <PopoverTitle>{children}</PopoverTitle>
          <PopoverDescription>
            Eight brand tones, each with a contrast pair.
          </PopoverDescription>
        </PopoverHeader>
      </PopoverContent>
    </Popover>
  )
}
