import { Button } from "@diametral/ui/components/button"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@diametral/ui/components/popover"

export default function PopoverBasic() {
  return (
    <Popover>
      <PopoverTrigger render={<Button variant="outline" />}>
        Open popover
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader>
          <PopoverTitle>Charter tokens</PopoverTitle>
          <PopoverDescription>
            Eight brand tones, each with a contrast pair. Components compose off
            the pair rather than hard-coding a colour.
          </PopoverDescription>
        </PopoverHeader>
      </PopoverContent>
    </Popover>
  )
}
