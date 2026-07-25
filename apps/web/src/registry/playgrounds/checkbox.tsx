import type { ComponentProps } from "react"

import { Checkbox } from "@workspace/ui/components/checkbox"
import { Label } from "@workspace/ui/components/label"

export default function CheckboxPlayground({
  children,
  ...props
}: ComponentProps<typeof Checkbox>) {
  return (
    <div className="flex items-center gap-2">
      <Checkbox id="checkbox-playground" {...props} />
      <Label htmlFor="checkbox-playground">{children}</Label>
    </div>
  )
}
