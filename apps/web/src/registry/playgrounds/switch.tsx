import type { ComponentProps } from "react"

import { Label } from "@workspace/ui/components/label"
import { Switch } from "@workspace/ui/components/switch"

export default function SwitchPlayground(props: ComponentProps<typeof Switch>) {
  return (
    <div className="flex items-center gap-2">
      <Switch id="switch-playground" {...props} />
      <Label htmlFor="switch-playground">Email notifications</Label>
    </div>
  )
}
