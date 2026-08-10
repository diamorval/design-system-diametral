import { Slider as SliderPrimitive } from "@base-ui/react/slider"

import { cn } from "../lib/utils.js"

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  ...props
}: SliderPrimitive.Root.Props) {
  const _values = Array.isArray(value)
    ? value
    : Array.isArray(defaultValue)
      ? defaultValue
      : [(value ?? defaultValue ?? min) as number]

  return (
    <SliderPrimitive.Root
      className={cn("ds-slider", className)}
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      thumbAlignment="edge"
      {...props}
    >
      <SliderPrimitive.Control className="ds-slider-control">
        <SliderPrimitive.Track data-slot="slider-track" className="ds-slider-track">
          <SliderPrimitive.Indicator
            data-slot="slider-range"
            className="ds-slider-range"
          />
        </SliderPrimitive.Track>
        {Array.from({ length: _values.length }, (_, index) => (
          <SliderPrimitive.Thumb
            data-slot="slider-thumb"
            key={index}
            className="ds-slider-thumb"
          />
        ))}
      </SliderPrimitive.Control>
    </SliderPrimitive.Root>
  )
}

export { Slider }
