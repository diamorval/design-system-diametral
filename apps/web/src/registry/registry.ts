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

  {
    slug: "icon-button",
    name: "Icon Button",
    category: "Actions",
    description:
      "`Button` for an icon alone, with an accessible name it cannot ship without.",
    intro: [
      "Icon Button is the square, label-required `Button`: a toolbar control, a row action, anything whose meaning is carried by a glyph. It takes the same `variant`, `tone` and `disabled` as `Button` and forwards everything else, so it is the same control with one rule added.",
      "That rule is the whole component. `label` is required in the type and lands on both `aria-label` and `title`, which is the difference between this and an icon-only `Button` — the latter can render with no accessible name at all and nothing catches it until the a11y suite does. Write the label as the action, not the glyph: `Archive invoice`, not `Archive icon`.",
    ],
    examples: [
      {
        demo: "icon-button/toolbar",
        title: "Toolbar",
        description:
          "Inside a `ButtonGroup` the borders collapse into one seam, which is what makes a row of icons read as one control rather than four.",
      },
      {
        demo: "icon-button/row-actions",
        title: "Row actions",
        description:
          "`ghost` keeps the actions quiet until hovered. Each label names its row — four identical `Delete` buttons are useless to anyone tabbing through a table.",
      },
      {
        demo: "icon-button/sizes",
        title: "Sizes",
        description:
          "`size` narrows to `Button`'s four square sizes; the text sizes would leave an icon floating in horizontal padding. `icon-xs` and `icon-sm` shrink the glyph with the box.",
      },
    ],
  },
  {
    slug: "split-button",
    name: "Split Button",
    category: "Actions",
    description:
      "One default action with its variants a caret away — a `Button` and a `DropdownMenu` welded into one control.",
    intro: [
      "Split Button is for when there is a clear default and a short list of near-misses: Save, and also save-and-duplicate; Publish, and also publish-to-the-team. The main half does the obvious thing in one click, and the caret holds the rest. When there is no default worth privileging, a plain `DropdownMenu` is the honest shape.",
      "`variant`, `size` and `tone` are forwarded to both halves so the pair always reads as one control, and the menu is a real `DropdownMenu` — focus management, typeahead and Escape come with it rather than being hand-rolled.",
    ],
    examples: [
      {
        demo: "split-button/basic",
        title: "Basic",
        description:
          "`menu` takes `DropdownMenuItem`s. The caret half has no visible text, so it carries a default `aria-label` of `More actions` — override it with `menuLabel` when the page has several.",
      },
      {
        demo: "split-button/publish",
        title: "Grouped options",
        description:
          "The menu is a full `DropdownMenu` content slot, so labels, separators and icons all work. `tone` reaches both halves, which is what keeps the seam invisible.",
      },
      {
        demo: "split-button/outline",
        title: "Outline and disabled",
        description:
          '`disabled` reaches both halves — a live caret on a dead action is a trap. `size="sm"` shrinks the pair together.',
      },
    ],
  },
  {
    slug: "speed-dial",
    name: "Speed Dial",
    category: "Actions",
    description:
      "A floating action button whose two-to-four actions fan out on open — the create button a whole view is about.",
    intro: [
      "Speed Dial is the one action a view exists to start, parked in a corner and reachable from anywhere in it: compose, create, upload. Reach for it when the action outranks everything else on the page and the reader may be scrolled far from a toolbar. Two to four actions is the honest range — a fifth belongs in a `DropdownMenu`, and a single action needs no dial at all, just an `IconButton` positioned the same way.",
      "It is a `Menu` underneath, not the CSS `:focus-within` trick daisyUI's `fab` uses, so Escape closes it, arrow keys walk the actions and focus returns to the trigger. The trigger is also the root: `className` positions the dial and defaults to `fixed end-6 bottom-6`, which an `absolute` override swaps out when the dial belongs to a region rather than the viewport.",
    ],
    examples: [
      {
        demo: "speed-dial/basic",
        title: "Create actions",
        description:
          "Each action's visible label is its accessible name, so the glyph carries no `aria-label` of its own. The trigger's `icon` swaps for an X while open — that swap is CSS off `aria-expanded`, not a second state.",
      },
      {
        demo: "speed-dial/docked",
        title: "Docked to the top",
        description:
          '`side="bottom"` fans the column downwards for a dial that lives above its content. Alignment stays pinned to the trigger\'s end edge, which is what keeps the action boxes in a line under it.',
      },
      {
        demo: "speed-dial/tone",
        title: "Brand tone",
        description:
          "`tone` reaches the trigger only — the actions stay neutral so the dial reads as one accent rather than a stack of them. A `disabled` action greys out and refuses activation but stays arrow-reachable and `aria-disabled`, so a reader learns it exists instead of finding a gap.",
      },
    ],
    parts: {
      SpeedDial:
        "The trigger is the root, so `className` positions the dial. Its default is `fixed end-6 bottom-6 z-40`; pass `absolute` and tailwind-merge drops the `fixed`.",
      SpeedDialAction:
        "The whole row is the menu item — label chip and glyph box together — so the label is the accessible name and the box needs none.",
    },
  },
  {
    slug: "wizard",
    name: "Wizard",
    category: "Actions",
    description:
      "The step state machine `Stepper` deliberately lacks — trail, panel and Back/Next/Finish in one component.",
    intro: [
      "Wizard drives a multi-step flow: it owns the current index, renders the active step's content, and gives you Back, Next and Finish. `Stepper` is the other half of this pair and is presentational parts only — it draws a trail but does not move through one. Reach for `Stepper` when the progress is reported by something else, and for Wizard when the component is the flow.",
      "`steps` is an array of `{ label, content, disableNext }`, so the trail and the panel stay in sync by construction. It is controlled with `active` + `onStepChange` and uncontrolled with `defaultActive`, the same split every other stateful component here uses.",
    ],
    examples: [
      {
        demo: "wizard/basic",
        title: "Basic",
        description:
          "Three steps, uncontrolled. Back is disabled on the first step and Next becomes Finish on the last, which is what makes the footer readable without a legend.",
      },
      {
        demo: "wizard/gated",
        title: "Gating a step",
        description:
          "`disableNext` holds the flow until the step is satisfied. It never disables Finish — a last step that cannot be completed should say why rather than trap the reader.",
      },
      {
        demo: "wizard/controlled",
        title: "Controlled",
        description:
          "`active` and `onStepChange` hand the index to the caller, which is what lets something outside the component report on it. `onFinish` fires on the last step instead of advancing.",
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
    intro: [
      "Input is the single-line text control and nothing more — one wrapper over Base UI's input primitive. Reach for it for any value a keyboard produces. It stays deliberately bare: the label, helper text and error message come from `Field`, and anything that has to sit inside the field box — an icon, a unit, a reveal button — comes from `InputGroup`.",
      "The border is bottom-only, a transparent box with `border-b-input`, so the control reads as a ruled line and focus recolours that rule with `--color-ring`. Invalid styling hangs off `aria-invalid` rather than a prop, which makes the accessibility attribute the switch — and Textarea, InputGroupInput and the pickers all copy this treatment, so it is worth changing in one place.",
    ],
    examples: [
      {
        demo: "input/basic",
        title: "Basic",
        description:
          "The bare control with no wrapper, which is why `aria-label` is doing the labelling — an input with neither a visible label nor an `aria-label` fails an axe check.",
      },
      {
        demo: "input/with-field",
        title: "With label and description",
        description:
          "`Field` supplies the label association and helper text; `Input` stays a plain control.",
      },
      {
        demo: "input/types",
        title: "Typed values",
        description:
          "`type` swaps the native control, not just the keyboard: `date` brings the platform picker and `file` picks up the `file:` classes the component ships for the browser's own button. Validation props (`min`, `max`, `accept`) pass straight through. For a numeric field with steppers, `Number Field` is the richer sibling.",
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
    intro: [
      "Textarea is the multi-line field: Input's bottom rule, focus and invalid treatment, measured in rows instead of characters. Reach for it when the answer is prose — a description, a message, a set of notes. For a composer whose buttons live inside the field, `InputGroup` takes an `InputGroupTextarea` instead.",
      "There is no resize handle. `resize-none` is on the box and `field-sizing-content` grows it to fit what is typed, so `rows` sets a floor rather than a height. That growth has no ceiling of its own — cap it with `max-h-*` and `overflow-y-auto` wherever the field sits in a fixed layout.",
    ],
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
      {
        demo: "textarea/counter",
        title: "Character count",
        description:
          "Controlled, because the count is read off the value: `maxLength` stops the typing and `FieldDescription` carries the readout, so the count stays inside the row the label already names.",
      },
      {
        demo: "textarea/bounded",
        title: "Bounded growth",
        description:
          "Where auto-growth needs a ceiling: `max-h-40` plus `overflow-y-auto` on the textarea gives it something to scroll inside, while `rows` still decides where it starts. The cap belongs on the control, which is what owns the scrolling.",
      },
    ],
  },
  {
    slug: "label",
    name: "Label",
    category: "Forms",
    description:
      "An accessible label; pairs with a control via `htmlFor` and dims with its disabled state.",
    intro: [
      "Label is the plain `label` element wearing the system's field-heading type: `text-xs`, semibold, uppercase and tracked out. Reach for it when you are wiring a control by hand. Inside a `Field`, prefer `FieldLabel` — it wraps this same component and adds the group's disabled and invalid wiring.",
      "It restyles itself from the control it sits beside rather than taking a prop: `peer-data-[slot=checkbox]`, `peer-data-[slot=radio-group-item]` and `peer-data-[slot=switch]` trade the heading treatment for sentence case, because a checkbox label is a sentence and a field heading is not. Peer selectors only look backwards, so the control has to come before the label in the DOM.",
    ],
    examples: [
      {
        demo: "label/basic",
        title: "Basic",
        description:
          "Uppercase and tracked, which suits a field heading. Inside a `Field`, prefer `FieldLabel` — it adds the disabled and invalid wiring.",
      },
      {
        demo: "label/with-controls",
        title: "Checkbox and switch rows",
        description:
          "Label restyles itself from the control it follows (`peer-data-[slot=checkbox]`), dropping the uppercase treatment — so the control must come first in the DOM.",
      },
      {
        demo: "label/inline-hints",
        title: "Inline hints",
        description:
          "The root is `flex items-center gap-2`, so a badge or a hint sits inside the label with no extra wrapper. Plain text needs `normal-case font-normal tracking-normal` to opt out of the heading treatment it inherits.",
      },
      {
        demo: "label/disabled",
        title: "Disabled controls",
        description:
          "Two mechanisms, because `peer-disabled` only reaches a label that comes after the control: the checkbox row fades from the peer, and the input row — label first — fades from a wrapper carrying `group` and `data-disabled`.",
      },
    ],
  },
  {
    slug: "field",
    name: "Field",
    category: "Forms",
    description:
      "The form row primitive — label, control, description and error in one accessible group. Replaces the retired `form` component in this system.",
    intro: [
      'Field is the form row: a label, its control, the helper text and the error message in one `role="group"` box on a single `gap-3`. Reach for it for every labelled control — it replaces the retired `form` component in this system, and `FieldGroup` stacks the rows so a form needs no ad-hoc margins.',
      "None of the wiring is automatic: the group mints no ids and reads no form library's state, so `htmlFor`/`id` and `aria-invalid` stay yours to set. What it owns is the reaction — `data-invalid` on the Field turns the whole row destructive and `data-disabled` fades its labels, both through `group/field` selectors the parts already carry.",
    ],
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
          "`FieldGroup` stacks rows on `gap-10`; a group nested inside another drops to `gap-4`, which is how a sub-section reads as one without extra classes.",
      },
      {
        demo: "field/fieldset",
        title: "Fieldset and legend",
        description:
          "The section shape: `FieldSet` is a real `fieldset` and `FieldLegend` its legend, so the group's name is announced with every control inside it. A description placed straight after the legend tightens against it, and `FieldSeparator` divides the section out of the existing gap rather than adding a row.",
      },
      {
        demo: "field/choices",
        title: "Horizontal orientation",
        description:
          '`orientation="horizontal"` puts the control before the label — the correct order for checkboxes and radios. Wrap a label that carries a description in `FieldContent`: the row keys its `items-start` off that part, so the control aligns to the first line instead of centring against two.',
      },
      {
        demo: "field/invalid",
        title: "With error",
        description:
          "`FieldError` accepts either children or an `errors` array, which it de-duplicates by message and renders as a list when there is more than one.",
      },
    ],
    parts: {
      Field:
        "Nothing sets `data-invalid` for you — pass it here to turn the whole row destructive. `aria-invalid` on the control only recolours the control, so a fully red row wants both.",
      FieldSet:
        "Drops its own gap from 6 to 3 when its direct child is a `CheckboxGroup` or a `RadioGroup`, since those already space their own items.",
      FieldGroup:
        "`gap-10` between rows, and `gap-4` for a FieldGroup nested in another — sub-sections tighten by nesting rather than by class.",
      FieldLabel:
        "`Label` with the group's disabled wiring added, so it inherits the peer restyling too: a checkbox or radio still has to come before it in the DOM. Wrap a whole `Field` in one and it turns into a full-width bordered box that tints while a control inside it is checked — the selectable-card pattern, with no separate component.",
      FieldTitle:
        "Renders a `div`, not a `label` — it names a group visually without claiming to label a control, which is what you want above a set of radios that each carry their own FieldLabel.",
      FieldContent:
        "The wrapper for a label plus its description in a horizontal row: the Field keys its `items-start` off this part's `data-slot`, so a plain `div` leaves the control centred against two lines of text.",
      FieldDescription:
        "Its margins are order-sensitive (`last:mt-0`, `nth-last-2:-mt-1`, and a tighter rule right after a legend), so keep it after the control and before the error rather than the other way round.",
      FieldSeparator:
        "Sits in the group's existing gap with `-my-2` rather than adding a row of its own; the optional children print as a centred label over the rule.",
      FieldError:
        'Returns `null` with neither children nor a non-empty `errors`, so it can stay mounted through a valid state. `errors` de-duplicates by message and switches to a list past one; the root is `role="alert"`, which announces the message as it appears.',
    },
  },
  {
    slug: "field-array",
    name: "Field Array",
    category: "Forms",
    description:
      "Repeated entries for an array of objects — one bordered block per entry, each removable, with one add button under the stack.",
    intro: [
      "Field Array is the repeat chrome for a section that collects several of the same object: a list of diplomas, of recipients, of quote lines. Each entry is a bordered block, `FieldArrayItemContent` lays out whatever controls that object needs, `FieldArrayRemove` drops the entry, and `FieldArrayAdd` closes the stack as a full-width outline button. Wrap the lot in a `FieldSet` when the section wants a name — the legend then announces with every control inside it.",
      "Every part is a plain styled box holding no state and asserting nothing about its contents, so an entry takes any control in any arrangement: pass a grid to the content part, or put the remove button in a header row above it rather than beside it. The array itself stays with you — this package owns no form state — which leaves add, remove, limits and the entry ids in your hands.",
      "Submission needs no value state at all. Index each control's own `name` per entry (`lines[0].unit`) and a plain form submit carries the array; only the row list lives in React. Key each item off a stable entry id, never the index — keyed by index, removing a row makes React reuse the wrong DOM node and every uncontrolled value below it shifts up by one.",
    ],
    examples: [
      {
        demo: "field-array/basic",
        title: "Basic",
        description:
          "One entry per diploma: an Input and a Select in the default content column, remove button beside them. Both carry an indexed `name`, so the section submits without any value state. Every control needs a name of its own — the entries are identical, so `Diploma 2 school` beats `School` for anyone hearing the form rather than seeing the block it sits in.",
      },
      {
        demo: "field-array/submit",
        title: "Any controls, one submit",
        description:
          "The part list is layout only, so an entry can hold anything: here a two-column grid of Input, Select and Checkbox, with the remove button moved into a header row. The output is the raw `FormData` the browser would post — an unchecked Checkbox contributes no entry, which is native behaviour rather than something the component decides.",
      },
      {
        demo: "field-array/limits",
        title: "Limits",
        description:
          "Neither bound is built in: `disabled` on `FieldArrayAdd` caps the stack, and rendering no `FieldArrayRemove` on a lone entry is what keeps one row mandatory.",
      },
    ],
    parts: {
      FieldArray:
        'A `role="group"` column on `gap-3` — the add button is just its last child, not a separate slot.',
      FieldArrayItem:
        "The bordered block, a centred flex row. Add `flex-col items-stretch` when the entry wants stacked sections instead of content-beside-button.",
      FieldArrayItemContent:
        "The column the controls go in. `min-w-0` is load-bearing: without it a long value refuses to shrink below its content width and pushes the remove button out of the block. Override `className` for any other arrangement — `grid grid-cols-2` is the common one.",
      FieldArrayRemove:
        "A ghost icon `Button` carrying the trash glyph; `label` is its accessible name and should identify the entry, since a stack of them all reading `Remove` tells a screen reader user nothing. Pass children to swap the glyph.",
      FieldArrayAdd:
        "A full-width outline `Button` with the plus already in it — pass only the label as children.",
    },
  },
  {
    slug: "select",
    name: "Select",
    category: "Forms",
    description:
      "A Base UI listbox for choosing one option from a set, with a rendered trigger and portalled popup.",
    intro: [
      "Select is the closed-list control: a trigger showing the current choice, and a popup listing every option there is. Reach for it when the set is short, known and needs no typing — an environment, a role, a sort order. Once the list is long enough that scanning stops working, Combobox and Autocomplete filter as you type, and Multi Select is the one that keeps more than one answer.",
      "The root owns both the value and the labels: pass `items` — a value-to-label map — and `SelectValue` prints the selected item's label instead of the raw value it stores. The popup is portalled, sized to `--anchor-width`, and `alignItemWithTrigger` is on by default, which parks the selected item over the trigger rather than dropping the list underneath it — that is also why an open Select does not animate.",
    ],
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
      {
        demo: "select/status",
        title: "Status picker",
        description:
          "`SelectValue` also takes a function child, which receives the current value — the way to print an icon beside the label, since `items` only carries text. The trigger sizes any icon it holds, so no wrapper classes.",
      },
      {
        demo: "select/long-list",
        title: "Long lists",
        description:
          "Past the popup's `--available-height` the list scrolls and the arrow buttons appear on their own. The selected item still opens over the trigger, so the current answer stays put instead of jumping to the top of a long list.",
      },
    ],
    parts: {
      Select:
        "Where `items` goes — the map every `SelectValue` reads to turn a stored value into a label. It is also the state owner: `defaultValue`, `value` and `onValueChange` live here, not on the trigger.",
      SelectTrigger:
        '`w-fit` by default, so widen it yourself (`w-full`) inside a field. It has `role="combobox"`, which is not named from its content, so it points `aria-labelledby` at the SelectValue it renders — passing your own `aria-label` overrides that.',
      SelectValue:
        "Prints the label for the current value by looking it up in the root's `items`; with no `items` it prints the raw value. `placeholder` covers the empty state, and a function child replaces both.",
      SelectContent:
        "Portals the popup and sizes it to `--anchor-width`, so a wide trigger gives a wide list. `alignItemWithTrigger` (default) aligns the selected item over the trigger and disables the open animation.",
      SelectLabel:
        "A group heading — it must sit inside a `SelectGroup` to be tied to the options it names.",
    },
  },
  {
    slug: "checkbox",
    name: "Checkbox",
    category: "Forms",
    description:
      "A single boolean control, with indeterminate support via the `parent` prop inside a group.",
    intro: [
      "Checkbox is the single yes-or-no: accept, include, opt in. Reach for it when the answer travels with a form and applies on submit — Switch is the sibling for a setting that takes effect the moment it changes. When several boxes answer one question, put them in a Checkbox Group so the group holds the array instead of one boolean per box.",
      'Base UI renders the box as a `span` with `role="checkbox"` and a visually hidden `input` beside it. The span is the thing you style — through `data-checked` and `data-indeterminate`, never `:checked` — while the hidden input carries `name` for form submission and takes the `id` you pass, which is what keeps a plain `htmlFor` label working. The box itself is 18px, but an invisible `::after` stretches the hit area well past it: a comfortable target without a bigger visual.',
    ],
    examples: [
      {
        demo: "checkbox/basic",
        title: "States",
        description:
          "The four states, `indeterminate` among them — it is a prop you set, not a third value the box arrives at on its own.",
      },
      {
        demo: "checkbox/consent",
        title: "Consent field",
        description:
          'The single-box form row: `FieldContent` holds the label and its fine print, and `orientation="horizontal"` keeps the box beside them rather than above.',
      },
      {
        demo: "checkbox/task-list",
        title: "Task list",
        description:
          "The box carries `peer`, so anything after it in the DOM can react to the check — here `peer-data-checked:line-through` on the label, with no state in the component.",
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
    slug: "color-picker",
    name: "Color Picker",
    category: "Forms",
    description:
      "A brand swatch grid, a hex field and the native picker, all converging on one value.",
    intro: [
      "Color Picker is for choosing a colour that will be stored: a tag's colour, a chart series, a workspace accent. The three ways in are deliberate — the swatches make the house palette the path of least resistance, the hex field is for a value someone already has, and the native input is the escape hatch to the full space.",
      "It is controlled with `value` and uncontrolled with `defaultValue`. The hex field keeps its own draft text so you can type `#16` without the value lurching, and commits only once the text parses as `#rgb` or `#rrggbb` — which is also why the selected swatch ring does not follow every keystroke.",
    ],
    examples: [
      {
        demo: "color-picker/basic",
        title: "Basic",
        description:
          "The default `swatches` are the tier-1 brand primaries and secondaries plus white. Selection is marked with a ring rather than a border colour, which would vanish on a swatch close to the border's own.",
      },
      {
        demo: "color-picker/in-a-form",
        title: "In a form",
        description:
          "`name` renders a hidden input carrying the committed value, so a plain form post never receives a half-typed hex. v1 put `name` on the visible field and could post `#16`.",
      },
      {
        demo: "color-picker/controlled",
        title: "Controlled with custom swatches",
        description:
          "`value` and `onChange` hand the colour to the caller. `swatches` replaces the brand list outright — pass the four a chart actually offers rather than eleven the design never uses.",
      },
    ],
  },
  {
    slug: "checkbox-group",
    name: "Checkbox Group",
    category: "Forms",
    description:
      "Manages a set of checkbox values, including the parent select-all relationship.",
    intro: [
      "Checkbox Group owns the array behind a set of boxes that answer one question — permissions, notification topics, the labels a list is filtered by. Children declare a `value` and nothing else; the group holds which ones are on. Reach for it instead of a boolean per box, and for one answer out of many reach for Radio Group.",
      "Select-all is built in rather than derived: give the group `allValues` and mark one child `parent`, and that box works out checked, unchecked and indeterminate from the others. `disabled` cascades the same way, through `data-disabled` on the group, so no child needs the prop. Layout is a plain flex column — any other arrangement is a `className` on the group.",
    ],
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
      {
        demo: "checkbox-group/filters",
        title: "Filter bar",
        description:
          "Controlled with `value` and `onValueChange` when something outside the group reads the selection — a count, a clear button, a query. `flex-row flex-wrap` on the group is the whole layout change.",
      },
      {
        demo: "checkbox-group/validation",
        title: "With validation",
        description:
          "`FieldError` renders nothing until it has content, so it can sit in the markup unconditionally, and `aria-invalid` on each box is what carries the destructive border and ring — the group has no invalid state of its own.",
      },
    ],
  },
  {
    slug: "radio-group",
    name: "Radio Group",
    category: "Forms",
    description:
      "One choice from many. Base UI renders items as spans, so labels must be associated explicitly.",
    intro: [
      "Radio Group is one answer out of a short, visible set — the shape to reach for when the options are worth reading side by side instead of hidden behind a Select trigger. Past a handful of them Select stays shorter, and when more than one answer is allowed it is Checkbox Group.",
      'Items are Base UI radios: what you see is a `span` with `role="radio"`, styled through `data-checked` rather than `:checked`, with the real `input` hidden beside it. The `id` you pass lands on that hidden input, so a `FieldLabel` with `htmlFor` still associates — a wrapping label does not. The group itself is a `grid`, so the arrangement — one column, two, a single row — is a grid utility on the group and never a prop.',
    ],
    examples: [
      {
        demo: "radio-group/basic",
        title: "Basic",
        description:
          "The stacked form shape: a `FieldSet` and its `FieldLegend` name the question, and each item is a horizontal `Field` so the label sits beside its radio.",
      },
      {
        demo: "radio-group/inline",
        title: "Inline options",
        description:
          "The group is a `grid`: `grid-flow-col` lays the same markup out in one row, and `w-auto` stops it stretching to the container it sits in.",
      },
      {
        demo: "radio-group/dependent-field",
        title: "Revealing a field",
        description:
          "Controlled with `value` and `onValueChange` when the choice changes the form around it — the extra field belongs to the group's fieldset, so the legend still names it.",
      },
      {
        demo: "radio-group/as-cards",
        title: "As cards",
        description: "The same wrapping trick as Checkbox, for a tier picker.",
      },
    ],
    parts: {
      RadioGroup:
        "A `grid` and the state owner: `value` / `defaultValue` and `onValueChange` live here, and the layout comes from grid utilities on this element rather than from the items.",
      RadioGroupItem:
        'A `span` with `role="radio"` and no label of its own. The `id` you give it goes to the hidden input Base UI renders alongside, so `htmlFor` on a sibling label works; `aria-labelledby` is the other way in.',
    },
  },
  {
    slug: "switch",
    name: "Switch",
    category: "Forms",
    description:
      "An immediate on/off toggle for settings that apply on change.",
    intro: [
      "Switch is the setting that applies as it changes: no save button, no submit, the state is live the moment the thumb moves. Reach for it in preference panels and settings rows, and keep Checkbox for an answer that travels with a form — or for anything that needs an indeterminate state, which a switch has no way to show.",
      "It is square like the rest of the system: the thumb translates rather than sliding along a pill, so there is no radius to keep in sync, and `size` is a plain prop writing `data-size` rather than a cva axis — `sm` for dense rows. The control carries no label of its own; pair it with a `Label` through `htmlFor`, or give it `aria-label` when the text beside it lives in a `FieldContent`.",
    ],
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
      {
        demo: "switch/master-toggle",
        title: "Master toggle",
        description:
          "Controlled with `checked` and `onCheckedChange` when one switch governs the others. The children stay mounted and go `disabled` rather than disappearing, so the row heights do not jump.",
      },
      {
        demo: "switch/in-toolbar",
        title: "Toolbar filter",
        description:
          '`size="sm"` is the dense pairing — a switch reading as one word of chrome in a bar, where a checkbox would read as part of a form.',
      },
    ],
  },
  {
    slug: "slider",
    name: "Slider",
    category: "Forms",
    description: "Selects a number, or a range, by dragging along a track.",
    intro: [
      "Slider picks a number, or a pair of them, by dragging along a track. Reach for it when the position matters more than the figure — opacity, a volume, a price band — and where someone would rather type the exact number, reach for Number Field instead.",
      'The thumb count is read from the value\'s shape, so a number renders one thumb and an array renders one per entry, and the callback hands back the shape it was given. `thumbAlignment="edge"` is fixed by the wrapper, so a thumb stops flush with the end of the track instead of overhanging it — which is what lets a scale printed under the track line up. There is no built-in readout and no label: render the value yourself and point `aria-labelledby` at whatever names it.',
    ],
    examples: [
      {
        demo: "slider/basic",
        title: "Basic",
        description:
          "The component counts thumbs from the value's shape, so a number gives one thumb and an array gives one per entry.",
      },
      {
        demo: "slider/range",
        title: "Range",
        description:
          "An array value gives two thumbs and an indicator between them. The callback hands back the whole array, so the readout reads both ends from state rather than tracking a thumb.",
      },
      {
        demo: "slider/stepped",
        title: "Stepped scale",
        description:
          "`min`, `max` and `step` turn the track into named notches — the value is an index into the labels, and the flush thumb keeps the first and last notch over the first and last label.",
      },
      {
        demo: "slider/vertical",
        title: "Vertical faders",
        description:
          '`orientation="vertical"` needs no height of its own — the control carries `min-h-40`. `flex-1` inside a fixed-height column is what makes a bank of faders agree on one height and still leave room for their labels.',
      },
    ],
  },
  {
    slug: "number-field",
    name: "Number Field",
    category: "Forms",
    description:
      "A numeric input with increment and decrement controls, scrub support and locale-aware formatting.",
    intro: [
      "Number Field is a numeric input that behaves like a control rather than a text box: buttons on either side of the value, arrow-key stepping, clamping to `min`/`max`, and display formatted through `Intl.NumberFormat`. Reach for it when the answer is a number the user will adjust — a quantity, a price, a typographic value — and Slider when the range reads better than the figure. It is also the engine under Time Picker, which is three of these sharing one underline.",
      'The stored value is a `number | null`, never the input\'s string: `format` changes what is displayed and parsed, never what is held, so a currency field submits `850` rather than `"850,00 €"`, and a cleared field reads back `null` rather than `0`. Stepping comes at three granularities off that one value — `step` on the buttons and arrow keys, `smallStep` with Alt, `largeStep` with Shift — and typed text is clamped into range on blur unless `allowOutOfRange` is set, which is what hands range errors back to native form validation.',
    ],
    examples: [
      {
        demo: "number-field/basic",
        title: "Basic",
        description:
          'A real number field, not `<input type="number">`: it clamps to `min`/`max`, steps on the arrow keys, and passes `format` straight to `Intl.NumberFormat` — the day rate below is stored as `850`.',
      },
      {
        demo: "number-field/quantity",
        title: "Quantity steppers",
        description:
          "Compact steppers in a list, where the product name is the only label a reader needs: `aria-label` on `NumberFieldInput` names each control, because the visible text is not tied to it. Controlled, so `onValueChange` — which reports `number | null`, hence the `?? 0` — keeps the total in step.",
      },
      {
        demo: "number-field/precision",
        title: "Coarse and fine steps",
        description:
          "One value, three granularities: `step` on the arrow keys and buttons, `smallStep` with Alt, `largeStep` with Shift. `snapOnStep` then aligns the result to the grid whichever one describes, counted from `min` — type 1.53 and stepping up lands on 1.6, not 1.63 — and `allowWheelScrub` adds the wheel while the field has focus.",
      },
      {
        demo: "number-field/with-scrub",
        title: "Scrub area",
        description:
          "`NumberFieldScrubArea` turns its children into a drag handle — press and move sideways, the way a design tool's numeric inputs work. Here the label itself is the handle, and the input drops its centring so the pair reads as one row.",
      },
    ],
    parts: {
      NumberFieldGroup:
        "Owns the underline and every state drawn on it — focus, `aria-invalid`, disabled — so an input placed outside the group comes out with no chrome at all.",
      NumberFieldInput:
        "Centred and `tabular-nums`, sized to sit between the two buttons. Without them, pass `ps-0 text-start` so the value lines up with the label instead of floating mid-field.",
      NumberFieldScrubArea:
        'Reads the root\'s context, so it has to sit inside `NumberField` rather than beside it. It renders its own scrub cursor, which is why there is no cursor part to compose; `direction="vertical"` and `pixelSensitivity` are the knobs for how the drag feels.',
    },
  },
  {
    slug: "input-group",
    name: "Input Group",
    category: "Forms",
    description:
      "Composes addons, icons and buttons around an input inside a single bordered box.",
    intro: [
      "Input Group is the bordered box that holds a control plus whatever belongs inside the field with it — a search icon, a currency suffix, a reveal button, a composer's toolbar. Reach for it when the affordance sits within the field's boundary; a control that belongs beside the field is a plain `Button` next to an `Input`.",
      'The group owns the border and the focus rule, so its control has to be `InputGroupInput` or `InputGroupTextarea` — the same Input and Textarea with their own border stripped and a `data-slot="input-group-control"` for the group to find. Everything else is `has-*` selectors on the root: an `aria-invalid` control anywhere inside turns the rule destructive, and a block-aligned addon releases the fixed height and switches the box to a column.',
    ],
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
        demo: "input-group/in-field",
        title: "In a field",
        description:
          "The group replaces the control, not the row: label, description and error still come from `Field`. Only the control takes `aria-invalid` — the group's `has-[[data-slot][aria-invalid=true]]` selector is what carries the destructive rule across the whole box.",
      },
      {
        demo: "input-group/block-align",
        title: "Stacked addons",
        description:
          "`block-start` / `block-end` stack the addon above or below and switch the group to a column, which is what turns it into a composer.",
      },
    ],
    parts: {
      InputGroup:
        "Owns the border, the focus rule and the invalid rule, all as `has-*` selectors — state lives on the control and the box reacts to it. Its `h-10` holds until a textarea or a block-aligned addon is present, which releases it to `h-auto`.",
      InputGroupAddon:
        "Clicking it focuses the group's input, unless the click landed on a button inside. `align` sets the flex order rather than a position, so where the addon sits in your JSX does not matter — but the two block alignments also turn the group into a column.",
      InputGroupInput:
        'Input with its own border and ring removed and `data-slot="input-group-control"` set, which is the hook the group\'s focus rule looks for — a bare `Input` in its place leaves the group unable to show focus.',
      InputGroupTextarea:
        "The multi-line control, and its presence is what releases the group's fixed height, so the box grows with the message.",
      InputGroupButton:
        'A ghost Button at `xs` with its own size scale (`xs`, `sm`, `icon-xs`, `icon-sm`) tuned to fit inside the field. It defaults to `type="button"`, so an icon-only one still needs an `aria-label`.',
      InputGroupText:
        "Muted text for a unit, prefix or suffix. It carries no `data-slot`, so the group treats it as decoration rather than as the control it reacts to.",
    },
  },
  {
    slug: "input-otp",
    name: "Input OTP",
    category: "Forms",
    description: "A segmented one-time-code field with per-character slots.",
    intro: [
      "Input OTP is for a code of known length that reads as separate characters: an SMS or authenticator confirmation, an email verification, an invite key. Reach for it when the length is fixed and the segmentation helps the reader keep their place — a plain Input is better as soon as the value could be any length, and Field is what wraps either one with a label and an error.",
      "There is exactly one real `input` behind the slots, transparent and full-width; every `InputOTPSlot` is a plain `div` painted from that input's state through context. That is what keeps paste, password managers and the OS one-time-code suggestion working, and it is why a slot takes an `index` rather than a value, why splitting slots across groups changes nothing about the code, and why the field is named with `aria-label` or an `id` on `InputOTP` itself — `className` reaches the input and `containerClassName` reaches the row around it.",
    ],
    examples: [
      {
        demo: "input-otp/basic",
        title: "Basic",
        description:
          "Six slots generated from `maxLength`, each addressed by `index`. The value is the whole string, so there is nothing per-slot to collect.",
      },
      {
        demo: "input-otp/with-separator",
        title: "Grouped",
        description:
          "Indexes are absolute across every group, so splitting them 3–3 is presentational and does not touch the value — the readout below is the same string either way.",
      },
      {
        demo: "input-otp/verify-form",
        title: "Verification form",
        description:
          "The confirmation-screen shape: a labelled field, a Verify button held disabled until the code is complete, and a resend beside it. The rejected state is drawn per slot — `aria-invalid` on the root names the control for assistive tech, but the destructive underline lives on `InputOTPSlot`, so it goes to each one.",
      },
      {
        demo: "input-otp/auto-submit",
        title: "Auto-submit on complete",
        description:
          "`onComplete` fires the moment the last character lands, which removes the submit button entirely. Pair it with `disabled` while the request is in flight, or the user can keep typing into a code that is already being checked.",
      },
    ],
    parts: {
      InputOTP:
        "The one real input is this part: `className` lands on it and `containerClassName` on the row, so `aria-label`, `id`, `inputMode` and `autoComplete` all belong here rather than on a group.",
      InputOTPSlot:
        "A `div` painted from the input's context by `index` — not a control, so it takes no value and no `onChange`, and an index past `maxLength` renders empty forever. The focus and `aria-invalid` underlines are drawn here, which is why an invalid state has to reach every slot.",
      InputOTPSeparator:
        'Always draws a dash: the icon is hardcoded, so children passed to it are ignored. It carries `role="separator"` and no tab stop, since it is punctuation rather than structure.',
    },
  },
  {
    slug: "combobox",
    name: "Combobox",
    category: "Forms",
    description:
      "An input that filters a list, with single or multi-select and chip display.",
    intro: [
      "Combobox is a text input whose value has to come from its list: type to narrow, pick to commit. Reach for it once a Select would be a long scroll — a country, a project, an assignee — and Autocomplete instead when the typed text is itself a valid answer. Multi Select is the closed wrapper over the `multiple` mode below, for when the API you want is `options` in and `string[]` out.",
      "`items` on the root is the source of truth Base UI filters; the rendered `ComboboxItem`s are only the view, which is why `ComboboxList` takes a function child rather than JSX. Item values need not be strings: a `{ value, label }` object is understood with no configuration, and any other shape needs `itemToStringLabel` for what the input shows and `itemToStringValue` for what a form submits.",
    ],
    examples: [
      {
        demo: "combobox/basic",
        title: "Basic",
        description:
          "The flat case: an array of strings on the root, one function child on `ComboboxList`. `ComboboxEmpty` keys off an empty-state attribute on the popup, so it belongs inside `ComboboxContent` and outside the list.",
      },
      {
        demo: "combobox/grouped",
        title: "Grouped options",
        description:
          "Groups come from the shape of `items`: entries carrying their own `items` array arrive at the list's function child as groups. `ComboboxGroup` republishes its `items` to the `ComboboxCollection` inside it, which is the same mechanism the list's function child uses implicitly for a flat list.",
      },
      {
        demo: "combobox/objects",
        title: "Ids with labels",
        description:
          "Item values as `{ value, label }` objects, so the field displays a project name and the form submits its id — no `itemToStringLabel` needed, since that shape is recognised. Selection is compared with `Object.is`, so keep one array of objects rather than rebuilding it per render.",
      },
      {
        demo: "combobox/multiple",
        title: "Multi-select with chips",
        description:
          "`ComboboxChip` takes plain children, so map the selection one level up with `ComboboxValue`'s render prop. Point `anchor` at the chips container so the popup tracks it as it grows.",
      },
    ],
    parts: {
      ComboboxInput:
        "A whole `InputGroup`, not a bare input, and the one part carrying additions of this system's own: `showTrigger` (on by default) and `showClear`. The trigger hides itself whenever a clear button is mounted, so the two never stack in the same corner.",
      ComboboxContent:
        "Portalled, and it takes the positioner's `side`, `align`, `sideOffset` and `anchor` props directly rather than nesting a positioner. Pass `anchor` when the field is a chips row, so the popup follows it as chips wrap onto a second line.",
      ComboboxList:
        "A function child is the filtered path — Base UI wraps it in a `ComboboxCollection` reading the root's filtered items. Pass JSX children instead and you get a static list that no query touches.",
      ComboboxEmpty:
        "Shown by a `data-empty` attribute on the popup, not by conditional rendering, so it has to sit inside `ComboboxContent` and outside `ComboboxList` — and it must stay mounted, since that is what lets it announce the empty result.",
      ComboboxChip:
        "Its remove button derives `aria-label` from string children (`Remove publish`). Give an explicit label when the child is an element, or the button reads as a bare `Remove`.",
      ComboboxTrigger:
        "Appends its own caret after whatever children it is given, and defaults `aria-label` to `Toggle options` — override it when the field's own label would not make the button's purpose obvious.",
    },
  },
  {
    slug: "autocomplete",
    name: "Autocomplete",
    category: "Forms",
    description:
      "Free-text input with suggestions — unlike Combobox, the typed value need not come from the list.",
    intro: [
      "Autocomplete is a text input with suggestions attached, where the typed string is the value: the list is a shortcut, never a constraint. Reach for it for search fields, for the answer that is usually but not always one of a known set, and anywhere an “other” option would otherwise be needed. Combobox is the one to use when the value has to come from the list, and Command when the entries are actions rather than answers.",
      "The root holds no selected value at all — only the input string, through `value`/`onValueChange` — and picking an item simply writes that item's text into the input. `mode` decides what a query does: `list` (the default) filters the list and leaves the input alone, `both` filters and previews the highlighted entry inline, `inline` previews without filtering, `none` does neither. Set `filter` to `null` when something upstream already narrowed `items`, or the same query is applied twice.",
    ],
    examples: [
      {
        demo: "autocomplete/basic",
        title: "Basic",
        description:
          "Whatever is typed stays the value even when nothing matches — there is no selection to read back, only the string. Use Combobox when the value must come from the list.",
      },
      {
        demo: "autocomplete/grouped",
        title: "Grouped suggestions",
        description:
          "Groups come from the shape of `items`: entries carrying their own `items` array arrive at the list's function child as groups, and `AutocompleteCollection` renders the entries of the group it sits in.",
      },
      {
        demo: "autocomplete/inline",
        title: "Inline completion",
        description:
          '`mode="both"` filters the list and completes the highlighted entry inside the input, so a long value like a timezone is a few keystrokes rather than a scroll. It needs `autoHighlight` to have something to preview before the arrow keys are touched.',
      },
      {
        demo: "autocomplete/async",
        title: "Server-side search",
        description:
          "The page owns the results, so `filter={null}` stops Base UI filtering an already-filtered list. `AutocompleteStatus` is the polite live region for that request's state — it stays mounted and swaps its children, which is what lets a screen reader hear the count settle.",
      },
    ],
    parts: {
      AutocompleteInput:
        "An `InputGroup` rather than a bare input, with `showClear` as this system's own addition. There is no trigger part here, unlike Combobox: the popup opens from typing, or from `openOnInputClick`.",
      AutocompleteContent:
        "Portalled, and pinned to the anchor's width — unlike Combobox's popup it never grows past the input, so a long suggestion wraps instead of widening the field.",
      AutocompleteEmpty:
        "Shown by a `data-empty` attribute on the popup, not by conditional rendering, so it belongs inside `AutocompleteContent` and outside `AutocompleteList`. Swap its children rather than unmounting it — staying mounted is what lets it announce the empty result.",
      AutocompleteStatus:
        "A polite live region for the state of the list, not a heading: it announces changes to its children, so unmounting it or filling it with a fixed string wastes it. Loading and result counts are what it is for.",
      AutocompleteCollection:
        "Renders the items of the `AutocompleteGroup` above it, or the root's filtered items when there is no group — the same wrapper `AutocompleteList` applies implicitly to a function child.",
    },
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
    intro: [
      "Editable turns a piece of text into its own editor: a preview with a pencil that surfaces on hover or focus, swapping in place for an `Input` with save and cancel beside it. Reach for it to rename something where it already sits — a document title, a board column, a row label — instead of sending someone to a dialog for one value. As soon as the edit touches more than one value, a Field inside a form is the honest shape.",
      "It is hand-rolled rather than composed, so the prop list is the whole surface and there are no parts to nest. Enter and blur commit, Escape discards, and `submitOnBlur={false}` makes blur discard too, which leaves the check button and Enter as the only ways through. Two details to know before styling it: the preview is a `span` rather than a button, so the pencil — not the text — is what opens the field, and the inner `Input` carries its own type size, so a heading-sized preview snaps back to field size while it is being edited.",
    ],
    examples: [
      {
        demo: "editable/basic",
        title: "Basic",
        description:
          "Uncontrolled, which is enough for most renames: the component holds the committed value itself. The pencil only appears on hover or focus, and Escape restores the previous value rather than committing the draft.",
      },
      {
        demo: "editable/rows",
        title: "Rows in a list",
        description:
          "One per row, each holding its own value, so nothing above them keeps state. The last row starts empty to show `placeholder`, which stands in for the value in muted text rather than sitting inside the field.",
      },
      {
        demo: "editable/explicit-commit",
        title: "Commit explicitly",
        description:
          "`submitOnBlur={false}` for a value a stray click must not rewrite: blur then runs `onCancel` rather than `onSubmit`, so the check button and Enter are the only ways to commit and a draft left behind is dropped.",
      },
      {
        demo: "editable/controlled",
        title: "Controlled",
        description:
          "`value` with `onSubmit` hands the commit to the page — and obliges it to write the value back, since a controlled Editable renders what it is given and would otherwise snap to the old text. `onValueChange` is the same moment, not the keystrokes: there is no callback for the draft.",
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
    slug: "date-time-picker",
    name: "Date Time Picker",
    category: "Forms",
    description:
      "`Date Picker` and `Time Picker` composed into a single `Date` — the bound holds across both halves.",
    intro: [
      "Date Time Picker is for a moment rather than a day: a publish time, an appointment, a delivery slot. Both halves already exist as their own components; what this adds is one `Date` in and out, so the caller never reassembles a day and a clock into a value.",
      "The bounds are the reason it is a component and not two controls side by side. `min` and `max` disable whole days in the calendar and clamp the clock on commit, so a `min` of 09:00 makes 08:00 unreachable on the first allowed day — v1 forwarded only the date half of a bound and let that through.",
    ],
    examples: [
      {
        demo: "date-time-picker/basic",
        title: "Basic",
        description:
          "The time half is disabled until the calendar has answered. A clock with no day would have to invent today, which is a value nobody asked for.",
      },
      {
        demo: "date-time-picker/bounded",
        title: "Bounded window",
        description:
          "`min` and `max` reach both halves. Days outside the window are struck out by the calendar, and a time outside it is pulled back to the bound rather than rejected silently.",
      },
      {
        demo: "date-time-picker/step",
        title: "Minute increments",
        description:
          "`step` snaps the minutes down to the nearest increment on commit, so a slot picker cannot produce 10:37. It defaults to 5, the same increment v1's Time Picker used.",
      },
    ],
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
    intro: [
      "Table is the styled HTML table and nothing more: one thin wrapper per element, no data layer, no state. Reach for it when the rows are already in the order you want them — a summary, a fixed list, markup rendered on the server. Sorting, filtering and pagination are `Data Table`, which composes these same parts around TanStack Table.",
      "The root renders a wrapping div that owns the horizontal scroll, so a wide table scrolls inside its column rather than stretching the page — but `className` lands on the `table` element, not on that wrapper. Cells carry no opinion about their content, so a numeric column needs `text-right tabular-nums` on both its head and its cells.",
    ],
    examples: [
      {
        demo: "table/basic",
        title: "Basic",
        description:
          "The whole skeleton in one pass. Rules come from the sections rather than the rows — `TableHeader` draws the line under the head and `TableBody` drops it on the last row, so a row never has to know where it sits.",
      },
      {
        demo: "table/with-badges",
        title: "With status badges",
        description:
          "Numeric columns take `text-right`; ids take `font-mono` so digits align down the column. `TableCaption` renders below the table whatever its position in the JSX — the root is `caption-bottom`.",
      },
      {
        demo: "table/with-footer",
        title: "With footer total",
        description:
          "`TableFooter` is styled as a summary row, not a repeat of the header — fill it with `TableCell`, not `TableHead`, and compute the total from the same array the body maps.",
      },
      {
        demo: "table/selectable",
        title: "Selectable rows",
        description:
          'Selection is the one state the primitives track: `data-state="selected"` tints the row and outranks the hover tint, so a selected row holds still under the pointer. A cell containing a `role="checkbox"` element drops its trailing padding, which is what keeps the control column narrow without a width.',
      },
    ],
    parts: {
      Table:
        "Renders a scrolling div around the `table`, and `className` goes on the table inside it — a max-width or a border meant for the scroll container has to wrap this part instead.",
      TableHeader:
        "`[&_tr]:border-b`, so the head rule belongs to the section. A header of two stacked rows draws a line under each.",
      TableBody:
        "Drops the border on its last row, so the body never doubles up with the footer's own top rule.",
      TableFooter:
        "A summary row: muted fill, `font-medium`, top border. It is not a second header — put `TableCell` in it, so screen readers do not read the totals as column names.",
      TableHead:
        "Uppercase tracked caption text, start-aligned and `whitespace-nowrap`. It sets nothing for the column below it — a right-aligned column needs `text-right` here and on every cell.",
      TableRow:
        'Hover and `data-state="selected"` both tint the row, and selection wins the cascade, so a selected row does not change under the pointer. `has-aria-expanded` tints it too, for a row that owns an open disclosure.',
      TableCell:
        '`whitespace-nowrap` by default, so prose in a cell needs `whitespace-normal` and a width to wrap. Trailing padding drops to zero when the cell holds a `role="checkbox"` element.',
      TableCaption:
        "Always renders below the table — the root is `caption-bottom` — so it reads as a footnote, not a title. A real heading belongs above the component.",
    },
  },
  {
    slug: "data-table",
    name: "Data Table",
    category: "Data display",
    description:
      "TanStack Table wired into the Table primitives — sorting, column filtering and pagination from a `columns` definition.",
    intro: [
      "Data Table is TanStack Table already wired into the Table primitives: hand it `columns` and `data` and you get sortable headers, an optional filter box and optional pagination, with no `useReactTable` call of your own. Reach for `Table` when the rows are already final — this one owns state, so it is a client component and it re-renders on every sort and keystroke.",
      "Features switch on by a prop being present rather than by a flag: `searchColumn` renders the filter input, `pageSize` renders the pager and installs the pagination row model, and `selectable` prepends the checkbox column. Sorting is the exception — every column with an accessor is sortable unless you set `enableSorting: false`, and sorting and filtering both see the accessor value, never what `cell` rendered.",
      "Selection is keyed rather than indexed: `rowKey` derives a stable identity per row, and `selectedKeys` / `onSelectionChange` speak in those keys. That is what survives sorting, filtering and paging — a row index does not.",
      "Everything above runs over the `data` array in the browser. `loadPage` moves the whole lot to the server instead: it receives the page, the sort and the filters, returns the rows and a total, and the client row models stand down so nothing is sorted or sliced twice.",
    ],
    examples: [
      {
        demo: "data-table/basic",
        title: "Basic",
        description:
          "Pass `columns` and `data`. Each `accessorKey` column header becomes a sort toggle — a real button inside the `th`, so it is reachable by keyboard and its caret shows the current direction.",
      },
      {
        demo: "data-table/searchable",
        title: "Search and pagination",
        description:
          "`searchColumn` names the one column the filter box applies to; `pageSize` turns on the pager. `amount` sorts as a number even though its `cell` renders a formatted string, because sorting reads the accessor value rather than the output.",
      },
      {
        demo: "data-table/selectable",
        title: "Row selection",
        description:
          "`selectable` prepends the checkbox column, including a select-all whose three states — none, some, all — are handled for you. Give `rowKey` a stable identity or the keys are row indices, which stop meaning anything the moment the table is sorted.",
      },
      {
        demo: "data-table/expandable",
        title: "Detail rows",
        description:
          "`expandable` prepends the disclosure and `renderDetail` fills a full-width row beneath. The trigger is a real button carrying `aria-expanded` and a per-row name, because a caret on a cell click handler is reachable by neither keyboard nor screen reader.",
      },
      {
        demo: "data-table/editable",
        title: "Inline editing",
        description:
          "`editable` on the table plus `meta: { editable: true }` on a column swaps that cell for the `Editable` component. The accessor stays, so sorting and filtering still read the value — and Editable's own pencil is a focusable button, which is the keyboard path v1's double-click never had.",
      },
      {
        demo: "data-table/controlled-sort",
        title: "Controlled sort",
        description:
          "`sort` and `onSortChange` hand the sorting state to the caller, which is what lets it be persisted, shared or set from outside — the header toggles still drive it.",
      },
      {
        demo: "data-table/columns",
        title: "Columns and toolbar",
        description:
          "`title` and `toolbar` open the header strip, which is where `columnToggle` puts its menu. `reorderable` adds a grip to each data column — a real button with a keyboard sensor behind it, so a column moves with the arrow keys and not only by drag. `meta: { hidden: true }` starts Region off.",
      },
      {
        demo: "data-table/lazy",
        title: "Server-side pages",
        description:
          "`loadPage` moves sorting, filtering and paging to the server: it is called with all four on every change, and the client row models stand down so the page is not paged twice. `total` from the response is what the pager counts against.",
      },
      {
        demo: "data-table/infinite",
        title: "Infinite loading",
        description:
          '`lazyMode="infinite"` appends instead of replacing, and swaps the pager for a Load more button. Changing the sort or filter resets it — the rows already fetched are answers to a different question.',
      },
      {
        demo: "data-table/row-actions",
        title: "Row actions",
        description:
          "The column that is not data: give it an `id` instead of an `accessorKey` and it has no accessor, so it can never become a sort toggle and the filter never sees it. `cell` receives the row, so `row.original` is the record the menu acts on — which is also why each trigger can carry its own `aria-label`.",
      },
      {
        demo: "data-table/empty",
        title: "Empty state",
        description:
          "`emptyMessage` fills one cell spanning every column, so the header still reads and the layout holds its shape. Filtering a table down to nothing lands here too — it is the row model that is empty, not the data.",
      },
    ],
    parts: {
      DataTable:
        "One component, not a composition: sorting and filter state live inside it, so there is no controlled mode. Lift the `data` instead, and remount with a `key` when you need the sort reset.",
      DataTableColumnHeader:
        "What turns a header into a sort toggle, exported for columns that render their own `header`. It checks `getCanSort()` itself, so on a column without an accessor it renders the plain content and no button.",
    },
  },
  {
    slug: "kanban",
    name: "Kanban",
    category: "Data display",
    description:
      "A board of columns holding cards that move between them by drag or by arrow key.",
    intro: [
      "Kanban is the board shape: columns you declare, cards that move between them. Reach for it when the state of a record *is* the column it sits in — a triage queue, a sprint board, a review pipeline. The card order is state it owns, so it is a client component and every drop re-renders it.",
      "Column membership lives on the item rather than in a nested per-column array: each item carries a `column` id and the board filters a flat list. That is what makes a move a one-field rewrite instead of a splice out of one array and into another, and why `onMove` can report the whole thing as `(itemKey, toColumnId)`.",
      "Cards are dragged by a grip that is a real button, so there is a keyboard route through the entire interaction: tab to a grip, arrow across to another column, drop. The column body is its own drop target as well as its cards, which is what lets a card land in a column that is currently empty. v1's board used native HTML5 drag-and-drop and had no keyboard path at all — that is the one behaviour that did not port.",
    ],
    examples: [
      {
        demo: "kanban/basic",
        title: "Basic",
        description:
          "`columns` names the lanes, `defaultItems` seeds the cards, and each card's `column` says where it starts. With no `renderCard` the card falls back to the item's `title`. Shipped starts empty and still accepts a drop, because the column body is a drop target in its own right.",
      },
      {
        demo: "kanban/card-content",
        title: "Card content",
        description:
          "`renderCard` fills the card body and nothing else — the board keeps the surface and the grip, so a card carrying its own badges or buttons never competes with the drag. Compose `KanbanCardTitle` back in to keep the heading matching the default.",
      },
      {
        demo: "kanban/controlled",
        title: "Controlled board",
        description:
          "`items` with `onItemsChange` hands the order to the caller; `onMove` fires alongside it, but only when the card actually changed column. v1's single `items` prop did both jobs by re-seeding from the prop on every change — a v1 call site that never updated `items` ports to `defaultItems`, not to this.",
      },
    ],
    parts: {
      Kanban:
        "Owns the card order. Seed it with `defaultItems` and it manages itself; pass `items` and it defers to you completely — which means passing `items` without also handling `onItemsChange` freezes the board.",
      KanbanCardTitle:
        "Type styles only, and what the card falls back to when no `renderCard` is given. `renderCard` replaces the whole body, so compose this back in when the heading should still match.",
    },
  },
  {
    slug: "chart",
    name: "Chart",
    category: "Data display",
    description:
      "Recharts wrapped so series colours come from a `ChartConfig` and resolve to brand chart tokens.",
    intro: [
      "Chart is a thin frame around Recharts: `ChartContainer` gives you the responsive box, themed axis and grid colours, and one place to declare the series. The chart itself is still Recharts, so its children are `BarChart`, `Line`, `XAxis` — this component adds no chart types of its own.",
      "It is the layer the finished charts are built on, not a substitute for them: for the common forms reach for `Line Chart`, `Area Chart`, `Bar Chart`, `Stacked Bar`, `Pie Chart` or `Donut Chart`, which each take `config` and `data` and compose these parts for you. This page is for the chart none of them draw — a figure that mixes mark types, or a colour outside the ramp. A single figure with a trend hint is `Stat Card`.",
      "`config` is the whole naming and colour system: an entry that carries a colour becomes a `--color-<key>` custom property scoped to that one chart, which the series reference by name, and the tooltip and legend read their labels from the same object — so a series is named and coloured once. An entry may carry only a label, naming a key without colouring it. The six `--ds-chart-*` tokens hold in both themes, so `theme` on an entry is the escape hatch for the colour that does not.",
    ],
    examples: [
      {
        demo: "chart/composed",
        title: "Two mark types",
        description:
          "What no single-form component draws: a `ComposedChart` whose children are a `Bar` and a `Line`. Both series read the same `YAxis`, which is what keeps the comparison honest — a bar and a line on separate scales say whatever their domains happen to make them say.",
      },
      {
        demo: "chart/theme",
        title: "A colour outside the ramp",
        description:
          "`theme` replaces `color` when one value cannot serve both themes — a partner's navy here, legible on white and lost on the dark page. The two are mutually exclusive in the type, and the emitted rule is per-chart, so this override reaches nothing else.",
      },
    ],
    parts: {
      ChartContainer:
        "Holds the config, the responsive box and the `--color-<key>` variables, so every other part has to be inside one — the tooltip and legend content read it from context and throw outside it. Its default size is `aspect-video`; a fixed height needs a `className`.",
      ChartTooltip:
        "Recharts' own `Tooltip`, re-exported unchanged. It positions and toggles; what it renders is whatever you pass as `content`.",
      ChartTooltipContent:
        "Resolves each entry against `config`, so a series whose data key is not a config key needs `nameKey` or `labelKey` to redirect the lookup — the usual fix for a pie. Values print in tabular figures so the column of numbers stays aligned as the pointer moves.",
      ChartLegend:
        "Recharts' `Legend`, re-exported. Its `verticalAlign` is what the content part reads to decide which side its padding goes on.",
      ChartLegendContent:
        "Labels come from `config` alone, so a series with no config entry renders a swatch and no text.",
      ChartStyle:
        "The `style` element `ChartContainer` already renders for you — exported only for the case where you own the container. A config with no colours renders nothing at all.",
    },
  },
  {
    slug: "agenda",
    name: "Agenda",
    category: "Data display",
    description:
      "A chronological list of events grouped by day — the list half of a calendar, and where v2 keeps event display.",
    intro: [
      "Agenda sorts events by day and time, groups them under a day heading, and renders each as a time, a status dot and a title. Reach for it for what is coming up: a day view, a week's schedule, a room's bookings. `Timeline` is the neighbour that looks similar and answers a different question — it narrates a sequence of things that already happened.",
      "Event display lives here and not on `calendar`. v2's calendar is `react-day-picker`, a date-selection control, and a month cell can honestly show about two events before it starts hiding the rest; a list has no such ceiling. The two compose instead — select a day in `calendar`, list it here — which is what the third example does.",
    ],
    examples: [
      {
        demo: "agenda/basic",
        title: "Basic",
        description:
          "Events arrive unsorted and are grouped by day for you. `time` is free text sorted as a string, so write it zero-padded — `09:00` sorts before `14:00`, `9am` does not.",
      },
      {
        demo: "agenda/with-calendar",
        title: "With a calendar",
        description:
          "The intended pairing: `calendar` owns selection, Agenda owns the events. Filtering is the caller's, which is what keeps both components ignorant of each other.",
      },
      {
        demo: "agenda/empty",
        title: "Empty state",
        description:
          "No events renders `Empty` rather than a bespoke placeholder, so the voice matches every other empty surface in the system. `emptyMessage` is the one line you write.",
      },
    ],
  },
  {
    slug: "line-chart",
    name: "Line Chart",
    category: "Data display",
    description:
      "A finished line chart over the Chart primitives — grid, axis, tooltip and legend already wired to one `config`.",
    intro: [
      "Line Chart is the assembled version of what `Chart` leaves you to compose: pass `data` and a `config` and you get the grid, the x axis, the tooltip and the legend without naming a single recharts child. Reach for it for a value over time where the shape of the trend is the point. When the chart needs a shape this does not have — a brush, a second y axis, mixed marks — drop back to `Chart` and compose it yourself.",
      "`config` is the whole naming and colouring system, one entry per series keyed by the field name in each `data` row. A series that names no colour takes the next slot of the `--ds-chart-*` ramp, so a config of bare labels still draws in brand colours. Sizing goes through `className` rather than `width`/`height` — the container underneath is responsive.",
    ],
    examples: [
      {
        demo: "line-chart/basic",
        title: "Single series",
        description:
          "The minimum: rows, one `config` entry, and `xAxisKey` naming the field the ticks read. The series takes `--ds-chart-1` because the config entry carries only a label.",
      },
      {
        demo: "line-chart/comparison",
        title: "Comparing series",
        description:
          "Every extra `config` key draws another line and the legend turns itself on past one series. All series share one y scale, so the lines are comparable rather than each filling the box.",
      },
      {
        demo: "line-chart/dense",
        title: "Dense sampling",
        description:
          "`dots={false}` at high point counts — the tooltip tracks the nearest x rather than a marker, so nothing becomes unreachable. `grid={false}` drops the rules when the trend matters more than the reading.",
      },
      {
        demo: "line-chart/target",
        title: "Annotated against a target",
        description:
          "Children are appended inside the recharts chart, which is the escape hatch for anything the props do not cover — here a `ReferenceLine` for the SLA the series is read against.",
      },
    ],
  },
  {
    slug: "area-chart",
    name: "Area Chart",
    category: "Data display",
    description:
      "`Line Chart` read as a volume — the same props, with a filled band under each series.",
    intro: [
      "Area Chart is the volume reading of a trend: reach for it when the size of the quantity matters as much as its direction, or when several series are meant to sum. For a rate where only the shape of the line carries meaning, `Line Chart` says the same thing with less ink.",
      "It shares `Line Chart`'s API exactly — the same `config`, `xAxisKey`, `grid` and `legend` — plus `stacked`. Overlaid is the default because it is the safe reading: two bands drawn over each other still compare, whereas stacking silently changes what the upper series means.",
    ],
    examples: [
      {
        demo: "area-chart/basic",
        title: "Single series",
        description:
          "One series, read as a volume. The band is the series colour at a low `fillOpacity` while the stroke stays at full strength, so the boundary survives on both themes.",
      },
      {
        demo: "area-chart/stacked",
        title: "Stacked composition",
        description:
          "`stacked` sums the series into one band, so the top edge is the total and each layer is its contribution. Only reach for it when the parts genuinely add up — stacked series are read against a moving baseline, which makes the upper ones hard to compare.",
      },
      {
        demo: "area-chart/overlaid",
        title: "Forecast against actual",
        description:
          "Two series overlaid rather than stacked, which is what you want when they measure the same thing twice. `dots` is off by default here and switched back on, because at seven points the markers say where the readings actually are.",
      },
    ],
  },
  {
    slug: "bar-chart",
    name: "Bar Chart",
    category: "Data display",
    description:
      "Categorical bars with a pinned value axis, a row layout, and per-bar semantic tinting.",
    intro: [
      "Bar Chart compares discrete categories rather than a run over time: revenue by quarter, sessions by channel, uptime by service. When the x axis is time and the shape of the trend is the point, `Line Chart` is the better read; when the question is what share of a whole, `Stacked Bar`.",
      "Two props have no `Line Chart` equivalent. `max` pins the value axis so a chart does not silently rescale when its tallest bar changes, and `statusKey` names a row field carrying `success`, `warning`, `danger` or `info`, which tints that one bar from the semantic tokens rather than the chart ramp.",
    ],
    examples: [
      {
        demo: "bar-chart/basic",
        title: "Single series",
        description:
          '`max` fixes the ceiling at 300, so the bars read against a constant scale instead of against each other — the difference between "Q4 was big" and "Q4 was 263 of a possible 300".',
      },
      {
        demo: "bar-chart/status",
        title: "Tinted by status",
        description:
          "`statusKey` names the row field holding the tone. It rides along as recharts' own `fill`, so it colours the whole row — pair it with a single-series `config`, as v1's data rows did.",
      },
      {
        demo: "bar-chart/horizontal",
        title: "Rows for long labels",
        description:
          '`horizontal` lays the bars out as rows, which is the fix for category names that would otherwise be rotated or truncated. Recharts calls the same thing `layout="vertical"`; the prop keeps v1\'s name.',
      },
      {
        demo: "bar-chart/grouped",
        title: "Grouped series",
        description:
          "A second `config` key puts two bars side by side per category and turns the legend on. Pass `stacked` instead when the two are parts of one total rather than rivals.",
      },
    ],
  },
  {
    slug: "stacked-bar",
    name: "Stacked Bar",
    category: "Data display",
    description:
      "Proportional bars — every row normalised to its own total, so only the split differs.",
    intro: [
      "Stacked Bar answers what share, not how much. Each row is normalised to its own total, so every bar is the same length and the eye compares splits rather than sizes: storage by kind, a test run by outcome, throughput by state across teams. When the absolute size of each row is the point, `Bar Chart` with `stacked` keeps the raw values.",
      "That normalisation is the whole component, and it is why the tooltip reads percentages — the magnitudes are deliberately gone. `config` is the stacking dimension, one entry per segment, and `showLegend` is on by default because a proportional bar is unreadable without one.",
    ],
    examples: [
      {
        demo: "stacked-bar/basic",
        title: "One row",
        description:
          "The single-bar case: no `labelKey`, so no row label and the whole width is the split. A row that sums to zero stays at zero rather than dividing by it.",
      },
      {
        demo: "stacked-bar/by-team",
        title: "Comparing rows",
        description:
          "`labelKey` names each row down the left. Because every row is normalised separately, a team shipping 22 items and one shipping 11 produce the same bar length — the comparison is of mix, not of volume.",
      },
      {
        demo: "stacked-bar/inline",
        title: "Inline in a summary",
        description:
          "`showLegend={false}` and a short `className` height turn it into a one-line proportion strip, with the figures carried by the prose beside it instead of a legend.",
      },
    ],
  },
  {
    slug: "pie-chart",
    name: "Pie Chart",
    category: "Data display",
    description:
      "A whole split into slices, coloured per slice from a `config` keyed by slice name.",
    intro: [
      "Pie Chart is for a small number of parts that make up one whole and are meant to be read as fractions: four traffic channels, three plan tiers. Past five or six slices the wedges stop being comparable — `Bar Chart` with `horizontal` stays readable where a pie does not, and `Stacked Bar` is the better shape when several wholes must be compared to each other.",
      "A pie is coloured per slice rather than per series, so `nameKey` names the row field holding the slice name, and that name is the key into `config` — it is what the tooltip and legend look their labels up by too. A slice whose name is not a `config` key renders a swatch and no text.",
    ],
    examples: [
      {
        demo: "pie-chart/basic",
        title: "Share of traffic",
        description:
          "`valueKey` and `nameKey` are the two row fields the chart needs. The `config` entries carry only labels, so the slices take the `--ds-chart-*` ramp in row order.",
      },
      {
        demo: "pie-chart/branded",
        title: "Named colours",
        description:
          "A `config` entry that carries a colour wins over the ramp, and the legend swatch follows it — the colour is declared once and reaches the slice, the tooltip and the legend together.",
      },
      {
        demo: "pie-chart/compact",
        title: "With a figure list",
        description:
          "`legend={false}` when the numbers are already spelled out beside the chart. A pie is poor at conveying exact values, so pairing it with the list is usually better than making the pie carry both jobs.",
      },
    ],
  },
  {
    slug: "donut-chart",
    name: "Donut Chart",
    category: "Data display",
    description:
      "`Pie Chart` with the middle cut out, and a figure in the hole.",
    intro: [
      "Donut Chart is a pie whose hole earns its keep: the total, or the one number the split is about, sits in the middle where a pie wastes space. Reach for it over `Pie Chart` whenever there is a headline figure to show. For a single bounded value with no split at all, `Gauge` is the dial that does only that.",
      "`thickness` is a percentage of the chart radius rather than v1's pixels, because the container is responsive and a fixed ring would not scale with it. The centre text follows `Gauge`: a title-voiced figure with an uppercase faint caption below it.",
    ],
    examples: [
      {
        demo: "donut-chart/basic",
        title: "Total in the middle",
        description:
          "`centerLabel` and `centerCaption` are the reason to pick a donut over a pie. Neither is computed — the total is yours to pass, because the interesting figure is not always the sum.",
      },
      {
        demo: "donut-chart/thin",
        title: "Two-part ring",
        description:
          "A thin ring reads as a progress dial rather than a breakdown, which is what a used-against-free split wants. `legend={false}` because the centre already names both halves.",
      },
      {
        demo: "donut-chart/breakdown",
        title: "Cost breakdown",
        description:
          "Five segments is about the ceiling before the small slices stop being distinguishable. The ramp repeats past six entries, so a longer breakdown wants explicit colours or a different chart.",
      },
    ],
  },
  {
    slug: "radar-chart",
    name: "Radar Chart",
    category: "Data display",
    description:
      "A spider chart — how two or three entities compare across many dimensions at once.",
    intro: [
      "Radar Chart answers how a small number of entities compare across many dimensions: a product's capability profile, a candidate against a role's requirements, plan A against plan B. Each spoke is a dimension and each closed polygon is one entity. When there is only one dimension to compare on, `Bar Chart` says it more precisely; when the dimensions are a sequence rather than a set, `Line Chart` is the honest read.",
      "The data is transposed against every other wrapper here and it is the thing to get right: `data` rows are the spokes and `config` keys are the polygons, so a two-product five-capability chart is five rows of two fields. Pin `domain` whenever two charts sit side by side — left off, recharts refits the radius to each chart's own data and the two stop being comparable.",
    ],
    examples: [
      {
        demo: "radar-chart/basic",
        title: "One profile",
        description:
          "A single polygon across five capabilities. `domain` is pinned to 0–100 so the shape means the same thing on every render, not just relative to its own maximum.",
      },
      {
        demo: "radar-chart/overlaid",
        title: "Candidate against requirement",
        description:
          "Two polygons is where the form earns its keep — the gaps read as area. `radiusAxis` prints the radius ticks, which is worth the noise on a five-point scale where the exact level matters.",
      },
      {
        demo: "radar-chart/pinned",
        title: "Two regions compared",
        description:
          "The same `domain` on both charts is what makes them comparable. Without it each would fill its own box and Europe's 38% organic would look the same size as North America's 34% paid.",
      },
      {
        demo: "radar-chart/dense",
        title: "Dense dimensions",
        description:
          "Twelve spokes, where the form starts to break down: the outline still reads as a silhouette but no individual value is recoverable. `grid={false}` drops the rules that were only adding ink at this density.",
      },
    ],
  },
  {
    slug: "combo-chart",
    name: "Combo Chart",
    category: "Data display",
    description:
      "Bars and a line on one x axis, with a second Y scale — the volume-plus-rate dashboard shape.",
    intro: [
      "Combo Chart relates a volume series and a rate series over the same x axis: revenue bars with a margin-percent line, signups with a conversion rate, tickets opened with median resolution time. It is the most common business-dashboard shape and the one `Bar Chart` and `Line Chart` cannot cover between them, because they cannot share an axis. When both series are the same kind of quantity, stay with the single-mark wrapper.",
      "`series` is the one place a chart wrapper here takes an array, because which mark a series draws as cannot be inferred from `config` — and because marks are layered back to front, which the component sorts for you so a line never hides under a bar. `rightAxis` is the second scale; omit it and every series falls back to the left one, which is the right degrade rather than an error.",
    ],
    examples: [
      {
        demo: "combo-chart/revenue-margin",
        title: "Revenue against margin",
        description:
          'The canonical case: euros as bars on the left scale, a percentage as a line on the right. `axis: "right"` is what binds the line to the second scale — half-specifying it would silently put both series back on one.',
      },
      {
        demo: "combo-chart/volume-rate",
        title: "Volume against rate",
        description:
          "An area for the volume rather than bars, which reads better when the series is continuous. `rightAxis.label` captions the second scale, and without it a reader has no way to know which axis the line belongs to.",
      },
      {
        demo: "combo-chart/same-scale",
        title: "Same scale",
        description:
          "No `rightAxis`, so no second axis renders and both series are measured on the left one. This is the right shape when the two are the same unit — booked days against delivered days — and a dual axis would imply a difference that is not there.",
      },
      {
        demo: "combo-chart/formatted-axis",
        title: "Formatted second axis",
        description:
          "`rightAxis.tickFormatter` reaches the second axis' ticks, here turning stored milliseconds into hours. The underlying values stay raw, so the tooltip and any sorting still work on numbers.",
      },
    ],
  },
  {
    slug: "funnel-chart",
    name: "Funnel Chart",
    category: "Data display",
    description:
      "Ordered conversion stages with the drop-off derived for you from raw counts.",
    intro: [
      "Funnel Chart shows where people leave an ordered sequence: visit to signup to activation to paid, or lead to demo to proposal to close. The value of the form is the drop rather than the absolute widths, which is why `conversion` exists — the caller passes raw counts and the percentage beside each stage is computed. For unordered parts of a whole, `Pie Chart` or `Stacked Bar`; for a count per category with no sequence, `Bar Chart`.",
      'Rows are used in the order given and are never sorted, because the caller\'s order is the funnel\'s order. `conversion="previous"` is the stage-over-stage drop and leaves the first stage blank, `"first"` is cumulative from the top and starts at 100%. There is no horizontal layout: recharts computes its trapezoids from a fixed vertical stack, so long stage names are handled by widening `margin.right` instead.',
    ],
    examples: [
      {
        demo: "funnel-chart/signup",
        title: "Signup funnel",
        description:
          "Stage-over-stage drop, the default. Each percentage on the left is that stage against the one above it, so 26% is the visit-to-signup step rather than a share of the whole.",
      },
      {
        demo: "funnel-chart/pipeline",
        title: "Sales pipeline",
        description:
          '`conversion="first"` reads every stage against the top of the funnel instead, which is the number a pipeline is usually managed on. `config` is keyed by stage name, so one stage can be recoloured without touching the rest.',
      },
      {
        demo: "funnel-chart/long-labels",
        title: "Long stage names",
        description:
          "Labels are drawn in the right margin, so a wider `margin.right` is what makes room for them. They sit outside the trapezoids on purpose — no single text colour clears AA against every slice in the ramp.",
      },
      {
        demo: "funnel-chart/two-stage",
        title: "Two stages",
        description:
          "The degenerate case, which has to not look broken: two trapezoids and one percentage. A short `className` height keeps it proportionate instead of stretching two bands over a full chart.",
      },
    ],
  },
  {
    slug: "scatter-chart",
    name: "Scatter Chart",
    category: "Data display",
    description:
      "Quantity against quantity, with optional bubble sizing for a third variable.",
    intro: [
      "Scatter Chart answers whether two quantities correlate and where the outliers sit: price against rating, page weight against bounce rate, tenure against output. It is the only chart in the set that plots a quantity against another quantity rather than against a category or a date, which is what makes it the wrong reach for anything over time — that is `Line Chart`.",
      "Both axes are pinned to a numeric scale by the component. recharts defaults its x axis to categories, which spaces the points evenly and quietly collapses a scatter into columns, so this is not a knob. `groupKey` splits one flat array into separately-coloured groups, and `sizeKey` wires a third field through the area of each mark — area rather than radius, because that is what the eye reads as magnitude.",
    ],
    examples: [
      {
        demo: "scatter-chart/correlation",
        title: "Correlation with a threshold",
        description:
          "One group, and `xLabel`/`yLabel` doing work a time series does not need — an unlabelled scatter is unreadable. The `ReferenceLine` child is the escape hatch for the alert level the points are read against.",
      },
      {
        demo: "scatter-chart/groups",
        title: "Two groups separated",
        description:
          "`groupKey` names the row field that says which `config` entry a row belongs to, so one flat array becomes two coloured clouds. The separation is the finding here, not any individual point.",
      },
      {
        demo: "scatter-chart/bubble",
        title: "Bubble sizing",
        description:
          "`sizeKey` adds a third variable as the mark's area. Ireland's GDP outlier reads as an outlier partly because its bubble is small — the size is carrying the population that explains it.",
      },
      {
        demo: "scatter-chart/dense",
        title: "Hundreds of points",
        description:
          "320 marks at a partial fill opacity, so overlap reads as density rather than as a solid block. `grid={false}` removes rules that stop helping once the cloud fills the box.",
      },
    ],
  },
  {
    slug: "treemap",
    name: "Treemap",
    category: "Data display",
    description:
      "A weighted hierarchy as nested areas — where a pie stops working and a bar chart runs out of room.",
    intro: [
      "Treemap shows how a weighted hierarchy divides up: cloud spend by service, storage by team then by project, bundle size by module. A pie stops working past six or seven slices; a treemap keeps reading into the dozens and gets a second level for free. This is not `Tree`, which is a navigation control for a file or category hierarchy — the two share nothing but a prefix.",
      "Two levels is the ceiling and deliberately so: at three the tiles have nowhere to put a label and the form stops informing. Tiles are drawn as a wash of their hue rather than a solid fill, which is what lets the label sit on something close to the page background and clear AA in both themes; a child tile takes its parent's hue dimmed a step, so a group reads as a group.",
    ],
    examples: [
      {
        demo: "treemap/spend",
        title: "Flat spend by service",
        description:
          "Ten services in one level, which is already past where a pie would hold up. `formatValue` prints the figure under each label; the raw values stay numbers so the tiling is still weighted correctly.",
      },
      {
        demo: "treemap/two-level",
        title: "Team then project",
        description:
          "Nesting `children` groups the tiles and tints each child off its parent's hue. A group's own tile contributes only the frame, since its area is entirely covered by its children — the legend beside the chart is composed by the caller.",
      },
      {
        demo: "treemap/long-tail",
        title: "One dominant part",
        description:
          "Where a treemap beats a pie outright: `react-dom` at 63% and seven packages under 3% each. The small tiles stay visible as tiles rather than becoming unclickable slivers of a circle.",
      },
      {
        demo: "treemap/small-tiles",
        title: "Small tiles",
        description:
          "Eighteen entries, where the labels suppress themselves rather than overflow. Suppression is measured against each tile's rendered width and height, so it responds to the container rather than to the number of rows.",
      },
    ],
  },
  {
    slug: "waterfall-chart",
    name: "Waterfall Chart",
    category: "Data display",
    description:
      "Signed deltas accumulating to a total — the bridge a bar chart and a line chart each tell half of.",
    intro: [
      "Waterfall Chart shows how signed deltas accumulate from a starting value to an ending one: opening ARR through new, expansion, contraction and churn to closing ARR; budget to actuals through each variance; headcount quarter over quarter. A bar chart shows the deltas but hides the running total, and a line shows the total but hides what moved it. recharts has no waterfall primitive, so this is a composed chart with a transparent offset series carrying the running base.",
      "The caller passes raw signed values and never a base — working those out is the component. `totalKeys` names the rows that restate the total rather than move it, and without it the closing bar stacks on the running figure and floats at roughly twice its true height. Colour is semantic rather than a series ramp: rises take the success tone, falls the danger tone, and totals a neutral slot. The running total is assumed to stay at or above zero.",
    ],
    examples: [
      {
        demo: "waterfall-chart/arr-bridge",
        title: "ARR bridge",
        description:
          "The canonical shape: two totals bracketing four deltas. The connectors are what make it read as a bridge rather than as six unrelated bars, and the tooltip carries the signed change and the running figure — never the internal offset.",
      },
      {
        demo: "waterfall-chart/budget-variance",
        title: "Budget variance",
        description:
          "Ends below where it started, with rises and falls interleaved. The tones are doing the reading here, so the closing total needs no annotation to say the budget was underspent.",
      },
      {
        demo: "waterfall-chart/accumulation",
        title: "All positive",
        description:
          "No totals and no falls — a pure accumulation, which is a stacked bar unrolled along an axis. `connectors={false}` because with every step rising the staircase is already unambiguous.",
      },
      {
        demo: "waterfall-chart/subtotal",
        title: "Mid-sequence subtotals",
        description:
          "Three entries in `totalKeys`, so Q2 restates the running figure in the middle of the sequence and the deltas after it stack on that instead of on the arithmetic before it.",
      },
    ],
  },
  {
    slug: "heatmap",
    name: "Heatmap",
    category: "Data display",
    description:
      "Density across two axes as colour — CSS grid, not a chart library, and the only form here that encodes magnitude without position.",
    intro: [
      "Heatmap shows where density concentrates across two axes: activity per weekday-by-hour, errors per service-by-day, a year of contributions. It is the only form in the set that encodes magnitude as colour rather than position, which is what lets it scale to hundreds of cells where a bar chart cannot — and also what makes it the wrong reach when an exact value matters. It is plain CSS grid and divs; recharts has no heatmap primitive and the shape is a grid of coloured rectangles, which is what CSS grid already is.",
      "`layout` chooses between two forms: a sparse `{ x, y, value }` grid where a missing pair renders empty rather than as zero, and a `{ date, value }` calendar whose week columns and weekday rows are derived from the range. The ramp is five quantised steps off one hue from `--ds-heat-1` to `--ds-heat-5`, not the categorical `--ds-chart-*` ramp — reading a categorical ramp as a scale is the classic dataviz error. Pin `scale.max` whenever two heatmaps are meant to compare. Because colour is the only encoding, every cell carries its own accessible name with both axes and its value.",
    ],
    examples: [
      {
        demo: "heatmap/activity",
        title: "Weekday by hour",
        description:
          "168 cells, which is the density this form exists for. `formatValue` reaches the accessible name on every cell, so the value is available to a screen reader and on hover without a single focusable trigger.",
      },
      {
        demo: "heatmap/calendar",
        title: "Contribution calendar",
        description:
          'layout="calendar" derives the week columns from the date range, so the caller passes dates and never a week index. Month labels appear where the month changes and weekdays are labelled every other row, which is what keeps a year legible at 12px cells.',
      },
      {
        demo: "heatmap/sparse",
        title: "Sparse grid",
        description:
          "Missing pairs render as an unfilled ring while a present zero takes the lowest step — the distinction matters, and it is visible. `emptyLabel` is what a missing cell announces.",
      },
      {
        demo: "heatmap/pinned",
        title: "Pinned scale",
        description:
          "The same `scale.max` on both grids is what makes them comparable. Left off, each would scale to its own maximum and last week's quiet load would look exactly as busy as this week's.",
      },
    ],
  },
  {
    slug: "bullet-chart",
    name: "Bullet Chart",
    category: "Data display",
    description:
      "An actual against its target and qualitative bands — what `meter`, `gauge` and `progress` cannot say.",
    intro: [
      "Bullet Chart is Stephen Few's bullet graph: one measure bar, one target tick across it, and two or three background bands. Reach for it when the reading is not just where a value sits in a range but how it sits against a target — 68% of quota, target 80%, bands poor/ok/good. `meter`, `gauge` and `progress` all answer the first question; none of them can express a target or comparison bands, and that gap is why this exists.",
      "It is sized to sit inside a `stat-card` or a table cell, and the primary use is a stack of them. That is why the label and figure columns are fixed widths driven by `--bullet-label` and `--bullet-value` rather than sized to their content — intrinsic columns would leave every row in a stack starting at a different x. Band fills are surface tints rather than a tone ink at reduced opacity, and the target goes into the spoken value as well as the geometry, because it is invisible to a screen reader otherwise.",
    ],
    examples: [
      {
        demo: "bullet-chart/quota",
        title: "Quota with bands",
        description:
          "Three toned bands behind the measure, with the target tick at 85%. The bands are what turn 68 from a number into a judgement — it is in the warning range and short of target.",
      },
      {
        demo: "bullet-chart/stack",
        title: "A stack of KPIs",
        description:
          "Four bullets in a card, all on different scales and all aligned. `[--bullet-label:8rem]` on the container retunes the label column for every row at once rather than per instance.",
      },
      {
        demo: "bullet-chart/in-table",
        title: "In a table cell",
        description:
          "Collapsing `--bullet-label` to zero drops the label column when the table's own column already names the row. `aria-label` then supplies the accessible name, since there is no visible label left to derive one from.",
      },
      {
        demo: "bullet-chart/no-target",
        title: "No target",
        description:
          "Omit `target` and no tick renders — the component degrades to a banded meter rather than inventing a goal. The default three-band neutral ramp is still drawn, so the bar has something to be read against.",
      },
    ],
  },
  {
    slug: "card",
    name: "Card",
    category: "Data display",
    description:
      "A bordered surface with header, content and footer slots — the default container for grouped content.",
    intro: [
      "Card is the default container for something that reads as its own object: a record on an index, a tile on a dashboard, a summary you could drag elsewhere and still understand. When the region belongs to the page rather than sitting on it, `Panel` is the flat sibling with the same header, content and footer skeleton.",
      'The root owns `--card-spacing` and every part reads it for padding, so `size="sm"` retunes the whole card from one place. Rules are opt-in the same way Panel\'s are: the header and footer only take their inner padding once you add `.border-b` or `.border-t`. The root is also `overflow-hidden`, which is what lets a first-child image sit flush against the edges.',
    ],
    examples: [
      {
        demo: "card/basic",
        title: "Basic",
        description:
          "Title, description, content — the minimum useful card. No rules are drawn: the header only takes its bottom padding when you add `.border-b`, so an undivided card is spaced by the root's gap alone.",
      },
      {
        demo: "card/with-action",
        title: "With header action",
        description:
          "`CardAction` is positioned by the header grid, so it stays top-right without absolute positioning. The header grows that second column only when an action is present, which is why a card without one needs no change.",
      },
      {
        demo: "card/stat",
        title: "Stat card",
        description:
          "The dashboard tile built from Card's own slots: description as the label, title as the figure. Titles use the Ufficio heading face; figures use tabular digits. Reach for `Stat Card` once the tile also wants a delta or a sparkline.",
      },
      {
        demo: "card/media",
        title: "With cover media",
        description:
          "An `img` as the Card's direct first child bleeds to the edges: the root drops its own top padding for exactly that case and clips the image to the border. Wrap the image in a div and it becomes ordinary content again, padding and all.",
      },
      {
        demo: "card/with-chart",
        title: "With a chart",
        description:
          "`CardContent` is horizontal padding and nothing else — no height, no gap — so the `ChartContainer` brings its own `h-40 w-full`. Left to itself the chart's `aspect-video` would decide how tall the card is.",
      },
    ],
    parts: {
      Card: "Owns `--card-spacing`, which every part reads for its padding, and `size` is the one knob that rewrites it. `overflow-hidden` is deliberate: it lets a first-child image reach the edges and keeps anything else from escaping them.",
      CardHeader:
        "A grid rather than a stack — it grows a second column when a `CardAction` is present and a second row when a `CardDescription` is, so neither needs a wrapper. Bottom padding is keyed off `.border-b`.",
      CardTitle:
        "Type styles only: heading face, uppercase, tracked out, with no padding and no heading element of its own. Add an `h2` or `h3` when the level matters to the page outline.",
      CardDescription:
        "Its presence is what grows the header's second row — the rule is a `:has()` on its `data-slot`, so the description can sit inside a wrapper and the row still appears.",
      CardAction:
        "Placed by the header grid at row 1, column 2 — top-right with no absolute positioning, and nothing outside a `CardHeader`.",
      CardContent:
        "Horizontal padding and nothing else. It sets no height and no gap, so a chart, a list or a form brings its own.",
      CardFooter:
        "A flex row mirroring the header: top padding is keyed off `.border-t`. Items are start-aligned, so a pair of buttons that belong at the end needs `justify-end`.",
    },
  },
  {
    slug: "badge",
    name: "Badge",
    category: "Data display",
    description: "A compact status or category label.",
    intro: [
      "Badge is the typographic state label: uppercase, letterspaced and boxless. Reach for it when one word of state has to sit inside something that already has a boundary — the status column of a row, a suffix after a heading, a qualifier in running text. `Tag` is the boxed, tinted version for when the label should read as an object you can scan a column of, and `Status` is the dot-and-word pair.",
      "It contributes no fill, border or padding of its own, so `variant` is a colour axis only and a badge takes exactly the width of its text. It renders a `span` by default and any element through `render`, which is what the `link` variant exists for.",
    ],
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
    intro: [
      "Avatar is the identity marker: a round image with initials waiting behind it. Reach for it wherever a person or an account has to be recognisable at a glance — a comment header, an assignee cell, a member list. It renders no name of its own, so keep the name in the markup beside it unless the avatar is purely decorative.",
      "`size` sets `data-size` on the root rather than styling the children directly, so `AvatarBadge` and `AvatarGroupCount` size themselves from the avatar they belong to. A group is scaled by sizing its avatars; the group itself takes no size.",
    ],
    examples: [
      {
        demo: "avatar/basic",
        title: "Basic",
        description:
          "The fallback shows until the image resolves and stays if it fails, so initials are the default rather than a broken-image icon. The portrait is inlined as a data URI so the demo needs no network — any `src` behaves the same.",
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
      {
        demo: "avatar/in-row",
        title: "In a member list",
        description:
          "Where avatars usually sit: leading a row, inside `ItemMedia`, with the name beside them. The online dot is decoration only — the row says `online` in words too, so the state does not depend on colour.",
      },
    ],
    parts: {
      Avatar:
        "Sets `data-size`, which every other part reads — a part rendered outside an Avatar falls back to its own default. The border is an `::after` overlay in `mix-blend-darken`, so it darkens a photo's own edge instead of drawing a ring over it.",
      AvatarImage:
        "Base UI keeps it unmounted until the image loads, and removes it again if the load fails — which is why the fallback is not conditional. Render both, always.",
      AvatarBadge:
        "Positioned absolutely against the root, so it has to be a child of Avatar. It takes no size of its own and drops its icon at `sm`, where a glyph would be unreadable.",
      AvatarGroup:
        "Overlaps its children and rings each one in the background colour; the ring is what separates them, so a group on a tinted surface needs that ring recoloured.",
      AvatarGroupCount:
        "A counter, not an Avatar. It matches the group's size through `group-has-data-*`, so it follows whatever size the avatars were given.",
    },
  },
  {
    slug: "item",
    name: "Item",
    category: "Data display",
    description:
      "A list row with media, content and actions slots — lighter than a Card for repeated rows.",
    intro: [
      "Item is the repeated row: media, content and actions in one horizontal band, at three densities. Reach for it for lists of files, members, settings or results — anywhere the same shape repeats and a `Card` per row would be too much furniture. A region that owns the page rather than repeating inside it is still a `Card`.",
      'ItemGroup is deliberately not a `role="list"`: a list may own only `listitem` children, and Item is polymorphic, so the group cannot assert that role for rows whose element it does not control — asserting it anyway is what produced a critical `aria-required-children` finding in axe. When list semantics matter, own the markup: `role="list"` on the group and `role="listitem"` on each row.',
    ],
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
      {
        demo: "item/as-link",
        title: "Navigable rows",
        description:
          "`render` swaps the row's `div` for an anchor, which is what switches on the hover wash and the focus ring — both are keyed off the rendered element being an `a`, not off a prop.",
      },
    ],
    parts: {
      ItemGroup:
        'A generic container, not a `role="list"` — it cannot vouch for what its polymorphic children render, so the roles are yours to write. It does tighten its own gap when it holds `sm` or `xs` rows, so density follows the items with no matching prop here.',
      Item: "Polymorphic through `render`. The hover wash and the focus ring are keyed off the rendered element being an anchor, so a plain `div` row stays inert.",
      ItemMedia:
        "Top-aligns itself once the row has an `ItemDescription`, keeping icon and title on one line however long the description runs. The `image` variant is the one that sizes and crops.",
      ItemContent:
        "Takes the free space; a second `ItemContent` in the same row goes `flex-none`, which is how a trailing meta column keeps its natural width.",
      ItemTitle:
        "Uppercase and `line-clamp-1` — a row label, not a heading, so a long name truncates instead of wrapping. Pass your own heading element when the level matters.",
      ItemHeader:
        "`basis-full`, so it takes its own line inside the row's flex wrap — that is what lets one row carry a header above its content.",
      ItemFooter: "Mirrors the header: `basis-full` and `justify-between`.",
      ItemSeparator:
        "For inside a row, between header and footer. The space between rows comes from the gap on `ItemGroup` instead.",
    },
  },
  {
    slug: "marker",
    name: "Marker",
    category: "Data display",
    description: "A small inline badge pairing an icon with a label.",
    intro: [
      "Marker is the caption above a group: uppercase, muted, full-width, optionally with a glyph. Reach for it to title a stack of rows, label a section of a form, or divide a feed by day — the small typographic heading that is not a heading element. `Badge` is the inline word of state; `Separator` is the rule with no label.",
      "The root is `w-full`, so a marker captions whatever follows rather than sitting inline, and the `separator` variant draws its two rules as `::before` and `::after` on that root — the label centres between them with no wrapper markup. Use `render` when the caption should be a real heading element.",
    ],
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
      {
        demo: "marker/section-labels",
        title: "Section labels",
        description:
          "The `border` variant as the title of a settings group: the rule spans the full row, so it reads as the section boundary and the group needs no `Separator` of its own.",
      },
      {
        demo: "marker/day-divider",
        title: "Dividing a feed",
        description:
          "The `separator` variant between groups of a feed. Its rules flex into whatever the label leaves, so one marker centres a short day and a long date alike.",
      },
    ],
    parts: {
      Marker:
        "`w-full`, and the owner of the pseudo-element rules the `separator` variant draws — the label only centres while the marker has its own line.",
      MarkerIcon:
        "`aria-hidden` and fixed at `size-4`: decoration. Whatever it means has to be in MarkerContent as well.",
      MarkerContent:
        "Goes `flex-none` under the `separator` variant so the rules take the remaining width, and wraps rather than truncating.",
    },
  },
  {
    slug: "meter",
    name: "Meter",
    category: "Data display",
    description:
      "Displays a measured value within a known range — capacity, not task progress.",
    intro: [
      "Meter shows how full something is: disk used, budget consumed, seats taken. Reach for it when the value measures a fixed capacity and can move either way — work advancing towards done is `Progress`, and a single figure that deserves a dial of its own is `Gauge`.",
      "`Meter` renders its own `MeterTrack` and `MeterIndicator` after whatever children you pass, so children are the label and the value only; writing a track yourself draws a second bar. With no `format`, the value reads as its percentage of the `min`–`max` range — pass a `format`, or a function child on `MeterValue`, when the readout should be the raw figure instead.",
    ],
    examples: [
      {
        demo: "meter/basic",
        title: "Basic",
        description:
          "`format` takes `Intl.NumberFormatOptions` and applies to `MeterValue`, which is what makes the second row read `128 GB` instead of the `50%` of its range it would print by default.",
      },
      {
        demo: "meter/thresholds",
        title: "Colour by threshold",
        description:
          "Because the indicator is internal, per-row colour is a descendant selector on the root rather than a prop.",
      },
      {
        demo: "meter/plan-usage",
        title: "In a panel",
        description:
          "Where capacity readouts usually live: a plan summary with the action under it. Both rows pass a function child to `MeterValue`, which receives the formatted string and the raw number — the way to write `34 of 50 used` where the default would read `68%`.",
      },
    ],
    parts: {
      Meter:
        "Renders the track and the indicator itself, after your children, and owns `format` — pass only a label and a value unless you want two bars.",
      MeterTrack:
        "Rendered for you. Restyle the bar through a descendant selector on the root rather than by adding a second track.",
      MeterIndicator:
        "Also internal, and Base UI sets its width inline, so colour is the one thing left to change from outside — which is why thresholds are a selector on the root.",
      MeterLabel:
        "Registers itself as the meter's accessible name, so a meter without one needs an `aria-label` on the root.",
      MeterValue:
        "`aria-hidden`: the root already announces the value through `aria-valuetext`, so this is the sighted readout only. A function child receives the formatted string and the raw number.",
    },
  },
  {
    slug: "progress",
    name: "Progress",
    category: "Data display",
    description: "Task completion, with optional label and value slots.",
    intro: [
      "Progress reports work advancing towards done: an upload, an import, an indexing pass. Reach for it when the value only moves one way and completion is the point — a measurement of capacity that can fall again is `Meter`, and work whose extent is unknown and unmeasured is `Spinner`.",
      "`value={null}` is the indeterminate state, and it is the default — distinct from `0`, which means started with nothing done. The root reflects that state as `data-indeterminate`, `data-progressing` or `data-complete`, so a finished bar restyles itself off an attribute instead of the caller comparing `value` to `max`.",
    ],
    examples: [
      {
        demo: "progress/basic",
        title: "Basic",
        description:
          "`Progress` renders its own track and indicator, so children are the label and value only. `format` takes `Intl.NumberFormatOptions`, which is what turns the 0–1 ratio into a percentage — without it the value prints as `value` divided by 100 regardless of `max`, unlike Meter, which reads its range.",
      },
      {
        demo: "progress/indeterminate",
        title: "Indeterminate",
        description:
          "`value={null}` means unknown — distinct from `0`, which means started but nothing done. A plain `ProgressValue` renders nothing while indeterminate; a function child is handed the literal string `indeterminate` instead.",
      },
      {
        demo: "progress/upload-queue",
        title: "Upload queue",
        description:
          "Several tasks in one list, with the finished bar recoloured off the root's `data-complete` attribute rather than a comparison at the call site. The function child on `ProgressValue` is what lets the completed row read `Done` instead of `100%`.",
      },
    ],
    parts: {
      Progress:
        "Renders the track and the indicator itself, after your children, and carries `data-indeterminate`, `data-progressing` or `data-complete` — style completion off the attribute.",
      ProgressTrack:
        "Rendered for you. Restyle the bar through a descendant selector on the root rather than by adding a second track.",
      ProgressIndicator:
        "Also internal, and Base UI sets its width inline, so colour is the one thing left to change from outside.",
      ProgressLabel:
        "Registers itself as the bar's accessible name, so a bar without one needs an `aria-label` on the root.",
      ProgressValue:
        "`aria-hidden`: the root already announces the value through `aria-valuetext`. It renders nothing while `value` is `null` unless you pass a function child.",
    },
  },
  {
    slug: "skeleton",
    name: "Skeleton",
    category: "Data display",
    description: "A placeholder block for content that has not loaded.",
    intro: [
      "Skeleton is one pulsing block; a placeholder is several of them arranged like the content that will replace them. Reach for it when the shape of what is arriving is already known — a row, a card, a table body — so the layout holds its place and nothing jumps when the data lands. When the shape is unknown, or the wait belongs to one action rather than a region, that is `Spinner`.",
      'It contributes the pulse and the muted fill and nothing else, so `className` is the whole API and a Skeleton with no height renders nothing at all. It carries no ARIA either: the announcement belongs to the region around it, as `aria-busy` or a single `role="status"` line.',
    ],
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
      {
        demo: "skeleton/table-rows",
        title: "Table body",
        description:
          "The header stays real and only the cells are placeholders, so the columns are already sized when the rows arrive. Bar widths come from the column list rather than being uniform, which is what stops the block reading as a grid of identical dashes.",
      },
      {
        demo: "skeleton/announced",
        title: "Announcing the wait",
        description:
          'Skeleton has no ARIA of its own: `aria-busy` on the region plus one `role="status"` line says what is loading, and the bars go `aria-hidden` so a screen reader never walks a wall of empty divs.',
      },
    ],
  },
  {
    slug: "spinner",
    name: "Spinner",
    category: "Data display",
    description:
      "An indeterminate loading indicator, sized to the current text.",
    intro: [
      "Spinner is the indeterminate wait: a rotating mark sized to the text beside it, for when there is no honest way to say how long or how far along. Reach for it inside a button that has been pressed, on a row refreshing in place, or in a region with no shape to build a placeholder from. When the shape of the arriving content is known, `Skeleton` holds the layout instead of covering it.",
      'It is a bare `svg` carrying `role="status"`, so it announces itself with no wrapper, and it paints in `currentColor`, so it takes the colour of the text around it. `label` is the accessible name and defaults to "Loading" — right for a page, wrong for the third spinner in a list, which is why it is a prop rather than a constant. `className` retunes the `size-4` default.',
    ],
    examples: [
      {
        demo: "spinner/basic",
        title: "Sizes",
        description:
          'It ships with `role="status"` and a default `label` of "Loading", so it is announced without a wrapper.',
      },
      {
        demo: "spinner/labelled",
        title: "Naming each wait",
        description:
          'Three spinners all announcing "Loading" tell a screen reader nothing. `label` names the one job each is waiting on, which is the whole reason it is a prop.',
      },
      {
        demo: "spinner/in-context",
        title: "In buttons and empty states",
        description:
          "Buttons size any `svg` child to `size-3.5`, so a spinner needs no adjustment inside one.",
      },
      {
        demo: "spinner/activity-rows",
        title: "Per-row activity",
        description:
          'One wait per row, so each spinner takes its own `aria-label` — four rows all announcing "Loading" tell a screen-reader user nothing. Settled rows swap to `Status`, whose label carries the outcome without relying on colour.',
      },
      {
        demo: "spinner/deferred",
        title: "Deferred appearance",
        description:
          "A spinner that flashes for 80ms reads as a glitch, so the timer — not the request — decides when it mounts. Only waits long enough to be noticed ever draw one.",
      },
    ],
  },
  {
    slug: "timeline",
    name: "Timeline",
    category: "Data display",
    description:
      "A vertical sequence of events with completed, active and inactive states.",
    intro: [
      "Timeline is an ordered list of moments: an indicator on a rail, a title, and optionally a timestamp and a line of detail. Reach for it when the sequence itself is the information — a process someone is partway through, an audit trail, a shipment's history. When the steps are a form the reader walks through and can navigate, that is `Stepper`.",
      "The rail is a `::before` on each item, hidden on the last, so items can be added or removed without touching it. State is `data-state` on the item — `completed`, `active`, or nothing — and the parts style themselves from there, which is why the indicator takes no state prop of its own. It is vertical only.",
    ],
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
      {
        demo: "timeline/activity-feed",
        title: "Activity feed",
        description:
          'The audit-trail shape: an icon per kind of event rather than a step number, and every entry already past, so no item takes a state. `TimelineTime` is a real `time` element — pass `dateTime` whenever the visible text is written for people, like "09:12".',
      },
      {
        demo: "timeline/in-panel",
        title: "Compact, in a panel",
        description:
          "Density is a `pb-*` override on the item, whose default is `pb-8`. The rail spans `top-6` to the bottom of the item, so it follows the tighter spacing without being retuned.",
      },
    ],
    parts: {
      Timeline:
        "An `ol`, so the reading order is the chronology and the count is announced. It draws nothing itself — the rail belongs to the items.",
      TimelineItem:
        "Takes `data-state`, and draws the rail: a `::before` from `top-6` to the bottom, hidden on `last:`. Both offsets are keyed to the default `size-6` indicator, so resizing the indicator means retuning `before:top-*` and `before:start-*` with it.",
      TimelineIndicator:
        "Reads the item's `data-state` through `group-data-[state=…]`, so it takes no state prop. Fixed `size-6` and `shrink-0` — it is what the rail is aligned to.",
      TimelineTitle:
        "Uppercase tracked label type, and a `div` rather than a heading — add your own element when the level matters.",
      TimelineDescription:
        "Sets `normal-case` explicitly, so detail text stays sentence case even under chrome that uppercases what it contains.",
      TimelineTime:
        "A real `time` element with `tabular-nums`, so a column of timestamps lines up. Give it `dateTime` whenever the visible text is not machine-readable.",
    },
  },
  {
    slug: "tree",
    name: "Tree",
    category: "Data display",
    description:
      "A collapsible hierarchy with semantic tree ARIA roles and icon swapping per state.",
    intro: [
      'Tree is a collapsible hierarchy with the tree roles wired in: `role="tree"` on the root, `treeitem` on every branch and leaf, `group` on each panel. Reach for it for file browsers, nested navigation and any structure whose depth the reader has to see. A single block that hides and shows is `Collapsible`; app navigation is `Sidebar`.',
      "Depth is literal nesting: each branch is its own Base UI Collapsible, so `defaultOpen`, `open`/`onOpenChange` and `disabled` are the branch's props and there is no flattened id/parentId model to keep in sync. What it does not ship is selection — highlighting a row and setting `aria-selected` stay with the caller.",
      "`Treemap` is the near-namesake that answers a different question. This one navigates a hierarchy and cares about names and depth; that one weighs a hierarchy by area and cares about magnitude. They share nothing but a prefix.",
    ],
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
      {
        demo: "tree/expand-collapse",
        title: "Expand and collapse all",
        description:
          "Driven from outside the tree: because open state belongs to each `TreeItem`, one array of open branch names is enough — `open`/`onOpenChange` per branch, no imperative handle.",
      },
      {
        demo: "tree/folder-icons",
        title: "Open and closed folders",
        description:
          "`TreeItemTrigger` exposes `group/tree-item-trigger`, the same group its own caret swaps on, so a pair of folder icons toggling on `group-data-panel-open` needs no state of its own.",
      },
    ],
    parts: {
      Tree: 'Carries `role="tree"` and the row gap, and nothing else: there is no selection model and no roving tabindex, so each trigger is its own tab stop and `aria-selected` is the caller\'s to set.',
      TreeItem:
        "A Base UI Collapsible root rendered as the `li`, which is why `defaultOpen`, `open`/`onOpenChange` and `disabled` sit here rather than on Tree.",
      TreeItemTrigger:
        "Renders both carets itself and swaps them on `data-panel-open` instead of rotating one. It exposes `group/tree-item-trigger`, so your own icons can swap on that same state.",
      TreeItemContent:
        'The `role="group"` panel, and the indent guide: `ms-4 border-s` is drawn here, so nesting a branch inside it is the entire depth mechanism.',
      TreeLeaf:
        "Renders a caret-width spacer before its children so leaf labels line up with branch labels. It is a plain `li`, not a control — rows that respond to clicks are yours to build.",
    },
  },
  {
    slug: "empty",
    name: "Empty",
    category: "Data display",
    description:
      "The empty-state block: media, title, description and an action.",
    intro: [
      "Empty is the centred block a region shows when it has nothing to show: media, a title, a line of explanation, and the way out. One anatomy covers three situations that only differ in wording — a first-run state, a search with no matches, and a request that failed. For a message about the whole page rather than one region, that is `Banner`.",
      'It sets `border-dashed` but no border width, so it is unframed until you add `border` — which is what lets the same block sit flush inside a card that already has edges. It is `flex-1`, so in a flex column it fills the space it is given rather than sizing to its text, and it carries no role: pass `role="status"` when the block replaces content after a load.',
    ],
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
      {
        demo: "empty/failed",
        title: "Failed to load",
        description:
          'The same anatomy saying something went wrong rather than nothing is here, so the action is `Retry` and the description says what to expect. Empty ships no role, so `role="status"` is what makes the swap announced.',
      },
      {
        demo: "empty/in-card",
        title: "Inside a card",
        description:
          "The unframed form: no `border`, since the panel already has edges, and `p-8` in place of the default `p-12`. The padding belongs to the block, so the container passes `px-0` rather than stacking the two.",
      },
    ],
    parts: {
      Empty:
        'Sets `border-dashed` with no border width, so a standalone block needs `border` and one inside a card needs nothing. `flex-1` makes it fill a flex parent, and it carries no role — pass `role="status"` when it replaces loaded content.',
      EmptyHeader:
        "`max-w-sm` on the text column, so a long description wraps to a readable measure instead of the container's width.",
      EmptyMedia:
        '`variant="icon"` is the muted chip and sizes an `svg` child for you; `default` is a bare slot, so an illustration or a larger glyph carries its own size.',
      EmptyTitle:
        "Heading face, uppercase and tracked, but a `div` — add your own heading element when the page needs the level.",
      EmptyDescription:
        "Styles its descendant links, underlined and primary on hover, so the way out can live inside the sentence.",
      EmptyContent:
        "The slot for the way out, with its own `max-w-sm` so buttons stay centred under the text rather than spreading to the block's width.",
    },
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
    intro: [
      "Relative Time turns a timestamp into `3 hours ago` and keeps it advancing while it is mounted. Reach for it in activity feeds, notification lists and updated-at columns, where distance from now is what a reader wants. Past a week it falls back to an absolute date, because `47 days ago` is worse than the date itself.",
      "`date` takes what a row actually holds: a `Date`, epoch milliseconds, or a database string with a space separator, microseconds and a `+02` zone. A stamp carrying no zone counts as local time, so a column storing UTC has to append `Z`. What renders is a real `time` element with the ISO value in `dateTime` and the full local date in `title`, so the exact moment survives hover and copy.",
    ],
    examples: [
      {
        demo: "relative-time/basic",
        title: "Basic",
        description:
          "The thresholds in one list: seconds, minutes, hours and days stay relative, and anything past a week renders as an absolute date instead.",
      },
      {
        demo: "relative-time/static",
        title: "In a table",
        description:
          "Where relative stamps earn their keep: a column of them scans faster than absolute dates. `live={false}` stops the re-render timer, for a snapshot or a server-rendered page that has no need to keep advancing.",
      },
      {
        demo: "relative-time/inputs",
        title: "What a column can hand over",
        description:
          "One instant in the four shapes an API or a database actually returns, all reading identically — plus an unparseable value, which is printed as it arrived under `data-invalid` rather than taking the tree down.",
      },
      {
        demo: "relative-time/locales",
        title: "Other locales",
        description:
          "`locale` goes straight to `Intl.RelativeTimeFormat`, and an invalid tag falls back to the browser instead of throwing. Leaving it unset follows the browser, which is usually what an app wants.",
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
    slug: "sparkline",
    name: "Sparkline",
    category: "Data display",
    description:
      "An inline mini line chart, small and cheap enough to sit in every row of a table.",
    intro: [
      "Sparkline is the trend you read at a glance next to the number it belongs to: a table's per-row history, a stat tile's last eight weeks, a figure with its own shape beside it. It has no axes, no ticks and no tooltip, because at this size none of them would be legible — for a chart meant to be read off, `Line Chart` is the full-size sibling.",
      "It is hand-rolled SVG rather than a `Line Chart` shrunk down, and that is the whole point: one `polyline` per instance, no responsive observer, so a hundred of them in a table cost nothing. The line is `currentColor` until `stroke` names a colour, so a bare sparkline takes the colour of whatever it sits in.",
    ],
    examples: [
      {
        demo: "sparkline/basic",
        title: "Beside a figure",
        description:
          "The default shape: line only, no fill, no dot. Give it an `aria-label` — the fallback reads `Sparkline of 8 values`, which says nothing about what the values are.",
      },
      {
        demo: "sparkline/area",
        title: "Area and end dot",
        description:
          "`fill` adds the area under the line at a low opacity and `showDot` marks the last point, which is the one a reader looks for. `fill` takes `true` to reuse the line colour, or a colour of its own.",
      },
      {
        demo: "sparkline/table",
        title: "Trend column",
        description:
          "The use the component is sized for. Drop `width` and `height` to fit the row rather than scaling with CSS — `preserveAspectRatio` is `none`, so a stretched sparkline distorts its stroke.",
      },
      {
        demo: "sparkline/stat-card",
        title: "Inside a stat card",
        description:
          "`StatCardSpark` is the slot this was built for, and the one place to pass `aria-hidden` instead of a label — the figure above already carries the number, so a second reading of it is noise. `animate` draws the line in once on mount, and stops itself under `prefers-reduced-motion` with the line fully drawn rather than blank.",
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
    intro: [
      "Tabs swaps between panels of one subject without leaving the page — a record's overview, activity and history, or the sections of a settings screen. Reach for it when every panel describes the same thing and only one is worth reading at a time; when the choices are separate destinations, that is navigation, and `Sidebar` or `NavigationMenu` is the component.",
      "`orientation` on the root is the whole layout axis: it writes `data-orientation`, and the list and triggers restyle themselves through `group-data-vertical/tabs:`, so a vertical rail is one prop rather than a second composition. The one cva axis, `variant`, belongs to `TabsList` instead of the root.",
    ],
    examples: [
      {
        demo: "tabs/basic",
        title: "Basic",
        description:
          "The default filled track. Panels are paired to triggers by `value`, not by source order, so `defaultValue` names the tab that opens rather than counting to it.",
      },
      {
        demo: "tabs/vertical",
        title: "Vertical",
        description:
          '`orientation="vertical"` sets `data-orientation`, which the list and triggers style against via `group-data-vertical/tabs:`.',
      },
      {
        demo: "tabs/line",
        title: "Page chrome",
        description:
          '`variant="line"` drops the filled track and marks the active tab with a rule instead — the form for tabs that sit on a page header rather than inside a box. The rule is drawn just outside the list, so it lands on the container\'s own border.',
      },
      {
        demo: "tabs/in-card",
        title: "Inside a card",
        description:
          "Tabs nested in a `Card`, switching between views of the one thing the card is about. The list sizes to its content, so it reads as a control in the card rather than a second header spanning it.",
      },
    ],
    parts: {
      Tabs: "Writes `data-orientation` and flips its own flex direction from it — the list and triggers read it back through `group-data-vertical/tabs:`, so orientation is never set twice.",
      TabsList:
        "Carries the only cva axis (`variant`) and sizes to its content (`w-fit`) — give it a width class of your own when the list has to span the container.",
      TabsTrigger:
        'Uppercase and tracked, so it reads as a control rather than as the panel\'s prose. The active rule is an `after` pseudo-element drawn outside the trigger, and only `variant="line"` reveals it.',
      TabsContent:
        "Takes `flex-1` — under a vertical orientation it fills the space beside the list — and carries no padding of its own, which is why the examples add `pt-4`.",
    },
  },
  {
    slug: "sidebar",
    name: "Sidebar",
    category: "Navigation",
    description:
      "The application shell navigation — collapsible, keyboard-toggleable, with groups, menus and an inset content area.",
    intro: [
      "Sidebar is the shell an application lives in, not a component you drop into a page: `SidebarProvider` wraps both the rail and `SidebarInset`, and the two are siblings under it. Reach for it when navigation persists across every screen — a workspace, a console, a documentation app. For navigation that belongs to one page, `Tabs` or `Toc` is the smaller answer.",
      "The provider owns the open state, writes it to a cookie so it survives a reload, and binds Cmd/Ctrl+B. `collapsible` decides what collapsing means — `offcanvas` slides the rail away, `icon` leaves a rail of icons, `none` pins it open — and only `none` renders below the `md` breakpoint, where the other two hand over to a `Sheet`.",
    ],
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
          '`collapsible="icon"` collapses to a rail of icons. `SidebarTrigger` toggles it; `tooltip` on each button is what keeps the labels reachable once only the icons are left.',
      },
      {
        demo: "sidebar/nested",
        title: "Sub-navigation",
        description:
          "A section with its own children: `SidebarMenuSub` goes inside the parent `SidebarMenuItem`, beside its button rather than under it, and hides itself once the rail collapses to icons. `SidebarMenuBadge` is a sibling of the button for the same reason — it is positioned against the item.",
      },
      {
        demo: "sidebar/shell",
        title: "Full shell",
        description:
          "Header, groups and footer in one rail — the shape a real console ships. `SidebarContent` is the only part that scrolls, so the search box and the account button stay put however long the menu grows.",
      },
    ],
    parts: {
      SidebarProvider:
        "Owns the open state for everything under it: the cookie that survives a reload, the Cmd/Ctrl+B shortcut and the mobile `Sheet` swap all live here, so a Sidebar rendered outside one throws.",
      Sidebar:
        "Below `md` every value of `collapsible` except `none` renders as a `Sheet` instead of a rail — which is also why `none` is the value a bounded demo wants.",
      SidebarInset:
        "The content area, and a sibling of Sidebar rather than a child — the rail is fixed, so the inset is what actually holds the page.",
      SidebarContent:
        "The one scrolling region. Anything that must stay visible belongs in SidebarHeader or SidebarFooter, which sit outside it.",
      SidebarMenuButton:
        "Pass `tooltip` and it wraps itself in a Tooltip that only shows while collapsed — the label is otherwise lost with the text.",
      SidebarMenuSub:
        'Hidden outright under `collapsible="icon"` (`group-data-[collapsible=icon]:hidden`): there is no room for a second level in a rail of icons, so keep the parent reachable on its own.',
    },
  },
  {
    slug: "breadcrumb",
    name: "Breadcrumb",
    category: "Navigation",
    description:
      "The trail to the current page, with the last item as plain text.",
    intro: [
      "Breadcrumb states where the current page sits in a hierarchy and offers the way back up it. Reach for it when a page has ancestors a reader can meaningfully return to — a file inside folders, a record inside a project. A flat app with three top-level screens has no trail to show, and history is what the back button is for.",
      "The trail is an ordered list of links with one exception at the end: `BreadcrumbPage` is the current page, so it renders as plain text carrying `aria-current`, not as a link to where you already are. Links go through Base UI's `render` prop rather than `asChild`, which is how a router's own link component takes over the anchor.",
    ],
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
          "A deep path shortened to its ends. `BreadcrumbEllipsis` stands in for the levels between, and `BreadcrumbSeparator` renders a caret unless given children — pass a character or another icon to change the punctuation.",
      },
      {
        demo: "breadcrumb/overflow-menu",
        title: "Overflow menu",
        description:
          "The same truncation, but the hidden levels stay reachable: the ellipsis becomes a `DropdownMenu` trigger. `BreadcrumbEllipsis` is `aria-hidden`, so the accessible name has to come from the trigger around it.",
      },
    ],
    parts: {
      BreadcrumbLink:
        "Takes Base UI's `render` prop, not `asChild` — pass a router link (`render={<Link to=\"/docs\" />}`) and it renders as that element with the breadcrumb's classes merged in.",
      BreadcrumbPage:
        'Plain text with `aria-current="page"` and `aria-disabled`, since the current page is not somewhere to navigate to. It is the last item, and only ever one.',
      BreadcrumbSeparator:
        "A presentational list item, hidden from the accessibility tree so the trail reads as words rather than punctuation. Give it children to replace the default caret.",
      BreadcrumbEllipsis:
        "Also `aria-hidden`. Wrapping it in a control — a menu trigger — means the label has to be on that control, or the button reads as unnamed.",
    },
  },
  {
    slug: "toc",
    name: "Toc",
    category: "Navigation",
    description:
      "The in-page anchor rail — a sticky list of the sections on the current page.",
    intro: [
      "Toc is the rail that lists the headings of the page you are already on, so a long document can be skimmed and re-entered anywhere. Reach for it for documentation, articles and reference pages — content read in pieces. It navigates within one page, which is what separates it from `Breadcrumb` (where the page sits) and `Sidebar` (where else you can go).",
      "It is presentation only: no scroll-spy, no heading collection, no state. You pass the sections, and you mark the current one with `aria-current` — which means the rail works the same whether the headings come from MDX frontmatter, an intersection observer or a hand-written array. The root is `sticky top-8` by default, so it holds its place while the article scrolls beside it.",
    ],
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
      {
        demo: "toc/page-rail",
        title: "Beside the article",
        description:
          "The placement the component is shaped for: a fixed-width rail next to the prose. This is the one example that keeps the root's default `sticky top-8` — the others pass `static`, since a preview that does not scroll has nothing to stick to.",
      },
    ],
    parts: {
      Toc: "A `<nav>` labelled “On this page”, so it reaches the landmark list without any markup of yours; `TocLabel` is the visible echo of that name, not its source. Sticky by default, which needs a scrolling ancestor to mean anything.",
      TocList:
        "Draws the rail itself (`border-s`) — the continuous line belongs to the list, and each link only borrows the segment beside it.",
      TocItem:
        "`level` writes `data-level`, and the indent is applied by TocLink through `group-data-[level=2]/toc-item:`. Styling depth on the item instead would move the border off the rail.",
      TocLink:
        "Pulls its own border back over the list's with `-ms-px`, so hovering or marking a link lights that segment of the rail rather than drawing a second line beside it.",
    },
  },
  {
    slug: "navigation-menu",
    name: "Navigation Menu",
    category: "Navigation",
    description: "A horizontal site menu with optional rich dropdown panels.",
    intro: [
      "Navigation Menu is the top-level menu of a site header: a row of destinations, some of which open a panel with room for descriptions, groups or a featured link. Reach for it for marketing and documentation chrome. `Menubar` is the desktop-application counterpart with commands rather than destinations, and `DropdownMenu` is the right answer for actions on the page you are on.",
      "The root mounts its own portal, positioner, popup and viewport, so the tree you write is only Root → List → Item — and `align` on the root is forwarded to that positioner rather than set on a part of your own. All the items share the single popup: moving between triggers resizes and slides it, and the content reads `data-activation-direction` to animate away from where the pointer came from.",
    ],
    examples: [
      {
        demo: "navigation-menu/basic",
        title: "Basic",
        description:
          "One panel and one plain link. `navigationMenuTriggerStyle()` is what makes a link with no panel sit level with the triggers beside it.",
      },
      {
        demo: "navigation-menu/multiple",
        title: "Several menus",
        description:
          "Moving between triggers reuses one popup and slides it; the content reads `data-activation-direction` to animate away from where you came from.",
      },
      {
        demo: "navigation-menu/featured",
        title: "Featured panel",
        description:
          "A two-column panel with a promoted destination beside the list. The panel is your own markup — the component supplies the popup and the link styling, so the grid is yours to shape.",
      },
      {
        demo: "navigation-menu/in-header",
        title: "In a site header",
        description:
          "The placement it exists for, between a wordmark and an account action. The root is `max-w-max`, so it takes only the width of its list and the header's own flex layout keeps working around it.",
      },
    ],
    parts: {
      NavigationMenu:
        "Renders the portal, positioner, popup and viewport itself — `align` is a positioner prop passed through here, and NavigationMenuPositioner is not something you mount yourself.",
      NavigationMenuContent:
        "The panel's contents, not the panel: sizing, columns and grids are your markup inside it, and the popup animates to whatever size that comes out.",
      NavigationMenuLink:
        "Styled for inside a panel. For a top-level link with no panel, add `navigationMenuTriggerStyle()` so it matches the triggers on the row.",
      NavigationMenuTrigger:
        "Appends its own caret after the children and rotates it while the panel is open, so a trigger needs no icon of its own.",
    },
  },
  {
    slug: "menubar",
    name: "Menubar",
    category: "Navigation",
    description:
      "A desktop-style application menu bar with keyboard traversal.",
    intro: [
      "Menubar is application chrome: a persistent row of named menus — File, Edit, View — that keeps a dense tool's whole command surface in reach and grouped by noun. Reach for it in editor-shaped views people live inside. One button that reveals a few actions is `Dropdown Menu`, a right-click surface is `Context Menu`, and a searchable flat list of commands is `Command`.",
      "`MenubarMenu` is Dropdown Menu under a different `data-slot`, so the item vocabulary — items, checkbox and radio items, labels, separators, submenus — is that component's, and `MenubarContent` mounts its own portal and positioner. Only the root is new: it is Base UI's menubar, which is what gives the row a single tab stop and hands focus between menus with the arrow keys.",
    ],
    examples: [
      {
        demo: "menubar/basic",
        title: "Basic",
        description:
          "One tab stop for the bar; arrow keys move between menus and an open menu stays open as you travel — the desktop convention.",
      },
      {
        demo: "menubar/sectioned",
        title: "A long menu, sectioned",
        description:
          "Once a menu passes half a dozen entries it needs headings. `MenubarLabel` is a group part — Base UI reads the group context above it, so it goes inside the `MenubarGroup` it names rather than beside it.",
      },
      {
        demo: "menubar/with-state",
        title: "Checkboxes, radios and submenus",
        description:
          "The item vocabulary matches Dropdown Menu, because `MenubarMenu` is that component underneath. Checkable items indent for their indicator, so a plain `MenubarItem` sharing the menu needs `inset` to line up.",
      },
      {
        demo: "menubar/app-frame",
        title: "In an app frame",
        description:
          "Where a menubar belongs: the top edge of a window, not a floating control. The root carries a full border, so a bar seated in a frame trades it for `border-0 border-b`.",
      },
    ],
    parts: {
      Menubar:
        "Base UI's menubar root: it owns the bar's one tab stop and the arrow-key traversal between menus. A `MenubarMenu` outside it still opens, but as an isolated dropdown with a tab stop of its own.",
      MenubarMenu:
        "`DropdownMenu` renamed, so its props are that component's — `open`, `onOpenChange`, `modal`.",
      MenubarContent:
        "Mounts its own portal and positioner, so the tree stops at Menu → Trigger → Content. It takes the trigger's width with a `min-w-48` floor, which is what a short trigger like File actually reads from.",
      MenubarItem:
        "`inset` adds the indicator gutter (`ps-9.5`). Pass it when a plain item shares a menu with checkbox or radio items, or its label sits left of theirs.",
      MenubarLabel:
        "A group part: it registers with the group above it, so a label outside a `MenubarGroup` or `MenubarRadioGroup` throws rather than rendering.",
      MenubarPortal:
        "Only for putting a popup somewhere other than the body — `MenubarContent` already portals, so most trees never name this.",
    },
  },
  {
    slug: "command",
    name: "Command",
    category: "Navigation",
    description: "A searchable command palette, standalone or in a dialog.",
    intro: [
      "Command is the palette: a search field over a list of actions, narrowed as you type and driven entirely from the keyboard. Reach for it for an application's ⌘K surface, or inline wherever a list is long enough that typing beats scrolling. It is not a form control — a searchable field that writes a value is `Combobox` or `Autocomplete`.",
      "It wraps cmdk, so the filtering, the arrow-key selection and the empty state are cmdk's. Each `CommandItem` is scored on its own text plus any `keywords` you give it, matches are reordered by that score, and `CommandEmpty` appears only when nothing survives. `shouldFilter={false}` hands the whole job to your own code, which is how a server-backed search is wired.",
    ],
    examples: [
      {
        demo: "command/basic",
        title: "Inline",
        description:
          "Built on cmdk, so filtering and keyboard selection come free. An item hides its trailing check when it carries a shortcut, so the two never collide.",
      },
      {
        demo: "command/synonyms",
        title: "Matching on synonyms",
        description:
          "`keywords` widens what an item matches without putting the words on screen — typing `invoice` finds Open billing. It is the alternative to smuggling search terms into the label.",
      },
      {
        demo: "command/filter-picker",
        title: "As a filter picker",
        description:
          "Command as a multi-select rather than a launcher: `data-checked` on the item is what reveals the trailing check, and `onSelect` toggles instead of dismissing anything. Note the separator vanishing while you type — cmdk drops it as soon as there is a search term.",
      },
      {
        demo: "command/dialog",
        title: "As a palette",
        description:
          "`CommandDialog` takes Dialog's props but supplies its own content wrapper, sitting a third down the viewport rather than dead centre.",
      },
    ],
    parts: {
      Command:
        "cmdk's root, and the owner of the search state. It only sizes itself — give it the border and width the surface needs, as the dialog's own wrapper does.",
      CommandInput:
        "Wrapped in an `InputGroup` whose only rule is its bottom border, so the list below it needs no separator of its own.",
      CommandList:
        "The scroll container, capped at `max-h-72` with its scrollbar hidden, which is what keeps the input pinned above a long list. Raise the cap here rather than on the root.",
      CommandEmpty:
        "cmdk renders it only when the match count reaches zero, so it needs no state of yours — keep it inside `CommandList` so the message lands where the items were.",
      CommandItem:
        'The trailing check is always in the markup but only opaque at `data-checked="true"`, and it is suppressed outright when the item contains a `CommandShortcut` — both want the same inline-end edge.',
      CommandSeparator:
        "cmdk hides it as soon as there is a search term: groups collapse while filtering, so the rule would divide nothing. `alwaysRender` overrides that.",
      CommandDialog:
        "Brings its own `DialogContent` at `top-1/3` plus an sr-only title and description, so nest a `Command` straight inside it and no Dialog parts of your own. `title` and `description` are what a screen reader hears.",
    },
  },
  {
    slug: "pagination",
    name: "Pagination",
    category: "Navigation",
    description: "Page links with previous, next and ellipsis.",
    intro: [
      "Pagination is the rail under a long list: numbered pages, previous and next, and an ellipsis standing in for the numbers there is no room to show. Reach for it when the results are ordered and someone has to be able to come back to page 7 — invoices, search results, an archive. An endless feed is better with no rail at all than with one nobody can address.",
      'Every entry is a real anchor: `PaginationLink` renders through Button\'s `render` with `nativeButton={false}`, and `isActive` sets both the `outline` variant and `aria-current="page"`. In an SPA, intercept the click and keep the `href` — dropping it costs middle-click, open-in-new-tab and the shareable URL.',
      "The parts draw the rail; they do not decide what is on it. `paginationRange({ page, pageCount, siblingCount })` is the window calculation as a plain function — it returns page numbers and `ellipsis` markers for you to map over, so which pages show is answered in one place instead of in every consumer.",
    ],
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
      {
        demo: "pagination/long-range",
        title: "Long ranges",
        description:
          "Past a dozen pages the rail has to be computed, so `paginationRange` does it: `page` and `pageCount` in, page numbers and `ellipsis` markers out. It keeps a constant width — near an edge the run widens rather than the rail shrinking — and never puts an ellipsis in front of a single hidden page.",
      },
      {
        demo: "pagination/under-a-table",
        title: "Under a table",
        description:
          "Where a rail usually sits: a footer beside the result count. The root is `mx-auto flex w-full justify-center`, so seating it at one end means overriding the centring and the width it takes.",
      },
    ],
    parts: {
      Pagination:
        "Already a `<nav>` labelled `pagination`, so it needs no wrapper of its own — but two rails on one page need distinct `aria-label`s. It is centred and `mx-auto`; both have to go to seat it in a table footer.",
      PaginationContent:
        "A real `<ul>`, so every child belongs in a `PaginationItem` — a link dropped straight in here breaks the list semantics screen readers count from.",
      PaginationLink:
        'Only `size` reaches Button; `variant` is decided by `isActive`, which also sets `aria-current="page"`. Styling the current page by hand instead leaves that announcement out.',
      PaginationPrevious:
        "Its word is hidden below the `sm` breakpoint, leaving the caret alone. The label is the `text` prop rather than children, which is what makes it translatable.",
      PaginationNext:
        "Mirrors Previous, `text` prop included; the caret flips itself under `rtl`.",
      PaginationEllipsis:
        "Decorative — `aria-hidden`, so it announces nothing and is never a target. It stands for skipped pages, not a menu: nothing opens.",
    },
  },
  {
    slug: "stepper",
    name: "Stepper",
    category: "Navigation",
    description:
      "Progress through a multi-step flow, with per-step state and orientation support.",
    intro: [
      "Stepper is the rail across the top of a flow that has been split into screens: the steps, the one you are on, and how much is left. Reach for it when the count is part of the task — checkout, onboarding, a long form worth breaking up. A dated record of what has already happened is `Timeline`; a bare fraction with no names is `Progress`.",
      "It holds no state and knows nothing about your flow: `state` is a prop on each `StepperItem` (`inactive`, `active`, `completed`) and every part below styles itself off it through `group-data-*`. Orientation is the root's alone — the parts read `data-orientation` from it, so horizontal to vertical is one prop and no change to the items.",
    ],
    examples: [
      {
        demo: "stepper/basic",
        title: "Basic",
        description:
          "`state` is a prop on `StepperItem`, and the indicator swaps its number for a check on `completed` by itself.",
      },
      {
        demo: "stepper/wizard",
        title: "In a form wizard",
        description:
          "The shape most steppers ship in: the rail heads the panel, and one index drives both the item states and which fields render. Nothing inside the component tracks that index — `Continue` moves it.",
      },
      {
        demo: "stepper/vertical",
        title: "Vertical",
        description:
          "`StepperSeparator` flips axis off the root's `data-orientation`, so going vertical needs no change to the items.",
      },
      {
        demo: "stepper/icon-indicators",
        title: "Icon indicators",
        description:
          "A glyph instead of a number, for a flow whose steps have identities. `StepperIndicator` hides its children on `completed` and swaps in a check, so the icon reads only while the step is still ahead — design for that rather than around it.",
      },
    ],
    parts: {
      Stepper:
        "Owns `data-orientation` and is `w-full`. Every other part reads the orientation through `group-data-*`, so a separator rendered outside a Stepper is given no axis at all and collapses.",
      StepperItem:
        "Where `state` lives; the indicator and title style off it through `group/stepper-item`, so a part outside an item stays in the inactive look.",
      StepperIndicator:
        "Its children are hidden on `completed` and replaced by a check, so a number or glyph shows only while the step is incomplete.",
      StepperTitle:
        "Uppercased with `tracking-wider`, and a `div` — wrap or render it as a heading when the level matters to the page outline.",
      StepperDescription:
        "Resets `normal-case` against the uppercased title, so sentence-case text under a step reads as prose.",
      StepperSeparator:
        "Belongs inside the item it follows rather than between items, and takes its axis from the root — so drop it on the last item instead of styling it away.",
    },
  },

  /* -- Layout ------------------------------------------------------------ */
  {
    slug: "aspect-ratio",
    name: "Aspect Ratio",
    category: "Layout",
    description: "Constrains content to a fixed width-to-height ratio.",
    intro: [
      "Aspect Ratio holds a box at a fixed shape while its width comes from the layout around it — thumbnails, card covers, video frames, map tiles. Reach for it whenever the height should be derived from the width instead of guessed, so nothing reflows as an image or an embed loads.",
      "`ratio` is written to a `--ratio` custom property that a plain `aspect-(--ratio)` utility consumes, so any number works and there is no list of supported ratios to extend. The box owns the height and is `relative`, which is why children can be `size-full` and why an overlay only needs `absolute` — no extra positioning wrapper.",
    ],
    examples: [
      {
        demo: "aspect-ratio/basic",
        title: "Basic",
        description:
          "`ratio` takes the expression, not a string — `16 / 9` reaches the custom property as `1.7778`, so any number works.",
      },
      {
        demo: "aspect-ratio/ratios",
        title: "Common ratios",
        description:
          "The box owns the height, so children can be `size-full` and stop caring about it. Each tile takes its width from the grid, and the ratio does the rest.",
      },
      {
        demo: "aspect-ratio/card-cover",
        title: "Card cover",
        description:
          "The media shape at the top of a card: `object-cover` on a `size-full` image fills the box whatever the file's own dimensions are, and the text below never shifts while it loads. The card takes `pt-0` because the cover is wrapped rather than a direct `img` child.",
      },
      {
        demo: "aspect-ratio/overlay",
        title: "Overlaid caption",
        description:
          "The root is already `relative`, so a caption band is `absolute inset-x-0 bottom-0` and nothing else. The band is a solid surface rather than a faded one — text over media needs its own background to stay readable.",
      },
    ],
  },
  {
    slug: "separator",
    name: "Separator",
    category: "Layout",
    description:
      "A rule between content. Base UI inverts the orientation semantics — a horizontal group takes vertical separators.",
    intro: [
      "Separator is the rule between things that are already grouped: a heading from its body, one card section from the next, items in a meta row. Reach for it when whitespace alone stops reading as a boundary — when the boundary belongs to a container instead, that container's own `border` is cheaper and cannot fall out of step with it.",
      "`orientation` names the rule's own axis, not the group's, so a row of items is divided by `orientation=\"vertical\"` — the opposite of the container you are thinking about. It ships no margins at all: spacing is the caller's job, which is what lets the same component sit flush inside a card and spaced out between paragraphs.",
    ],
    examples: [
      {
        demo: "separator/basic",
        title: "Basic",
        description:
          "Horizontal is the default: full width, one pixel tall. The `my-4` is on the separator here because nothing else in this block owns the gap.",
      },
      {
        demo: "separator/vertical",
        title: "Between inline items",
        description:
          "A vertical rule sizes itself with `self-stretch`, so the flex parent needs a height — `items-center` alone collapses it to zero and it reads as missing.",
      },
      {
        demo: "separator/labelled",
        title: "Labelled divider",
        description:
          "The `or` divider, without a second component: the rule is positioned `absolute top-1/2` inside a `relative` row and the label sits over it on a solid `bg-background`, which is what breaks the line rather than two half-width rules that never quite meet.",
      },
      {
        demo: "separator/in-a-card",
        title: "Card sections",
        description:
          "Edge-to-edge inside a padded container: the padding lives on CardHeader and CardContent, so a separator dropped between them as a direct Card child spans the full width with no negative margins.",
      },
    ],
  },
  {
    slug: "scroll-area",
    name: "Scroll Area",
    category: "Layout",
    description: "A scrollable region with styled, overlay scrollbars.",
    intro: [
      "Scroll Area is the bounded scrolling region: a commit list, a group of options, a long block of terms that has to live inside a fixed height instead of stretching the page. Reach for it when the content is unbounded but the layout is not — a dialog body, a sidebar tree, a command palette.",
      "The root needs a height to scroll inside, from a class or from a flex parent, and with no cap it simply grows and the component looks absent. Children render into a viewport, so padding belongs on a wrapper inside the root; the scrollbar overlays instead of taking layout width, and Base UI gives that viewport a `tabIndex` of its own once it overflows, so keyboard users reach it without help.",
    ],
    examples: [
      {
        demo: "scroll-area/basic",
        title: "Basic",
        description:
          "The everyday shape: a height on the root, a padded wrapper inside it. The bar overlays the content rather than reserving a gutter, so the rows keep their full width.",
      },
      {
        demo: "scroll-area/with-headings",
        title: "Grouped content",
        description:
          "Sticky-free grouping for a long list of options. `ScrollArea` renders only a vertical scrollbar today — horizontal overflow still scrolls, but without a styled bar, so keep the content in one column.",
      },
      {
        demo: "scroll-area/in-a-dialog",
        title: "Dialog body",
        description:
          "Where the height comes from the surface around it: capping the body keeps the dialog's header and footer on screen while the terms scroll between them.",
      },
    ],
    parts: {
      ScrollArea:
        "Takes the height cap and the border. Its children land in an internal viewport, so padding goes on a wrapper inside rather than here — padding on the root would sit outside the scrolling box.",
      ScrollBar:
        "Rendered by ScrollArea itself, vertical only. It is exported for a custom bar, but the root does not accept one in its place today, so a second orientation means composing Base UI's primitive directly.",
    },
  },
  {
    slug: "resizable",
    name: "Resizable",
    category: "Layout",
    description:
      "Panel groups split by draggable handles, sized as percentages of the group.",
    intro: [
      "Resizable splits a region into panes the reader can drag: an editor beside its preview, a file tree beside a document, a console under both. Reach for it when the split is the user's call — when it is the layout's, a grid is simpler and has no drag state to keep.",
      'Two facts decide how the code reads. The group takes `orientation`, not the `direction` older shadcn snippets pass, and it fills its parent, so it needs a height. Panel sizes are strings in this version: `"35%"` is a third of the group, while a bare `35` means 35 pixels — the unit is not optional. Nothing is persisted for you; `onLayoutChanged` hands you the layout to store and `defaultLayout` takes it back on the next mount.',
    ],
    examples: [
      {
        demo: "resizable/basic",
        title: "Basic",
        description:
          "The two-pane split. `minSize` is what keeps a pane usable rather than draggable to nothing, and both sizes are percentage strings — a bare number would be read as pixels. The `tabIndex={0}` on each pane's content is deliberate: the library owns the scrolling div around it, so without a focusable descendant a keyboard user cannot reach whatever a drag clipped.",
      },
      {
        demo: "resizable/nested",
        title: "Nested groups",
        description:
          "A panel can hold another group on the opposite axis, which is how an IDE-style three-pane layout is built. Each group tracks its own sizes, so the inner split survives a drag of the outer one.",
      },
      {
        demo: "resizable/collapsible",
        title: "Collapsible tree",
        description:
          "`collapsible` snaps a pane to its `collapsedSize` once it is dragged under `minSize`, which leaves a rail you can drag back open. `onResize` reports the new size, so the pane's own content can drop to icons at the rail width.",
      },
    ],
    parts: {
      ResizablePanelGroup:
        "Owns the axis (`orientation`) and fills its parent, so give it a height — with none, the whole group collapses. `defaultLayout` plus `onLayoutChanged` is how a layout is persisted; there is no auto-save.",
      ResizablePanel:
        'Sizes are percentage strings (`"35%"`); bare numbers are pixels. `className` lands on an inner div the library owns, and that div does the scrolling — so content that can clip needs a focusable descendant (`tabIndex={0}`) to stay keyboard-reachable.',
      ResizableHandle:
        "Must be a direct child of the group, between two panels. `withHandle` draws the grip; without it the hit area is still there, and it is a one-pixel rule the pointer has to find.",
    },
  },
  {
    slug: "carousel",
    name: "Carousel",
    category: "Layout",
    description: "A horizontal slide viewport with previous and next controls.",
    intro: [
      "Carousel is the paged strip: screenshots, release cards, testimonials the reader steps through instead of scrolling past. Reach for it when horizontal room is the constraint and the items are peers — never for content the reader must not miss, since everything but the current page is off screen.",
      "Embla drives it, so the knobs are Embla's: `opts` goes straight through (`loop`, `align`, `slidesToScroll`) and `setApi` hands the instance back for your own indicators. Layout is a two-part contract — the previous and next buttons are positioned outside the viewport, so the wrapper needs horizontal room (`px-12`) or they clip, and the gap between slides comes from CarouselContent's negative margin paired with CarouselItem's padding rather than a `gap` utility.",
    ],
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
          "`setApi` hands back the Embla instance, which is how you build your own indicators or drive it from elsewhere. Subscribe to `select` for the current index — the api holds it, and nothing re-renders without that listener.",
      },
    ],
    parts: {
      Carousel:
        'The Embla context and the `role="region"` wrapper, and where left/right arrow keys are handled. `opts` and `plugins` pass straight to `useEmblaCarousel`; `orientation` sets Embla\'s axis, not just the styling.',
      CarouselContent:
        "Two boxes in one: an `overflow-hidden` clip carrying Embla's ref, and the flex track inside it that `className` reaches. Its negative margin makes the gap with CarouselItem's padding, so a `gap` utility here doubles the spacing.",
      CarouselItem:
        '`basis-full` by default, which is what makes one item a page. Override the basis to show several, and pair that with `align: "start"` so the short last page is not centred.',
      CarouselPrevious:
        "Absolutely positioned outside the viewport and disabled at the first page, so the wrapper needs matching horizontal room or it clips. Its label is an `sr-only` span, so an icon-only button still announces.",
      CarouselNext:
        "Mirrors CarouselPrevious on the end side; in vertical orientation both rotate and move to the top and bottom edges instead.",
    },
  },
  {
    slug: "page-header",
    name: "Page Header",
    category: "Layout",
    description:
      "Breadcrumb, title, description and actions for the top of a page, with an optional flush tab strip.",
    intro: [
      "Page Header is the block every routed page opens with: an optional breadcrumb, the title and its description, the page's primary actions, and a rule closing it off. Reach for it so heading level, spacing and that rule are decided once here rather than re-guessed per screen.",
      "It is slots rather than props — the parts compose in the order the page needs and take no configuration bag. `PageHeaderTitle` renders an `h1`, so a page renders one. `PageHeaderTabs` is the one part that changes the root: its presence drops the header's bottom padding, so the rule lands flush under the tab strip instead of above it.",
    ],
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
    parts: {
      PageHeader:
        "Owns the bottom rule and the padding above it, and drops that padding when a PageHeaderTabs is present so the rule sits under the tabs.",
      PageHeaderHeading:
        "A wrapping `justify-between` row, which means it wants exactly two children: the title stack in one, PageHeaderActions in the other. Wrap the title and description together yourself — they are not a slot.",
      PageHeaderTitle:
        "An `h1`, so one per page. It carries the heading face and no spacing, and there is no level prop — a nested heading is a plain element, not this part.",
      PageHeaderIcon:
        "Fixes any icon inside it to `size-6` and mutes it, and its `h-8` is what aligns it with the title's cap height, so it belongs beside the title stack rather than inside it.",
      PageHeaderTabs:
        "A marker with no styles of its own: its `data-slot` is what flips the root's padding. Put TabsList inside it and Tabs around the whole header, so the panels render below the rule.",
    },
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
    intro: [
      "Accordion turns a long page into a list of headings the reader opens on demand — FAQs, release notes, settings that are edited once a quarter. Reach for it when every section deserves a title of its own; a single show-and-hide region is `Collapsible`, and a set of views the reader switches between rather than stacks is `Tabs`.",
      "One panel at a time is the default: `multiple` is the opt-in for several open at once, and `value`/`defaultValue` are arrays either way. Panels animate on `--accordion-panel-height`, which Base UI measures for you, so content of any height opens smoothly — and closed panels are unmounted unless you pass `keepMounted`, or `hiddenUntilFound` to let the browser's find-in-page open them.",
    ],
    examples: [
      {
        demo: "accordion/basic",
        title: "Basic",
        description:
          "The FAQ shape: opening one question closes the last, which is what the component does out of the box. `defaultValue` is still an array — the open set is a list even when only one entry can be in it.",
      },
      {
        demo: "accordion/multiple",
        title: "Several at once",
        description:
          "`multiple` lets panels stay open together, for content the reader compares rather than browses. The trigger is a flex row, so a date can sit beside the title without a wrapper — the caret keeps its own `ms-auto`.",
      },
      {
        demo: "accordion/settings",
        title: "Settings sections",
        description:
          "Progressive disclosure inside a `Panel`: each panel holds real controls, not prose. `AccordionItem` draws its own `not-last:border-b`, so the group needs no dividers and the last section stays flush against the container.",
      },
      {
        demo: "accordion/controlled",
        title: "Expand all",
        description:
          "Holding the open set in state is what an expand-all control needs: `value` is the array of open items, so setting it to every id — or to `[]` — moves the whole accordion in one update.",
      },
    ],
    parts: {
      Accordion:
        "The open set is an array in both modes, so `value={['a']}` is correct even one-at-a-time; `multiple` is what allows a second entry.",
      AccordionTrigger:
        "Renders its own header wrapper and both carets, so neither is yours to add — they swap on `aria-expanded`, which lands on the trigger rather than the item.",
      AccordionContent:
        "Wraps children in the height-animated div that reads `--accordion-panel-height`, and your `className` lands on that inner div — which is why its `pb-4` is the panel's bottom gap and not the item's.",
    },
  },
  {
    slug: "collapsible",
    name: "Collapsible",
    category: "Disclosure",
    description:
      "A single show/hide region. Emits `data-open` / `data-closed`, not `data-state`.",
    intro: [
      "Collapsible is one region and one toggle: the show-more, the request detail, the advanced half of a form. Reach for it whenever there is a single thing to hide — several titled sections that stack is `Accordion`, and a region that floats over the page instead of pushing it down is `Popover`.",
      "The wrapper is deliberately bare — no chrome, no caret, no padding — because the trigger is usually your own control: `CollapsibleTrigger` takes Base UI's `render` prop, so the trigger *is* a Button rather than wrapping one. State lands on the trigger as `aria-expanded` and `data-panel-open`, which is what a caret rotates off; the panel is the part carrying `data-open`/`data-closed` and publishing `--collapsible-panel-height`.",
    ],
    examples: [
      {
        demo: "collapsible/basic",
        title: "Basic",
        description:
          "The trigger renders as a Button via `render`. The caret rotates off `aria-expanded`, which sits on the trigger rather than the root.",
      },
      {
        demo: "collapsible/filter-group",
        title: "Filter group",
        description:
          "The sidebar facet: the trigger is the section header itself — a plain full-width row, not a Button — so the whole strip is the hit target and the count sits inside the panel it belongs to.",
      },
      {
        demo: "collapsible/optional-fields",
        title: "Optional fields",
        description:
          "A form's advanced half. `keepMounted` leaves the panel in the DOM when it closes, so half-typed values survive a collapse and native submission still sees the inputs.",
      },
      {
        demo: "collapsible/controlled",
        title: "Controlled",
        description:
          "Driving `open` yourself lets the toggle live outside the collapsible — here a show-more button beneath the list.",
      },
    ],
    parts: {
      Collapsible:
        "A grouping div with no styles of its own, so the gap between trigger and panel is yours to set — usually a margin on the panel.",
      CollapsibleTrigger:
        "The state lives here, not on the root: `aria-expanded` and `data-panel-open` are the trigger's, so caret rotation keys off the trigger's own group.",
      CollapsibleContent:
        "Unmounted while closed unless you pass `keepMounted` or `hiddenUntilFound`, and it publishes `--collapsible-panel-height` for height transitions.",
    },
  },

  /* -- Overlays ---------------------------------------------------------- */
  {
    slug: "dialog",
    name: "Dialog",
    category: "Overlays",
    description:
      "A modal window for focused tasks. Triggers use Base UI's `render` prop rather than `asChild`.",
    intro: [
      "Dialog is for a task that needs someone's whole attention but not a whole page — renaming a record, sharing a link, a two-field form. It traps focus, locks page scroll and dims everything behind it, so reach for it only when the work cannot happen inline: Popover is the non-blocking sibling, and Alert Dialog is the one for an irreversible answer.",
      "`DialogContent` mounts its own portal and overlay, so a dialog is a trigger plus a content and `DialogPortal` / `DialogOverlay` exist for custom shells only. Composition goes through Base UI's `render` prop rather than `asChild`: `render={<Button />}` makes the trigger or the close render as that button instead of nesting one inside another.",
    ],
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
        demo: "dialog/long-content",
        title: "Long content",
        description:
          "A body that scrolls while the header and footer stay put. `DialogContent` sets no max-height of its own, so cap it and give the middle row `minmax(0,1fr)` — a plain `auto` row would push the footer past the viewport instead of scrolling.",
      },
      {
        demo: "dialog/controlled",
        title: "Controlled",
        description:
          "Drive `open` / `onOpenChange` yourself when the dialog must close only after work succeeds.",
      },
    ],
    parts: {
      Dialog:
        "Where dismissal is configured: `disablePointerDismissal` stops a stray click on the overlay throwing away a half-filled form. Escape closes regardless, so an unsaved-work guard belongs in `onOpenChange`.",
      DialogContent:
        "Mounts its own portal and overlay — compose those two parts only when the shell has to change. It sets no max-height, so a body that can outgrow the viewport needs one plus a `minmax(0,1fr)` grid row to scroll inside.",
      DialogTitle:
        "The popup's accessible name points here, so a dialog without this part is announced unnamed. Hide it visually rather than dropping it when the design has no room for a heading.",
      DialogFooter:
        "Reverses to a column below `sm`, so the primary action goes last in source order to land on top. `showCloseButton` appends a plain Close button for footers that need nothing else.",
    },
  },
  {
    slug: "alert-dialog",
    name: "Alert Dialog",
    category: "Overlays",
    description:
      "A blocking confirmation for destructive actions — no dismiss on outside click.",
    intro: [
      'Alert Dialog is the one-question interruption: a confirmation the user has to answer before anything else happens, for work that destroys data or cannot be undone. It carries `role="alertdialog"` and holds a title, a description and two answers — anything with several choices or a form to fill belongs in a Dialog instead.',
      'The root forces `modal` on and pointer dismissal off, so there is nothing to configure and no clicking it away. Escape still closes it, and that is the rule the parts are shaped around: dismissal has to read as "no", so `AlertDialogCancel` wraps Close while `AlertDialogAction` is a plain Button that closes only when you tell it to.',
    ],
    examples: [
      {
        demo: "alert-dialog/basic",
        title: "Basic",
        description:
          "`AlertDialogAction` is a plain Button and does *not* wrap Close, unlike `AlertDialogCancel` — so confirming has to close the dialog itself. That is deliberate: a confirm usually awaits something first.",
      },
      {
        demo: "alert-dialog/pending",
        title: "While the action runs",
        description:
          "The dialog holds still with the request in flight: `open` is owned here, the label becomes a Spinner, and the close happens once the work resolves. This is what Action not wrapping Close buys — the user never sees a dialog vanish before the thing it promised has happened.",
      },
      {
        demo: "alert-dialog/type-to-confirm",
        title: "Type to confirm",
        description:
          "A gate for the truly irreversible. Because Action is a plain Button, `disabled` is the entire mechanism — there is no Close to intercept — and Escape still cancels, which is the safe answer.",
      },
      {
        demo: "alert-dialog/with-media",
        title: "With media, small",
        description:
          '`size="sm"` stays centred at every breakpoint and makes the footer a two-column grid; `default` goes start-aligned from `sm` up.',
      },
    ],
    parts: {
      AlertDialog:
        "Forces `modal` on and pointer dismissal off, so `modal` and `disablePointerDismissal` are not yours to set. Escape still closes the dialog, which is why cancel must be the safe answer.",
      AlertDialogAction:
        "A plain Button rather than a Close — confirming dismisses nothing until you say so, which is what lets the dialog stay open while the action runs.",
      AlertDialogCancel:
        "The one part that wraps Close, and it takes `variant` and `size`. A destructive answer that needs no await is often a second Cancel rather than an Action.",
      AlertDialogMedia:
        'The only part that changes the header\'s grid: with media present, `size="default"` moves the icon into its own column from `sm` up while `sm` keeps it stacked and centred.',
      AlertDialogFooter:
        'Two answers, equal width: `size="sm"` makes it a two-column grid. At `default` it reverses to a column below `sm`, so the confirm goes last in source order.',
    },
  },
  {
    slug: "sheet",
    name: "Sheet",
    category: "Overlays",
    description:
      "A panel that slides in from an edge — Dialog's modal contract, sized to a column instead of a centred box.",
    intro: [
      "Sheet is the edge-anchored form of Dialog: the same trigger, close and modal behaviour, but the panel fills one side of the viewport rather than floating in the middle. Reach for it when the content is a column — a record's details, a filter set, a navigation menu on a narrow screen — or when a centred box would be too cramped to read in. Drawer is the touch-first alternative, with drag-to-dismiss and snap points.",
      "`side` is the only geometry prop: the edge, the border and the enter and exit transforms all derive from the `data-side` it sets. Inside, the content is a flex column whose header and footer carry their own padding and whose body carries none — so a body long enough to scroll needs `min-h-0 flex-1 overflow-y-auto` plus the matching `px-8`.",
    ],
    examples: [
      {
        demo: "sheet/sides",
        title: "Sides",
        description:
          "`side` drives position, border edge and enter/exit transform from one `data-side` attribute.",
      },
      {
        demo: "sheet/detail",
        title: "Detail panel",
        description:
          "The inspector shape: a header that stays, a body that scrolls, a footer that acts. `SheetContent` never scrolls itself, so the scroll region is the body — `min-h-0 flex-1 overflow-y-auto`, with its own `px-8` since only the header and footer are padded.",
      },
      {
        demo: "sheet/with-form",
        title: "With a form",
        description:
          "`SheetFooter` carries `mt-auto`, so it pins to the bottom however short the body is. Note the header and footer pad themselves — the body does not.",
      },
      {
        demo: "sheet/navigation",
        title: "Navigation menu",
        description:
          "The narrow-screen menu, opened from the left. Each link is a `SheetClose` rendered as an `a`, so following it dismisses the sheet in the same click and there is no open state to reset by hand. `nativeButton={false}` is what keeps it a real link — the same escape hatch `PaginationLink` uses.",
      },
    ],
    parts: {
      SheetContent:
        "Mounts its own portal and overlay, and reads `side` for position, border edge and transform. It is a flex column that never scrolls itself — a long body needs `min-h-0 flex-1 overflow-y-auto`.",
      SheetHeader:
        "Carries its own `p-8`. Whatever sits between header and footer has no padding at all, so repeat `px-8` on the body to keep the column aligned.",
      SheetFooter:
        "`mt-auto` pins it to the bottom however short the body is, and it stacks as a column — the primary action goes first in source order.",
      SheetTitle:
        "Supplies the panel's accessible name, so keep the part even when the design shows no visible heading.",
    },
  },
  {
    slug: "drawer",
    name: "Drawer",
    category: "Overlays",
    description:
      "A bottom sheet with drag-to-dismiss and snap points — Sheet's gesture-driven sibling, tuned for touch.",
    intro: [
      "Drawer slides in from an edge like Sheet, but it follows the finger: it tracks the drag, dismisses on a flick and can rest at snap points on the way. Reach for it on touch-first surfaces, and for content someone wants to peek at before committing — a filter set, an upload queue, the list under a map. On a pointer-only screen Sheet is the plainer choice.",
      "There is no `side` prop. `swipeDirection` on the root is the single source of truth, and the axis, the edge, the border and the closed transform all derive from it: `down` and `up` size their height to the content, `left` and `right` take three-quarters width up to 24rem. Geometry lives on the root — `DrawerContent` reads it from context rather than taking props of its own.",
    ],
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
      {
        demo: "drawer/non-modal",
        title: "Non-modal",
        description:
          "`modal={false}` skips the overlay and the scroll lock and leaves the viewport pointer-transparent, so the page behind stays scrollable and clickable. The shape for a tray that reports on background work rather than interrupting it.",
      },
    ],
    parts: {
      Drawer:
        "Owns the geometry: `swipeDirection`, `snapPoints`, `modal` and `showSwipeHandle` all sit here and reach the content through context — a content part rendered outside a Drawer throws rather than falling back.",
      DrawerContent:
        "Renders the viewport and, only when `modal` is true, the overlay. With snap points the popup takes the full viewport height and the snap offset moves it, which is why the sizing rules switch on `data-snap-points`.",
      DrawerSwipeHandle:
        "`DrawerContent` renders it for you when the root has `showSwipeHandle`, so compose it directly only inside a custom content. It is `aria-hidden`: dragging is a pointer affordance, and Escape is the keyboard equivalent.",
      DrawerHeader:
        "Centres its text on vertical drawers and goes start-aligned from `md` up — a bottom sheet's title reads as a centred label on a phone and as a heading on a desktop.",
    },
  },
  {
    slug: "popover",
    name: "Popover",
    category: "Overlays",
    description:
      "Anchored, non-modal content with title and description slots.",
    intro: [
      "Popover is the anchored surface you can work inside: it hangs off a trigger, takes focus when it opens, and closes on Escape or an outside click. Reach for it when the panel holds controls — a filter form, a column picker, an in-place confirmation. Of the three hover-adjacent overlays it is the only one a keyboard can enter: Tooltip is a label, Hover Card is a read-only preview.",
      "There is no positioner to mount. `PopoverContent` accepts `side`, `align`, `sideOffset` and `alignOffset` and forwards them to the Base UI positioner it already renders inside a portal. It also exports no Close part, so a control that has to dismiss the popup — a save, a confirm — needs the `open`/`onOpenChange` pair owned by your own component.",
    ],
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
          "Popover is focusable and dismissible, so interactive content belongs here rather than in a tooltip — a tooltip is unreachable by keyboard. The popup is `w-72` by default; this one widens to `w-80` through `className` because number fields read badly when cramped.",
      },
      {
        demo: "popover/confirm",
        title: "Inline confirmation",
        description:
          "A reversible confirm anchored to the control it affects, where an Alert Dialog would be too heavy a stop. There is no Close part to render, so both buttons drive the `open` state the demo owns — which is also what lets the destructive one report a result on the way out.",
      },
    ],
    parts: {
      PopoverContent:
        "Renders the portal and positioner itself, which is why the positioning props live here and not on a separate part. Width is a fixed `w-72` — widen it through `className` rather than wrapping the children.",
      PopoverTitle:
        "Base UI points the popup's `aria-labelledby` at this part, so a hand-rolled heading `div` leaves the popover with no accessible name.",
      PopoverDescription:
        "The `aria-describedby` half of the same wiring. Keep it for the sentence that explains the popup, not for body copy.",
    },
  },
  {
    slug: "hover-card",
    name: "Hover Card",
    category: "Overlays",
    description: "A preview surface shown on hover, for links and mentions.",
    intro: [
      "Hover Card is the preview that saves a click: hovering a mention, a link or an entity name expands it into just enough context to decide whether to follow it. Everything inside is supplementary by definition — a touch user never hovers, so anything a reader actually needs belongs on the page, and anything they need to act on belongs in a Popover.",
      "It wraps Base UI's `PreviewCard`, which puts the timings on the trigger rather than the root: `delay` (600ms) and `closeDelay` (300ms) are `HoverCardTrigger` props. That trigger renders an `a` element by default, so pass `render` whenever the real trigger is a button — the element has to match what a click would do.",
    ],
    examples: [
      {
        demo: "hover-card/basic",
        title: "On a link",
        description:
          "Built on Base UI's `PreviewCard`. It opens on hover and on keyboard focus, but is still supplementary — never put anything essential only in here.",
      },
      {
        demo: "hover-card/with-avatar",
        title: "Person preview",
        description:
          "The usual case: a mention that expands into a profile. The trigger is a Button through `render`, since the default element is an anchor and this one navigates nowhere.",
      },
      {
        demo: "hover-card/definition",
        title: "Metric definition",
        description:
          "A glossary card for a dashboard: the label explains how its number is computed, instead of a legend nobody reads. `delay` is set on the trigger — 600ms is too long a wait when the reader is scanning a row of figures.",
      },
    ],
    parts: {
      HoverCardTrigger:
        "Owns the timing: `delay` and `closeDelay` are trigger props, not root props, so two triggers can behave differently in one view. It renders an `a` by default — pass `render` when the trigger is really a button.",
      HoverCardContent:
        "Renders its own portal and positioner, so positioning props are accepted here. Opening does not move focus into the card, so anything interactive inside it is pointer-only — keep actions out.",
    },
  },
  {
    slug: "tooltip",
    name: "Tooltip",
    category: "Overlays",
    description:
      "A short label on hover or focus. Never put interactive content in one.",
    intro: [
      "Tooltip names something the interface has left unlabelled: an icon button, a clipped table cell, the shortcut behind an action. It is a label and not a container — the popup never takes focus and a touch user never hovers it, so a link or a button in here is a control nobody can reach. It also cannot rescue a `disabled` element, which emits no pointer events at all.",
      "Timing lives on `TooltipProvider`, and this wrapper defaults its `delay` to 0 where the Base UI default is 600ms per trigger: a bare provider makes its whole subtree instant, and a considered pause means passing `delay` yourself. Individual triggers override both `delay` and `closeDelay`, so one slow control does not need its own provider.",
    ],
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
      {
        demo: "tooltip/truncated",
        title: "Clipped labels",
        description:
          "The overflow escape hatch: narrow rows clip with `truncate` and the tooltip carries the full string. `render` puts the trigger on the row's own button, which is what keeps the label reachable by keyboard rather than by pointer alone.",
      },
    ],
    parts: {
      TooltipProvider:
        "Optional, and it changes the timing: it defaults `delay` to 0, where a provider-less trigger waits Base UI's 600ms. Wrap the group of tooltips that should share one delay, not the whole app.",
      TooltipTrigger:
        "`delay` and `closeDelay` are trigger props, so one control can be slower than the rest of its group. A tooltip on a `disabled` element never opens — the element emits no pointer events.",
      TooltipContent:
        "Renders the portal, positioner and arrow together, so positioning props belong here. A nested `Kbd` is re-styled and the trailing padding tightened by the popup's own `data-[slot=kbd]` rules — nothing to pass.",
    },
  },
  {
    slug: "dropdown-menu",
    name: "Dropdown Menu",
    category: "Overlays",
    description:
      "An action menu from a trigger, with labels, separators, shortcuts and destructive items.",
    intro: [
      "Dropdown Menu is the list of commands behind a control: row actions, an overflow button, a view menu. Items are things that happen — plus the checkbox and radio parts for a setting the menu itself owns. To pick a value a form will submit, reach for Select; to act on a right-clicked region, Context Menu, which shares this vocabulary part for part.",
      "Two structural facts. `DropdownMenuLabel` is a Base UI group part, so it has to sit inside a `DropdownMenuGroup` or the `DropdownMenuRadioGroup` it labels — placed straight into the content it throws when the menu opens. And the popup is width-linked to its trigger through `w-(--anchor-width)` over a `min-w-48` floor, so a wide trigger yields a wide menu, not a narrow one beside it.",
    ],
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
      {
        demo: "dropdown-menu/mixed-rows",
        title: "Mixed and disabled rows",
        description:
          "Only some commands earn an icon, and the ones that don't would otherwise start further out. `inset` pads them by the icon column (`data-inset:ps-9.5`) so the menu keeps one text edge. The `disabled` item is still highlightable by keyboard — Base UI keeps disabled items focusable on purpose — while `data-disabled` dims it and drops its pointer events.",
      },
    ],
    parts: {
      DropdownMenuContent:
        "Renders its own portal and positioner, so positioning props belong here. `w-(--anchor-width)` ties its width to the trigger with `min-w-48` as the floor — a wide trigger widens the menu.",
      DropdownMenuGroup:
        "Exists for the label: Base UI treats a group label as a child of a group, so this part is what makes `DropdownMenuLabel` legal.",
      DropdownMenuLabel:
        "Throws on open when it sits directly in the content — keep a `DropdownMenuGroup` or `DropdownMenuRadioGroup` around it. `inset` lines it up with items that carry icons.",
      DropdownMenuItem:
        'Item type styles uppercase the label, so write it in sentence case. `variant="destructive"` recolours the text and any icon together; `inset` pads an icon-less item by the icon column.',
      DropdownMenuCheckboxItem:
        "Reserves the indicator column with `pe-8` and pins the check to `end-2`, so a menu mixing selection items with plain ones keeps every label on one line.",
      DropdownMenuRadioItem:
        "Same geometry as the checkbox item; the surrounding `DropdownMenuRadioGroup` owns `value`, so the item only names its own.",
      DropdownMenuShortcut:
        "A plain span pushed out by `ms-auto` that follows the item's focus colour. Use `Kbd` instead when you want key caps rather than a hint.",
      DropdownMenuSubTrigger:
        "Renders its own trailing caret, so pass only the label and any leading icon.",
      DropdownMenuSubContent:
        'Defaults to `side="inline-end"` with a small negative `alignOffset`, which flips with direction — an RTL locale needs no extra prop.',
      DropdownMenuPortal:
        "Rarely composed: `DropdownMenuContent` already mounts its own portal. Reach for this part only to take that mounting over.",
    },
  },
  {
    slug: "context-menu",
    name: "Context Menu",
    category: "Overlays",
    description: "The same menu surface, opened by right-click on a region.",
    intro: [
      "Context Menu is Dropdown Menu's surface opened by right-click or long-press on a region rather than by a button. Treat it as an accelerator: every command in it should also be reachable somewhere visible, because a right-click is a habit rather than an affordance and nothing announces that the region has a menu at all.",
      'The trigger is the region. `ContextMenuTrigger` renders a `div` and marks it `select-none`, so the right-click drag never selects the text underneath, and the popup anchors to the pointer rather than to an element — which is why the content defaults to `side="inline-end"` with `align="start"` and has no trigger width to inherit. Item parts mirror Dropdown Menu name for name, so one menu body can serve both surfaces.',
    ],
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
      {
        demo: "context-menu/rows",
        title: "Per-row menus",
        description:
          "One `ContextMenu` per row rather than one for the list: each scopes its own trigger, which is what lets the label name the file the pointer is actually over. `render` promotes the `li` itself, so no wrapper sits between the row and its menu — the root renders no element of its own, which is what keeps the list markup legal.",
      },
      {
        demo: "context-menu/view-options",
        title: "View options",
        description:
          "The background menu of a view, where the items report state instead of firing commands: `ContextMenuRadioGroup` owns `value`, so the menu opens already showing the current layout.",
      },
    ],
    parts: {
      ContextMenuTrigger:
        "Renders a `div` and carries `select-none`, so a right-click drag never selects the region's own text. Pass `render` to promote an element you already have — a row, a canvas, a card — to the target.",
      ContextMenuContent:
        "Anchored to the pointer, not to an element: hence the `inline-end`/`start` defaults, and no trigger width to inherit the way the dropdown's popup does.",
      ContextMenuLabel:
        "A Base UI group part — keep a `ContextMenuGroup`, or the `ContextMenuRadioGroup` it labels, around it. In the content directly it throws when the menu opens.",
      ContextMenuItem:
        'Item type styles uppercase the label, so write it in sentence case. `variant="destructive"` recolours the text and its icon together.',
      ContextMenuSubContent:
        "Opens to `inline-end` by default, so an RTL locale flips it with no extra prop.",
      ContextMenuPortal:
        "`ContextMenuContent` already mounts its own portal — this part is only for taking that over.",
    },
  },

  /* -- Feedback ---------------------------------------------------------- */
  {
    slug: "toast",
    name: "Toast",
    category: "Feedback",
    description:
      "Transient notifications from a singleton manager — call `toast.add()` from anywhere, no local state.",
    intro: [
      "Toast is the confirmation that does not need answering: saved, copied, deleted, failed to send. It is fired rather than rendered — `toast.add()` is a plain function call, so the code that finished the work announces it without a piece of state or a portal of its own. When the message must survive until it is dealt with, that is `Alert` inline, or `Banner` across the page.",
      "`Toaster` is the only part you mount: it provides the manager context and the portal and viewport together, so one instance at the app root covers the whole tree — a second means a second stack. It defaults to the exported `toast` singleton, and `createToastManager()` gives a subtree its own queue when it genuinely needs one.",
    ],
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
      {
        demo: "toast/promise",
        title: "Around a promise",
        description:
          "`toast.promise` binds one toast to one pending call: the loading toast becomes the success or error toast in place, so there is no second notification and no id to carry. It also re-throws, hence the `catch` — the toast reports the failure, it does not swallow it.",
      },
    ],
    parts: {
      Toaster:
        "Provider, portal, viewport and the toast list in one part — mount it once at the root, above the router, and nothing below needs a toast component at all.",
      Toast:
        "One per queue entry, rendered for you. Stacking, swipe and height transitions are driven by `--toast-index` and `--toast-height`, so a hand-rolled list has to keep those variables intact.",
      ToastTitle:
        "Reads the queued toast's `title` from context, which is why the list mounts it with no children — passing text here would override what `toast.add()` sent.",
      ToastAction:
        'Defaults to `render={<Button variant="outline" size="sm" />}` and picks up the call\'s `actionProps`, so a per-toast action needs no markup in the list.',
      ToastClose:
        "Ships its own `aria-label` and grows its hit target with an `after:-inset-2` pseudo-element rather than padding, which would stretch the row it sits in.",
    },
  },
  {
    slug: "alert",
    name: "Alert",
    category: "Feedback",
    description: "A persistent inline message, with an optional action slot.",
    intro: [
      "Alert is the message that stays: it sits in the flow at the width of its container and never times out, so the reader can come back to it. Reach for it when the text has to remain available — a validation summary above a form, the reason a control is disabled, a caveat attached to one section. A confirmation that may vanish is `Toast`; a notice about the whole screen is `Banner`.",
      "Two variants are the whole ladder — `default` and `destructive`, with no tone axis — and the accent is a 2px `::after` rule on the leading edge rather than a border, so it stays put whatever border the alert itself carries. Layout follows the content instead of props: a leading `svg` switches the root to two columns, and an `AlertAction` reserves the trailing padding.",
    ],
    examples: [
      {
        demo: "alert/basic",
        title: "Variants",
        description:
          "A leading `svg` switches the grid to two columns on its own, so the icon is optional with no layout prop to set.",
      },
      {
        demo: "alert/validation-summary",
        title: "Validation summary",
        description:
          'The failed-submit shape: one alert names every problem, and the fields carry `aria-invalid` only. The root\'s `role="alert"` means the summary is announced once, rather than each field competing to speak.',
      },
      {
        demo: "alert/dismissible",
        title: "Dismissible",
        description:
          "`AlertDismiss` is the close affordance, and it is deliberately stateless — Alert does not hide itself, because a dismissed alert usually has to stay dismissed and only the caller knows where that fact lives.",
      },
      {
        demo: "alert/with-link",
        title: "With a link",
        description:
          "A notice that hands off rather than acts. `AlertTitle` and `AlertDescription` underline any anchor inside them, so an inline link needs no classes — and unlike `AlertAction`, it stays in the reading order of the sentence.",
      },
      {
        demo: "alert/with-action",
        title: "With an action",
        description:
          "`AlertAction` pins to the top-right and the alert reserves the inline-end padding for it, so long titles never slide underneath. The second alert is title-only: with no description, the grid simply collapses to one row.",
      },
    ],
    parts: {
      Alert:
        'Carries `role="alert"`, so it is announced assertively the moment it mounts — for a message that should wait its turn, Banner\'s `role="status"` is the politer surface.',
      AlertTitle:
        "Moves itself to the second column when the alert has a leading `svg`, so the icon never needs a wrapper to sit beside the text.",
      AlertAction:
        "Absolutely positioned in the top-right, with the root reserving `pe-18` for it — room for one control. Several actions want Banner's flex-sibling action instead.",
    },
  },

  /* -- Conversation ------------------------------------------------------ */
  {
    slug: "bubble",
    name: "Bubble",
    category: "Conversation",
    description: "Chat bubbles grouped by author.",
    intro: [
      "Bubble is the speech-balloon layer of a conversation: a `BubbleGroup` column of turns, each turn a `Bubble` wrapping one `BubbleContent`. Reach for it when the surface reads as a chat — a support thread, an assistant transcript, a row of suggested replies. For a turn that also needs an author and a timestamp, wrap it in Message rather than adding parts here.",
      "The variant belongs to the wrapper, not the content: `Bubble` styles its own `BubbleContent` through `*:data-[slot=bubble-content]`. That is how `ghost` strips the padding and the background in one place, and how a bubble rendered as a `button` or an `a` picks up a matching hover state for free.",
    ],
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
      {
        demo: "bubble/quick-replies",
        title: "Quick replies",
        description:
          "Suggested answers as tappable bubbles. `BubbleContent` takes a `render` prop, so it becomes a real `button` — and each variant already declares the hover colour that goes with it.",
      },
    ],
    parts: {
      BubbleGroup:
        "A plain `gap-2` column: turns place themselves through their own `align`, so there is no per-row wrapper and nothing to justify here.",
      Bubble:
        "Owns the variant for the pair and styles `BubbleContent` through `*:data-[slot=bubble-content]` — a content part rendered outside a Bubble comes out unstyled. It also carries `max-w-[80%]`, which `ghost` lifts to full width. Inside a Message it follows the row's `align`, so it needs its own only when it stands outside one.",
      BubbleContent:
        "Pass `render` to make the bubble interactive: as a `button` or an `a` it picks up the hover colour its variant declares. Under `ghost` this part loses its padding and background, which is why an assistant-style answer needs no other override.",
      BubbleReactions:
        "Overhangs the bubble edge, ringed in `--card` so it reads as punched through it. On a surface that is not card-coloured, match the ring to that surface.",
    },
  },
  {
    slug: "message",
    name: "Message",
    category: "Conversation",
    description: "A conversation row with avatar and content.",
    intro: [
      "Message is the row around a bubble: an avatar on one side, a column of content on the other, with an optional header for the author and footer for the timestamp or the read state. Reach for it when a transcript needs author identity or per-turn metadata — a plain `BubbleGroup` is enough when the turns speak for themselves.",
      "`align` is set once, on the row, and every part follows it: the row reverses its own flex direction, `MessageContent` pushes each slotted child to the far side, and a Bubble inside reads `group-data-[align=end]/message`. No part below takes an alignment prop of its own.",
    ],
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
      {
        demo: "message/assistant",
        title: "Assistant reply",
        description:
          "The full-width answer shape: a `ghost` Bubble drops the balloon entirely, and the header and footer lose their `px-4` in step through `group-has-data-[variant=ghost]/message`, so the whole turn keeps one text edge.",
      },
      {
        demo: "message/attachments",
        title: "With attachments",
        description:
          '`MessageContent` is a column, so a bubble, an `AttachmentGroup` and a footer stack inside one turn — and on `align="end"` every slotted child is pushed across, the attachment row included.',
      },
    ],
    parts: {
      MessageAvatar:
        "`self-end` so it sits at the bottom of the turn, and it lifts by 2rem when the row contains a `MessageFooter` — it tracks the bubble, not the metadata line.",
      MessageContent:
        "The column the rest of the turn sits in. Its direct children that carry a `data-slot` follow the row's `align`, which is why bubbles and attachment rows need no alignment prop.",
      MessageHeader:
        "`px-4` lines the author up with the bubble's own text; a `ghost` bubble in the row zeroes it, since ghost content has no padding to match.",
      MessageFooter:
        "Mirrors the header, and its presence is what lifts `MessageAvatar` — a footer added late realigns the row rather than sitting under it.",
    },
  },
  {
    slug: "message-scroller",
    name: "Message Scroller",
    category: "Conversation",
    description:
      "A transcript viewport that keeps itself pinned to the latest message.",
    intro: [
      "MessageScroller is the viewport a transcript lives in: it holds the view at the newest message, releases that hold the moment the reader scrolls up, and offers a jump-back button while they are away. Reach for it whenever messages arrive after the first paint — a chat, a streaming answer, a live log — and for a static list Scroll Area is the lighter choice.",
      "All of the state lives in `MessageScrollerProvider`, which renders no DOM of its own: Root, Viewport, Button and the `useMessageScroller` hooks read it through context, and outside it they throw.",
    ],
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
      {
        demo: "message-scroller/older-messages",
        title: "Loading earlier messages",
        description:
          "Prepending history leaves the reader where they were. `preserveScrollOnPrepend` is already the Viewport's default and is written out here only to name it — the older items grow upward instead of shoving the thread down.",
      },
      {
        demo: "message-scroller/jump-to-message",
        title: "Jumping to a message",
        description:
          "`messageId` on each item is the handle `useMessageScroller().scrollToMessage` takes. The hook reads the provider's context, so the jump bar has to sit inside `MessageScrollerProvider` even though it renders outside the scroller.",
      },
    ],
    parts: {
      MessageScrollerProvider:
        "Required, and renders no DOM: it owns the scroll state, so `autoScroll`, `defaultScrollPosition` and the scroll thresholds are all set here rather than on Root.",
      MessageScroller:
        "Fills its parent with `size-full min-h-0`, so the height comes from the box you put the scroller in — give that box one, or the transcript has nothing to scroll inside.",
      MessageScrollerViewport:
        'The scrolling box, and the accessible one: `role="region"`, focusable, labelled `Messages` unless you pass your own `aria-label`. `preserveScrollOnPrepend` defaults to true, which is what makes loading older messages painless.',
      MessageScrollerContent:
        'Carries `role="log"` and `aria-relevant="additions"`, so arriving messages are announced without an aria-live wrapper of your own. It also owns the gap between items.',
      MessageScrollerItem:
        "A block wrapper, so give it `flex flex-col` when the bubble inside should follow its own `align`. `messageId` is what `scrollToMessage` and visibility tracking key off; `scrollAnchor` marks the item the view holds on to.",
      MessageScrollerButton:
        "Stays mounted when there is nothing to scroll — it goes `inert` and fades out on `data-active=false` rather than unmounting, so nothing shifts under the pointer.",
    },
  },
  {
    slug: "attachment",
    name: "Attachment",
    category: "Conversation",
    description:
      "File metadata display for a message. Not an upload input — see File Upload.",
    intro: [
      "Attachment is the chip a file travels in: media thumbnail or icon, name, one line of metadata, and the actions that belong to that file. It only displays — picking files, progress and retry are File Upload's job — so this is what you render for each entry it hands you, in a message, a comment or a review panel.",
      "Three data attributes on the root drive the whole chip: `size`, `orientation` and `state` are read by every part through `group-data-*`, so no child takes a state prop of its own.",
    ],
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
      {
        demo: "attachment/clickable",
        title: "Openable cards",
        description:
          "`AttachmentTrigger` is an `absolute inset-0` overlay, so the whole card is one hit target and `render` decides whether it is a link or a button. `AttachmentActions` sits a layer above it, which is how remove stays clickable inside a card that is itself a link.",
      },
    ],
    parts: {
      Attachment:
        "Owns `state`, `size` and `orientation` as data attributes; every part below reads them through `group-data-*`, so they are set here and nowhere else.",
      AttachmentMedia:
        '`variant="image"` expects an `img` child and dims it to 60% while the file is in flight — only `done` and `idle` show the thumbnail in full. The default `icon` variant sizes a bare `svg` for you.',
      AttachmentTitle:
        "Truncates to one line, and shimmers while the root is `uploading` or `processing` — progress needs no extra element.",
      AttachmentTrigger:
        "An overlay covering the card at `z-10`. `AttachmentActions` is `z-20` so its buttons stay above it; anything else clickable inside the card needs the same lift.",
      AttachmentGroup:
        "A snap-scrolling row with faded edges, and `tabIndex={0}` so the list can be scrolled from the keyboard rather than by pointer only.",
    },
  },

  /* -- Utilities --------------------------------------------------------- */
  {
    slug: "direction",
    name: "Direction",
    category: "Utilities",
    description:
      "A provider that sets text direction (LTR/RTL) for every Base UI component beneath it.",
    intro: [
      "DirectionProvider tells every Base UI component beneath it which way the document reads. Mount it once at the app root — direction is a whole-tree fact rather than a per-component prop — and mount it again only inside a subtree that genuinely reads the other way, such as a quoted Arabic thread inside an LTR shell.",
      "It is half of the answer and the `dir` attribute is the other half: the provider is what Base UI's JavaScript reads (floating panel placement, arrow-key order, which end of a Slider is the minimum), while `dir` is what the CSS logical properties read. Set both, from the same value.",
    ],
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
          "One piece of state drives the provider and the `dir` attribute together, which is all a runtime switch is. Components of your own read that value back with `useDirection` instead of threading a prop down.",
      },
      {
        demo: "direction/axis",
        title: "Controls with an axis",
        description:
          "Where the provider earns its keep: Slider's control and thumb, and every composite's arrow-key order, take the direction from context — `dir` alone would mirror the paint and leave the keyboard running backwards.",
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

/**
 * The heading a demo renders under: its curated title, or the file name for a
 * demo no entry documents. Shared so the anatomy index can name the section a
 * part is shown in and be naming the same words the reader will scroll to.
 */
export function exampleTitle(key: string, examples: Example[] = []) {
  const documented = examples.find((example) => example.demo === key)
  return documented?.title ?? key.split("/").slice(1).join(" ")
}
