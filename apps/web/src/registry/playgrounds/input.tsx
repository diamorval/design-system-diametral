import type { ComponentProps } from "react"

import { Input } from "@workspace/ui/components/input"

export default function InputPlayground(props: ComponentProps<typeof Input>) {
  return (
    <div className="w-full max-w-sm">
      <Input {...props} />
    </div>
  )
}
