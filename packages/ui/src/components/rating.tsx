"use client"

import * as React from "react"
import { Radio as RadioPrimitive } from "@base-ui/react/radio"
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group"

import { cn } from "../lib/utils.js"
import { StarIcon } from "@phosphor-icons/react"

function Rating({
  className,
  max = 5,
  shape = "default",
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
  shape?: "default" | "star"
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
      className={cn(
        "flex w-fit items-center",
        shape === "star" ? "gap-0.5" : "gap-1",
        className
      )}
      {...props}
    >
      {Array.from({ length: max }, (_, index) => {
        const rank = index + 1

        return (
          <RadioPrimitive.Root
            key={rank}
            data-slot="rating-item"
            data-shape={shape}
            value={rank}
            disabled={!interactive}
            aria-label={String(rank)}
            onMouseEnter={interactive ? () => setHovered(rank) : undefined}
            className={cn(
              "border-none bg-transparent p-0 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring/30",
              shape === "star"
                ? cn(
                    "flex size-6 items-center justify-center text-muted-foreground",
                    rank <= shown && "text-primary"
                  )
                : cn(
                    "h-2.5 w-5 rounded-none bg-muted transition-[background-color,translate]",
                    rank <= shown && "bg-primary",
                    interactive && "hover:-translate-y-px"
                  ),
              interactive ? "cursor-pointer" : "pointer-events-none"
            )}
          >
            {shape === "star" && (
              <StarIcon
                className="size-5"
                weight={rank <= shown ? "fill" : "regular"}
              />
            )}
          </RadioPrimitive.Root>
        )
      })}
    </RadioGroupPrimitive>
  )
}

export { Rating }
