import { Button } from "@workspace/ui/components/button"
import { ButtonGroup } from "@workspace/ui/components/button-group"

// The group strips the inner radii and collapses the shared border, so the
// children stay plain Buttons — no "grouped" variant to remember.
export default function ButtonGroupBasic() {
  return (
    <ButtonGroup>
      <Button variant="outline">Day</Button>
      <Button variant="outline">Week</Button>
      <Button variant="outline">Month</Button>
    </ButtonGroup>
  )
}
