import type { ComponentProps } from "react"
import { FileTextIcon } from "@phosphor-icons/react"

import { Button } from "@workspace/ui/components/button"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@workspace/ui/components/item"

export default function ItemPlayground(props: ComponentProps<typeof Item>) {
  return (
    <Item {...props}>
      <ItemMedia>
        <FileTextIcon className="size-4" />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>charter.pdf</ItemTitle>
        <ItemDescription>2.4 MB · uploaded today</ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button variant="ghost" size="sm">
          Open
        </Button>
      </ItemActions>
    </Item>
  )
}
