import type { ComponentProps } from "react"

import { Button } from "@diametral/ui/components/button"
import { Label } from "@diametral/ui/components/label"
import {
  Panel,
  PanelContent,
  PanelFooter,
  PanelHeader,
  PanelRow,
  PanelTitle,
} from "@diametral/ui/components/panel"
import { Switch } from "@diametral/ui/components/switch"

// The template renders every Panel part: the Workbench's code strip doubles as
// the anatomy navigator, so a part missing here would not be selectable.
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
        <p className="px-(--panel-spacing) pb-3 text-muted-foreground">
          Choose which updates land in your inbox.
        </p>
        <PanelRow>
          <Label htmlFor="panel-playground-switch">Email alerts</Label>
          <Switch id="panel-playground-switch" defaultChecked />
        </PanelRow>
      </PanelContent>
      <PanelFooter className="border-t">
        <Button size="sm" variant="outline">
          Manage
        </Button>
      </PanelFooter>
    </Panel>
  )
}
