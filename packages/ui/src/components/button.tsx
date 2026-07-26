import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../lib/utils.js"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-none border border-transparent bg-clip-padding text-xs font-semibold tracking-widest whitespace-nowrap uppercase transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3.5",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--btn)] text-[var(--btn-fg)] hover:bg-[color-mix(in_oklch,var(--btn),var(--btn-fg)_14%)] aria-expanded:bg-[color-mix(in_oklch,var(--btn),var(--btn-fg)_14%)]",
        outline:
          "border-border bg-transparent hover:border-[var(--btn)] hover:bg-[color-mix(in_oklch,var(--btn),transparent_92%)] hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)] aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
        ghost:
          "hover:bg-[color-mix(in_oklch,var(--btn),transparent_90%)] hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
        /* --primary is darkened for AA on light surfaces (globals.css); that
           same darkened value drops bare text on dark's near-black --ds-bg
           below 4.5:1 (4.01:1), so dark keeps the original, lighter
           --ds-rouge, which already cleared 5.13:1 there. */
        link: "text-primary underline underline-offset-4 hover:underline dark:text-[var(--ds-rouge)]",
      },
      /* Palette axis. Sets the fill (--btn) and its contrast pair (--btn-fg);
         the variants above compose off those two vars, so a tone works across
         solid / outline / ghost without a compound-variant matrix. */
      tone: {
        noir: "[--btn:var(--ds-action)] [--btn-fg:var(--ds-on-action)]",
        rouge: "[--btn:var(--ds-rouge)] [--btn-fg:var(--ds-noir)]",
        marron: "[--btn:var(--ds-marron)] [--btn-fg:var(--ds-noir)]",
        kaki: "[--btn:var(--ds-kaki)] [--btn-fg:var(--ds-noir)]",
        beige: "[--btn:var(--ds-beige)] [--btn-fg:var(--ds-noir)]",
        vert: "[--btn:var(--ds-vert)] [--btn-fg:var(--ds-noir)]",
        bleu: "[--btn:var(--ds-bleu)] [--btn-fg:var(--ds-noir)]",
        jaune: "[--btn:var(--ds-jaune-vif)] [--btn-fg:var(--ds-noir)]",
      },
      size: {
        default:
          "h-10 gap-1.5 px-6 has-data-[icon=inline-end]:pe-4 has-data-[icon=inline-start]:ps-4",
        xs: "h-7 gap-1 px-3 has-data-[icon=inline-end]:pe-2 has-data-[icon=inline-start]:ps-2 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-9 gap-1 px-4 has-data-[icon=inline-end]:pe-3 has-data-[icon=inline-start]:ps-3",
        lg: "h-11 gap-1.5 px-8 has-data-[icon=inline-end]:pe-5 has-data-[icon=inline-start]:ps-5",
        icon: "size-10",
        "icon-xs": "size-7 [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-9",
        "icon-lg": "size-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      tone: "noir",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  tone = "noir",
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
