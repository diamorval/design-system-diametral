import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"

// Label is uppercase and tracked by default, which suits a form field heading.
// Prefer `FieldLabel` inside a `Field` — it adds the disabled and invalid wiring.
export default function LabelBasic() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-2">
      <Label htmlFor="label-email">Email</Label>
      <Input id="label-email" type="email" placeholder="you@diametral.com" />
    </div>
  )
}
