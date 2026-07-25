import { Button } from "@diametral/ui/components/button"

export default function ButtonTonesSubtle() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="outline" tone="rouge">
        Outline rouge
      </Button>
      <Button variant="outline" tone="bleu">
        Outline bleu
      </Button>
      <Button variant="ghost" tone="vert">
        Ghost vert
      </Button>
      <Button variant="ghost" tone="marron">
        Ghost marron
      </Button>
    </div>
  )
}
