import {
  CodeBlock,
  CodeBlockBody,
  CodeBlockCopyButton,
  CodeBlockFilename,
  CodeBlockHead,
} from "@diametral/ui/components/code-block"

const SNIPPET = `import { Button } from "@diametral/ui/components/button"

export function Example() {
  return <Button>Save changes</Button>
}`

export default function CodeBlockBasic() {
  return (
    <CodeBlock className="w-full max-w-lg">
      <CodeBlockHead>
        <CodeBlockFilename>example.tsx</CodeBlockFilename>
        <CodeBlockCopyButton value={SNIPPET} />
      </CodeBlockHead>
      <CodeBlockBody code={SNIPPET} />
    </CodeBlock>
  )
}
