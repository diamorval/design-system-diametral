import type { ComponentProps } from "react"
import { WarningIcon } from "@phosphor-icons/react"

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@diametral/ui/components/alert-dialog"
import { Button } from "@diametral/ui/components/button"

export default function AlertDialogPlayground({
  children,
  ...props
}: ComponentProps<typeof AlertDialogContent>) {
  return (
    <AlertDialog>
      <AlertDialogTrigger render={<Button variant="outline" />}>
        Revoke access
      </AlertDialogTrigger>
      <AlertDialogContent {...props}>
        <AlertDialogHeader>
          <AlertDialogMedia>
            <WarningIcon />
          </AlertDialogMedia>
          <AlertDialogTitle>{children}</AlertDialogTitle>
          <AlertDialogDescription>
            The API key stops working immediately.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Keep</AlertDialogCancel>
          <AlertDialogCancel variant="destructive">Revoke</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
