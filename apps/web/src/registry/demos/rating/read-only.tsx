import * as React from "react"

import { Rating } from "@diametral/ui/components/rating"

const REVIEWS = [
  { author: "Régie Ouest", score: 5 },
  { author: "Atelier Nord", score: 4 },
  { author: "Studio Sud", score: 3 },
]

// `readOnly` keeps the stars rendered but drops the hover preview and the pointer
// affordance — for displaying a score rather than collecting one.
export default function RatingReadOnly() {
  const [score, setScore] = React.useState(4)

  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <div className="flex flex-col gap-2">
        {REVIEWS.map((review) => (
          <div key={review.author} className="flex items-center gap-3">
            <Rating value={review.score} readOnly />
            <span className="text-sm text-muted-foreground">
              {review.author}
            </span>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <Rating value={score} onValueChange={setScore} />
        <span className="text-sm text-muted-foreground tabular-nums">
          {score} / 5
        </span>
      </div>
    </div>
  )
}
