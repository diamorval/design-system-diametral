import type { ComponentProps } from "react"

import { TagsInput } from "@diametral/ui/components/tags-input"

export default function TagsInputPlayground({
  max,
  ...rest
}: Omit<ComponentProps<typeof TagsInput>, "max"> & { max?: string }) {
  const props = {
    ...rest,
    ...(max ? { max: Number(max) } : {}),
  }

  return <TagsInput defaultValue={["design-system"]} {...props} />
}
