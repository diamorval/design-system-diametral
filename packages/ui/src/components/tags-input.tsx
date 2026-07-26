"use client"

import * as React from "react"
import { XIcon } from "@phosphor-icons/react"

import { cn } from "../lib/utils.js"
import { useControllableValue } from "../hooks/use-controllable-value.js"
import { Button } from "./button.js"

// Free-text tokens, not a fixed list — see MultiSelect for choosing from
// options. The outer box is a plain group div, never a button, so the
// per-tag remove buttons are not nested inside an interactive ancestor.
function TagsInput({
  className,
  value,
  defaultValue = [],
  onValueChange,
  placeholder,
  disabled = false,
  max,
  ...props
}: Omit<React.ComponentProps<"div">, "onChange" | "defaultValue"> & {
  value?: string[]
  defaultValue?: string[]
  onValueChange?: (value: string[]) => void
  placeholder?: string
  disabled?: boolean
  max?: number
}) {
  const [tags, setTags] = useControllableValue<string[]>({
    value,
    defaultValue,
    onChange: onValueChange,
  })
  const [draft, setDraft] = React.useState("")
  const inputRef = React.useRef<HTMLInputElement>(null)

  const addTag = (raw: string) => {
    const next = raw.trim()
    const atLimit = max !== undefined && tags.length >= max
    if (!next || tags.includes(next) || atLimit) {
      setDraft("")
      return
    }
    setTags([...tags, next])
    setDraft("")
  }

  const removeTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index))
  }

  return (
    <div
      data-slot="tags-input"
      data-disabled={disabled || undefined}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          event.preventDefault()
          inputRef.current?.focus()
        }
      }}
      className={cn(
        "flex min-h-10 w-full flex-wrap items-center gap-1.5 rounded-none border border-transparent border-b-input bg-transparent px-0 py-1.5 text-sm transition-[color,border-color] focus-within:border-b-ring data-disabled:pointer-events-none data-disabled:cursor-not-allowed data-disabled:opacity-50",
        className
      )}
      {...props}
    >
      {tags.map((tag, index) => (
        <span
          key={`${tag}-${index}`}
          data-slot="tags-input-tag"
          className="flex h-[calc(--spacing(5.5))] w-fit items-center justify-center gap-1 rounded-none bg-muted px-2 text-xs font-medium whitespace-nowrap text-foreground"
        >
          {tag}
          <Button
            type="button"
            variant="ghost"
            size="icon-xs"
            tabIndex={-1}
            disabled={disabled}
            aria-label={`Remove ${tag}`}
            onClick={() => removeTag(index)}
            className="-me-1 size-4 opacity-50 hover:opacity-100"
          >
            <XIcon className="pointer-events-none" />
          </Button>
        </span>
      ))}
      <input
        ref={inputRef}
        data-slot="tags-input-field"
        type="text"
        value={draft}
        placeholder={tags.length === 0 ? placeholder : undefined}
        disabled={disabled}
        onChange={(event) => setDraft(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === ",") {
            event.preventDefault()
            addTag(draft)
          } else if (event.key === "Backspace" && draft === "" && tags.length) {
            event.preventDefault()
            removeTag(tags.length - 1)
          }
        }}
        onBlur={() => addTag(draft)}
        className="min-w-16 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed"
      />
    </div>
  )
}

export { TagsInput }
