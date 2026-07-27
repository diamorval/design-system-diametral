"use client"

import * as React from "react"

import { Icon } from "./icon.js"
import { cn } from "../lib/utils.js"

// A dark, flat panel for a code sample (v1: css/components/code-block.css).
// Deliberately highlighter-agnostic: `CodeBlockBody` accepts pre-highlighted
// HTML via `html` (what a Shiki-powered docs app renders) as well as plain
// `code`/`children`, so this package never depends on a highlighter itself.
function CodeBlock({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="code-block"
      className={cn(
        "overflow-hidden rounded-none border border-[var(--ds-noir)] bg-[var(--ds-noir)] font-mono text-sm text-[var(--ds-grey-faint)]",
        className
      )}
      {...props}
    />
  )
}

function CodeBlockHead({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="code-block-head"
      className={cn(
        "flex items-center justify-between gap-3 border-b border-[var(--ds-grey-dark)] px-3 py-2",
        className
      )}
      {...props}
    />
  )
}

function CodeBlockFilename({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="code-block-filename"
      className={cn(
        "text-xs tracking-wide text-[#8e9099] uppercase",
        className
      )}
      {...props}
    />
  )
}

function CodeBlockBody({
  className,
  code,
  html,
  children,
  ...props
}: Omit<React.ComponentProps<"pre">, "children"> & {
  /** Plain code text, rendered as-is (no highlighting). */
  code?: string
  /**
   * Pre-highlighted markup, e.g. from the docs app's own Shiki pass. Rendered
   * via `dangerouslySetInnerHTML` — pass output from a trusted highlighter
   * over your own source, never unsanitized user input.
   */
  html?: string
  children?: React.ReactNode
}) {
  return (
    <pre
      data-slot="code-block-body"
      className={cn(
        "m-0 overflow-auto p-3 font-mono [tab-size:2] text-inherit",
        className
      )}
      {...props}
    >
      {html ? (
        <code dangerouslySetInnerHTML={{ __html: html }} />
      ) : (
        <code>{code ?? children}</code>
      )}
    </pre>
  )
}

function CodeBlockCopyButton({
  className,
  value,
  ...props
}: Omit<React.ComponentProps<"button">, "children"> & {
  /** The raw text to copy — independent of what's visually rendered. */
  value: string
}) {
  const [copied, setCopied] = React.useState(false)

  React.useEffect(() => {
    if (!copied) return
    const timeout = setTimeout(() => setCopied(false), 2000)
    return () => clearTimeout(timeout)
  }, [copied])

  return (
    <button
      type="button"
      data-slot="code-block-copy-button"
      aria-label={copied ? "Copied" : "Copy code"}
      onClick={() => {
        void navigator.clipboard.writeText(value)
        setCopied(true)
      }}
      className={cn(
        "inline-flex size-7 shrink-0 items-center justify-center rounded-none border border-[var(--ds-grey-dark)] bg-transparent text-[var(--ds-grey-faint)] transition-colors outline-none hover:bg-[var(--ds-grey-dark)] focus-visible:ring-2 focus-visible:ring-ring/30 [&_svg]:size-3.5",
        className
      )}
      {...props}
    >
      <Icon name={copied ? "check" : "copy"} />
    </button>
  )
}

export {
  CodeBlock,
  CodeBlockHead,
  CodeBlockFilename,
  CodeBlockBody,
  CodeBlockCopyButton,
}
