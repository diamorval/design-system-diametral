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
 * Every component in @diametral/ui gets an entry so the sidebar is a complete
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
    examples: [
      {
        demo: "button-group/basic",
        title: "Basic",
        description:
          "The group owns the seam — children stay ordinary `Button`s, so variants and tones keep working inside it.",
      },
      {
        demo: "button-group/with-text",
        title: "With text and inputs",
        description:
          "`ButtonGroupText` prefixes a fixed label, and an `Input` can sit in the group to build a composed field.",
      },
      {
        demo: "button-group/vertical",
        title: "Vertical",
        description:
          '`orientation="vertical"` stacks the seam; `ButtonGroupSeparator` then needs the opposite orientation to draw across it.',
      },
    ],
  },
  {
    slug: "toggle",
    name: "Toggle",
    category: "Actions",
    description: "A two-state button for on/off formatting controls.",
    examples: [
      {
        demo: "toggle/basic",
        title: "Basic",
        description:
          "`defaultPressed` starts the toggle on. The pressed state lands on `aria-pressed`, which is what the styling hooks into.",
      },
      {
        demo: "toggle/variants",
        title: "Variants and sizes",
        description:
          "Two variants and three sizes. `outline` is the right choice when the toggle sits alone rather than in a group.",
      },
      {
        demo: "toggle/controlled",
        title: "Controlled",
        description:
          "Pass `pressed` with `onPressedChange` when the toggle drives something else on the page.",
      },
    ],
  },
  {
    slug: "toggle-group",
    name: "Toggle Group",
    category: "Actions",
    description:
      "A set of toggles with single or multiple selection, sharing one value.",
    examples: [
      {
        demo: "toggle-group/single",
        title: "Single selection",
        description:
          "The default. `value` is an array either way, so only `multiple` changes between the two modes.",
      },
      {
        demo: "toggle-group/multiple",
        title: "Multiple selection",
        description:
          "`multiple` lets several items stay pressed at once — the Base UI prop is `multiple`, not `toggleMultiple`.",
      },
      {
        demo: "toggle-group/joined",
        title: "Segmented",
        description:
          "`spacing={0}` removes the gap and the duplicated inner borders, which is what makes it read as one control rather than three.",
      },
    ],
  },
  {
    slug: "toolbar",
    name: "Toolbar",
    category: "Actions",
    description:
      "A Base UI toolbar with arrow-key navigation across grouped buttons, inputs and separators.",
    examples: [
      {
        demo: "toolbar/basic",
        title: "Basic",
        description:
          "One tab stop for the whole toolbar; arrow keys move between buttons. `ToolbarGroup` bundles related actions.",
      },
      {
        demo: "toolbar/with-input",
        title: "With input and link",
        description:
          "`ToolbarInput` and `ToolbarLink` join the same arrow-key ring as the buttons, so a filter field stays reachable without a second tab stop.",
      },
      {
        demo: "toolbar/vertical",
        title: "Vertical",
        description:
          '`orientation="vertical"` switches the axis. `ToolbarSeparator` reads the root orientation and draws across it, so it needs no prop.',
      },
    ],
  },
  {
    slug: "kbd",
    name: "Kbd",
    category: "Actions",
    description: "Renders a keyboard key or chord inline, in Geist Mono.",
    examples: [
      {
        demo: "kbd/basic",
        title: "Basic",
        description:
          "Single keys, plus a `KbdGroup` for a chord. The min-width keeps one-character keys square.",
      },
      {
        demo: "kbd/shortcuts",
        title: "Shortcut list",
        description: "A shortcuts panel built from a plain description list.",
      },
      {
        demo: "kbd/in-context",
        title: "Inside other components",
        description:
          "`Kbd` restyles from its container — inside an input group it takes the input fill, inside a tooltip it inverts.",
      },
    ],
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
    description:
      "A multi-line text field sharing Input's focus and invalid states.",
    examples: [
      {
        demo: "textarea/basic",
        title: "Basic",
        description:
          "`field-sizing-content` grows the box with its content, so `rows` sets a floor rather than a fixed height — and there is no resize handle.",
      },
      {
        demo: "textarea/with-field",
        title: "In a field",
        description:
          "`aria-invalid` is the switch for the error styling; `FieldError` renders the message.",
      },
    ],
  },
  {
    slug: "label",
    name: "Label",
    category: "Forms",
    description:
      "An accessible label; pairs with a control via `htmlFor` and dims with its disabled state.",
    examples: [
      {
        demo: "label/basic",
        title: "Basic",
        description:
          "Uppercase and tracked, which suits a field heading. Inside a `Field`, prefer `FieldLabel` — it adds the disabled and invalid wiring.",
      },
      {
        demo: "label/with-controls",
        title: "With a checkbox or switch",
        description:
          "Label restyles itself from the control it follows (`peer-data-[slot=checkbox]`), dropping the uppercase treatment — so the control must come first in the DOM.",
      },
    ],
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
          '`orientation="horizontal"` puts the control before the label — the correct order for checkboxes and radios.',
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
    slug: "checkbox",
    name: "Checkbox",
    category: "Forms",
    description:
      "A single boolean control, with indeterminate support via the `parent` prop inside a group.",
    examples: [
      {
        demo: "checkbox/basic",
        title: "States",
        description:
          "The box is 18px but an invisible `::after` extends the hit area well past it, so the target is comfortable without the visual growing.",
      },
      {
        demo: "checkbox/as-cards",
        title: "As cards",
        description:
          "A `FieldLabel` that *contains* a `Field` becomes a card: full width, bordered, and tinted on `has-data-checked`.",
      },
    ],
  },
  {
    slug: "checkbox-group",
    name: "Checkbox Group",
    category: "Forms",
    description:
      "Manages a set of checkbox values, including the parent select-all relationship.",
    examples: [
      {
        demo: "checkbox-group/basic",
        title: "Basic",
        description:
          "Children take a `value`; the group owns the array. Disabling the group disables every box, with no per-box prop.",
      },
      {
        demo: "checkbox-group/with-parent",
        title: "Select all",
        description:
          "`allValues` on the group plus `parent` on one checkbox gives select-all for free — the parent derives checked/indeterminate itself.",
      },
    ],
  },
  {
    slug: "radio-group",
    name: "Radio Group",
    category: "Forms",
    description:
      "One choice from many. Base UI renders items as spans, so labels must be associated explicitly.",
    examples: [
      {
        demo: "radio-group/basic",
        title: "Basic",
        description:
          'Each item is a `span` with `role="radio"`, not an `input` — so style hooks are `data-checked`, not `:checked`.',
      },
      {
        demo: "radio-group/as-cards",
        title: "As cards",
        description: "The same wrapping trick as Checkbox, for a tier picker.",
      },
    ],
  },
  {
    slug: "switch",
    name: "Switch",
    category: "Forms",
    description:
      "An immediate on/off toggle for settings that apply on change.",
    examples: [
      {
        demo: "switch/basic",
        title: "States and sizes",
        description:
          "Square like everything else: the thumb translates rather than sliding along a pill, so there is no radius to keep in sync.",
      },
      {
        demo: "switch/in-settings",
        title: "Settings rows",
        description:
          '`FieldContent` first with `orientation="horizontal"` is the settings row — text takes the space, control pinned to the far edge.',
      },
    ],
  },
  {
    slug: "slider",
    name: "Slider",
    category: "Forms",
    description: "Selects a number, or a range, by dragging along a track.",
    examples: [
      {
        demo: "slider/basic",
        title: "Basic",
        description:
          "The component counts thumbs from the value's shape, so a number gives one thumb and an array gives one per entry.",
      },
      {
        demo: "slider/range",
        title: "Range and vertical",
        description:
          '`thumbAlignment="edge"` is set for you, so the thumb stops flush with the track end instead of overhanging it.',
      },
    ],
  },
  {
    slug: "number-field",
    name: "Number Field",
    category: "Forms",
    description:
      "A numeric input with increment and decrement controls, scrub support and locale-aware formatting.",
    examples: [
      {
        demo: "number-field/basic",
        title: "Basic",
        description:
          'A real number field, not `<input type="number">`: it clamps to min/max, steps on the arrow keys, and formats through Intl.',
      },
      {
        demo: "number-field/with-scrub",
        title: "Scrub area",
        description:
          "`NumberFieldScrubArea` turns its children into a drag handle — press and move sideways, the way a design tool's numeric inputs work. It reads the root context, so it must sit *inside* `NumberField`; placing it beside the root throws.",
      },
    ],
  },
  {
    slug: "input-group",
    name: "Input Group",
    category: "Forms",
    description:
      "Composes addons, icons and buttons around an input inside a single bordered box.",
    examples: [
      {
        demo: "input-group/addons",
        title: "Addons",
        description:
          "Clicking an addon focuses the input — the addon forwards the click unless you land on a button inside it.",
      },
      {
        demo: "input-group/with-buttons",
        title: "With buttons",
        description:
          "`InputGroupButton` is a Button with its own size scale, sized to sit inside the field rather than beside it.",
      },
      {
        demo: "input-group/block-align",
        title: "Stacked addons",
        description:
          "`block-start` / `block-end` stack the addon above or below and switch the group to a column, which is what turns it into a composer.",
      },
    ],
  },
  {
    slug: "input-otp",
    name: "Input OTP",
    category: "Forms",
    description: "A segmented one-time-code field with per-character slots.",
    examples: [
      {
        demo: "input-otp/basic",
        title: "Basic",
        description:
          "One real input sits behind the slots, which are painted from its state — that is what keeps paste, autofill and the SMS suggestion working.",
      },
      {
        demo: "input-otp/with-separator",
        title: "Grouped",
        description:
          "Slots are addressed by index, so splitting them across groups is presentational and does not touch the value.",
      },
    ],
  },
  {
    slug: "combobox",
    name: "Combobox",
    category: "Forms",
    description:
      "An input that filters a list, with single or multi-select and chip display.",
    examples: [
      {
        demo: "combobox/basic",
        title: "Basic",
        description:
          "`items` on the root is the source of truth that Base UI filters; the rendered items are just the view. `ComboboxList` takes a function child.",
      },
      {
        demo: "combobox/multiple",
        title: "Multi-select with chips",
        description:
          "`ComboboxChip` takes plain children, so map the selection one level up with `ComboboxValue`'s render prop. Point `anchor` at the chips container so the popup tracks it as it grows.",
      },
    ],
  },
  {
    slug: "autocomplete",
    name: "Autocomplete",
    category: "Forms",
    description:
      "Free-text input with suggestions — unlike Combobox, the typed value need not come from the list.",
    examples: [
      {
        demo: "autocomplete/basic",
        title: "Basic",
        description:
          "Whatever is typed stays the value even when nothing matches. Use Combobox when the value must come from the list.",
      },
      {
        demo: "autocomplete/grouped",
        title: "Grouped suggestions",
        description:
          "Groups come from the shape of `items`: entries carrying their own `items` array arrive at the list's function child as groups.",
      },
    ],
  },
  {
    slug: "calendar",
    name: "Calendar",
    category: "Forms",
    description:
      "A month grid for date selection, built on react-day-picker with Diametral chrome.",
    examples: [
      {
        demo: "calendar/basic",
        title: "Single date",
        description:
          "`--cell-radius: 0` on the root is what keeps range ends square while the library still reasons in rounded corners.",
      },
      {
        demo: "calendar/range",
        title: "Range and dropdown caption",
        description:
          '`captionLayout="dropdown"` swaps the month label for month and year selects — needed with `startMonth`/`endMonth` to bound them.',
      },
    ],
  },
  {
    slug: "date-picker",
    name: "Date Picker",
    category: "Forms",
    description: "A Calendar in a Popover, with a formatted trigger.",
    examples: [
      {
        demo: "date-picker/basic",
        title: "Basic",
        description:
          "`DatePicker` *is* `Popover` — it only adds a trigger that formats the date and a content wrapper with the padding stripped. Closing on select is yours to do.",
      },
      {
        demo: "date-picker/range",
        title: "Range",
        description:
          "The trigger formats `value` only for a single date; pass children for a range and it stops formatting altogether.",
      },
    ],
  },
  {
    slug: "file-upload",
    name: "File Upload",
    category: "Forms",
    description:
      "A drag-and-drop drop zone with keyboard activation and dragging feedback.",
    examples: [
      {
        demo: "file-upload/basic",
        title: "Basic",
        description:
          'A `role="button"` div over a hidden input, so click, Enter, Space and drop all work. It clears the input after each pick so re-selecting the same file still fires.',
      },
      {
        demo: "file-upload/with-attachments",
        title: "With a file list",
        description:
          "File Upload collects; `Attachment` displays. Keeping them apart is why the zone needs no opinion about how a selected file looks.",
      },
    ],
  },
  {
    slug: "rating",
    name: "Rating",
    category: "Forms",
    description:
      "A star rating with hover preview, plus a read-only mode for display.",
    examples: [
      {
        demo: "rating/basic",
        title: "Basic",
        description:
          "A radio group underneath, so each star is a real radio: arrow keys move between them and the value is one number.",
      },
      {
        demo: "rating/read-only",
        title: "Read-only and controlled",
        description:
          "`readOnly` keeps the stars but drops the hover preview and pointer affordance — for showing a score rather than collecting one.",
      },
    ],
  },
  {
    slug: "form",
    name: "Form",
    category: "Forms",
    description:
      "A thin Base UI Form wrapper that consolidates validity and focuses the first invalid field on submit. Prefer `Field` for layout.",
    examples: [
      {
        demo: "form/basic",
        title: "Basic",
        description:
          "`onFormSubmit` hands over the collected values and calls `preventDefault` for you.",
      },
      {
        demo: "form/validation",
        title: "Validation",
        description:
          "Base UI's `errors` prop keys off `Field.Root`'s `name` — but this system's `Field` is a plain div, so wire errors yourself: state in, `FieldError` out, `aria-invalid` on the control.",
      },
    ],
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
        description:
          "`TableFooter` is styled as a summary row, not a repeat of the header.",
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
        description:
          "`ChartLegendContent` reads its labels from the same config.",
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
        description:
          "Titles use the Ufficio heading face; figures use tabular digits.",
      },
      { demo: "card/with-chart", title: "With a chart" },
    ],
  },
  {
    slug: "badge",
    name: "Badge",
    category: "Data display",
    description: "A compact status or category label.",
    examples: [
      {
        demo: "badge/variants",
        title: "Variants",
        description:
          "Badge here is typographic, not a pill — no border, fill or padding. The variants change colour only, so it sits inline in running text.",
      },
      {
        demo: "badge/with-icon",
        title: "With an icon",
        description:
          "Icons are forced to `size-3` so they never outweigh the uppercase label beside them.",
      },
      {
        demo: "badge/in-context",
        title: "In a list",
        description: "Where badges usually live: the status column of a row.",
      },
    ],
  },
  {
    slug: "avatar",
    name: "Avatar",
    category: "Data display",
    description:
      "A user image with a text fallback, and a group with overflow count.",
    examples: [
      {
        demo: "avatar/basic",
        title: "Basic",
        description:
          "The fallback shows until the image resolves and stays if it fails, so initials are the default rather than a broken-image icon.",
      },
      {
        demo: "avatar/sizes",
        title: "Sizes and badge",
        description:
          "`AvatarBadge` reads the avatar's `data-size` instead of taking a size prop, and drops its icon at `sm` where it would be unreadable.",
      },
      {
        demo: "avatar/group",
        title: "Group",
        description:
          "`AvatarGroup` overlaps its children and rings them in the background colour; `AvatarGroupCount` closes the stack.",
      },
    ],
  },
  {
    slug: "item",
    name: "Item",
    category: "Data display",
    description:
      "A list row with media, content and actions slots — lighter than a Card for repeated rows.",
    examples: [
      {
        demo: "item/variants",
        title: "Variants",
        description:
          "Three surfaces: transparent, bordered and tinted. All three keep the same padding, so a list can mix them without jumping.",
      },
      {
        demo: "item/with-media",
        title: "Media and actions",
        description:
          "`ItemMedia` top-aligns itself once the row has a description, keeping icon and title on one line however long the description runs.",
      },
      {
        demo: "item/sizes",
        title: "Density, header and footer",
        description:
          "`ItemGroup` tightens its own gap when it contains `sm`/`xs` rows — density follows the items, with no matching prop on the group.",
      },
    ],
  },
  {
    slug: "marker",
    name: "Marker",
    category: "Data display",
    description: "A small inline badge pairing an icon with a label.",
    examples: [
      {
        demo: "marker/variants",
        title: "Variants",
        description:
          "`separator` draws rules either side of the label with pseudo-elements; `border` underlines the row instead.",
      },
      {
        demo: "marker/with-icon",
        title: "With an icon",
        description:
          "`MarkerIcon` is `aria-hidden`, so the meaning has to be in `MarkerContent` — the glyph is decoration.",
      },
    ],
  },
  {
    slug: "meter",
    name: "Meter",
    category: "Data display",
    description:
      "Displays a measured value within a known range — capacity, not task progress.",
    examples: [
      {
        demo: "meter/basic",
        title: "Basic",
        description:
          "`Meter` renders its own track and indicator, so children are the label and value only — adding a `MeterTrack` draws a second bar.",
      },
      {
        demo: "meter/thresholds",
        title: "Colour by threshold",
        description:
          "Because the indicator is internal, per-row colour is a descendant selector on the root rather than a prop.",
      },
    ],
  },
  {
    slug: "progress",
    name: "Progress",
    category: "Data display",
    description: "Task completion, with optional label and value slots.",
    examples: [
      {
        demo: "progress/basic",
        title: "Basic",
        description:
          "`format` takes `Intl.NumberFormatOptions`, so a 0–1 ratio can render as a percentage without any maths at the call site.",
      },
      {
        demo: "progress/indeterminate",
        title: "Indeterminate",
        description:
          "`value={null}` means unknown — distinct from `0`, which means started but nothing done.",
      },
    ],
  },
  {
    slug: "skeleton",
    name: "Skeleton",
    category: "Data display",
    description: "A placeholder block for content that has not loaded.",
    examples: [
      {
        demo: "skeleton/basic",
        title: "Basic",
        description:
          "Size and shape are entirely the caller's: the component contributes the pulse and the muted fill.",
      },
      {
        demo: "skeleton/matching-layout",
        title: "Matching the real layout",
        description:
          "Reusing the loaded row's wrapper and swapping only the text is what keeps both states the same height and kills the layout jump.",
      },
    ],
  },
  {
    slug: "spinner",
    name: "Spinner",
    category: "Data display",
    description:
      "An indeterminate loading indicator, sized to the current text.",
    examples: [
      {
        demo: "spinner/basic",
        title: "Sizes",
        description:
          'It ships with `role="status"` and `aria-label="Loading"`, so it is announced without a wrapper.',
      },
      {
        demo: "spinner/in-context",
        title: "In buttons and empty states",
        description:
          "Buttons size any `svg` child to `size-3.5`, so a spinner needs no adjustment inside one.",
      },
    ],
  },
  {
    slug: "timeline",
    name: "Timeline",
    category: "Data display",
    description:
      "A vertical sequence of events with completed, active and inactive states.",
    examples: [
      {
        demo: "timeline/basic",
        title: "Basic",
        description:
          "The rail is a `::before` on each item, hidden on the last — items can be added or removed without touching it.",
      },
      {
        demo: "timeline/states",
        title: "States",
        description:
          "`data-state` goes on the *item*, not the indicator; the indicator styles itself from it with `group-data-[state=…]`.",
      },
    ],
  },
  {
    slug: "tree",
    name: "Tree",
    category: "Data display",
    description:
      "A collapsible hierarchy with semantic tree ARIA roles and icon swapping per state.",
    examples: [
      {
        demo: "tree/basic",
        title: "Basic",
        description:
          'Each branch is a Collapsible with `role="treeitem"`; the caret swaps on `data-panel-open` rather than rotating.',
      },
      {
        demo: "tree/nested",
        title: "Nested",
        description:
          "Depth is literal nesting — no depth prop, and no flattened id/parentId model to keep in sync.",
      },
    ],
  },
  {
    slug: "empty",
    name: "Empty",
    category: "Data display",
    description:
      "The empty-state block: media, title, description and an action.",
    examples: [
      {
        demo: "empty/basic",
        title: "Basic",
        description:
          "`Empty` sets `border-dashed` but no border width, so the caller decides whether the state is framed or sits flush in a card.",
      },
      {
        demo: "empty/with-action",
        title: "With actions",
        description:
          "`EmptyContent` is the slot for the way out — it constrains its own width so buttons stay centred under the text.",
      },
    ],
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
          '`orientation="vertical"` sets `data-orientation`, which the list and triggers style against via `group-data-vertical/tabs:`.',
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
          '`collapsible="none"` pins the sidebar open, which is what you want when embedding it in a bounded demo frame rather than a full page.',
      },
      {
        demo: "sidebar/collapsible-icon",
        title: "Collapsible to icons",
        description:
          '`collapsible="icon"` collapses to a rail of icons. `SidebarTrigger` toggles it; tooltips carry the labels once collapsed.',
      },
    ],
  },
  {
    slug: "breadcrumb",
    name: "Breadcrumb",
    category: "Navigation",
    description:
      "The trail to the current page, with the last item as plain text.",
    examples: [
      {
        demo: "breadcrumb/basic",
        title: "Basic",
        description:
          "`BreadcrumbPage` marks the current page: not a link, and `aria-current`. Separators are `aria-hidden`, so the trail reads cleanly aloud.",
      },
      {
        demo: "breadcrumb/collapsed",
        title: "Collapsed",
        description:
          "`BreadcrumbSeparator` renders a caret unless given children — pass a character or another icon to change the punctuation.",
      },
    ],
  },
  {
    slug: "navigation-menu",
    name: "Navigation Menu",
    category: "Navigation",
    description: "A horizontal site menu with optional rich dropdown panels.",
    examples: [
      {
        demo: "navigation-menu/basic",
        title: "Basic",
        description:
          "The root mounts its own portal, positioner, popup and viewport, so your tree is only Root → List → Item. Use `navigationMenuTriggerStyle()` for links that need no panel.",
      },
      {
        demo: "navigation-menu/multiple",
        title: "Several menus",
        description:
          "Moving between triggers reuses one popup and slides it; the content reads `data-activation-direction` to animate away from where you came from.",
      },
    ],
  },
  {
    slug: "menubar",
    name: "Menubar",
    category: "Navigation",
    description:
      "A desktop-style application menu bar with keyboard traversal.",
    examples: [
      {
        demo: "menubar/basic",
        title: "Basic",
        description:
          "One tab stop for the bar; arrow keys move between menus and an open menu stays open as you travel — the desktop convention.",
      },
      {
        demo: "menubar/with-state",
        title: "Checkboxes, radios and submenus",
        description:
          "The item vocabulary matches Dropdown Menu, because `MenubarMenu` is that component underneath.",
      },
    ],
  },
  {
    slug: "command",
    name: "Command",
    category: "Navigation",
    description: "A searchable command palette, standalone or in a dialog.",
    examples: [
      {
        demo: "command/basic",
        title: "Inline",
        description:
          "Built on cmdk, so filtering and keyboard selection come free. An item hides its trailing check when it carries a shortcut, so the two never collide.",
      },
      {
        demo: "command/dialog",
        title: "As a palette",
        description:
          "`CommandDialog` takes Dialog's props but supplies its own content wrapper, sitting a third down the viewport rather than dead centre.",
      },
    ],
  },
  {
    slug: "pagination",
    name: "Pagination",
    category: "Navigation",
    description: "Page links with previous, next and ellipsis.",
    examples: [
      {
        demo: "pagination/basic",
        title: "Basic",
        description:
          "`PaginationLink` renders an anchor through Button's `render` with `nativeButton={false}`, so it stays a real link — middle-click and open-in-new-tab keep working.",
      },
      {
        demo: "pagination/controlled",
        title: "Controlled",
        description:
          "In an SPA, intercept the click rather than dropping the `href` — the pages stay shareable that way.",
      },
    ],
  },
  {
    slug: "stepper",
    name: "Stepper",
    category: "Navigation",
    description:
      "Progress through a multi-step flow, with per-step state and orientation support.",
    examples: [
      {
        demo: "stepper/basic",
        title: "Basic",
        description:
          "`state` is a prop on `StepperItem`, and the indicator swaps its number for a check on `completed` by itself.",
      },
      {
        demo: "stepper/vertical",
        title: "Vertical",
        description:
          "`StepperSeparator` flips axis off the root's `data-orientation`, so going vertical needs no change to the items.",
      },
    ],
  },

  /* -- Layout ------------------------------------------------------------ */
  {
    slug: "aspect-ratio",
    name: "Aspect Ratio",
    category: "Layout",
    description: "Constrains content to a fixed width-to-height ratio.",
    examples: [
      {
        demo: "aspect-ratio/basic",
        title: "Basic",
        description:
          "`ratio` is written to a `--ratio` custom property, so any number works — there is no list of supported ratios.",
      },
      {
        demo: "aspect-ratio/ratios",
        title: "Common ratios",
        description:
          "The box owns the height, so children can be `size-full` and stop caring about it.",
      },
    ],
  },
  {
    slug: "separator",
    name: "Separator",
    category: "Layout",
    description:
      "A rule between content. Base UI inverts the orientation semantics — a horizontal group takes vertical separators.",
    examples: [
      {
        demo: "separator/basic",
        title: "Basic",
        description:
          "Horizontal is the default: full width, one pixel tall. Spacing is the caller's job, not the separator's.",
      },
      {
        demo: "separator/vertical",
        title: "Vertical",
        description:
          "A vertical rule stretches with `self-stretch`, so the flex parent must have a height — otherwise it renders zero-tall and looks missing.",
      },
    ],
  },
  {
    slug: "scroll-area",
    name: "Scroll Area",
    category: "Layout",
    description: "A scrollable region with styled, overlay scrollbars.",
    examples: [
      {
        demo: "scroll-area/basic",
        title: "Basic",
        description:
          "The root needs a bounded height; children go into the viewport, and the scrollbar overlays rather than taking layout width.",
      },
      {
        demo: "scroll-area/with-headings",
        title: "Grouped content",
        description:
          "Note that `ScrollArea` renders only a vertical scrollbar today — horizontal overflow still scrolls, but without a styled bar.",
      },
    ],
  },
  {
    slug: "resizable",
    name: "Resizable",
    category: "Layout",
    description:
      "Panel groups with draggable handles that persist their sizes.",
    examples: [
      {
        demo: "resizable/basic",
        title: "Basic",
        description:
          "The group prop is `orientation` in this version of react-resizable-panels, not the `direction` older shadcn snippets pass.",
      },
      {
        demo: "resizable/nested",
        title: "Nested groups",
        description:
          "A panel can hold another group on the opposite axis, which is how an IDE-style three-pane layout is built.",
      },
    ],
  },
  {
    slug: "carousel",
    name: "Carousel",
    category: "Layout",
    description: "A horizontal slide viewport with previous and next controls.",
    examples: [
      {
        demo: "carousel/basic",
        title: "Basic",
        description:
          "The arrows are absolutely positioned outside the viewport, so the carousel needs horizontal room around it or they clip.",
      },
      {
        demo: "carousel/multiple",
        title: "Several slides at once",
        description:
          'Items are `basis-full` by default — override the basis to show more, and pass `align: "start"` so the last page isn\'t centred.',
      },
      {
        demo: "carousel/with-api",
        title: "Custom controls",
        description:
          "`setApi` hands back the Embla instance, which is how you build your own indicators or drive it from elsewhere.",
      },
    ],
  },
  {
    slug: "page-header",
    name: "Page Header",
    category: "Layout",
    description:
      "Breadcrumb, title, description and actions for the top of a page, with an optional flush tab strip.",
    examples: [
      {
        demo: "page-header/basic",
        title: "Basic",
        description:
          "Breadcrumb, title, description and actions compose freely — there is no prop bag, only slots.",
      },
      {
        demo: "page-header/with-icon-and-tabs",
        title: "Icon and tabs",
        description:
          "`PageHeaderIcon` reads from the shared icon registry; `PageHeaderTabs` flips the header's bottom rule flush against the tab strip.",
      },
    ],
  },

  /* -- Disclosure -------------------------------------------------------- */
  {
    slug: "accordion",
    name: "Accordion",
    category: "Disclosure",
    description:
      "Stacked sections that expand one at a time, or several at once.",
    examples: [
      {
        demo: "accordion/basic",
        title: "Basic",
        description:
          "Panels animate on `--accordion-panel-height`, so content of any height opens smoothly without a measured max-height.",
      },
      {
        demo: "accordion/single",
        title: "One at a time",
        description:
          "Base UI opens several panels at once by default — `multiple={false}` is what makes it exclusive.",
      },
    ],
  },
  {
    slug: "collapsible",
    name: "Collapsible",
    category: "Disclosure",
    description:
      "A single show/hide region. Emits `data-open` / `data-closed`, not `data-state`.",
    examples: [
      {
        demo: "collapsible/basic",
        title: "Basic",
        description:
          "The trigger renders as a Button via `render`. The caret rotates off `aria-expanded`, which sits on the trigger rather than the root.",
      },
      {
        demo: "collapsible/controlled",
        title: "Controlled",
        description:
          "Driving `open` yourself lets the toggle live outside the collapsible — here a show-more button beneath the list.",
      },
    ],
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
          '`render={<Button variant="outline" />}` makes the trigger *be* the button — no nested-button markup.',
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
    examples: [
      {
        demo: "alert-dialog/basic",
        title: "Basic",
        description:
          "`AlertDialogAction` is a plain Button and does *not* wrap Close, unlike `AlertDialogCancel` — so confirming has to close the dialog itself. That is deliberate: a confirm usually awaits something first.",
      },
      {
        demo: "alert-dialog/with-media",
        title: "With media, small",
        description:
          '`size="sm"` stays centred at every breakpoint and makes the footer a two-column grid; `default` goes start-aligned from `sm` up.',
      },
    ],
  },
  {
    slug: "sheet",
    name: "Sheet",
    category: "Overlays",
    description: "A panel that slides in from an edge.",
    examples: [
      {
        demo: "sheet/sides",
        title: "Sides",
        description:
          "`side` drives position, border edge and enter/exit transform from one `data-side` attribute.",
      },
      {
        demo: "sheet/with-form",
        title: "With a form",
        description:
          "`SheetFooter` carries `mt-auto`, so it pins to the bottom however short the body is. Note the header and footer pad themselves — the body does not.",
      },
    ],
  },
  {
    slug: "drawer",
    name: "Drawer",
    category: "Overlays",
    description: "A bottom sheet with drag-to-dismiss, tuned for touch.",
    examples: [
      {
        demo: "drawer/basic",
        title: "Basic",
        description:
          "`showSwipeHandle` adds the grab affordance. Everything else about the geometry follows `swipeDirection`.",
      },
      {
        demo: "drawer/directions",
        title: "Directions",
        description:
          "There is no `side` prop: `swipeDirection` is the single source of truth, and the axis, edge, border and closed transform all derive from it.",
      },
      {
        demo: "drawer/snap-points",
        title: "Snap points",
        description:
          "With snap points the popup takes full viewport height and the snap offset moves it — which is why the sizing rules switch on `data-snap-points`.",
      },
    ],
  },
  {
    slug: "popover",
    name: "Popover",
    category: "Overlays",
    description:
      "Anchored, non-modal content with title and description slots.",
    examples: [
      {
        demo: "popover/basic",
        title: "Basic",
        description:
          "Positioning props (`side`, `align`, `sideOffset`) are accepted on `PopoverContent` and forwarded to the positioner, so there is no separate positioner to mount.",
      },
      {
        demo: "popover/with-form",
        title: "With controls",
        description:
          "Popover is focusable and dismissible, so interactive content belongs here rather than in a tooltip — a tooltip is unreachable by keyboard.",
      },
    ],
  },
  {
    slug: "hover-card",
    name: "Hover Card",
    category: "Overlays",
    description: "A preview surface shown on hover, for links and mentions.",
    examples: [
      {
        demo: "hover-card/basic",
        title: "On a link",
        description:
          "Built on Base UI's `PreviewCard`. It opens on hover *and* focus, but is still supplementary — never put anything essential only in here.",
      },
      {
        demo: "hover-card/with-avatar",
        title: "Person preview",
        description: "The usual case: a mention that expands into a profile.",
      },
    ],
  },
  {
    slug: "tooltip",
    name: "Tooltip",
    category: "Overlays",
    description:
      "A short label on hover or focus. Never put interactive content in one.",
    examples: [
      {
        demo: "tooltip/basic",
        title: "Basic",
        description:
          "`TooltipProvider` shares one delay across its subtree, so a row of icon buttons doesn't re-arm the timer per button.",
      },
      {
        demo: "tooltip/sides",
        title: "Sides and shortcuts",
        description:
          "Prefer the logical sides `inline-start` / `inline-end`, which follow direction, over the physical `left` / `right`. A nested `Kbd` restyles to invert against the dark surface.",
      },
    ],
  },
  {
    slug: "dropdown-menu",
    name: "Dropdown Menu",
    category: "Overlays",
    description:
      "An action menu from a trigger, with labels, separators, shortcuts and destructive items.",
    examples: [
      {
        demo: "dropdown-menu/basic",
        title: "Basic",
        description:
          '`variant="destructive"` recolours the item and its icon together; `DropdownMenuShortcut` pushes itself to the far edge with `ms-auto`.',
      },
      {
        demo: "dropdown-menu/selection",
        title: "Checkbox and radio items",
        description:
          "Both reserve their indicator space with `pe-8`, so mixing them with plain items keeps every label on the same line.",
      },
      {
        demo: "dropdown-menu/submenu",
        title: "Submenus",
        description:
          "Submenus open to `inline-end` by default, so an RTL locale gets them on the correct side with no extra prop.",
      },
    ],
  },
  {
    slug: "context-menu",
    name: "Context Menu",
    category: "Overlays",
    description: "The same menu surface, opened by right-click on a region.",
    examples: [
      {
        demo: "context-menu/basic",
        title: "Basic",
        description:
          "The trigger is the region, not a button — pass `render` to make any element the right-click target.",
      },
      {
        demo: "context-menu/with-submenu",
        title: "Submenu and state",
        description:
          "The item vocabulary matches Dropdown Menu exactly, so the two surfaces can share one menu definition.",
      },
    ],
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
    examples: [
      {
        demo: "alert/basic",
        title: "Variants",
        description:
          "A leading `svg` switches the grid to two columns on its own, so the icon is optional with no layout prop to set.",
      },
      {
        demo: "alert/with-action",
        title: "With an action",
        description:
          "`AlertAction` pins to the top-right and the alert reserves the inline-end padding for it, so long titles never slide underneath.",
      },
    ],
  },

  /* -- Conversation ------------------------------------------------------ */
  {
    slug: "bubble",
    name: "Bubble",
    category: "Conversation",
    description: "Chat bubbles grouped by author.",
    examples: [
      {
        demo: "bubble/variants",
        title: "Variants",
        description:
          "The variant lives on `Bubble` and styles `BubbleContent` through `*:data-[slot=bubble-content]`, so the content part takes no variant of its own.",
      },
      {
        demo: "bubble/conversation",
        title: "A conversation",
        description:
          '`align="end"` moves the bubble to the far side with `self-end` — the group stays a plain column, with no per-row wrapper.',
      },
      {
        demo: "bubble/with-reactions",
        title: "With reactions",
        description:
          "Reactions overhang the bubble edge and are ringed in the card colour, so they read as punched through it rather than stacked beside it.",
      },
    ],
  },
  {
    slug: "message",
    name: "Message",
    category: "Conversation",
    description: "A conversation row with avatar and content.",
    examples: [
      {
        demo: "message/basic",
        title: "Basic",
        description:
          '`Message` reverses its own flex direction on `align="end"`, so the avatar moves to the trailing side without reordering the markup.',
      },
      {
        demo: "message/with-footer",
        title: "With a footer",
        description:
          "When a footer is present the avatar lifts by 2rem so it stays level with the bubble rather than the timestamp.",
      },
    ],
  },
  {
    slug: "message-scroller",
    name: "Message Scroller",
    category: "Conversation",
    description:
      "A transcript viewport that keeps itself pinned to the latest message.",
    examples: [
      {
        demo: "message-scroller/basic",
        title: "Basic",
        description:
          "`MessageScrollerProvider` is required — it holds the scroll state that Root, Viewport and Button all read. Without it they throw on a missing context.",
      },
      {
        demo: "message-scroller/autoscroll",
        title: "Following new messages",
        description:
          "`scrollAnchor` on the last item pins the view to the bottom as messages arrive, and releases it once the reader scrolls up.",
      },
    ],
  },
  {
    slug: "attachment",
    name: "Attachment",
    category: "Conversation",
    description:
      "File metadata display for a message. Not an upload input — see File Upload.",
    examples: [
      {
        demo: "attachment/basic",
        title: "Basic",
        description:
          "Padding comes from which slots are present (`has-data-[slot=…]`), so a media-only chip and a full row need no size prop between them.",
      },
      {
        demo: "attachment/states",
        title: "States and sizes",
        description:
          "`state` drives the border and media colour — `idle` goes dashed, `error` turns destructive — and nothing below needs to know which state it is in.",
      },
      {
        demo: "attachment/vertical",
        title: "Vertical cards",
        description:
          "`AttachmentGroup` is a snap-scrolling row with a faded edge, so a long list stays on one line instead of wrapping.",
      },
    ],
  },

  /* -- Utilities --------------------------------------------------------- */
  {
    slug: "direction",
    name: "Direction",
    category: "Utilities",
    description:
      "A provider that sets text direction (LTR/RTL) for every Base UI component beneath it.",
    examples: [
      {
        demo: "direction/rtl",
        title: "Side by side",
        description:
          "Components are written with logical properties throughout, so the same markup mirrors without a second stylesheet.",
      },
      {
        demo: "direction/switching",
        title: "Switching at runtime",
        description:
          "The provider tells Base UI which way its floating panels and arrow keys should go; the `dir` attribute handles the CSS. Set both.",
      },
    ],
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
  return `@diametral/ui/components/${slug}`
}

/** Stable in-page anchor so an individual usage can be linked, e.g. #tones. */
export function exampleAnchor(example: Example) {
  return example.demo.split("/").slice(1).join("-")
}
