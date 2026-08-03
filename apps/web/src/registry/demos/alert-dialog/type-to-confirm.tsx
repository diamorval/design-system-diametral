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
import { Field, FieldLabel } from "@diametral/ui/components/field"
import { Input } from "@diametral/ui/components/input"

const WORKSPACE = "regie-ouest"

export default function AlertDialogTypeToConfirm() {
  const [open, setOpen] = React.useState(false)
  const [typed, setTyped] = React.useState("")

  function close() {
    setTyped("")
    setOpen(false)
  }

  return (
    <AlertDialog
      open={open}
      onOpenChange={(next) => (next ? setOpen(true) : close())}
    >
      <AlertDialogTrigger render={<Button variant="outline" />}>
        Delete workspace
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete this workspace?</AlertDialogTitle>
          <AlertDialogDescription>
            Every project, invoice and member of {WORKSPACE} is removed. This
            cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Field>
          <FieldLabel htmlFor="alert-dialog-confirm">
            Type {WORKSPACE} to confirm
          </FieldLabel>
          <Input
            id="alert-dialog-confirm"
            value={typed}
            onChange={(event) => setTyped(event.target.value)}
            autoComplete="off"
          />
        </Field>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            disabled={typed !== WORKSPACE}
            onClick={close}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
