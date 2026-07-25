import * as React from "react"

import { Button } from "@diametral/ui/components/button"
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@diametral/ui/components/item"
import { Skeleton } from "@diametral/ui/components/skeleton"

const ROWS = [
  { name: "Régie Ouest", note: "4 missions en cours" },
  { name: "Atelier Nord", note: "1 mission en cours" },
]

// The skeleton reuses the real row's Item wrapper and swaps only the text for
// bars — that is what keeps the two states the same height and stops the jump.
export default function SkeletonMatchingLayout() {
  const [loading, setLoading] = React.useState(true)

  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <ItemGroup>
        {ROWS.map((row) => (
          <Item key={row.name} variant="outline">
            <ItemMedia variant="icon">
              {loading ? <Skeleton className="size-4" /> : <span>◆</span>}
            </ItemMedia>
            <ItemContent>
              {loading ? (
                <>
                  <Skeleton className="h-3 w-32" />
                  <Skeleton className="h-3 w-20" />
                </>
              ) : (
                <>
                  <ItemTitle>{row.name}</ItemTitle>
                  <ItemDescription>{row.note}</ItemDescription>
                </>
              )}
            </ItemContent>
          </Item>
        ))}
      </ItemGroup>
      <Button
        variant="outline"
        size="sm"
        className="self-start"
        onClick={() => setLoading((value) => !value)}
      >
        {loading ? "Show loaded" : "Show loading"}
      </Button>
    </div>
  )
}
