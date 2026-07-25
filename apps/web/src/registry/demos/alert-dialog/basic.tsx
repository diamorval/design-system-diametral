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

// `AlertDialogAction` is a plain Button — unlike `AlertDialogCancel` it does not
// wrap Close, so confirming has to close the dialog itself. That is deliberate:
// a confirm usually needs to await something before dismissing.
export default function AlertDialogBasic() {
  const [open, setOpen] = React.useState(false)

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger render={<Button variant="outline" />}>
        Delete project
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete this project?</AlertDialogTitle>
          <AlertDialogDescription>
            The project and its 14 documents are removed for everyone. This
            cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            onClick={() => setOpen(false)}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
