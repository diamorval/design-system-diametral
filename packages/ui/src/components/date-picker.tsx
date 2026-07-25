"use client"

import { format } from "date-fns"

import { cn } from "../lib/utils.js"
import { Button } from "./button.js"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./popover.js"
import { CalendarBlankIcon } from "@phosphor-icons/react"

const DatePicker = Popover

function DatePickerTrigger({
  className,
  value,
  placeholder = "Pick a date",
  dateFormat = "PP",
  children,
  ...props
}: Omit<React.ComponentProps<typeof PopoverTrigger>, "value"> & {
  value?: Date
  placeholder?: string
  dateFormat?: string
}) {
  return (
    <PopoverTrigger
      data-slot="date-picker-trigger"
      render={<Button variant="outline" />}
      className={cn(
        "w-56 justify-between font-normal tracking-normal normal-case",
        className
      )}
      {...props}
    >
      {children ?? (
        <span className={cn(!value && "text-muted-foreground")}>
          {value ? format(value, dateFormat) : placeholder}
        </span>
      )}
      <CalendarBlankIcon
        data-icon="inline-end"
        className="pointer-events-none text-muted-foreground"
      />
    </PopoverTrigger>
  )
}

function DatePickerContent({
  className,
  align = "start",
  ...props
}: React.ComponentProps<typeof PopoverContent>) {
  return (
    <PopoverContent
      data-slot="date-picker-content"
      align={align}
      className={cn("w-auto gap-0 p-0", className)}
      {...props}
    />
  )
}

export { DatePicker, DatePickerTrigger, DatePickerContent }
