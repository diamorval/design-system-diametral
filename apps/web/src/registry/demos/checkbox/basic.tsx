import { Checkbox } from "@workspace/ui/components/checkbox"
import { Label } from "@workspace/ui/components/label"

// The box is 18px but carries an invisible `::after` that extends the hit area
// well past it, so the target is comfortable without the visual growing.
export default function CheckboxBasic() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2.5">
        <Checkbox id="checkbox-a" defaultChecked />
        <Label htmlFor="checkbox-a">Checked</Label>
      </div>
      <div className="flex items-center gap-2.5">
        <Checkbox id="checkbox-b" />
        <Label htmlFor="checkbox-b">Unchecked</Label>
      </div>
      <div className="flex items-center gap-2.5">
        <Checkbox id="checkbox-c" indeterminate />
        <Label htmlFor="checkbox-c">Indeterminate</Label>
      </div>
      <div className="flex items-center gap-2.5">
        <Checkbox id="checkbox-d" disabled defaultChecked />
        <Label htmlFor="checkbox-d">Disabled</Label>
      </div>
    </div>
  )
}
