import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"

import { cn } from "../lib/utils.js"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "ds-input border border-transparent border-b-input px-0",
        className
      )}
      {...props}
    />
  )
}

export { Input }
