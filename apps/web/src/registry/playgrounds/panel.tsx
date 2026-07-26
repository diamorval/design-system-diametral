import type { ComponentProps } from "react"

import { Label } from "@diametral/ui/components/label"
import {
  Panel,
  PanelContent,
  PanelHeader,
  PanelRow,
  PanelTitle,
} from "@diametral/ui/components/panel"
import { Switch } from "@diametral/ui/components/switch"

export default function PanelPlayground({
  children,
  ...props
}: ComponentProps<typeof Panel>) {
  return (
    <Panel {...props} className="w-full max-w-sm">
      <PanelHeader className="border-b">
        <PanelTitle>{children}</PanelTitle>
      </PanelHeader>
      <PanelContent className="px-0">
        <PanelRow>
          <Label htmlFor="panel-playground-switch">Email alerts</Label>
          <Switch id="panel-playground-switch" defaultChecked />
        </PanelRow>
      </PanelContent>
    </Panel>
  )
}
