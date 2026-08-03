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
  /**
   * Optional when-to-use paragraphs rendered under the description — one
   * `Prose` block per entry, so backticks are the only markup. The description
   * stays the one-line tagline; this is where "reach for it when…" lives.
   */
  intro?: string[]
  examples?: Example[]
  /**
   * Notes keyed by part name, surfaced when that part is selected in the
   * anatomy tree. Deliberately sparse: the tree itself is derived, so this is
   * only for what a reader cannot infer from the nesting — write an entry when a
   * part has a gotcha and leave the rest silent.
   */
  parts?: Record<string, string>
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
    intro: [
      "Button is the trigger everything else defers to: submit, confirm, open, cancel. `variant` places it in the emphasis order — `default` for the one action a view is about, `secondary`, `outline` and `ghost` for the ones beside it, `link` for navigation that has to read as prose. `destructive` is the functional red and is deliberately not a tone.",
      "`variant` and `tone` are independent axes rather than a matrix. A tone only sets the fill `--btn` and its contrast pair `--btn-fg`, and every variant composes off those two variables, so a ninth palette colour would work across solid, outline and ghost without a single compound variant.",
    ],
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
      {
        demo: "button/sizes",
        title: "Sizes",
        description:
          "Three text sizes and a square `icon` set that matches each of them — an icon-only button carries no label, so it takes an `aria-label`.",
      },
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
    intro: [
      "Button Group welds controls that belong to one decision into a single object: a period switcher, a split primary action, a field with its submit beside it. Reach for it when the children share a subject — actions that merely sit near each other want a `gap`, not a seam.",
      "The group owns that seam, and it owns it through the children's own `data-slot`: the selectors strip the inner radii and collapse each adjacent border, so the children stay ordinary `Button`s, `Input`s and `Select`s. There is no grouped variant to remember, and tones and variants keep working inside it.",
    ],
    examples: [
      {
        demo: "button-group/basic",
        title: "Basic",
        description:
          "The group owns the seam — children stay ordinary `Button`s, so variants and tones keep working inside it.",
      },
      {
        demo: "button-group/split",
        title: "Split action",
        description:
          "The default action stays one click away and its variations move into a menu. The trigger renders a `Button` through `render`, which is what keeps it inside the seam rather than beside it.",
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
    parts: {
      ButtonGroup:
        "Collapses the radii and borders of its children by matching their `data-slot`, so a wrapper element without one drops out of the seam and breaks the run.",
      ButtonGroupText:
        "A static label, not a control: no focus ring, no tab stop. Pass `render` to make it a `label` when it names the input beside it.",
      ButtonGroupSeparator:
        'A `Separator` defaulting to `vertical`, because it draws across the group rather than along it — a vertical group therefore needs `orientation="horizontal"`.',
    },
  },
  {
    slug: "toggle",
    name: "Toggle",
    category: "Actions",
    description: "A two-state button for on/off formatting controls.",
    intro: [
      "Toggle is a button that stays down: bold, mute, pin, reveal. Reach for it when pressing it changes something the reader can see immediately. A preference a form submits later belongs to `Switch` or `Checkbox` — those carry a value into the submission, where a toggle carries none.",
      "The pressed state lives on the button's own `aria-pressed`, which is also what the styling hooks, so `defaultPressed` is enough for the uncontrolled case and nothing needs to wrap it to read the state. `toggleVariants` is shared with Toggle Group, so a lone toggle and one inside a group are the same button.",
    ],
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
      {
        demo: "toggle/row-action",
        title: "Row action",
        description:
          "One toggle per row, holding its own state. The icon carries no text, so each one needs an `aria-label` naming its row — the pressed fill is the only other cue.",
      },
    ],
  },
  {
    slug: "toggle-group",
    name: "Toggle Group",
    category: "Actions",
    description:
      "A set of toggles with single or multiple selection, sharing one value.",
    intro: [
      "Toggle Group binds a set of peer toggles to one value: an alignment picker, a view switcher, a formatting row. Reach for it when the choice takes effect as it is made — a choice a form submits is `RadioGroup` or `Select`, and toggles that control unrelated things want no group at all.",
      "`variant`, `size` and `spacing` are set on the root and reach the items through context, so items stay bare. `value` is an array in both modes, single and multiple, so only `multiple` changes between them; `spacing={0}` is what turns a row of toggles into one segmented control.",
    ],
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
    parts: {
      ToggleGroup:
        "Holds the value for the whole set and hands `variant`, `size` and `spacing` down by context — set them here, not on the items.",
      ToggleGroupItem:
        "`value` is required: it is what the item contributes to the group's array. An icon-only item still needs its own `aria-label`.",
    },
  },
  {
    slug: "toolbar",
    name: "Toolbar",
    category: "Actions",
    description:
      "A Base UI toolbar with arrow-key navigation across grouped buttons, inputs and separators.",
    intro: [
      "Toolbar is the chrome strip beside a canvas or above a list: formatting actions, view controls, a filter field. Reach for it when a cluster of controls is used over and over and should not cost one tab stop each — a row of buttons a reader passes once is just a flex container.",
      "The strip is a single tab stop with the arrow keys moving inside it, wrapping at the ends, so a control only joins that ring if it is a Toolbar part: `ToolbarButton`, `ToolbarLink` and `ToolbarInput` are Base UI items rather than styling wrappers. `ToolbarButton` renders a `Button` underneath, so variants and tones still apply.",
    ],
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
    parts: {
      Toolbar:
        "Owns the roving focus: one tab stop for the strip, arrow keys within it, wrapping at the ends unless `loopFocus={false}`. Its `disabled` reaches every item, and `orientation` sets the axis the separators draw across.",
      ToolbarGroup:
        "Clusters items visually without breaking the ring — arrow keys still run the length of the toolbar. Its own `disabled` covers every item in the group.",
      ToolbarButton:
        "Renders a `Button`, so `variant`, `size` and `tone` all apply; it only changes the defaults to `ghost` and `icon-sm`. Icon-only buttons still need an `aria-label`.",
      ToolbarInput:
        "A real input inside the ring: the arrow keys move its caret first and only step out of the field once the caret has reached the end, so a filter field costs no second tab stop.",
      ToolbarSeparator:
        "Defaults to the opposite orientation of the toolbar, which is the one that draws across it — pass `orientation` only to override that.",
    },
  },
  {
    slug: "kbd",
    name: "Kbd",
    category: "Actions",
    description:
      "Renders a keyboard key or chord inline, sized to sit in a line of text.",
    intro: [
      "Kbd prints a key the reader is meant to press: the shortcut on a menu row, the `⌘K` hint inside a search field, the accelerator on a tooltip. One key per element, and `KbdGroup` for a chord.",
      "It takes its colours from whatever contains it — inside an input group it picks up the input fill, inside a tooltip it inverts onto the dark surface — so a chord dropped into another component needs no props. It is also `pointer-events-none`: the key labels a shortcut, it never fires it.",
    ],
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
    parts: {
      Kbd: "A minimum width keeps a single character square while `Esc` or `⌘⇧` widen past it. `pointer-events-none` and `select-none` are deliberate: the handler belongs on the control this annotates.",
      KbdGroup:
        "The gap between the keys of one chord, and nothing else. It renders a `kbd` too, so the keys nest inside it legally — no `+` between them.",
    },
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
    intro: [
      "Calendar is the grid itself, always visible and always inline. Reach for it when the month is the interface — a booking page, an availability panel, a date beside its context. When the grid should stay folded away behind a field, Date Picker puts this same component in a Popover, and Date Range Picker does it for two bounds at once.",
      "Everything but the chrome is react-day-picker's: `mode`, `selected`/`onSelect`, `disabled` matchers, `modifiers`, `startMonth`/`endMonth` and `locale` are its props, passed straight through, so its docs are the reference for behaviour. The wrapper supplies geometry and parts — `--cell-size` sizes a cell, `--cell-radius: 0` keeps range ends square while the library still reasons in rounded corners, and the background goes transparent inside Card and Popover content, so a Calendar dropped in either needs no restyling.",
    ],
    examples: [
      {
        demo: "calendar/basic",
        title: "Single date",
        description:
          "`mode` decides the shape of `selected`: one `Date` here, and `onSelect` hands back `undefined` when the selected day is clicked again.",
      },
      {
        demo: "calendar/range",
        title: "Range and dropdown caption",
        description:
          '`captionLayout="dropdown"` swaps the month label for month and year selects — needed with `startMonth`/`endMonth` to bound them.',
      },
      {
        demo: "calendar/blocked-days",
        title: "Blocked days",
        description:
          "`disabled` takes an array of matchers — a `before` bound, a `dayOfWeek` list, single dates and `from`/`to` intervals all mix in the same array, and each match is only styled and unclickable, never hidden.",
      },
      {
        demo: "calendar/multiple",
        title: "Several dates",
        description:
          '`mode="multiple"` collects a `Date[]`, and `max` caps how many days are held at once — reaching the cap does not lock the grid, the next pick starts a fresh selection from that day.',
      },
    ],
    parts: {
      Calendar:
        "Props it does not name itself go to react-day-picker's `DayPicker`. `classNames` is spread over the wrapper's own map, so a key you pass replaces that one element's classes outright while every other slot keeps its chrome.",
      CalendarDayButton:
        "Already rendered for every day — it is exported for `components={{ DayButton }}` overrides, not for direct use. It reads the `range_start`/`range_middle`/`range_end` modifiers to draw the selection and focuses itself when react-day-picker marks it focused, so a replacement has to do both.",
    },
  },
  {
    slug: "date-picker",
    name: "Date Picker",
    category: "Forms",
    description: "A Calendar in a Popover, with a formatted trigger.",
    intro: [
      "Date Picker is the field-shaped way to ask for a date: an outline Button that prints the current value, and a Popover holding a Calendar. Reach for it in forms, where a permanently open month grid would outweigh the one answer it collects — Calendar inline when the grid is the point, Date Range Picker when the answer has two ends.",
      "`DatePicker` is `Popover`, re-exported under another name, so `open`, `onOpenChange` and every other Popover prop are the same ones. It holds no date state: you own the Calendar inside it, its `selected`/`onSelect`, and closing the popover after a pick — nothing here does that for you. The trigger only formats a `value` you hand it, with `dateFormat` as a date-fns pattern.",
    ],
    examples: [
      {
        demo: "date-picker/basic",
        title: "Basic",
        description:
          "The wiring in full: state for the date, state for `open`, and an `onSelect` that sets both. Closing on select is a choice, not a default.",
      },
      {
        demo: "date-picker/range",
        title: "Range",
        description:
          "The trigger formats `value` only for a single date; pass children for a range and it stops formatting altogether.",
      },
      {
        demo: "date-picker/bounded",
        title: "Bounded selection",
        description:
          "Limits belong to the Calendar, not the trigger: `disabled` matchers grey the days out and `startMonth`/`endMonth` stop the navigation at the same edges. `dateFormat` is a date-fns pattern, so a longer one reads back the choice in full.",
      },
      {
        demo: "date-picker/in-form",
        title: "In a form",
        description:
          "The trigger is a button, so nothing about it submits. Mirror the date into a hidden input and it travels with the rest of the form data.",
      },
    ],
    parts: {
      DatePicker:
        "An alias for `Popover` — same props, same context, no date state of its own. Controlling `open` is how you close it after a pick.",
      DatePickerTrigger:
        "Renders as an outline Button, formats `value` with `dateFormat` and falls back to `placeholder`. Passing children replaces that formatted label entirely; the calendar icon stays either way. Its width is a fixed `w-56` you override with `className`.",
      DatePickerContent:
        "PopoverContent with the padding stripped so the Calendar meets the edges — anything else you put in it carries its own.",
    },
  },
  {
    slug: "multi-select",
    name: "Multi Select",
    category: "Forms",
    description:
      "An options/value API over Combobox's multiple-select chips mode, for picking several values from a fixed list.",
    intro: [
      "Multi Select is the closed wrapper over Combobox's `multiple` mode: pass `options`, read back a `string[]`. Reach for it when the list is fixed and you want filtering and chips without re-deriving the `ComboboxValue`, chip and anchor wiring by hand — Combobox itself when you need to own that markup, Select when only one value is allowed, and Tags Input when the values are free text rather than a list.",
      "The prop list is closed: there is no `...props` passthrough, so `className` is the only thing that reaches the DOM. `aria-label` and `aria-labelledby` are the exception — they are forwarded down to the chips input, because that is the form control that needs a name and a label on the root would never reach it.",
    ],
    examples: [
      {
        demo: "multi-select/basic",
        title: "Basic",
        description:
          "`options` is the whole API — value/label pairs in, a `string[]` out. Internally this is Combobox in `multiple` mode, so filtering and chip removal come for free.",
      },
      {
        demo: "multi-select/controlled",
        title: "Controlled",
        description:
          "`value` and `onValueChange` take a plain `string[]`, same as the uncontrolled `defaultValue` — enough for the page to react to a selection.",
      },
      {
        demo: "multi-select/filter-bar",
        title: "Filter bar",
        description:
          "A filter above a list, with no visible label to point at: `aria-label` names the chips input directly. `placeholder` doubles as the unfiltered state — it is suppressed the moment anything is selected.",
      },
    ],
    parts: {
      MultiSelect:
        "The popup anchors to the chips row rather than the root, so it stays aligned as chips wrap onto a second line. Name it with `aria-label` or `aria-labelledby` — both land on the inner chips input, not the wrapper.",
    },
  },
  {
    slug: "tags-input",
    name: "Tags Input",
    category: "Forms",
    description:
      "Free-text tokens typed one at a time — Enter or comma commits the draft, Backspace on an empty draft removes the last tag.",
    intro: [
      "Tags Input collects free-text tokens one at a time: type, press Enter or comma, and the draft becomes a tag. Reach for it when the values are not known in advance — keywords, recipients, labels. When they come from a fixed list, Multi Select gives you the same chips with filtering and no typos.",
      "Rejections are silent by design: an empty draft, a duplicate, or anything past `max` clears the input without adding a tag and without firing a callback. Backspace on an empty draft deletes the last tag in one step — the remove buttons are `tabIndex={-1}`, so that is the keyboard path — and pasting `a,b,c` lands as a single draft, since the comma only commits as a keystroke.",
    ],
    examples: [
      {
        demo: "tags-input/basic",
        title: "Basic",
        description:
          "Unlike Multi Select there is no fixed option list — any typed value becomes a tag. `aria-labelledby` is forwarded to the inner input, so pointing a label at it names the real control; a label on the wrapper would leave the field unnamed.",
      },
      {
        demo: "tags-input/max",
        title: "With a limit",
        description:
          "`max` stops new tags once the count is reached. Existing tags stay removable — only adding is blocked, and the rejected draft is cleared either way.",
      },
      {
        demo: "tags-input/controlled",
        title: "Controlled",
        description:
          "`value`/`onValueChange` hand you the array the form will submit, and are the only way to add an affordance the component does not ship — here, a Clear all button.",
      },
    ],
  },
  {
    slug: "phone-input",
    name: "Phone Input",
    category: "Forms",
    description:
      "A country dial-code select paired with a national-number field, composing into one E.164-ish string value.",
    intro: [
      'Phone Input pairs a dial-code Select with a national-number Input inside a single underline, and hands back one string (`+33612345678`) rather than a country/number pair. Reach for it when a form needs a phone number in one field; when it only needs digits, a plain Input with `type="tel"` is enough.',
      "The dial-code table is hand-rolled and covers ten markets, so there is no `libphonenumber` in the bundle, no per-country grouping and no length validation — `placeholder` only suggests the shape. The split is derived from the value on every render rather than held in state, which is why `US` and `CA` both write `+1` and a `+1…` value always reads back as `US`.",
    ],
    examples: [
      {
        demo: "phone-input/basic",
        title: "Basic",
        description:
          "The value is a single string (`+33612345678`) — the dial code and national number are split from it for editing, then rejoined on change.",
      },
      {
        demo: "phone-input/with-field",
        title: "In a field",
        description:
          "`defaultCountry` seeds the dial code before any digits are typed, which is what an empty controlled field needs — the split falls back to it whenever the value carries no recognised dial code.",
      },
      {
        demo: "phone-input/contact-form",
        title: "Contact form",
        description:
          "Beside plain fields in a form: one value goes to the server, dial code included, so there is no second country field to keep in sync.",
      },
    ],
    parts: {
      PhoneInput:
        "The two inner controls carry hardcoded `aria-label`s (`Country calling code`, `Phone number`) and accept no override, so a surrounding `FieldLabel` is a visual caption rather than a programmatic one. Typed characters are sanitised to digits and spaces, which is why the stored string is E.164-ish rather than strictly E.164.",
    },
  },
  {
    slug: "editable",
    name: "Editable",
    category: "Forms",
    description:
      "Inline click-to-edit text — a preview with an edit affordance that swaps to a field, committed on Enter or blur, discarded on Escape.",
    examples: [
      {
        demo: "editable/basic",
        title: "Basic",
        description:
          "The edit button only appears on hover or focus; Escape restores the previous value instead of committing the draft.",
      },
      {
        demo: "editable/controlled",
        title: "Controlled",
        description:
          "`onSubmit` fires only once a draft is committed, not on every keystroke.",
      },
    ],
  },
  {
    slug: "time-picker",
    name: "Time Picker",
    category: "Forms",
    description:
      "Segmented hour/minute/second fields built on Number Field, plus a clock button that opens the same value as a dial or a scrolling list.",
    intro: [
      'Time Picker is three Number Fields sharing one underline: hours, minutes and — behind `showSeconds` — seconds, each typed or stepped with the arrow keys. Beside them sits a clock button that opens a Popover for pointer users: `picker="dial"` (the default) draws a 24-hour face, `picker="list"` stacks scrolling columns, and `picker="none"` drops the button entirely. Reach for it when a form needs a clock time on its own, pair it with Date Picker when the answer is a moment, and use Date Range Picker\'s `showTime` when it is a range.',
      "Clamping, zero-padding and stepping all come from Number Field, so nothing is hand-rolled — and nothing rolls over either: 60 minutes clamps to 59 instead of carrying into hours. The clock is 24-hour only, with no `hourCycle` or AM/PM, and a cleared segment reads back as `0` rather than `undefined`. The dial's minute face lands on the fives; the segments stay the way to reach a minute in between.",
    ],
    examples: [
      {
        demo: "time-picker/basic",
        title: "Basic",
        description:
          "Each segment is a `NumberField` with no visible increment/decrement buttons — arrow keys still step it, and typing clamps and zero-pads.",
      },
      {
        demo: "time-picker/dial",
        title: "Clock dial",
        description:
          "The default popover: hours 0–11 ring the face and 12–23 sit on an inner ring, picking an hour advances to the minute face, and picking a minute closes.",
      },
      {
        demo: "time-picker/list",
        title: "Scrolling list",
        description:
          '`picker="list"` swaps the face for one scrolling column per segment — every minute and second is reachable, and the columns scroll to the current value on open.',
      },
      {
        demo: "time-picker/seconds",
        title: "With seconds",
        description:
          "`showSeconds` adds a third segment. Clearing a segment coerces it to `0`, so once seconds is shown it is always a number in the value.",
      },
      {
        demo: "time-picker/with-date",
        title: "Date and time",
        description:
          "The recipe Date Range Picker uses internally: keep the `Date` and the `TimeValue` in separate state, then fold the time in with `setHours` when you need one instant.",
      },
    ],
    parts: {
      TimePicker:
        'Increment and decrement buttons are deliberately not rendered — the input alone carries arrow-key, PageUp/PageDown and wheel stepping. Each segment gets a hardcoded English `aria-label` and the wrapper has no `role="group"`, so a surrounding label names nothing programmatically. The popover is a pointer affordance layered on top: every value it can set is already reachable from the segments by keyboard.',
    },
  },
  {
    slug: "date-range-picker",
    name: "Date Range Picker",
    category: "Forms",
    description:
      "A Calendar in range mode inside a Popover, with a formatted trigger and an optional pair of Time Pickers for the range's bounds.",
    intro: [
      "Date Range Picker is the closed one of the two pickers: trigger, range Calendar and — behind `showTime` — a Time Picker per end, all assembled for you. Reach for it for reporting windows, bookings and filters, where the answer is a `from`/`to` pair. Date Picker is the open one, for a single date you wire yourself.",
      "It owns the range, so `value`/`defaultValue`/`onValueChange` are the whole state API, and the prop list is closed — there is no `...props` passthrough, and `className` lands on the trigger, whose width is `w-72` (or `w-96` once `showTime` widens the label). Times fold into the same `Date` objects with `setHours`, so a range with `showTime` is two instants rather than a date plus a time, and each Time Picker stays disabled until its own end has a date.",
    ],
    examples: [
      {
        demo: "date-range-picker/basic",
        title: "Basic",
        description:
          "`defaultValue` is enough for the uncontrolled case — unlike Date Picker, there is no Calendar or open state to hold.",
      },
      {
        demo: "date-range-picker/with-time",
        title: "With time",
        description:
          "`showTime` renders a Time Picker under each end of the range — this is the chain's reason for depending on Time Picker. A same-day range prints its date once and both times after it.",
      },
      {
        demo: "date-range-picker/presets",
        title: "Presets",
        description:
          "Shortcuts are the caller's to add: hold the range in state, pass `value`/`onValueChange`, and a preset button is just another writer of the same state.",
      },
      {
        demo: "date-range-picker/filter-bar",
        title: "Filter bar",
        description:
          "The empty state is the useful one here — with no dates the trigger shows `placeholder`, so clearing back to `undefined` bounds reads as no filter at all. `dateFormat` shortens the label for a toolbar.",
      },
    ],
    parts: {
      DateRangePicker:
        "A closed component: no `...props` passthrough, so `className` is the only thing reaching the DOM and it lands on the trigger. Clearing means writing a range whose `from` and `to` are `undefined` — there is no clear affordance built in.",
    },
  },
  {
    slug: "file-upload",
    name: "File Upload",
    category: "Forms",
    description:
      "A drag-and-drop drop zone with keyboard activation and dragging feedback.",
    intro: [
      "File Upload is the collecting end of an upload and nothing more: it hands you a `File[]` through `onFiles`, from a click, a keyboard activation or a drop. What happens next — the list, the progress, the request — is yours, and `Attachment` is the part that displays what was picked.",
      'The zone is a plain div wrapping a visually hidden `<input type="file">`, and the input is deliberately the only interactive element: it already takes focus and answers Enter and Space, so a `role="button"` on the wrapper would nest one control inside another and fail axe. That input is also where `aria-label` lands, which is why the zone can be named even with no visible label. Two consequences worth knowing: the input\'s value is cleared after every pick, so choosing the same file twice still fires, and `accept` only filters the file dialog — a dropped file matches nothing, so any real constraint is yours to enforce in `onFiles`.',
    ],
    examples: [
      {
        demo: "file-upload/basic",
        title: "Basic",
        description:
          "`onFiles` is the entire output: an array, already converted from the `FileList`, whether the files were picked or dropped.",
      },
      {
        demo: "file-upload/with-attachments",
        title: "With a file list",
        description:
          "File Upload collects; `Attachment` displays. Keeping them apart is why the zone needs no opinion about how a selected file looks.",
      },
      {
        demo: "file-upload/validation",
        title: "Rejecting a file",
        description:
          "Type and size checks live in `onFiles` — `accept` filters the dialog only, and a drop bypasses it entirely. `FieldError` reports the rejects while the valid files are kept.",
      },
      {
        demo: "file-upload/compact",
        title: "Compact zone",
        description:
          "Nothing about the layout is fixed: `className` turns the stacked block into a row, since the zone is a styled div and the parts inside it are plain text slots.",
      },
    ],
    parts: {
      FileUpload:
        "The wrapper is a plain div with no role — the hidden input is the control, and `aria-label` (default `Upload files`) is forwarded to it. `data-dragging` is set while a drag hovers the zone, so styling the drop state needs no state of your own.",
      FileUploadIcon:
        "Renders the upload glyph itself; children passed to it are ignored, so a different icon means not using this part.",
    },
  },
  {
    slug: "rating",
    name: "Rating",
    category: "Forms",
    description:
      "A star rating with hover preview, plus a read-only mode for display.",
    intro: [
      "Rating is a radio group wearing stars: `max` of them, one number out, arrow keys between. Reach for it to collect a score in a form, or with `readOnly` to show one back — the same component covers both, so a rating never changes shape between the review form and the review list.",
      "Each star is labelled with its own number, and the group has no name of its own, so pass `aria-label` or wrap it in a `Field` with a label — props spread onto the underlying Base UI radio group, which also means `name` makes it submit with the form like any other radio. The scale is whole stars only: `max` changes how many there are, never the granularity, and there are no halves. `readOnly` and `disabled` both freeze the stars and drop the hover preview, and neither is dimmed — the difference is intent, so reach for `readOnly` whenever a score is being displayed rather than withheld.",
    ],
    examples: [
      {
        demo: "rating/basic",
        title: "Basic",
        description:
          "A radio group underneath, so each star is a real radio: arrow keys move between them and the value is one number. `max` sets the scale — five by default, ten when the survey asks for it.",
      },
      {
        demo: "rating/read-only",
        title: "Read-only and controlled",
        description:
          "`readOnly` keeps the stars but drops the hover preview and pointer affordance — for showing a score rather than collecting one. A displayed rating still needs a name, which is what `aria-label` gives it here.",
      },
      {
        demo: "rating/feedback-form",
        title: "Feedback form",
        description:
          "`name` reaches the Base UI radio group, so the score is submitted with the form's other values and needs no state of its own.",
      },
      {
        demo: "rating/criteria",
        title: "Several criteria",
        description:
          "One controlled Rating per row, each named by `aria-label` since the row's caption is plain text — the average below is derived, not a Rating in a third state.",
      },
    ],
  },
  {
    slug: "form",
    name: "Form",
    category: "Forms",
    description:
      "A thin Base UI Form wrapper: the page-level `<form>` and its vertical rhythm. `Field` owns everything inside it.",
    intro: [
      "Form is the outermost wrapper of a form page — a `<form>` element laid out as a flex column with a wide gap, so sections separate themselves without margins. Reach for it once per form and let `FieldGroup` space the fields inside it; `Field` owns a single field's label, description and error.",
      "Base UI's own conveniences here need `Field.Root` to register the controls, and this system's `Field` is a plain div, so none of them see anything: `onFormSubmit` reports an empty object, the `errors` prop keys off names it never learns, and there is no first-invalid field to focus. Read the values with `FormData` in `onSubmit` and hold errors in state instead. The one behaviour that does reach you is that the element is rendered with `noValidate`, so browser constraint bubbles never appear and `required` blocks nothing on its own.",
    ],
    examples: [
      {
        demo: "form/basic",
        title: "Basic",
        description:
          "`FormData` over `event.currentTarget` is the reliable read in this system — every control here is a native input with a `name`, so nothing else is needed.",
      },
      {
        demo: "form/validation",
        title: "Validation",
        description:
          "Wire errors yourself: state in, `FieldError` out, `aria-invalid` on the control. Nothing validates on submit until you do, since the form carries `noValidate`.",
      },
      {
        demo: "form/sections",
        title: "Sectioned form",
        description:
          "Form's own `gap-10` is what separates the sections — `FieldSet` and `FieldLegend` group them semantically, `FieldGroup` handles the tighter spacing within one.",
      },
      {
        demo: "form/pending",
        title: "Pending submit",
        description:
          "An async `onSubmit`: read the values before the first `await`, since `event.currentTarget` is null once the handler yields. The server's answer lands in the same error state a client check would use.",
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
  {
    slug: "status",
    name: "Status",
    category: "Data display",
    description:
      "A dot-and-label state indicator across the shared six-tone family — success, warning, danger, critical, neutral, info.",
    intro: [
      "Status is the smallest state readout in the system: a coloured dot and a word, sized to sit inline in a table cell, a list row or a page header. Reach for it when the state is a fact about one thing — a service, a job, a deployment. A boxed, filled label is `Tag`; a full-width coloured strip is `Banner`.",
      "`tone` sets a single `--tone` variable on the root that both parts read, so the dot and the label can never drift apart. The tones are the `-ink` values, tuned to pass AA as text on both themes — keep the label at full opacity and use weight for hierarchy.",
    ],
    examples: [
      {
        demo: "status/tones",
        title: "Tones",
        description:
          "The six tones of the shared family. The dot and label share one `--tone` variable, so they never drift from each other.",
      },
      {
        demo: "status/pulse",
        title: "Pulse",
        description:
          "`pulse` lives on `StatusIndicator`, not `Status` — a live state can still pair with a static label, and the ping only runs under `motion-safe`.",
      },
      {
        demo: "status/in-service-list",
        title: "In a service list",
        description:
          "Where statuses earn their keep: a column of them scans in one pass. The root is `inline-flex`, so it drops into a row without a wrapper.",
      },
    ],
    parts: {
      Status:
        "Sets `--tone` and nothing else — both parts read it, so a part rendered outside a Status comes out uncoloured.",
      StatusIndicator:
        "`aria-hidden`, so colour is never the only cue — the label carries the meaning. `pulse` belongs here, not on the root.",
      StatusLabel:
        "Bare text at `--tone`. Fading it with opacity re-opens the contrast failure the `-ink` tones were chosen to fix.",
    },
  },
  {
    slug: "tag",
    name: "Tag",
    category: "Data display",
    description:
      'A boxed, tinted label across the shared six-tone family. Absorbs v1\'s Chip, whose one boolean `warn` axis is now `tone="warning"`.',
    intro: [
      "Tag is the boxed, tinted label: a filled background with matching ink, sized for a status column or a row of attributes. Reach for it when the label should read as an object you can scan a column of — `Badge` is the bare typographic emphasis, and `Status` is the dot-and-word that sits inline in running text.",
      "Each tone sets `--tone-bg` and `--tone-ink` as a pair, so a tone can never be half-applied. The six tones are the same family `status`, `banner` and `alert` draw from, which is what lets a danger tag and a danger banner mean the same thing on the same page.",
    ],
    examples: [
      {
        demo: "tag/tones",
        title: "Tones",
        description:
          "The six tones of the shared family. Each sets `--tone-bg` and `--tone-ink` together — v1's boolean `warn` axis is the `warning` tone here.",
      },
      {
        demo: "tag/in-context",
        title: "In a list",
        description:
          "Where tags usually live: the status column of a row. The root is `w-fit shrink-0`, so it never stretches to the row and never gets squeezed by the label beside it.",
      },
      {
        demo: "tag/with-icon",
        title: "With a leading icon",
        description:
          "The root's `gap-1.5` is there for a glyph. Keep the icon `aria-hidden` — the word carries the meaning, so the tag still reads without it.",
      },
    ],
  },
  {
    slug: "description-list",
    name: "Description List",
    category: "Data display",
    description:
      "Term/detail pairs for record summaries. Renders a real `dl`, so the pairing survives without sight of the layout.",
    intro: [
      "Description List is the record-summary primitive: term-and-detail pairs in a two-column grid. Reach for it whenever a block answers `what are the fields of this thing?` — an invoice head, a mission summary, a settings readout. A scannable column of many records is `Table`.",
      "The grid columns live on the root, so terms and details must be direct children: pairs flow as consecutive grid cells with no row wrapper. Wrapping a pair in a `div` breaks the alignment for the whole list.",
    ],
    examples: [
      {
        demo: "description-list/basic",
        title: "Basic",
        description:
          "The term column is `auto`-sized and the detail column takes the rest, so the widest term sets the gutter for every row.",
      },
      {
        demo: "description-list/in-card",
        title: "In a card",
        description:
          "Its most common home: the summary block of a record. The rules come from each pair's own `border-t`, with `first-of-type` suppressing the leading one — the list needs no divider of its own.",
      },
      {
        demo: "description-list/rich-details",
        title: "Details that aren't text",
        description:
          "A detail can hold a `Status` or a `Tag`, not just a string. The `dd` is padded for text, so a boxed control makes its row slightly taller than its neighbours.",
      },
    ],
    parts: {
      DescriptionList:
        "Owns the `auto 1fr` grid, so every term and detail must be a direct child — a wrapper around a pair drops it out of the columns.",
      DescriptionTerm:
        "`whitespace-nowrap`: a long term widens the first column for the whole list rather than wrapping.",
      DescriptionDetail:
        "`tabular-nums`, so a column of amounts or dates lines up digit for digit.",
    },
  },
  {
    slug: "stat-card",
    name: "Stat Card",
    category: "Data display",
    description:
      "A single headline figure with an optional signed delta and sparkline.",
    intro: [
      "Stat Card is the dashboard tile: one label, one headline figure, and optionally how it moved and where it has been. Reach for it for the KPI row at the top of a page. When the numbers themselves have to be read rather than glanced at, that is `Chart`.",
      "Every part is optional and carries its own top margin, so the vertical rhythm holds whichever ones you leave out. The card sets no width — size it from the grid it sits in.",
    ],
    examples: [
      {
        demo: "stat-card/basic",
        title: "Basic",
        description:
          "Label and figure only, which is most of the use. The tiles take their width from the row, not from the component.",
      },
      {
        demo: "stat-card/with-delta",
        title: "With a delta",
        description:
          "The arrow is `aria-hidden` — the signed figure carries the direction, so colour is never the only cue. `direction` uses the `-ink` tones, the text-weight values that pass AA on both themes.",
      },
      {
        demo: "stat-card/with-spark",
        title: "With a sparkline",
        description:
          "The spark is a trend hint, not a chart: no axes, no tooltip. `StatCardSpark` is a bare slot, so a hand-drawn polyline needs no chart dependency — reach for `chart` when values must be read.",
      },
    ],
    parts: {
      StatCard:
        "Border, surface and padding, with no width of its own — the grid around it decides the size.",
      StatCardLabel:
        "The caption, not a heading: uppercase and muted at 11px, and it takes no heading element.",
      StatCardValue:
        "Heading face and `tabular-nums`. Its `mt-2` is what separates it from the label, so a card without one closes up on its own.",
      StatCardDelta:
        "`direction` is the whole axis and it draws the arrow itself — pass the signed figure as children so the direction survives without colour.",
      StatCardSpark:
        "A slot with a top margin and nothing else. Keep whatever goes in it `aria-hidden`; the figure above already carries the number.",
    },
  },
  {
    slug: "relative-time",
    name: "Relative Time",
    category: "Data display",
    description:
      'Renders "3 hours ago" from a date, inside a `time` element that keeps the machine-readable timestamp.',
    examples: [
      { demo: "relative-time/basic", title: "Basic" },
      {
        demo: "relative-time/static",
        title: "In a table",
        description:
          "Where relative stamps earn their keep: a column of them scans faster than absolute dates.",
      },
    ],
  },
  {
    slug: "gauge",
    name: "Gauge",
    category: "Data display",
    description:
      "A radial progress dial for a bounded value, with optional thresholds that recolour the arc.",
    intro: [
      "Gauge is the radial readout for one bounded value: a 270° dial with the figure in the middle. Reach for it when a single number wants to be read against its ceiling — utilisation, a score, a quota. For the same value inside a row or a list, `Progress` and `Meter` take far less room.",
      'It is a single component, not a compound one: everything is props. The arc is drawn with `stroke-dasharray` over one fixed path, so the value animates with no path recomputation, and the whole dial is one `role="img"` whose label reads `label: value of max`.',
    ],
    examples: [
      {
        demo: "gauge/basic",
        title: "Basic",
        description:
          "`max` defaults to 100 but takes any ceiling — the second dial reads 128 of 256 and fills by fraction, not by percentage.",
      },
      {
        demo: "gauge/thresholds",
        title: "Thresholds",
        description:
          "The last threshold the value reaches wins, so list them ascending. `color` overrides them outright, which is why the two are not usually passed together.",
      },
      {
        demo: "gauge/formatted",
        title: "Units and density",
        description:
          "`format` decides the centre text only — the `aria-label` still reads the raw value against `max`. The figure scales with `size`, so keep the formatted string short; `thickness` retunes the ring without touching the geometry.",
      },
    ],
  },
  {
    slug: "code-block",
    name: "Code Block",
    category: "Data display",
    description:
      "A framed code surface with a filename head and copy button. Highlighter-agnostic: it takes pre-highlighted HTML, so the package pulls in no syntax highlighter of its own.",
    intro: [
      "Code Block is the framed code surface: a dark panel, an optional head carrying a filename and a copy button, and a scrolling body. Reach for it for a multi-line sample; a single copyable command is `Snippet`, the one-line sibling that shares this component's copy button.",
      "The panel is dark in both themes — its colours come from the fixed `--ds-noir` scale rather than the theme tokens, so a sample reads the same on a light page. Highlighting stays out: `CodeBlockBody` takes plain `code` or pre-highlighted `html`, so the package depends on no highlighter of its own.",
    ],
    examples: [
      {
        demo: "code-block/basic",
        title: "Basic",
        description:
          "The full shape: filename left, copy button right, code below. `CodeBlockCopyButton` takes the raw text as `value`, independent of what is rendered.",
      },
      {
        demo: "code-block/with-html",
        title: "Pre-highlighted",
        description:
          "Hand the component markup your own highlighter produced — this docs app uses Shiki, which stays entirely on its side. `html` goes through `dangerouslySetInnerHTML`, so pass a trusted highlighter's output over your own source, never raw user input.",
      },
      {
        demo: "code-block/scrollable",
        title: "Long samples",
        description:
          "Cap the height on `CodeBlockBody`, which owns the `overflow-auto`. Capping the root clips instead of scrolling — it is `overflow-hidden` so the panel keeps its edges. A body that actually scrolls needs `tabIndex={0}` and a label, or keyboard users cannot reach the rest of the code.",
      },
    ],
    parts: {
      CodeBlock:
        "Fixes the dark panel colours in both themes and clips its children — height caps belong on the body, not here.",
      CodeBlockHead:
        "A `justify-between` row and nothing more: two children split left and right, one child takes the width.",
      CodeBlockFilename:
        "Uppercase tracked-out label text, not a heading — it is a caption for the panel, so it takes no heading level.",
      CodeBlockBody:
        "Owns the scrolling, so height caps and the `tabIndex={0}` a scrolling region needs both belong here. `html` renders through `dangerouslySetInnerHTML` and wins over `code` and `children` when both are passed.",
      CodeBlockCopyButton:
        "`value` is what reaches the clipboard, deliberately independent of what is rendered. Its own `aria-label` flips to `Copied` for two seconds.",
    },
  },
  {
    slug: "snippet",
    name: "Snippet",
    category: "Data display",
    description:
      "A one-line copyable command. Shares Code Block's copy affordance rather than restating it.",
    intro: [
      "Snippet is the one-line copyable value: an install command, an API key, a connection string. Reach for it wherever the reader's next action is `copy this`. A multi-line sample belongs in `Code Block`, whose copy button this component reuses rather than restating.",
      "`value` is what reaches the clipboard and `children` is what renders, so a secret can show obscured while the full string still copies. The root is `inline-flex max-w-full`, so it sits inside a table cell or a `dd` without stretching it.",
    ],
    examples: [
      {
        demo: "snippet/basic",
        title: "Basic",
        description:
          "With no `children`, `value` is both what shows and what copies — the common case for an install line.",
      },
      {
        demo: "snippet/in-context",
        title: "Obscured secret",
        description:
          "Where `children` earns its keep: the key renders masked in a record summary while `value` keeps the full string that reaches the clipboard.",
      },
    ],
  },
  {
    slug: "qr-code",
    name: "QR Code",
    category: "Data display",
    description:
      "Renders a QR code as inline SVG from a hand-rolled byte-mode encoder — no dependency, no network, no canvas. Versions 1-10, all four correction levels.",
    intro: [
      "QR Code turns a string into a scannable inline SVG — a URL on a printed page, an `otpauth://` secret for two-factor enrolment, a token on a kiosk screen. Everything happens locally: no image service, no canvas, no network round trip, and nothing to configure but `value`.",
      "The encoder is hand-rolled byte mode, versions 1 to 10, so the ceiling is 271 bytes at level L. Modules are fixed black on a white quiet zone rather than themed — a code has to hold its contrast to scan, which is the one deliberate exception to the token rule in this package. A payload over capacity renders a dashed error box instead of throwing.",
    ],
    examples: [
      {
        demo: "qr-code/basic",
        title: "Basic",
        description:
          "`value` is effectively the whole API — the code is square, `size` is its rendered width in px, and the quiet zone is drawn inside that box.",
      },
      {
        demo: "qr-code/levels",
        title: "Correction levels",
        description:
          "Higher correction survives more damage — a logo overlay, a torn corner — but holds less data: L 271 bytes down to H 119.",
      },
      {
        demo: "qr-code/in-card",
        title: "Scan or type",
        description:
          "The two-factor shape: the same secret as a code and as a `Snippet`, since a reader on the device showing the code cannot scan their own screen. The quiet zone stays white on dark, which is what keeps it scannable.",
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
    slug: "toc",
    name: "Toc",
    category: "Navigation",
    description:
      "The in-page anchor rail — a sticky list of the sections on the current page.",
    examples: [
      {
        demo: "toc/basic",
        title: "Basic",
        description:
          'The root is a `<nav>` labelled "On this page", so it lands in the landmark list; `TocLabel` is the visible echo of that name. Each link pulls its own border over the list\'s rail with `-ms-px`, so hovering lights a segment instead of drawing a second line.',
      },
      {
        demo: "toc/current-section",
        title: "Current section",
        description:
          "No scroll-spy is built in — the component holds no state. Mark the active entry with `aria-current` and style it with the `aria-[current]:` variant.",
      },
      {
        demo: "toc/nested",
        title: "Nested sections",
        description:
          "`level` is depth in the list, not heading rank — 1 is a section, 2 a subsection. It indents the link's text while leaving its border on the rail, so depth reads as one line with steps rather than a second, indented rail.",
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
        description: "Just a title and description, no prop bag, only slots.",
      },
      {
        demo: "page-header/advanced",
        title: "Advanced",
        description:
          "Breadcrumb, title, description and actions compose freely alongside the title.",
      },
      {
        demo: "page-header/with-tabs",
        title: "With tabs and icon",
        description:
          "`PageHeaderTabs` flips the header's bottom rule flush against the tab strip; `Tabs` wraps the header so the panels render below it. `PageHeaderIcon` sizes and mutes whatever Phosphor icon you hand it.",
      },
    ],
  },
  {
    slug: "panel",
    name: "Panel",
    category: "Layout",
    description:
      "A flat, bordered section container — Card without the shadow, plus a row part for tightly-packed settings lists.",
    intro: [
      "Panel is the flat sibling of Card: the same header, content and footer skeleton, but a plain border instead of elevation. Reach for it when a region needs a boundary without needing to float — settings sections, form groups, tiles that sit inside the page rather than on top of it.",
      "The root owns `--panel-spacing`, which every part reads for its padding, so density changes in one place. For tightly-packed label-and-control lists, `PanelRow` replaces v1's `rows` boolean with a part you compose in.",
    ],
    examples: [
      {
        demo: "panel/basic",
        title: "Basic",
        description:
          "A self-contained summary block: header, prose content, one footer action. Rules are opt-in — PanelHeader and PanelFooter borrow Card's `.border-b`/`.border-t` convention, so add the utility yourself to draw them.",
      },
      {
        demo: "panel/rows",
        title: "Settings rows",
        description:
          "The settings-page shape: `PanelRow` packs each label-and-control pair into a divided list. Rows carry their own padding, so PanelContent passes `px-0` rather than stacking the two.",
      },
      {
        demo: "panel/form-section",
        title: "Form section",
        description:
          "A form group with its actions kept inside the boundary: fields in PanelContent, cancel/save in a ruled PanelFooter — the footer earns its keep instead of decorating.",
      },
    ],
    parts: {
      Panel:
        "Owns `--panel-spacing`, which every part reads for its padding — a part rendered outside a Panel comes out flush.",
      PanelHeader:
        "Bottom padding is keyed off `.border-b`, so a header with no rule stays tight.",
      PanelTitle:
        "Type styles only, with no padding of its own — that is why it sits inside PanelHeader. Add your own heading element when the level matters.",
      PanelContent:
        "Horizontal padding and nothing else. Pass `px-0` when the children carry their own, as PanelRow does.",
      PanelFooter: "Mirrors the header: top padding is keyed off `.border-t`.",
      PanelRow:
        "Carries its own padding and divider; `last:border-b-0` stops the trailing rule doubling up with the footer's.",
    },
  },
  {
    slug: "masonry",
    name: "Masonry",
    category: "Layout",
    description:
      "A multi-column layout that balances items of uneven height, via CSS columns rather than a JS measurement pass.",
    intro: [
      "Masonry packs children of uneven height into balanced columns — the pinboard layout a plain grid cannot produce without leaving gaps under the short items. Reach for it when the children are self-contained tiles (cards, images, notes) and reading order across columns does not matter.",
      "It is CSS multi-column underneath, not a JS measurement pass: `columns` becomes a `--columns` custom property, so any integer works, and items flow down each column in source order — the first children fill the left column rather than the top row. Each child gets `break-inside-avoid`, so a tile never splits across two columns.",
    ],
    examples: [
      {
        demo: "masonry/basic",
        title: "Basic",
        description:
          "Uneven blocks balancing into three columns. The numbering makes the column-first flow visible — item 2 sits below item 1, not beside it.",
      },
      {
        demo: "masonry/with-cards",
        title: "Card wall",
        description:
          "A wall of cards with bodies of different lengths — the case columns exist for, where a plain grid would leave ragged gaps under the short ones.",
      },
      {
        demo: "masonry/gallery",
        title: "Media gallery",
        description:
          "Mixed-ratio media tiles: each `AspectRatio` child sizes itself, so portrait and landscape frames interleave without a row grid forcing them to share a height.",
      },
    ],
    parts: {
      Masonry:
        "Spacing lives on the children (`*:mb-4 *:break-inside-avoid`), so a child carrying its own margin fights the rhythm — and source order flows down columns, not across rows.",
    },
  },
  {
    slug: "banner",
    name: "Banner",
    category: "Layout",
    description:
      "A full-width, tone-coloured message bar over the shared six-tone family — the same tokens button.tsx's `tone` axis reads.",
    intro: [
      "Banner is the page-level counterpart of Alert: the same icon, title and description anatomy, but full-width, flush-cornered and tinted edge to edge. Reach for it when a message concerns the whole screen or section — a maintenance window, a plan limit, an incident notice — pinned above the content rather than nested inside it.",
      "`tone` sets `--tone-bg`/`--tone-ink` from the shared six-tone family in globals.css — the same tokens Button's `tone` axis reads — so a banner always matches its sibling controls and a new tone never needs a bespoke colour here.",
    ],
    examples: [
      {
        demo: "banner/basic",
        title: "Basic",
        description:
          'Icon, title, description. The root carries `role="status"`, so a banner mounted after load is announced without an aria-live wrapper.',
      },
      {
        demo: "banner/with-action",
        title: "Action and dismiss",
        description:
          "`BannerAction` is a plain flex sibling rather than an absolutely-positioned corner, so it can hold more than one control without overlapping the text.",
      },
      {
        demo: "banner/tones",
        title: "Tones",
        description:
          "The full severity ladder. Each tone reads its `--ds-<tone>-bg`/`--ds-<tone>-ink` pair, so the ladder stays in step with Button, Alert and every other tone-aware component.",
      },
    ],
    parts: {
      Banner:
        'Carries `role="status"` — mounted banners are announced politely with no aria-live wrapper. A leading `svg` child is auto-sized and top-aligned by the root\'s selectors.',
      BannerDescription:
        "Deliberately un-faded: the tone inks clear AA as bare text but drop under 4.5:1 behind opacity, so hierarchy comes from BannerTitle's `font-medium` instead.",
      BannerAction:
        "A flex sibling, not an absolutely-positioned corner — several controls fit beside long text without overlap.",
    },
  },
  {
    slug: "wordmark",
    name: "Wordmark",
    category: "Layout",
    description:
      "The Diametral logo lockup from @diametral/assets, inlined so it recolours with the surrounding text.",
    intro: [
      "Wordmark renders the Diametral lockup as inline JSX, so app chrome — headers, footers, auth screens, empty states — never touches a raw asset file. Two lockups: `horizontal` is the full name, `square` sets it inside the symbol for avatar- and app-icon-sized placements.",
      "The paths are `currentColor`, so `text-*` utilities recolour the mark exactly like text and there is no light/dark SVG pair to swap. `@diametral/assets` remains the canonical source for non-React consumers such as email and raster exports.",
    ],
    examples: [
      {
        demo: "wordmark/basic",
        title: "Basic",
        description:
          "The lockup is `currentColor`, so it recolours with the surrounding text — no separate light/dark SVG to swap.",
      },
      {
        demo: "wordmark/square",
        title: "Square",
        description:
          "The wordmark set inside the symbol, for avatar and app-icon-style placements.",
      },
      {
        demo: "wordmark/app-header",
        title: "Beside a text label",
        description:
          'When the mark sits next to text that already says "Diametral", pass `label=""` — the SVG drops out of the accessibility tree instead of announcing the name twice.',
      },
    ],
    parts: {
      Wordmark:
        '`label` is the accessible name. Pass `label=""` to make the mark decorative when adjacent text already names it — otherwise screen readers hear "Diametral" twice.',
    },
  },
  {
    slug: "theme-switcher",
    name: "Theme Switcher",
    category: "Layout",
    description:
      "A light/dark/system toggle, promoted from the docs app's own theme-toggle. Fully controlled — the consumer owns the theme hook.",
    intro: [
      "ThemeSwitcher is the light/dark/system control for wherever the theme choice lives — an app header, a settings page, a preferences dialog. Three forms share one contract: `segmented` (a joined three-cell ToggleGroup), `cycle` (one icon button that advances through the modes) and `dropdown` (an icon trigger opening a radio menu), so the footprint fits the placement without changing the wiring.",
      "It is fully controlled: `value` and `onValueChange` are required, and storage, media-query sync and system resolution stay in the consumer's `useTheme()`-style hook — app wiring is not the design system's job. One behaviour is built in: re-clicking the pressed mode is a no-op, because a theme is never \"none\".",
    ],
    examples: [
      {
        demo: "theme-switcher/basic",
        title: "Basic",
        description:
          "Fully controlled, so the demo holds its own state rather than touching the real app theme.",
      },
      {
        demo: "theme-switcher/cycle",
        title: "Compact cycle",
        description:
          "One 36px button for headers too tight for three cells. The icon shows the current mode; the `aria-label` announces the action, since a click advances to the next mode.",
      },
      {
        demo: "theme-switcher/dropdown",
        title: "Dropdown",
        description:
          "The discoverable compact form: an icon-and-caret trigger opening a `DropdownMenuRadioGroup`, so every mode is visible and one click away.",
      },
      {
        demo: "theme-switcher/in-toolbar",
        title: "In a toolbar",
        description:
          "The typical chrome placement. The `outline` variant and `sm` size are baked in, so it sits flush beside `icon-sm` buttons with no sizing props.",
      },
      {
        demo: "theme-switcher/settings-row",
        title: "Settings row",
        description:
          'The settings-page placement: the switcher drops into a `PanelRow` like any label-and-control pair. The group already carries `aria-label="Theme"`, so the visible text needs no `htmlFor` wiring.',
      },
    ],
    parts: {
      ThemeSwitcher:
        'Built on ToggleGroup, but re-pressing the active mode is swallowed — Base UI would otherwise empty the group, and a theme is never "none".',
    },
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
