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
  /**
   * Editable text content. The playground file must place a `{children}` marker
   * where it belongs — which need not be on the subject itself: Marker puts it
   * inside MarkerContent, Checkbox inside its Label.
   */
  children?: { default: string; label?: string }
  /** Shown above the controls when the subject needs explaining. */
  note?: string
}

export const PLAYGROUNDS: Record<string, PlaygroundConfig> = {
  /* -- Variant-driven ---------------------------------------------------- */
  button: {
    children: { default: "Save changes" },
    variantsFrom: "buttonVariants",
    extras: [{ prop: "disabled", type: "boolean" }],
  },
  badge: {
    children: { default: "In review" },
    variantsFrom: "badgeVariants",
  },
  alert: {
    children: { default: "Heads up", label: "title" },
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
    children: { default: "Verified" },
    variantsFrom: "markerVariants",
  },
  item: {
    children: { default: "charter.pdf", label: "title" },
    variantsFrom: "itemVariants",
  },
  bubble: {
    children: { default: "How do I theme this?", label: "message" },
    variantsFrom: "bubbleVariants",
    note: "Controls drive the Bubble inside a BubbleGroup.",
  },
  attachment: {
    children: { default: "charte-diametral.pdf", label: "title" },
    variantsFrom: "attachmentVariants",
  },
  empty: {
    children: { default: "No documents", label: "title" },
    variantsFrom: "emptyMediaVariants",
    note: "The only axis in empty.tsx belongs to EmptyMedia, so the controls drive the media slot.",
  },
  tabs: {
    variantsFrom: "tabsListVariants",
    note: "The axis belongs to TabsList, not Tabs.",
  },
  sidebar: {
    children: { default: "Dashboard", label: "label" },
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
    children: { default: "Accept the charter", label: "label" },
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
    children: { default: "Accept the charter", label: "label" },
    extras: [
      { prop: "defaultChecked", type: "boolean", label: "checked" },
      { prop: "indeterminate", type: "boolean" },
      { prop: "disabled", type: "boolean" },
    ],
  },
  switch: {
    children: { default: "Email notifications", label: "label" },
    extras: [
      { prop: "defaultChecked", type: "boolean", label: "checked" },
      { prop: "disabled", type: "boolean" },
    ],
  },
  select: {
    extras: [
      { prop: "disabled", type: "boolean" },
      {
        prop: "defaultValue",
        type: "select",
        options: ["vite", "next", "astro"],
      },
    ],
  },
  "native-select": {
    extras: [
      { prop: "size", type: "select", options: ["default", "sm"] },
      { prop: "disabled", type: "boolean" },
    ],
  },
  avatar: {
    children: { default: "CR", label: "initials" },
    extras: [
      { prop: "size", type: "select", options: ["default", "sm", "lg"] },
    ],
  },
  separator: {
    note: "The row wraps, so a horizontal rule takes its own line while a vertical one stretches beside the labels.",
    extras: [
      {
        prop: "orientation",
        type: "select",
        options: ["horizontal", "vertical"],
      },
    ],
  },
  slider: {
    extras: [
      {
        prop: "orientation",
        type: "select",
        options: ["horizontal", "vertical"],
      },
      { prop: "step", type: "select", options: ["1", "5", "10", "25"] },
      { prop: "disabled", type: "boolean" },
    ],
  },
  rating: {
    extras: [
      { prop: "max", type: "select", options: ["5", "10", "3"] },
      { prop: "readOnly", type: "boolean" },
      { prop: "disabled", type: "boolean" },
    ],
  },
  stepper: {
    extras: [
      {
        prop: "orientation",
        type: "select",
        options: ["horizontal", "vertical"],
      },
    ],
  },
  "toggle-group": {
    note: "`variant` and `size` belong to toggleVariants in toggle.tsx, so they are declared here rather than extracted.",
    extras: [
      { prop: "multiple", type: "boolean" },
      {
        prop: "orientation",
        type: "select",
        options: ["horizontal", "vertical"],
      },
      { prop: "spacing", type: "select", options: ["2", "0", "4"] },
      { prop: "variant", type: "select", options: ["default", "outline"] },
      { prop: "size", type: "select", options: ["default", "sm", "lg"] },
    ],
  },
}

export function playgroundFor(slug: string): PlaygroundConfig | undefined {
  return PLAYGROUNDS[slug]
}
