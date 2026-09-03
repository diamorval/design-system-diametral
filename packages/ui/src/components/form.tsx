"use client"

import { Form as FormPrimitive } from "@base-ui/react/form"

import { cn } from "../lib/utils.js"

function Form({ className, ...props }: FormPrimitive.Props) {
  return (
    <FormPrimitive
      data-slot="form"
      className={cn("flex w-full flex-col gap-10", className)}
      {...props}
    />
  )
}

export { Form }
