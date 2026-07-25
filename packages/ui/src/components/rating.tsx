"use client"

import * as React from "react"
import { Radio as RadioPrimitive } from "@base-ui/react/radio"
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group"

import { cn } from "@workspace/ui/lib/utils"
import { StarIcon } from "@phosphor-icons/react"

function Rating({
  className,
  max = 5,
  value,
  defaultValue = 0,
  onValueChange,
  readOnly = false,
  disabled = false,
  ...props
}: Omit<
  RadioGroupPrimitive.Props,
  "value" | "defaultValue" | "onValueChange"
> & {
  max?: number
  value?: number
  defaultValue?: number
  onValueChange?: (value: number) => void
  readOnly?: boolean
}) {
  const [uncontrolled, setUncontrolled] = React.useState(defaultValue)
  const [hovered, setHovered] = React.useState<number | null>(null)

  const selected = value ?? uncontrolled
  const shown = hovered ?? selected
  const interactive = !readOnly && !disabled

  return (
    <RadioGroupPrimitive
      data-slot="rating"
      value={selected}
      disabled={disabled}
      onValueChange={(next) => {
        if (value === undefined) {
          setUncontrolled(next as number)
        }
        onValueChange?.(next as number)
      }}
      onMouseLeave={() => setHovered(null)}
      className={cn("flex w-fit items-center gap-0.5", className)}
      {...props}
    >
      {Array.from({ length: max }, (_, index) => {
        const rank = index + 1

        return (
          <RadioPrimitive.Root
            key={rank}
            data-slot="rating-item"
            value={rank}
            disabled={!interactive}
            aria-label={String(rank)}
            onMouseEnter={interactive ? () => setHovered(rank) : undefined}
            className={cn(
              "flex size-6 items-center justify-center border-none bg-transparent text-muted-foreground outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring/30",
              rank <= shown && "text-primary",
              interactive ? "cursor-pointer" : "pointer-events-none"
            )}
          >
            <StarIcon
              className="size-5"
              weight={rank <= shown ? "fill" : "regular"}
            />
          </RadioPrimitive.Root>
        )
      })}
    </RadioGroupPrimitive>
  )
}

export { Rating }
