import type { ComponentProps } from "react"

import {
  CodeBlock,
  CodeBlockBody,
  CodeBlockCopyButton,
  CodeBlockFilename,
  CodeBlockHead,
} from "@diametral/ui/components/code-block"

const SNIPPET = "npm install @diametral/ui"

// The parts are plain elements with no variant axis — composition is the
// API, so only the filename is worth editing here.
export default function CodeBlockPlayground({
  children,
  ...props
}: ComponentProps<typeof CodeBlock>) {
  return (
    <CodeBlock className="w-full max-w-md" {...props}>
      <CodeBlockHead>
        <CodeBlockFilename>{children}</CodeBlockFilename>
        <CodeBlockCopyButton value={SNIPPET} />
      </CodeBlockHead>
      <CodeBlockBody code={SNIPPET} />
    </CodeBlock>
  )
}
