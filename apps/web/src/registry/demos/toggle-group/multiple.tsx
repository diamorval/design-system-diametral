import {
  TextBIcon,
  TextItalicIcon,
  TextUnderlineIcon,
} from "@phosphor-icons/react"

import {
  ToggleGroup,
  ToggleGroupItem,
} from "@workspace/ui/components/toggle-group"

export default function ToggleGroupMultiple() {
  return (
    <ToggleGroup variant="outline" multiple defaultValue={["bold"]}>
      <ToggleGroupItem value="bold" aria-label="Bold">
        <TextBIcon />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Italic">
        <TextItalicIcon />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Underline">
        <TextUnderlineIcon />
      </ToggleGroupItem>
    </ToggleGroup>
  )
}
