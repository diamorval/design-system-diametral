import { DropdownMenuItem } from "@diametral/ui/components/dropdown-menu"
import { SplitButton } from "@diametral/ui/components/split-button"

export default function SplitButtonBasic() {
  return (
    <SplitButton
      menu={
        <>
          <DropdownMenuItem>Save and duplicate</DropdownMenuItem>
          <DropdownMenuItem>Save as template</DropdownMenuItem>
          <DropdownMenuItem>Save and close</DropdownMenuItem>
        </>
      }
    >
      Save
    </SplitButton>
  )
}
