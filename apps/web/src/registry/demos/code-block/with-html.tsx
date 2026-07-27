import {
  CodeBlock,
  CodeBlockBody,
  CodeBlockCopyButton,
  CodeBlockFilename,
  CodeBlockHead,
} from "@diametral/ui/components/code-block"

const CODE = `const tone = "success"`
// Stands in for a highlighter's output (e.g. the docs app's own Shiki pass) —
// CodeBlock never runs one itself, it only renders markup handed to it.
const HTML = `<span style="color:#ff5500">const</span> tone = <span style="color:#89fc79">"success"</span>`

export default function CodeBlockWithHtml() {
  return (
    <CodeBlock className="w-full max-w-lg">
      <CodeBlockHead>
        <CodeBlockFilename>tone.ts</CodeBlockFilename>
        <CodeBlockCopyButton value={CODE} />
      </CodeBlockHead>
      <CodeBlockBody html={HTML} />
    </CodeBlock>
  )
}
