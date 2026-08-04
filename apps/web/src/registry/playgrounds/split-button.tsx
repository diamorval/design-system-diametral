import type { ComponentProps } from "react"

import { DropdownMenuItem } from "@diametral/ui/components/dropdown-menu"
import { SplitButton } from "@diametral/ui/components/split-button"

export default function SplitButtonPlayground({
  children,
  ...props
}: ComponentProps<typeof SplitButton>) {
  return (
    <SplitButton
      {...props}
      menu={
        <>
          <DropdownMenuItem>Save and duplicate</DropdownMenuItem>
          <DropdownMenuItem>Save as template</DropdownMenuItem>
        </>
      }
    >
      {children}
    </SplitButton>
  )
}
