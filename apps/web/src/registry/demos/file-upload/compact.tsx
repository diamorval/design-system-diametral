import * as React from "react"

import {
  FileUpload,
  FileUploadDescription,
  FileUploadIcon,
  FileUploadTitle,
} from "@diametral/ui/components/file-upload"
import {
  Panel,
  PanelContent,
  PanelHeader,
  PanelTitle,
} from "@diametral/ui/components/panel"

export default function FileUploadCompact() {
  const [name, setName] = React.useState<string>()

  return (
    <Panel className="w-full max-w-sm">
      <PanelHeader className="border-b">
        <PanelTitle>Logo</PanelTitle>
      </PanelHeader>
      <PanelContent>
        <FileUpload
          accept="image/svg+xml,image/png"
          onFiles={(files) => setName(files[0]?.name)}
          className="flex-row items-center justify-start gap-3 px-4 py-3 text-start"
        >
          <FileUploadIcon />
          <div>
            <FileUploadTitle>Replace</FileUploadTitle>
            <FileUploadDescription>
              {name ?? "SVG or PNG, 1:1."}
            </FileUploadDescription>
          </div>
        </FileUpload>
      </PanelContent>
    </Panel>
  )
}
