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
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@diametral/ui/components/field"
import { Input } from "@diametral/ui/components/input"

export default function DialogWithForm() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" />}>
        Rename project
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rename project</DialogTitle>
          <DialogDescription>
            This changes the display name only.
          </DialogDescription>
        </DialogHeader>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="dialog-form-name">Name</FieldLabel>
            <Input id="dialog-form-name" defaultValue="design-system2" />
          </Field>
          <Field>
            <FieldLabel htmlFor="dialog-form-slug">Slug</FieldLabel>
            <Input id="dialog-form-slug" defaultValue="design-system-2" />
          </Field>
        </FieldGroup>
        <DialogFooter>
          <DialogClose render={<Button variant="outline" />}>Cancel</DialogClose>
          <DialogClose render={<Button />}>Save</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
