import { Button } from "@workspace/ui/components/button"
import { toast } from "@workspace/ui/components/toast"

export default function ToastBasic() {
  return (
    <Button
      variant="outline"
      onClick={() =>
        toast.add({
          title: "Saved",
          description: "Your changes are live.",
        })
      }
    >
      Show toast
    </Button>
  )
}
