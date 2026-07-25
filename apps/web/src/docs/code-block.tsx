import * as React from "react"
import { CheckIcon, CopyIcon } from "@phosphor-icons/react"

import { Button } from "@workspace/ui/components/button"
import { cn } from "@workspace/ui/lib/utils"

import "@/styles/code.css"

export function CodeBlock({
  html,
  code,
  className,
}: {
  html: string
  code: string
  className?: string
}) {
  const [copied, setCopied] = React.useState(false)

  React.useEffect(() => {
    if (!copied) return
    const timer = window.setTimeout(() => setCopied(false), 2000)
    return () => window.clearTimeout(timer)
  }, [copied])

  async function copy() {
    await navigator.clipboard.writeText(code)
    setCopied(true)
  }

  return (
    <div className={cn("group/code relative", className)}>
      <div
        className="overflow-x-auto bg-muted/40 p-4 font-mono text-[13px] leading-relaxed"
        // The markup comes from shiki running over our own repo files at build
        // time — there is no user-supplied input in this string.
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <Button
        size="icon-sm"
        variant="ghost"
        aria-label={copied ? "Copied" : "Copy code"}
        onClick={copy}
        className="absolute end-2 top-2 opacity-0 transition-opacity focus-visible:opacity-100 group-hover/code:opacity-100"
      >
        {copied ? <CheckIcon /> : <CopyIcon />}
      </Button>
    </div>
  )
}
