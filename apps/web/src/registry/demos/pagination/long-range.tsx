import * as React from "react"

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@diametral/ui/components/pagination"

const TOTAL = 42

function pagesAround(page: number) {
  const around = [page - 1, page, page + 1].filter(
    (number) => number > 1 && number < TOTAL
  )
  return [1, ...around, TOTAL]
}

export default function PaginationLongRange() {
  const [page, setPage] = React.useState(21)
  const pages = pagesAround(page)

  const goTo = (number: number) => (event: React.MouseEvent) => {
    event.preventDefault()
    setPage(Math.min(TOTAL, Math.max(1, number)))
  }

  return (
    <div className="flex w-full flex-col items-center gap-3">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href={`#page-${Math.max(1, page - 1)}`}
              onClick={goTo(page - 1)}
            />
          </PaginationItem>
          {pages.map((number, index) => (
            <React.Fragment key={number}>
              {index > 0 && number - pages[index - 1] > 1 ? (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              ) : null}
              <PaginationItem>
                <PaginationLink
                  href={`#page-${number}`}
                  isActive={number === page}
                  onClick={goTo(number)}
                >
                  {number}
                </PaginationLink>
              </PaginationItem>
            </React.Fragment>
          ))}
          <PaginationItem>
            <PaginationNext
              href={`#page-${Math.min(TOTAL, page + 1)}`}
              onClick={goTo(page + 1)}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      <p className="text-sm text-muted-foreground">
        Page {page} of {TOTAL}
      </p>
    </div>
  )
}
