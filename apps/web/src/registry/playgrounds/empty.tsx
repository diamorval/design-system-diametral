import type { ComponentProps } from "react"
import { FileTextIcon } from "@phosphor-icons/react"

import { Button } from "@workspace/ui/components/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@workspace/ui/components/empty"

export default function EmptyPlayground(
  props: ComponentProps<typeof EmptyMedia>
) {
  return (
    <Empty className="w-full">
      <EmptyHeader>
        <EmptyMedia {...props}>
          <FileTextIcon />
        </EmptyMedia>
        <EmptyTitle>No documents</EmptyTitle>
        <EmptyDescription>Upload a file to get started.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button size="sm">Upload</Button>
      </EmptyContent>
    </Empty>
  )
}
