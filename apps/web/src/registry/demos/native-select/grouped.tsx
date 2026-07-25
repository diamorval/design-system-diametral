import {
  NativeSelect,
  NativeSelectOptGroup,
  NativeSelectOption,
} from "@workspace/ui/components/native-select"

// Options are painted with the `Canvas` / `CanvasText` system colours, because
// the native dropdown is drawn by the OS and ignores the app's palette.
export default function NativeSelectGrouped() {
  return (
    <div className="flex flex-wrap items-end gap-6">
      <NativeSelect defaultValue="vite" aria-label="Build tool">
        <NativeSelectOptGroup label="Bundlers">
          <NativeSelectOption value="vite">Vite</NativeSelectOption>
          <NativeSelectOption value="rolldown">Rolldown</NativeSelectOption>
        </NativeSelectOptGroup>
        <NativeSelectOptGroup label="Frameworks">
          <NativeSelectOption value="next">Next.js</NativeSelectOption>
          <NativeSelectOption value="astro">Astro</NativeSelectOption>
        </NativeSelectOptGroup>
      </NativeSelect>

      <NativeSelect size="sm" aria-label="Rows per page" defaultValue="25">
        <NativeSelectOption value="10">10</NativeSelectOption>
        <NativeSelectOption value="25">25</NativeSelectOption>
        <NativeSelectOption value="50">50</NativeSelectOption>
      </NativeSelect>

      <NativeSelect disabled aria-label="Disabled" defaultValue="a">
        <NativeSelectOption value="a">Disabled</NativeSelectOption>
      </NativeSelect>
    </div>
  )
}
