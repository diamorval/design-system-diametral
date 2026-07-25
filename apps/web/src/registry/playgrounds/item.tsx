import type { ComponentProps } from "react"
import { FileTextIcon } from "@phosphor-icons/react"

import { Button } from "@diametral/ui/components/button"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@diametral/ui/components/item"

export default function ItemPlayground({
  children,
  ...props
}: ComponentProps<typeof Item>) {
  return (
    <Item {...props}>
      <ItemMedia>
        <FileTextIcon className="size-4" />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>{children}</ItemTitle>
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
