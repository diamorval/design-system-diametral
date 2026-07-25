import type { ComponentProps } from "react"
import { FileTextIcon } from "@phosphor-icons/react"

import {
  Attachment,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle,
} from "@workspace/ui/components/attachment"

export default function AttachmentPlayground({
  children,
  ...props
}: ComponentProps<typeof Attachment>) {
  return (
    <AttachmentGroup className="w-full max-w-sm">
      <Attachment {...props}>
        <AttachmentMedia>
          <FileTextIcon />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>{children}</AttachmentTitle>
          <AttachmentDescription>1.2 MB</AttachmentDescription>
        </AttachmentContent>
      </Attachment>
    </AttachmentGroup>
  )
}
