"use client"

import * as React from "react"

import { cn } from "@workspace/ui/lib/utils"
import { UploadSimpleIcon } from "@phosphor-icons/react"

function FileUpload({
  className,
  children,
  onFiles,
  accept,
  multiple = false,
  disabled = false,
  ...props
}: Omit<
  React.ComponentProps<"div">,
  "onDrop" | "onDragOver" | "onDragLeave" | "onClick" | "onKeyDown"
> & {
  onFiles?: (files: File[]) => void
  accept?: string
  multiple?: boolean
  disabled?: boolean
}) {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [dragging, setDragging] = React.useState(false)

  function emit(files: FileList | null) {
    if (files?.length) {
      onFiles?.(Array.from(files))
    }
  }

  return (
    <div
      data-slot="file-upload"
      data-dragging={dragging || undefined}
      data-disabled={disabled || undefined}
      role="button"
      tabIndex={disabled ? -1 : 0}
      onClick={() => inputRef.current?.click()}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault()
          inputRef.current?.click()
        }
      }}
      onDragOver={(event) => {
        event.preventDefault()
        setDragging(true)
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(event) => {
        event.preventDefault()
        setDragging(false)
        emit(event.dataTransfer.files)
      }}
      className={cn(
        "flex w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-none border border-dashed border-input bg-transparent px-6 py-10 text-center outline-none transition-colors hover:bg-muted/50 focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30 data-disabled:pointer-events-none data-disabled:opacity-50 data-dragging:border-ring data-dragging:bg-muted/50",
        className
      )}
      {...props}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        className="sr-only"
        onChange={(event) => {
          emit(event.target.files)
          // Clearing lets the same file be re-selected, which otherwise emits no change event.
          event.target.value = ""
        }}
      />
      {children}
    </div>
  )
}

function FileUploadIcon({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="file-upload-icon"
      className={cn(
        "flex size-10 items-center justify-center rounded-none border border-border text-muted-foreground [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <UploadSimpleIcon />
    </div>
  )
}

function FileUploadTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="file-upload-title"
      className={cn(
        "text-xs font-semibold tracking-wider uppercase",
        className
      )}
      {...props}
    />
  )
}

function FileUploadDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="file-upload-description"
      className={cn(
        "text-sm leading-normal text-muted-foreground normal-case",
        className
      )}
      {...props}
    />
  )
}

export {
  FileUpload,
  FileUploadIcon,
  FileUploadTitle,
  FileUploadDescription,
}
