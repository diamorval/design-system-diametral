import type { ComponentProps } from "react"
import { InfoIcon } from "@phosphor-icons/react"

import {
  Banner,
  BannerContent,
  BannerDescription,
  BannerTitle,
} from "@diametral/ui/components/banner"

export default function BannerPlayground({
  children,
  ...props
}: ComponentProps<typeof Banner>) {
  return (
    <Banner {...props} className="w-full">
      <InfoIcon />
      <BannerContent>
        <BannerTitle>{children}</BannerTitle>
        <BannerDescription>
          The staging environment is unavailable from 10pm to midnight UTC.
        </BannerDescription>
      </BannerContent>
    </Banner>
  )
}
