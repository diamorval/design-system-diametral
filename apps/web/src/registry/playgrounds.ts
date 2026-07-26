/**
 * Playground declarations. Variant axes are NOT listed here — they are parsed
 * out of each component's `cva()` block at build time, so adding a ninth button
 * tone needs no edit to this file. What lives here is only what cva cannot know:
 * which const to bind to, and the plain props (booleans, text) worth exposing.
 *
 * `variantsFrom` is validated at build time: a name that no longer resolves
 * fails the build rather than rendering an empty panel.
 */

/**
 * `always` prints the prop even when it still holds the first option's value.
 * Needed for props the component *requires* — `AspectRatio`'s `ratio`, a meter's
 * `value` — where omitting it at the default would emit code that does not
 * compile. Optional props should leave it off so an untouched panel prints clean.
 */
export type Control =
  | { prop: string; type: "boolean"; label?: string; always?: boolean }
  | {
      prop: string
      type: "text"
      label?: string
      placeholder?: string
      always?: boolean
    }
  | {
      prop: string
      type: "select"
      options: string[]
      label?: string
      always?: boolean
    }

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
  toolbar: {
    extras: [
      {
        prop: "orientation",
        type: "select",
        options: ["horizontal", "vertical"],
      },
      { prop: "disabled", type: "boolean" },
    ],
  },
  accordion: {
    extras: [
      { prop: "multiple", type: "boolean" },
      {
        prop: "orientation",
        type: "select",
        options: ["horizontal", "vertical"],
      },
      { prop: "disabled", type: "boolean" },
    ],
  },
  collapsible: {
    extras: [
      { prop: "defaultOpen", type: "boolean", label: "open" },
      { prop: "disabled", type: "boolean" },
    ],
  },
  resizable: {
    note: "The axis belongs to ResizablePanelGroup, which takes `orientation` — not the `direction` older shadcn snippets pass.",
    extras: [
      {
        prop: "orientation",
        type: "select",
        options: ["horizontal", "vertical"],
      },
    ],
  },
  carousel: {
    extras: [
      {
        prop: "orientation",
        type: "select",
        options: ["horizontal", "vertical"],
      },
    ],
  },
  form: {
    note: "`validationMode` decides when fields validate. Errors themselves are wired through FieldError, because this system's Field is a plain div.",
    extras: [
      {
        prop: "validationMode",
        type: "select",
        options: ["onSubmit", "onBlur", "onChange"],
      },
    ],
  },
  "file-upload": {
    extras: [
      { prop: "multiple", type: "boolean" },
      { prop: "disabled", type: "boolean" },
      { prop: "accept", type: "text", placeholder: ".pdf,.png" },
    ],
  },
  direction: {
    note: "The provider drives Base UI's panels and arrow keys; the `dir` attribute drives the CSS. Set both — the template passes the same value to each.",
    extras: [{ prop: "direction", type: "select", options: ["ltr", "rtl"] }],
  },
  "radio-group": {
    extras: [
      { prop: "disabled", type: "boolean" },
      { prop: "readOnly", type: "boolean" },
      { prop: "required", type: "boolean" },
    ],
  },
  "checkbox-group": {
    extras: [{ prop: "disabled", type: "boolean" }],
  },
  "number-field": {
    extras: [
      { prop: "step", type: "select", options: ["1", "5", "10", "0.5"] },
      { prop: "min", type: "text", placeholder: "0" },
      { prop: "max", type: "text", placeholder: "20" },
      { prop: "disabled", type: "boolean" },
      { prop: "readOnly", type: "boolean" },
    ],
  },
  "input-otp": {
    extras: [
      {
        prop: "maxLength",
        type: "select",
        options: ["6", "4", "8"],
        always: true,
      },
      { prop: "disabled", type: "boolean" },
    ],
  },
  tree: {
    note: "The controls drive one branch: TreeItem is a Collapsible, so open state belongs to it rather than to Tree.",
    extras: [
      { prop: "defaultOpen", type: "boolean", label: "open" },
      { prop: "disabled", type: "boolean" },
    ],
  },
  timeline: {
    children: { default: "Brief reçu", label: "title" },
    note: "`data-state` goes on the item, not the indicator — the indicator styles itself from it.",
    extras: [
      {
        prop: "data-state",
        type: "select",
        options: ["inactive", "completed", "active"],
        label: "state",
      },
    ],
  },
  message: {
    children: { default: "Sent you the export.", label: "message" },
    extras: [{ prop: "align", type: "select", options: ["start", "end"] }],
  },
  pagination: {
    note: "The controls drive one page link; the nav itself takes nothing.",
    extras: [
      { prop: "isActive", type: "boolean" },
      {
        prop: "size",
        type: "select",
        options: ["icon", "default", "sm", "lg"],
      },
    ],
  },

  /* -- Overlays: the subject is the content, so open it to see the effect -- */
  tooltip: {
    children: { default: "Move to archive", label: "content" },
    extras: [
      {
        prop: "side",
        type: "select",
        options: ["top", "bottom", "inline-start", "inline-end"],
      },
      { prop: "align", type: "select", options: ["center", "start", "end"] },
    ],
  },
  popover: {
    children: { default: "Charter tokens", label: "title" },
    extras: [
      {
        prop: "side",
        type: "select",
        options: ["bottom", "top", "inline-start", "inline-end"],
      },
      { prop: "align", type: "select", options: ["center", "start", "end"] },
    ],
  },
  "hover-card": {
    children: { default: "Camille Roux", label: "title" },
    extras: [
      {
        prop: "side",
        type: "select",
        options: ["bottom", "top", "inline-start", "inline-end"],
      },
      { prop: "align", type: "select", options: ["center", "start", "end"] },
    ],
  },
  dialog: {
    children: { default: "Share this component", label: "title" },
    extras: [{ prop: "showCloseButton", type: "boolean" }],
  },
  "alert-dialog": {
    children: { default: "Revoke access?", label: "title" },
    note: '`size="sm"` stays centred at every breakpoint; `default` goes start-aligned from `sm` up.',
    extras: [{ prop: "size", type: "select", options: ["default", "sm"] }],
  },
  sheet: {
    children: { default: "Edit project", label: "title" },
    extras: [
      {
        prop: "side",
        type: "select",
        options: ["right", "left", "top", "bottom"],
      },
      { prop: "showCloseButton", type: "boolean" },
    ],
  },
  drawer: {
    children: { default: "Filters", label: "title" },
    note: "There is no `side`: `swipeDirection` is the single source of truth the content derives its geometry from.",
    extras: [
      {
        prop: "swipeDirection",
        type: "select",
        options: ["down", "up", "left", "right"],
      },
      { prop: "modal", type: "boolean" },
    ],
  },
  "dropdown-menu": {
    extras: [
      {
        prop: "side",
        type: "select",
        options: ["bottom", "top", "inline-start", "inline-end"],
      },
      { prop: "align", type: "select", options: ["start", "center", "end"] },
    ],
  },
  "context-menu": {
    extras: [
      { prop: "align", type: "select", options: ["start", "center", "end"] },
    ],
  },
  "navigation-menu": {
    note: "navigationMenuTriggerStyle is a cva with no variants object, so there is no axis to extract — `align` on the root is the real knob.",
    extras: [
      { prop: "align", type: "select", options: ["start", "center", "end"] },
    ],
  },

  /* -- Value-driven: `always` keeps required props in the snippet --------- */
  "aspect-ratio": {
    note: "`ratio` is required, so it is always printed — omitting it at the default would emit code that does not compile.",
    extras: [
      {
        prop: "ratio",
        type: "select",
        options: ["1.7778", "1", "1.3333", "1.5", "2.3333"],
        always: true,
      },
    ],
  },
  meter: {
    extras: [
      {
        prop: "value",
        type: "select",
        options: ["68", "0", "25", "50", "100"],
        always: true,
      },
      { prop: "max", type: "text", placeholder: "100" },
    ],
  },
  progress: {
    note: "The panel cannot express the indeterminate state — that is `value={null}`, not a number.",
    extras: [
      {
        prop: "value",
        type: "select",
        options: ["72", "0", "25", "50", "100"],
        always: true,
      },
      { prop: "max", type: "text", placeholder: "100" },
    ],
  },
  calendar: {
    extras: [
      {
        prop: "captionLayout",
        type: "select",
        options: ["label", "dropdown", "dropdown-months", "dropdown-years"],
      },
      { prop: "numberOfMonths", type: "select", options: ["1", "2"] },
      { prop: "showOutsideDays", type: "boolean" },
      { prop: "disabled", type: "boolean" },
    ],
  },
  "date-picker": {
    note: "DatePicker is Popover; the controls drive the trigger, which is the only part this component adds.",
    extras: [
      { prop: "placeholder", type: "text", placeholder: "Pick a date" },
      {
        prop: "dateFormat",
        type: "select",
        options: ["PP", "P", "PPP", "PPPP"],
      },
      { prop: "disabled", type: "boolean" },
    ],
  },

  /* -- Investigated: provider-level, cmdk, and the imperative one -------- */
  combobox: {
    note: "The controls drive ComboboxInput, which owns this system's own additions rather than Base UI's root props.",
    extras: [
      { prop: "showTrigger", type: "boolean" },
      { prop: "showClear", type: "boolean" },
      { prop: "disabled", type: "boolean" },
      { prop: "placeholder", type: "text", placeholder: "Search a city…" },
    ],
  },
  autocomplete: {
    extras: [
      { prop: "showClear", type: "boolean" },
      { prop: "disabled", type: "boolean" },
      { prop: "placeholder", type: "text", placeholder: "Start typing…" },
    ],
  },
  command: {
    note: "cmdk's props: turn `shouldFilter` off to hand filtering to a server, and `loop` wraps arrow-key selection at the ends.",
    extras: [
      { prop: "shouldFilter", type: "boolean" },
      { prop: "loop", type: "boolean" },
      { prop: "vimBindings", type: "boolean" },
      { prop: "disablePointerSelection", type: "boolean" },
    ],
  },
  menubar: {
    extras: [
      {
        prop: "orientation",
        type: "select",
        options: ["horizontal", "vertical"],
      },
      { prop: "loopFocus", type: "boolean" },
      { prop: "modal", type: "boolean" },
      { prop: "disabled", type: "boolean" },
    ],
  },
  "message-scroller": {
    note: "The controls drive the provider — Root, Viewport and Button all read its context, and without it they throw.",
    extras: [
      { prop: "autoScroll", type: "boolean" },
      {
        prop: "defaultScrollPosition",
        type: "select",
        options: ["end", "start"],
      },
    ],
  },
  toast: {
    note: "Toast is fired, not rendered. The controls drive a live toast, but the snippet shows the shape of the `toast.add` call rather than tracking them — the generated code can only rewrite JSX attributes.",
    extras: [
      {
        prop: "type",
        type: "select",
        options: ["success", "info", "warning", "error", "loading"],
      },
      { prop: "title", type: "text", placeholder: "Invoice deleted" },
      { prop: "description", type: "text", placeholder: "INV-003 archived." },
    ],
  },

  /* -- Thin panels: little or no enumerable API --------------------------- */
  kbd: {
    children: { default: "K", label: "key" },
  },
  label: {
    children: { default: "Email", label: "text" },
  },
  skeleton: {
    note: "Size and shape are entirely the caller's, so `className` is the whole API.",
    extras: [
      {
        prop: "className",
        type: "select",
        options: ["h-4 w-40", "h-3 w-24", "size-10 rounded-full", "h-24 w-64"],
        always: true,
      },
    ],
  },
  spinner: {
    extras: [
      {
        prop: "className",
        type: "select",
        options: ["size-4", "size-6", "size-8 text-muted-foreground"],
        always: true,
      },
    ],
  },
  "scroll-area": {
    note: "The root needs a bounded height for anything to scroll. Only a vertical scrollbar is rendered today.",
    extras: [
      {
        prop: "className",
        type: "select",
        options: ["h-56", "h-32", "h-72"],
        always: true,
      },
    ],
  },
  breadcrumb: {
    children: { default: "Breadcrumb", label: "current page" },
  },
  card: {
    children: { default: "Charte graphique", label: "title" },
  },
  table: {
    note: 'The parts are plain elements with no variant axis; `data-state="selected"` on a row is the one state that changes anything.',
    extras: [
      {
        prop: "data-state",
        type: "select",
        options: ["default", "selected"],
        label: "row state",
      },
    ],
  },
  "data-table": {
    note: "`searchColumn` is what turns the filter box on — naming a column that does not exist silently disables it.",
    extras: [
      {
        prop: "searchColumn",
        type: "select",
        options: ["suite", "id", "status"],
      },
      { prop: "pageSize", type: "select", options: ["5", "3"] },
      {
        prop: "searchPlaceholder",
        type: "text",
        placeholder: "Filter results",
      },
      { prop: "emptyMessage", type: "text", placeholder: "No results." },
    ],
  },
  chart: {
    note: "Chart is configured through its `config` object and recharts children, not through enumerable props — so this panel is empty on purpose. The examples below are the documentation.",
  },

  /* -- Layout & chrome (lane 3) -------------------------------------------- */
  "page-header": {
    children: { default: "Team settings", label: "title" },
  },
  panel: {
    children: { default: "Notifications", label: "title" },
  },
  masonry: {
    note: "`columns` becomes a `--columns` custom property, so any integer works — there is no fixed breakpoint list.",
    extras: [
      {
        prop: "columns",
        type: "select",
        options: ["3", "2", "4"],
        always: true,
      },
    ],
  },
}

export function playgroundFor(slug: string): PlaygroundConfig | undefined {
  return PLAYGROUNDS[slug]
}
