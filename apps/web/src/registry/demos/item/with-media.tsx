import { DownloadSimpleIcon, FilePdfIcon } from "@phosphor-icons/react"

import { Button } from "@workspace/ui/components/button"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@workspace/ui/components/item"

const FILES = [
  { name: "Charte graphique.pdf", size: "2,4 Mo" },
  { name: "Audit technique.pdf", size: "812 Ko" },
]

// `ItemMedia` top-aligns itself when the item has a description, so icon and
// title stay on the same line whatever the description's length.
export default function ItemWithMedia() {
  return (
    <ItemGroup className="max-w-md">
      {FILES.map((file) => (
        <Item key={file.name} variant="outline">
          <ItemMedia variant="icon">
            <FilePdfIcon />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>{file.name}</ItemTitle>
            <ItemDescription>{file.size}</ItemDescription>
          </ItemContent>
          <ItemActions>
            <Button variant="ghost" size="icon-sm" aria-label="Download">
              <DownloadSimpleIcon />
            </Button>
          </ItemActions>
        </Item>
      ))}
    </ItemGroup>
  )
}
