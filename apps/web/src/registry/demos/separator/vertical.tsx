import { Separator } from "@workspace/ui/components/separator"

// A vertical separator sizes itself with `self-stretch`, so it needs a flex
// parent with a height to stretch into — `items-center` alone collapses it.
export default function SeparatorVertical() {
  return (
    <div className="flex h-8 items-center gap-4 text-sm">
      <span>Docs</span>
      <Separator orientation="vertical" />
      <span>Playground</span>
      <Separator orientation="vertical" />
      <span>Tokens</span>
    </div>
  )
}
