import { Button } from "@diametral/ui/components/button"
import { toast } from "@diametral/ui/components/toast"

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
