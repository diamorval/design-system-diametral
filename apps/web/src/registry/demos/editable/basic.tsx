import { Editable } from "@diametral/ui/components/editable"

// The edit button only appears on hover or focus. Enter or blur commits the
// draft; Escape restores the previous value instead.
export default function EditableBasic() {
  return <Editable defaultValue="Q3 roadmap" />
}
