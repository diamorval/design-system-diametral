export type Example = {
  /** Key into the demo registry: `<slug>/<file-name>` without the extension. */
  demo: string
  title: string
  description?: string
}

export type ComponentDoc = {
  slug: string
  name: string
  description: string
  category: string
  examples?: Example[]
}

/**
 * Every component in @workspace/ui gets an entry so the sidebar is a complete
 * map of the system; `examples` is what makes a page documented. Pages without
 * examples render an honest "not yet documented" state rather than being hidden,
 * which keeps the remaining work visible instead of invisible.
 */
export const COMPONENTS: ComponentDoc[] = [
  /* -- Actions ----------------------------------------------------------- */
  {
    slug: "button",
    name: "Button",
    category: "Actions",
    description:
      "The primary action trigger. Six variants and an eight-colour brand tone axis that compose independently.",
    examples: [
      {
        demo: "button/variants",
        title: "Variants",
        description:
          "The six shadcn variants, mapped onto Diametral slots — `default` is the neutral action surface, `destructive` the functional red.",
      },
      {
        demo: "button/tones",
        title: "Brand tones",
        description:
          "`tone` sets the fill from the Tier-1 palette. It is a separate axis from `variant`, so there is no compound-variant explosion.",
      },
      {
        demo: "button/tones-subtle",
        title: "Tones on outline and ghost",
        description:
          "On the low-emphasis variants, tone drives the border and hover wash while the label stays `text-foreground` for contrast on light tones like beige and jaune.",
      },
      { demo: "button/sizes", title: "Sizes" },
      {
        demo: "button/icon",
        title: "With icon and loading",
        description:
          "Icons are sized by the button's own `[&_svg]` rules — no wrapper classes needed.",
      },
    ],
  },
  {
    slug: "button-group",
    name: "Button Group",
    category: "Actions",
    description:
      "Joins related buttons into a single segmented control with shared borders.",
  },
  {
    slug: "toggle",
    name: "Toggle",
    category: "Actions",
    description: "A two-state button for on/off formatting controls.",
  },
  {
    slug: "toggle-group",
    name: "Toggle Group",
    category: "Actions",
    description:
      "A set of toggles with single or multiple selection, sharing one value.",
  },
  {
    slug: "toolbar",
    name: "Toolbar",
    category: "Actions",
    description:
      "A Base UI toolbar with arrow-key navigation across grouped buttons, inputs and separators.",
  },
  {
    slug: "kbd",
    name: "Kbd",
    category: "Actions",
    description: "Renders a keyboard key or chord inline, in Geist Mono.",
  },

  /* -- Forms ------------------------------------------------------------- */
  {
    slug: "input",
    name: "Input",
    category: "Forms",
    description:
      "The single-line text field, and the base every other text control borrows its focus ring and invalid styling from.",
    examples: [
      { demo: "input/basic", title: "Basic" },
      {
        demo: "input/with-field",
        title: "With label and description",
        description:
          "`Field` supplies the label association and helper text; `Input` stays a plain control.",
      },
      {
        demo: "input/invalid",
        title: "Invalid and disabled",
        description:
          "`aria-invalid` drives the destructive ring — the styling follows the accessibility attribute rather than a separate prop.",
      },
      {
        demo: "input/with-addon",
        title: "With addons",
        description:
          "`InputGroup` positions icons and buttons inside the field box, keeping one focus ring around the whole group.",
      },
    ],
  },
  {
    slug: "textarea",
    name: "Textarea",
    category: "Forms",
    description: "A multi-line text field sharing Input's focus and invalid states.",
  },
  {
    slug: "label",
    name: "Label",
    category: "Forms",
    description:
      "An accessible label; pairs with a control via `htmlFor` and dims with its disabled state.",
  },
  {
    slug: "field",
    name: "Field",
    category: "Forms",
    description:
      "The form row primitive — label, control, description and error in one accessible group. Replaces the retired `form` component in this system.",
    examples: [
      {
        demo: "field/basic",
        title: "Basic",
        description:
          "Label, control and description. `FieldDescription` is the helper text slot; it sits below the control.",
      },
      {
        demo: "field/group",
        title: "Field group",
        description:
          "`FieldGroup` stacks rows with consistent spacing so forms do not need ad-hoc margins.",
      },
      {
        demo: "field/invalid",
        title: "With error",
        description:
          "`FieldError` accepts either children or an `errors` array, which it de-duplicates by message and renders as a list when there is more than one.",
      },
      {
        demo: "field/choices",
        title: "Horizontal orientation",
        description:
          "`orientation=\"horizontal\"` puts the control before the label — the correct order for checkboxes and radios.",
      },
    ],
  },
  {
    slug: "select",
    name: "Select",
    category: "Forms",
    description:
      "A Base UI listbox for choosing one option from a set, with a rendered trigger and portalled popup.",
    examples: [
      {
        demo: "select/basic",
        title: "Basic",
        description:
          "Pass `items` on the root: without it `SelectValue` renders the raw value (`next`) rather than the selected item's label (`Next.js`).",
      },
      {
        demo: "select/grouped",
        title: "Grouped options",
        description:
          "`SelectGroup` with a `SelectLabel` scopes a heading to its options; `SelectSeparator` divides groups.",
      },
      {
        demo: "select/with-field",
        title: "In a field",
        description:
          "Give the trigger `w-full` to fill the field width — the trigger is `w-fit` by default.",
      },
    ],
  },
  {
    slug: "native-select",
    name: "Native Select",
    category: "Forms",
    description:
      "A styled native `<select>` for dense forms and mobile, where the OS picker is preferable.",
  },
  {
    slug: "checkbox",
    name: "Checkbox",
    category: "Forms",
    description:
      "A single boolean control, with indeterminate support via the `parent` prop inside a group.",
  },
  {
    slug: "checkbox-group",
    name: "Checkbox Group",
    category: "Forms",
    description:
      "Manages a set of checkbox values, including the parent select-all relationship.",
  },
  {
    slug: "radio-group",
    name: "Radio Group",
    category: "Forms",
    description:
      "One choice from many. Base UI renders items as spans, so labels must be associated explicitly.",
  },
  {
    slug: "switch",
    name: "Switch",
    category: "Forms",
    description: "An immediate on/off toggle for settings that apply on change.",
  },
  {
    slug: "slider",
    name: "Slider",
    category: "Forms",
    description: "Selects a number, or a range, by dragging along a track.",
  },
  {
    slug: "number-field",
    name: "Number Field",
    category: "Forms",
    description:
      "A numeric input with increment and decrement controls, scrub support and locale-aware formatting.",
  },
  {
    slug: "input-group",
    name: "Input Group",
    category: "Forms",
    description:
      "Composes addons, icons and buttons around an input inside a single bordered box.",
  },
  {
    slug: "input-otp",
    name: "Input OTP",
    category: "Forms",
    description: "A segmented one-time-code field with per-character slots.",
  },
  {
    slug: "combobox",
    name: "Combobox",
    category: "Forms",
    description:
      "An input that filters a list, with single or multi-select and chip display.",
  },
  {
    slug: "autocomplete",
    name: "Autocomplete",
    category: "Forms",
    description:
      "Free-text input with suggestions — unlike Combobox, the typed value need not come from the list.",
  },
  {
    slug: "calendar",
    name: "Calendar",
    category: "Forms",
    description:
      "A month grid for date selection, built on react-day-picker with Diametral chrome.",
  },
  {
    slug: "date-picker",
    name: "Date Picker",
    category: "Forms",
    description: "A Calendar in a Popover, with a formatted trigger.",
  },
  {
    slug: "file-upload",
    name: "File Upload",
    category: "Forms",
    description:
      "A drag-and-drop drop zone with keyboard activation and dragging feedback.",
  },
  {
    slug: "rating",
    name: "Rating",
    category: "Forms",
    description:
      "A star rating with hover preview, plus a read-only mode for display.",
  },
  {
    slug: "form",
    name: "Form",
    category: "Forms",
    description:
      "A thin Base UI Form wrapper that consolidates validity and focuses the first invalid field on submit. Prefer `Field` for layout.",
  },

  /* -- Data display ------------------------------------------------------ */
  {
    slug: "table",
    name: "Table",
    category: "Data display",
    description:
      "The static table primitives. For sorting, filtering and pagination use Data Table.",
    examples: [
      { demo: "table/basic", title: "Basic" },
      {
        demo: "table/with-badges",
        title: "With status badges",
        description:
          "Numeric columns take `text-right`; ids take `font-mono` so digits align down the column.",
      },
      {
        demo: "table/with-footer",
        title: "With footer total",
        description: "`TableFooter` is styled as a summary row, not a repeat of the header.",
      },
    ],
  },
  {
    slug: "data-table",
    name: "Data Table",
    category: "Data display",
    description:
      "TanStack Table wired into the Table primitives — sorting, column filtering and pagination from a `columns` definition.",
    examples: [
      {
        demo: "data-table/basic",
        title: "Basic",
        description:
          "Pass `columns` and `data`. Column headers become sort toggles wherever the column is sortable.",
      },
      {
        demo: "data-table/searchable",
        title: "Search and pagination",
        description:
          "`searchColumn` filters on one column; `pageSize` turns on pagination controls.",
      },
    ],
  },
  {
    slug: "chart",
    name: "Chart",
    category: "Data display",
    description:
      "Recharts wrapped so series colours come from a `ChartConfig` and resolve to brand chart tokens.",
    examples: [
      {
        demo: "chart/bar",
        title: "Bar chart",
        description:
          "`ChartContainer` injects a `--color-<key>` variable per config entry, which the series then references.",
      },
      { demo: "chart/line", title: "Line chart" },
      { demo: "chart/area", title: "Area chart" },
      {
        demo: "chart/pie",
        title: "Pie chart with legend",
        description: "`ChartLegendContent` reads its labels from the same config.",
      },
    ],
  },
  {
    slug: "card",
    name: "Card",
    category: "Data display",
    description:
      "A bordered surface with header, content and footer slots — the default container for grouped content.",
    examples: [
      { demo: "card/basic", title: "Basic" },
      {
        demo: "card/with-action",
        title: "With header action",
        description:
          "`CardAction` is positioned by the header grid, so it stays top-right without absolute positioning.",
      },
      {
        demo: "card/stat",
        title: "Stat card",
        description: "Titles use the Ufficio heading face; figures use tabular digits.",
      },
      { demo: "card/with-chart", title: "With a chart" },
    ],
  },
  {
    slug: "badge",
    name: "Badge",
    category: "Data display",
    description: "A compact status or category label.",
  },
  {
    slug: "avatar",
    name: "Avatar",
    category: "Data display",
    description: "A user image with a text fallback, and a group with overflow count.",
  },
  {
    slug: "item",
    name: "Item",
    category: "Data display",
    description:
      "A list row with media, content and actions slots — lighter than a Card for repeated rows.",
  },
  {
    slug: "marker",
    name: "Marker",
    category: "Data display",
    description: "A small inline badge pairing an icon with a label.",
  },
  {
    slug: "meter",
    name: "Meter",
    category: "Data display",
    description:
      "Displays a measured value within a known range — capacity, not task progress.",
  },
  {
    slug: "progress",
    name: "Progress",
    category: "Data display",
    description: "Task completion, with optional label and value slots.",
  },
  {
    slug: "skeleton",
    name: "Skeleton",
    category: "Data display",
    description: "A placeholder block for content that has not loaded.",
  },
  {
    slug: "spinner",
    name: "Spinner",
    category: "Data display",
    description: "An indeterminate loading indicator, sized to the current text.",
  },
  {
    slug: "timeline",
    name: "Timeline",
    category: "Data display",
    description:
      "A vertical sequence of events with completed, active and inactive states.",
  },
  {
    slug: "tree",
    name: "Tree",
    category: "Data display",
    description:
      "A collapsible hierarchy with semantic tree ARIA roles and icon swapping per state.",
  },
  {
    slug: "empty",
    name: "Empty",
    category: "Data display",
    description: "The empty-state block: media, title, description and an action.",
  },

  /* -- Navigation -------------------------------------------------------- */
  {
    slug: "tabs",
    name: "Tabs",
    category: "Navigation",
    description:
      "Switches between panels in place. Supports horizontal and vertical orientation from one prop.",
    examples: [
      { demo: "tabs/basic", title: "Basic" },
      {
        demo: "tabs/vertical",
        title: "Vertical",
        description:
          "`orientation=\"vertical\"` sets `data-orientation`, which the list and triggers style against via `group-data-vertical/tabs:`.",
      },
      { demo: "tabs/in-card", title: "Inside a card" },
    ],
  },
  {
    slug: "sidebar",
    name: "Sidebar",
    category: "Navigation",
    description:
      "The application shell navigation — collapsible, keyboard-toggleable, with groups, menus and an inset content area.",
    examples: [
      {
        demo: "sidebar/basic",
        title: "Basic",
        description:
          "`collapsible=\"none\"` pins the sidebar open, which is what you want when embedding it in a bounded demo frame rather than a full page.",
      },
      {
        demo: "sidebar/collapsible-icon",
        title: "Collapsible to icons",
        description:
          "`collapsible=\"icon\"` collapses to a rail of icons. `SidebarTrigger` toggles it; tooltips carry the labels once collapsed.",
      },
    ],
  },
  {
    slug: "breadcrumb",
    name: "Breadcrumb",
    category: "Navigation",
    description: "The trail to the current page, with the last item as plain text.",
  },
  {
    slug: "navigation-menu",
    name: "Navigation Menu",
    category: "Navigation",
    description: "A horizontal site menu with optional rich dropdown panels.",
  },
  {
    slug: "menubar",
    name: "Menubar",
    category: "Navigation",
    description: "A desktop-style application menu bar with keyboard traversal.",
  },
  {
    slug: "command",
    name: "Command",
    category: "Navigation",
    description: "A searchable command palette, standalone or in a dialog.",
  },
  {
    slug: "pagination",
    name: "Pagination",
    category: "Navigation",
    description: "Page links with previous, next and ellipsis.",
  },
  {
    slug: "stepper",
    name: "Stepper",
    category: "Navigation",
    description:
      "Progress through a multi-step flow, with per-step state and orientation support.",
  },

  /* -- Layout ------------------------------------------------------------ */
  {
    slug: "aspect-ratio",
    name: "Aspect Ratio",
    category: "Layout",
    description: "Constrains content to a fixed width-to-height ratio.",
  },
  {
    slug: "separator",
    name: "Separator",
    category: "Layout",
    description:
      "A rule between content. Base UI inverts the orientation semantics — a horizontal group takes vertical separators.",
  },
  {
    slug: "scroll-area",
    name: "Scroll Area",
    category: "Layout",
    description: "A scrollable region with styled, overlay scrollbars.",
  },
  {
    slug: "resizable",
    name: "Resizable",
    category: "Layout",
    description: "Panel groups with draggable handles that persist their sizes.",
  },
  {
    slug: "carousel",
    name: "Carousel",
    category: "Layout",
    description: "A horizontal slide viewport with previous and next controls.",
  },

  /* -- Disclosure -------------------------------------------------------- */
  {
    slug: "accordion",
    name: "Accordion",
    category: "Disclosure",
    description: "Stacked sections that expand one at a time, or several at once.",
  },
  {
    slug: "collapsible",
    name: "Collapsible",
    category: "Disclosure",
    description:
      "A single show/hide region. Emits `data-open` / `data-closed`, not `data-state`.",
  },

  /* -- Overlays ---------------------------------------------------------- */
  {
    slug: "dialog",
    name: "Dialog",
    category: "Overlays",
    description:
      "A modal window for focused tasks. Triggers use Base UI's `render` prop rather than `asChild`.",
    examples: [
      {
        demo: "dialog/basic",
        title: "Basic",
        description:
          "`render={<Button variant=\"outline\" />}` makes the trigger *be* the button — no nested-button markup.",
      },
      {
        demo: "dialog/with-form",
        title: "With a form",
        description:
          "`DialogClose` also takes `render`, so a footer button both submits intent and closes.",
      },
      {
        demo: "dialog/controlled",
        title: "Controlled",
        description:
          "Drive `open` / `onOpenChange` yourself when the dialog must close only after work succeeds.",
      },
    ],
  },
  {
    slug: "alert-dialog",
    name: "Alert Dialog",
    category: "Overlays",
    description:
      "A blocking confirmation for destructive actions — no dismiss on outside click.",
  },
  {
    slug: "sheet",
    name: "Sheet",
    category: "Overlays",
    description: "A panel that slides in from an edge.",
  },
  {
    slug: "drawer",
    name: "Drawer",
    category: "Overlays",
    description: "A bottom sheet with drag-to-dismiss, tuned for touch.",
  },
  {
    slug: "popover",
    name: "Popover",
    category: "Overlays",
    description: "Anchored, non-modal content with title and description slots.",
  },
  {
    slug: "hover-card",
    name: "Hover Card",
    category: "Overlays",
    description: "A preview surface shown on hover, for links and mentions.",
  },
  {
    slug: "tooltip",
    name: "Tooltip",
    category: "Overlays",
    description: "A short label on hover or focus. Never put interactive content in one.",
  },
  {
    slug: "dropdown-menu",
    name: "Dropdown Menu",
    category: "Overlays",
    description:
      "An action menu from a trigger, with labels, separators, shortcuts and destructive items.",
  },
  {
    slug: "context-menu",
    name: "Context Menu",
    category: "Overlays",
    description: "The same menu surface, opened by right-click on a region.",
  },

  /* -- Feedback ---------------------------------------------------------- */
  {
    slug: "toast",
    name: "Toast",
    category: "Feedback",
    description:
      "Transient notifications from a singleton manager — call `toast.add()` from anywhere, no local state.",
    examples: [
      {
        demo: "toast/basic",
        title: "Basic",
        description:
          "`Toaster` must already wrap the tree; it both provides the manager context and mounts the portal and viewport.",
      },
      {
        demo: "toast/types",
        title: "Types",
        description:
          "`type` selects the leading icon: success, info, warning, error or loading.",
      },
      {
        demo: "toast/with-action",
        title: "With an action",
        description:
          "`actionProps` is forwarded to the rendered `ToastAction` button — the toast list needs no per-call markup.",
      },
    ],
  },
  {
    slug: "alert",
    name: "Alert",
    category: "Feedback",
    description: "A persistent inline message, with an optional action slot.",
  },

  /* -- Conversation ------------------------------------------------------ */
  {
    slug: "bubble",
    name: "Bubble",
    category: "Conversation",
    description: "Chat bubbles grouped by author.",
  },
  {
    slug: "message",
    name: "Message",
    category: "Conversation",
    description: "A conversation row with avatar and content.",
  },
  {
    slug: "message-scroller",
    name: "Message Scroller",
    category: "Conversation",
    description:
      "A transcript viewport that keeps itself pinned to the latest message.",
  },
  {
    slug: "attachment",
    name: "Attachment",
    category: "Conversation",
    description:
      "File metadata display for a message. Not an upload input — see File Upload.",
  },

  /* -- Utilities --------------------------------------------------------- */
  {
    slug: "direction",
    name: "Direction",
    category: "Utilities",
    description:
      "A provider that sets text direction (LTR/RTL) for every Base UI component beneath it.",
  },
]

export const CATEGORIES = [
  "Actions",
  "Forms",
  "Data display",
  "Navigation",
  "Layout",
  "Disclosure",
  "Overlays",
  "Feedback",
  "Conversation",
  "Utilities",
] as const

export function componentsByCategory() {
  return CATEGORIES.map((category) => ({
    category,
    items: COMPONENTS.filter((component) => component.category === category),
  })).filter((group) => group.items.length > 0)
}

export function findComponent(slug: string) {
  return COMPONENTS.find((component) => component.slug === slug)
}

export function importPath(slug: string) {
  return `@workspace/ui/components/${slug}`
}

/** Stable in-page anchor so an individual usage can be linked, e.g. #tones. */
export function exampleAnchor(example: Example) {
  return example.demo.split("/").slice(1).join("-")
}
