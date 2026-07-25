import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@diametral/ui/components/select"

// Passing this same record as `items` is what lets the trigger show "Next.js"
// rather than the raw value "next".
const FRAMEWORKS = {
  vite: "Vite",
  next: "Next.js",
  remix: "Remix",
  astro: "Astro",
}

export default function SelectBasic() {
  return (
    <Select items={FRAMEWORKS}>
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
