import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@workspace/ui/components/accordion"

// Base UI opens several panels at once by default; `multiple={false}` is what
// collapses the others when a new one opens.
export default function AccordionSingle() {
  return (
    <Accordion
      className="w-full max-w-xl"
      multiple={false}
      defaultValue={["a"]}
    >
      <AccordionItem value="a">
        <AccordionTrigger>Step 1 — Scope</AccordionTrigger>
        <AccordionContent className="text-muted-foreground">
          Agree the perimeter and the success criteria before any code is
          written.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="b">
        <AccordionTrigger>Step 2 — Build</AccordionTrigger>
        <AccordionContent className="text-muted-foreground">
          Ship in vertical slices, each one demonstrable on its own.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="c">
        <AccordionTrigger>Step 3 — Hand over</AccordionTrigger>
        <AccordionContent className="text-muted-foreground">
          Documentation and a runbook, so the team can operate it without us.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
