import type { ComponentProps } from "react"

import { Rating } from "@workspace/ui/components/rating"

export default function RatingPlayground({
  max,
  ...rest
}: Omit<ComponentProps<typeof Rating>, "max"> & { max?: string }) {
  const props = {
    ...rest,
    ...(max ? { max: Number(max) } : {}),
  }

  return <Rating {...props} />
}
