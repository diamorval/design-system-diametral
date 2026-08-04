import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@diametral/ui/components/accordion"

const SECTIONS = [
  {
    value: "tokens",
    question: "Where do the colours come from?",
    answer:
      "Every surface reads a --ds-* token from the Diametral charter. Components never hard-code a hex value, so a palette change lands everywhere at once.",
  },
  {
    value: "fonts",
    question: "Which typefaces ship with the system?",
    answer:
      "Two, and only two: Ufficio for headings and Geist for body and mono. Geist ships with the system; Ufficio is licensed per project and never bundled.",
  },
  {
    value: "radius",
    question: "Why is nothing rounded?",
    answer:
      "The charter is square. Components pass rounded-none explicitly rather than relying on a radius token being zero.",
  },
]

export default function AccordionBasic() {
  return (
    <Accordion className="w-full max-w-xl" defaultValue={["tokens"]}>
      {SECTIONS.map((section) => (
        <AccordionItem key={section.value} value={section.value}>
          <AccordionTrigger>{section.question}</AccordionTrigger>
          <AccordionContent className="text-muted-foreground">
            {section.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
