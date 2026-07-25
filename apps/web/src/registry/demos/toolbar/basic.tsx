import {
  ArrowUUpLeftIcon,
  ArrowUUpRightIcon,
  TextAlignCenterIcon,
  TextAlignLeftIcon,
  TextAlignRightIcon,
} from "@phosphor-icons/react"

import {
  Toolbar,
  ToolbarButton,
  ToolbarGroup,
  ToolbarSeparator,
} from "@workspace/ui/components/toolbar"

// ToolbarSeparator reads the root's orientation and draws across it, so a
// horizontal toolbar gets vertical rules without being told.
export default function ToolbarBasic() {
  return (
    <Toolbar>
      <ToolbarGroup>
        <ToolbarButton aria-label="Undo">
          <ArrowUUpLeftIcon />
        </ToolbarButton>
        <ToolbarButton aria-label="Redo">
          <ArrowUUpRightIcon />
        </ToolbarButton>
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <ToolbarButton aria-label="Align left">
          <TextAlignLeftIcon />
        </ToolbarButton>
        <ToolbarButton aria-label="Align center">
          <TextAlignCenterIcon />
        </ToolbarButton>
        <ToolbarButton aria-label="Align right">
          <TextAlignRightIcon />
        </ToolbarButton>
      </ToolbarGroup>
    </Toolbar>
  )
}
