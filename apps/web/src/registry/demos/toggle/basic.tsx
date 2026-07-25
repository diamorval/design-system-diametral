import { TextBIcon } from "@phosphor-icons/react"

import { Toggle } from "@workspace/ui/components/toggle"

export default function ToggleBasic() {
  return (
    <Toggle defaultPressed>
      <TextBIcon /> Bold
    </Toggle>
  )
}
