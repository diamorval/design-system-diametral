import * as React from "react"

import { Button } from "@diametral/ui/components/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@diametral/ui/components/dialog"
import { Spinner } from "@diametral/ui/components/spinner"

export default function DialogControlled() {
  const [open, setOpen] = React.useState(false)
  const [saving, setSaving] = React.useState(false)

  // The dialog stays open while the work runs, then closes itself on success —
  // which is only possible when `open` is owned here rather than by the trigger.
  function save() {
    setSaving(true)
    window.setTimeout(() => {
      setSaving(false)
      setOpen(false)
    }, 1200)
  }

  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>
        Publish release
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Publish release</DialogTitle>
            <DialogDescription>
              The dialog closes once the request resolves.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={saving}
            >
              Cancel
            </Button>
            <Button onClick={save} disabled={saving}>
              {saving ? <Spinner /> : null}
              {saving ? "Publishing…" : "Publish"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
