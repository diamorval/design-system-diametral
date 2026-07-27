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

  return (
    <>
      <span id="tags-input-playground-label" className="sr-only">
        Tags
      </span>
      <TagsInput
        defaultValue={["design-system"]}
        aria-labelledby="tags-input-playground-label"
        {...props}
      />
    </>
  )
}
