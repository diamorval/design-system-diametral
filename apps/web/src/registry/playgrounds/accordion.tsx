import type { ComponentProps } from "react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@workspace/ui/components/accordion"

export default function AccordionPlayground(
  props: ComponentProps<typeof Accordion>
) {
  return (
    <Accordion className="w-full max-w-md" defaultValue={["tokens"]} {...props}>
      <AccordionItem value="tokens">
        <AccordionTrigger>Where do the colours come from?</AccordionTrigger>
        <AccordionContent className="text-muted-foreground">
          Every surface reads a --ds-* token from the charter.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="fonts">
        <AccordionTrigger>Which typefaces ship?</AccordionTrigger>
        <AccordionContent className="text-muted-foreground">
          Ufficio for headings, Geist for body and mono.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
