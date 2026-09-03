import * as React from "react"

import { CodeBlockCopyButton } from "./code-block.js"
import { cn } from "../lib/utils.js"

// A single-line copyable value — an API key, a CLI command — built on
// CodeBlock's copy affordance rather than reimplementing it. Light surface,
// so CodeBlockCopyButton's dark-panel colors are overridden via className.
function Snippet({
  className,
  value,
  children,
  ...props
}: Omit<React.ComponentProps<"div">, "children"> & {
  value: string
  children?: React.ReactNode
}) {
  return (
    <div
      data-slot="snippet"
      className={cn(
        "inline-flex max-w-full items-center gap-3 rounded-none border border-border bg-muted py-1.5 pr-1.5 pl-3 font-mono text-sm",
        className
      )}
      {...props}
    >
      <code
        data-slot="snippet-code"
        className="overflow-x-auto whitespace-pre text-foreground"
      >
        {children ?? value}
      </code>
      <CodeBlockCopyButton
        value={value}
        className="size-6 border-none bg-transparent text-muted-foreground hover:bg-accent hover:text-accent-foreground [&_svg]:size-3"
      />
    </div>
  )
}

export { Snippet }
