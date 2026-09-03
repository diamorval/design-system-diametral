"use client"

import * as React from "react"

import { cn } from "../lib/utils.js"
import { UploadSimpleIcon } from "@phosphor-icons/react"

function FileUpload({
  className,
  children,
  onFiles,
  accept,
  multiple = false,
  disabled = false,
  "aria-label": ariaLabel = "Upload files",
  ...props
}: Omit<
  React.ComponentProps<"div">,
  "onDrop" | "onDragOver" | "onDragLeave" | "onClick"
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
      onClick={() => inputRef.current?.click()}
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
        "flex w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-none border border-dashed border-input bg-transparent px-6 py-10 text-center transition-colors outline-none hover:bg-muted/50 has-[input:focus-visible]:border-ring has-[input:focus-visible]:ring-2 has-[input:focus-visible]:ring-ring/30 data-dragging:border-ring data-dragging:bg-muted/50 data-disabled:pointer-events-none data-disabled:opacity-50",
        className
      )}
      {...props}
    >
      {/* The real file input is already focusable and Enter/Space-operable
          natively, so this wrapper stays a plain div rather than a nested
          role="button" — a div and an input both being interactive is what
          triggered the nested-interactive violation. */}
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        aria-label={ariaLabel}
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

export { FileUpload, FileUploadIcon, FileUploadTitle, FileUploadDescription }
