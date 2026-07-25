import type { ComponentProps } from "react"

import { Button } from "@diametral/ui/components/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@diametral/ui/components/dialog"

export default function DialogPlayground({
  children,
  ...props
}: ComponentProps<typeof DialogContent>) {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" />}>
        Open dialog
      </DialogTrigger>
      <DialogContent {...props}>
        <DialogHeader>
          <DialogTitle>{children}</DialogTitle>
          <DialogDescription>
            Anyone with the link can view this page.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose render={<Button variant="outline" />}>
            Cancel
          </DialogClose>
          <DialogClose render={<Button />}>Copy link</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
