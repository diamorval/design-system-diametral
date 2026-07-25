import * as React from "react"

import {
  FileUpload,
  FileUploadDescription,
  FileUploadIcon,
  FileUploadTitle,
} from "@diametral/ui/components/file-upload"

// The drop zone is a `role="button"` div over a hidden input, so click, Enter,
// Space and drag-and-drop all open or receive files.
export default function FileUploadBasic() {
  const [names, setNames] = React.useState<string[]>([])

  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <FileUpload
        accept=".pdf,.png"
        multiple
        onFiles={(files) => setNames(files.map((file) => file.name))}
      >
        <FileUploadIcon />
        <FileUploadTitle>Drop files here</FileUploadTitle>
        <FileUploadDescription>
          PDF or PNG, up to 10 Mo each.
        </FileUploadDescription>
      </FileUpload>
      {names.length > 0 && (
        <p className="text-sm text-muted-foreground">
          Selected: {names.join(", ")}
        </p>
      )}
    </div>
  )
}
