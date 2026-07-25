import { Checkbox } from "@diametral/ui/components/checkbox"
import { Label } from "@diametral/ui/components/label"
import { Switch } from "@diametral/ui/components/switch"

// Label restyles itself from the control it follows: `peer-data-[slot=checkbox]`
// and friends drop the uppercase treatment, because a checkbox label is a
// sentence rather than a heading. Note the control must come *first* in the DOM.
export default function LabelWithControls() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2.5">
        <Checkbox id="label-terms" />
        <Label htmlFor="label-terms">I accept the charter</Label>
      </div>
      <div className="flex items-center gap-2.5">
        <Switch id="label-emails" />
        <Label htmlFor="label-emails">Send me release notes</Label>
      </div>
      <div className="flex items-center gap-2.5">
        <Checkbox id="label-disabled" disabled />
        <Label htmlFor="label-disabled">Unavailable on this plan</Label>
      </div>
    </div>
  )
}
