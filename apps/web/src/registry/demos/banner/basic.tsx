import { InfoIcon } from "@phosphor-icons/react"

import {
  Banner,
  BannerContent,
  BannerDescription,
  BannerTitle,
} from "@diametral/ui/components/banner"

// The root carries role="status", so a banner mounted after page load is
// announced politely without wrapping it in an aria-live region yourself.
export default function BannerBasic() {
  return (
    <Banner tone="info">
      <InfoIcon />
      <BannerContent>
        <BannerTitle>Scheduled maintenance</BannerTitle>
        <BannerDescription>
          The staging environment is unavailable from 10pm to midnight UTC.
        </BannerDescription>
      </BannerContent>
    </Banner>
  )
}
