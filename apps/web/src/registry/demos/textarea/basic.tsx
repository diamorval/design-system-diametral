import { Textarea } from "@diametral/ui/components/textarea"

// `field-sizing-content` means the box grows with what is typed, so `rows` sets a
// floor rather than a fixed height and there is no resize handle to drag.
export default function TextareaBasic() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <Textarea placeholder="Type here — the box grows as you write." />
      <Textarea rows={4} defaultValue="Four rows to start with." />
      <Textarea disabled placeholder="Disabled" />
    </div>
  )
}
