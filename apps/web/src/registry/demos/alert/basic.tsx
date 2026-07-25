import { InfoIcon, WarningCircleIcon } from "@phosphor-icons/react"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@workspace/ui/components/alert"

// The accent is an `::after` rule on the leading edge, not a border, so it
// stays put whatever the alert's own border does.
export default function AlertBasic() {
  return (
    <div className="flex w-full max-w-xl flex-col gap-4">
      <Alert>
        <InfoIcon />
        <AlertTitle>Charter updated</AlertTitle>
        <AlertDescription>
          The 2026 palette replaces the two legacy greys. Existing tokens keep
          resolving, so nothing breaks on upgrade.
        </AlertDescription>
      </Alert>

      <Alert variant="destructive">
        <WarningCircleIcon />
        <AlertTitle>Export failed</AlertTitle>
        <AlertDescription>
          Three rows referenced a deleted project and were skipped.
        </AlertDescription>
      </Alert>
    </div>
  )
}
