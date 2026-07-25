import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@workspace/ui/components/carousel"

// Items are `basis-full` by default; overriding the basis is what shows several
// slides at once, and `align: "start"` stops Embla centring the short last page.
export default function CarouselMultiple() {
  return (
    <div className="w-full max-w-md px-12">
      <Carousel opts={{ align: "start" }}>
        <CarouselContent>
          {Array.from({ length: 7 }, (_, index) => (
            <CarouselItem key={index} className="basis-1/3">
              <div className="flex aspect-square items-center justify-center border border-border bg-muted/50 font-mono text-sm text-muted-foreground">
                {index + 1}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}
