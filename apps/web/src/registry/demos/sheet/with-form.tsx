import { Button } from "@workspace/ui/components/button"
import { Field, FieldLabel } from "@workspace/ui/components/field"
import { Input } from "@workspace/ui/components/input"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@workspace/ui/components/sheet"
import { Textarea } from "@workspace/ui/components/textarea"

// `SheetFooter` carries `mt-auto`, so it pins to the bottom of the panel however
// short the body is — no explicit flex-1 on the content.
export default function SheetWithForm() {
  return (
    <Sheet>
      <SheetTrigger render={<Button variant="outline" />}>
        Edit project
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit project</SheetTitle>
          <SheetDescription>
            Changes are saved when you close the panel.
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-6 px-8">
          <Field>
            <FieldLabel htmlFor="sheet-name">Name</FieldLabel>
            <Input id="sheet-name" defaultValue="Charte graphique 2026" />
          </Field>
          <Field>
            <FieldLabel htmlFor="sheet-brief">Brief</FieldLabel>
            <Textarea id="sheet-brief" rows={4} />
          </Field>
        </div>
        <SheetFooter>
          <SheetClose render={<Button />}>Save changes</SheetClose>
          <SheetClose render={<Button variant="ghost" />}>Cancel</SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
