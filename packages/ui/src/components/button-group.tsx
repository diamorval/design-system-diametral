import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../lib/utils.js"
import { Separator } from "./separator.js"

const buttonGroupVariants = cva(
  "group/button-group flex w-fit items-stretch *:focus-visible:relative *:focus-visible:z-10 has-[>[data-slot=button-group]]:gap-2 *:data-[slot=input]:px-4 [&>[data-slot=select-trigger]:not([class*='w-'])]:w-fit [&>input]:flex-1",
  {
    variants: {
      orientation: {
        /* A separator stands in for the shared edge, so the member before it
           drops its own end border; without that the two stack into 2px. */
        horizontal:
          "[&>[data-slot]~[data-slot]]:border-s-0 [&>[data-slot]:has(+[data-slot=button-group-separator])]:border-e-0",
        vertical:
          "flex-col [&>[data-slot]~[data-slot]]:border-t-0 [&>[data-slot]:has(+[data-slot=button-group-separator])]:border-b-0",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
    },
  }
)

function ButtonGroup({
  className,
  orientation,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof buttonGroupVariants>) {
  return (
    <div
      role="group"
      data-slot="button-group"
      data-orientation={orientation ?? "horizontal"}
      className={cn(buttonGroupVariants({ orientation }), className)}
      {...props}
    />
  )
}

function ButtonGroupText({
  className,
  render,
  ...props
}: useRender.ComponentProps<"div">) {
  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(
      {
        className: cn(
          /* Boxed by default so it closes the outline next to bordered
             buttons; an Input sibling is underline-only, so match that
             instead and the two share one continuous rule. */
          "flex items-center gap-2 border border-border bg-transparent px-4 text-xs font-semibold group-has-[>[data-slot=input]]/button-group:border-transparent group-has-[>[data-slot=input]]/button-group:border-b-input [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-3.5",
          className
        ),
      },
      props
    ),
    render,
    state: {
      slot: "button-group-text",
    },
  })
}

function ButtonGroupSeparator({
  className,
  orientation = "vertical",
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="button-group-separator"
      orientation={orientation}
      className={cn(
        "relative self-stretch bg-input data-horizontal:w-auto data-vertical:h-auto",
        className
      )}
      {...props}
    />
  )
}

export {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
  buttonGroupVariants,
}
