import type { ComponentProps } from "react"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@diametral/ui/components/select"

const FRAMEWORKS = { vite: "Vite", next: "Next.js", astro: "Astro" }

export default function SelectPlayground(props: ComponentProps<typeof Select>) {
  return (
    <Select items={FRAMEWORKS} {...props}>
      <SelectTrigger>
        <SelectValue placeholder="Pick a framework" />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(FRAMEWORKS).map(([value, label]) => (
          <SelectItem key={value} value={value}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
