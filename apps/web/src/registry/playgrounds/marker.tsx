import type { ComponentProps } from "react"
import { CheckIcon } from "@phosphor-icons/react"

import {
  Marker,
  MarkerContent,
  MarkerIcon,
} from "@workspace/ui/components/marker"

export default function MarkerPlayground(props: ComponentProps<typeof Marker>) {
  return (
    <Marker {...props}>
      <MarkerIcon>
        <CheckIcon />
      </MarkerIcon>
      <MarkerContent>Verified</MarkerContent>
    </Marker>
  )
}
