import { Button } from "@workspace/ui/components/button"
import {
  ButtonGroup,
  ButtonGroupSeparator,
} from "@workspace/ui/components/button-group"

export default function ButtonGroupVertical() {
  return (
    <ButtonGroup orientation="vertical">
      <Button variant="outline">Export as CSV</Button>
      <Button variant="outline">Export as JSON</Button>
      <ButtonGroupSeparator orientation="horizontal" />
      <Button variant="outline">Copy to clipboard</Button>
    </ButtonGroup>
  )
}
