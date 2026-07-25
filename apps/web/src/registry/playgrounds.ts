/**
 * Playground declarations. Variant axes are NOT listed here — they are parsed
 * out of each component's `cva()` block at build time, so adding a ninth button
 * tone needs no edit to this file. What lives here is only what cva cannot know:
 * which const to bind to, and the plain props (booleans, text) worth exposing.
 *
 * `variantsFrom` is validated at build time: a name that no longer resolves
 * fails the build rather than rendering an empty panel.
 */

export type Control =
  | { prop: string; type: "boolean"; label?: string }
  | { prop: string; type: "text"; label?: string; placeholder?: string }
  | { prop: string; type: "select"; options: string[]; label?: string }

export type PlaygroundConfig = {
  /** Name of the cva const in `packages/ui/src/components/<slug>.tsx`. */
  variantsFrom?: string
  /** Props the cva block has no knowledge of. */
  extras?: Control[]
  /** Shown above the controls when the subject needs explaining. */
  note?: string
}

export const PLAYGROUNDS: Record<string, PlaygroundConfig> = {
  /* -- Variant-driven ---------------------------------------------------- */
  button: {
    variantsFrom: "buttonVariants",
    extras: [{ prop: "disabled", type: "boolean" }],
  },
  badge: {
    variantsFrom: "badgeVariants",
  },
  alert: {
    variantsFrom: "alertVariants",
  },
  toggle: {
    variantsFrom: "toggleVariants",
    extras: [
      { prop: "disabled", type: "boolean" },
      { prop: "defaultPressed", type: "boolean", label: "pressed" },
    ],
  },
  marker: {
    variantsFrom: "markerVariants",
  },
  item: {
    variantsFrom: "itemVariants",
  },
  bubble: {
    variantsFrom: "bubbleVariants",
    note: "Controls drive the Bubble inside a BubbleGroup.",
  },
  attachment: {
    variantsFrom: "attachmentVariants",
  },
  empty: {
    variantsFrom: "emptyMediaVariants",
    note: "The only axis in empty.tsx belongs to EmptyMedia, so the controls drive the media slot.",
  },
  tabs: {
    variantsFrom: "tabsListVariants",
    note: "The axis belongs to TabsList, not Tabs.",
  },
  sidebar: {
    variantsFrom: "sidebarMenuButtonVariants",
    note: "The axis belongs to SidebarMenuButton.",
    extras: [{ prop: "isActive", type: "boolean" }],
  },
  "input-group": {
    variantsFrom: "inputGroupAddonVariants",
    note: "The axis belongs to InputGroupAddon — it positions the addon within the group.",
  },
  "button-group": {
    variantsFrom: "buttonGroupVariants",
  },
  field: {
    variantsFrom: "fieldVariants",
  },

  /* -- Declared-only (no cva axis) --------------------------------------- */
  input: {
    extras: [
      {
        prop: "type",
        type: "select",
        options: ["text", "email", "password", "number", "date", "file"],
      },
      { prop: "placeholder", type: "text", placeholder: "you@diametral.com" },
      { prop: "disabled", type: "boolean" },
      { prop: "readOnly", type: "boolean" },
      { prop: "aria-invalid", type: "boolean", label: "invalid" },
    ],
  },
  textarea: {
    extras: [
      { prop: "placeholder", type: "text", placeholder: "Say something…" },
      { prop: "rows", type: "select", options: ["2", "3", "5", "8"] },
      { prop: "disabled", type: "boolean" },
      { prop: "aria-invalid", type: "boolean", label: "invalid" },
    ],
  },
  checkbox: {
    extras: [
      { prop: "defaultChecked", type: "boolean", label: "checked" },
      { prop: "indeterminate", type: "boolean" },
      { prop: "disabled", type: "boolean" },
    ],
  },
  switch: {
    extras: [
      { prop: "defaultChecked", type: "boolean", label: "checked" },
      { prop: "disabled", type: "boolean" },
    ],
  },
  select: {
    extras: [
      { prop: "disabled", type: "boolean" },
      { prop: "defaultValue", type: "select", options: ["vite", "next", "astro"] },
    ],
  },
}

export function playgroundFor(slug: string): PlaygroundConfig | undefined {
  return PLAYGROUNDS[slug]
}
