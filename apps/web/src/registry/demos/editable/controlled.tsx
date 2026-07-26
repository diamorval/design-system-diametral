import * as React from "react"

import { Editable } from "@diametral/ui/components/editable"
import { FieldDescription } from "@diametral/ui/components/field"

// `onSubmit` fires only once a draft is committed, not on every keystroke —
// `onValueChange` is for that if a page needs to track the draft live instead.
export default function EditableControlled() {
  const [saved, setSaved] = React.useState("Untitled project")

  return (
    <div className="flex flex-col gap-1">
      <Editable value={saved} onSubmit={setSaved} />
      <FieldDescription>Last saved: {saved}</FieldDescription>
    </div>
  )
}
