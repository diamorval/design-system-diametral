import { Button } from "@workspace/ui/components/button"
import { toast } from "@workspace/ui/components/toast"

// Toast is fired, not rendered: its API is a function call rather than props.
// The controls drive the live toast, but the snippet shows the shape of the call
// instead of tracking them — formatJsx only rewrites JSX attributes, and there is
// no `{...props}` element here to rewrite.
export default function ToastPlayground({
  type,
  title,
  description,
}: {
  type?: string
  title?: string
  description?: string
}) {
  const options = { type, title, description }

  return (
    <Button variant="outline" onClick={() => toast.add(options)}>
      Show toast
    </Button>
  )
}
