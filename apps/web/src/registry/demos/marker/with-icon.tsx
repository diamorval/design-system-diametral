import { LockSimpleIcon, SealCheckIcon } from "@phosphor-icons/react"

import {
  Marker,
  MarkerContent,
  MarkerIcon,
} from "@diametral/ui/components/marker"

// `MarkerIcon` is `aria-hidden` — it is decoration, so the meaning has to live
// in MarkerContent rather than in the glyph.
export default function MarkerWithIcon() {
  return (
    <div className="flex w-full max-w-md flex-col gap-6">
      <Marker>
        <MarkerIcon>
          <SealCheckIcon />
        </MarkerIcon>
        <MarkerContent>Verified supplier</MarkerContent>
      </Marker>
      <Marker variant="border">
        <MarkerIcon>
          <LockSimpleIcon />
        </MarkerIcon>
        <MarkerContent>Internal — do not distribute</MarkerContent>
      </Marker>
    </div>
  )
}
