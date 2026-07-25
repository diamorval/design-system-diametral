import type { ComponentProps } from "react"

import { Spinner } from "@workspace/ui/components/spinner"

// Like Skeleton, the only knob is `className` — the size and colour it inherits.
export default function SpinnerPlayground(
  props: ComponentProps<typeof Spinner>
) {
  return <Spinner {...props} />
}
