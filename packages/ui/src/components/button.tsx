import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../lib/utils.js"

const buttonVariants = cva("group/button ds-button", {
  variants: {
    variant: {
      default: "ds-button--default",
      outline: "ds-button--outline",
      secondary: "ds-button--secondary",
      ghost: "ds-button--ghost",
      destructive: "ds-button--destructive",
      /* --primary is darkened for AA on light surfaces (globals.css); that
         same darkened value drops bare text on dark's near-black --ds-bg
         below 4.5:1 (4.01:1), so dark keeps the original, lighter
         --ds-red-brand, which already cleared 5.13:1 there. */
      link: "ds-button--link",
    },
    /* Palette axis. Sets the fill (--btn) and its contrast pair (--btn-fg);
       the variants above compose off those two vars, so a tone works across
       solid / outline / ghost without a compound-variant matrix. */
    tone: {
      black: "ds-button--tone-black",
      red: "ds-button--tone-red",
      brown: "ds-button--tone-brown",
      khaki: "ds-button--tone-khaki",
      beige: "ds-button--tone-beige",
      green: "ds-button--tone-green",
      blue: "ds-button--tone-blue",
      yellow: "ds-button--tone-yellow",
    },
    size: {
      default: "ds-button--size-default",
      xs: "ds-button--size-xs",
      sm: "ds-button--size-sm",
      lg: "ds-button--size-lg",
      icon: "ds-button--size-icon",
      "icon-xs": "ds-button--size-icon-xs",
      "icon-sm": "ds-button--size-icon-sm",
      "icon-lg": "ds-button--size-icon-lg",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
    tone: "black",
  },
})

function Button({
  className,
  variant = "default",
  size = "default",
  tone = "black",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, tone, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
