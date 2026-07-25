import { FolderOpenIcon } from "@phosphor-icons/react"

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@diametral/ui/components/empty"

// `Empty` sets `border-dashed` but no border width — the caller decides whether
// the state is framed, so it can also sit flush inside a card.
export default function EmptyBasic() {
  return (
    <Empty className="border border-dashed border-border">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <FolderOpenIcon />
        </EmptyMedia>
        <EmptyTitle>No documents</EmptyTitle>
        <EmptyDescription>
          Nothing has been uploaded to this project yet.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  )
}
