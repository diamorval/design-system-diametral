import type { ComponentProps } from "react"

import {
  FileUpload,
  FileUploadDescription,
  FileUploadIcon,
  FileUploadTitle,
} from "@workspace/ui/components/file-upload"

export default function FileUploadPlayground(
  props: ComponentProps<typeof FileUpload>
) {
  return (
    <FileUpload className="max-w-sm" {...props}>
      <FileUploadIcon />
      <FileUploadTitle>Drop files here</FileUploadTitle>
      <FileUploadDescription>Or click to browse.</FileUploadDescription>
    </FileUpload>
  )
}
