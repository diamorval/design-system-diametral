import * as React from "react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@diametral/ui/components/alert-dialog"
import { Button } from "@diametral/ui/components/button"
import { Spinner } from "@diametral/ui/components/spinner"

export default function AlertDialogPending() {
  const [open, setOpen] = React.useState(false)
  const [signingOut, setSigningOut] = React.useState(false)

  function signOutEverywhere() {
    setSigningOut(true)
    window.setTimeout(() => {
      setSigningOut(false)
      setOpen(false)
    }, 1200)
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger render={<Button variant="outline" />}>
        Sign out everywhere
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Sign out of all devices?</AlertDialogTitle>
          <AlertDialogDescription>
            Six active sessions end, including this one. You will be asked to
            sign in again.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={signingOut}>Stay</AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            onClick={signOutEverywhere}
            disabled={signingOut}
          >
            {signingOut ? <Spinner /> : null}
            {signingOut ? "Signing out…" : "Sign out"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
