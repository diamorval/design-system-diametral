import { XIcon } from "@phosphor-icons/react"

import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@workspace/ui/components/alert"
import { Button } from "@workspace/ui/components/button"

// `AlertAction` is absolutely positioned; the alert reserves the space for it
// with `has-data-[slot=alert-action]:pe-18`, so the text never runs underneath.
export default function AlertWithAction() {
  return (
    <div className="flex w-full max-w-xl flex-col gap-4">
      <Alert>
        <AlertTitle>Two seats left on this plan</AlertTitle>
        <AlertDescription>
          Invite the rest of the team before the trial ends on 12 August.
        </AlertDescription>
        <AlertAction>
          <Button variant="ghost" size="icon-xs" aria-label="Dismiss">
            <XIcon />
          </Button>
        </AlertAction>
      </Alert>

      <Alert>
        <AlertTitle>Title only</AlertTitle>
      </Alert>
    </div>
  )
}
