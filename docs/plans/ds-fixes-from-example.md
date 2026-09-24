# DS fixes found by the example app

Source: building [diametral-ui-example](https://github.com/diamorval/diametral-ui-example)
(8 pages, all 118 components) on `diametral-ds@0.1.0-rc.0`. Every item below is
a workaround a consumer had to write, or a gap it could not work around. Each was
checked against `packages/ui/src/components/` on 2026-09-24.

Already fixed in `b7a7d12` (published as `0.1.0-rc.1`): chart heights, Card
shadow, CardTitle heading, DataTable empty node + column labels.

## Status (2026-09-24, uncommitted on `feat/publish-diametral-ds`)

- **D1** kept: `AlertDialogAction` stays a plain Button.
- **D2** decided by the standing "no default accent" rule: `--primary` and
  `--sidebar-primary` now map to `--ds-ink` / `--ds-bg`, so checked, selected,
  active and link states are neutral and invert on dark. `--ds-accent` is
  untouched and still available as a tone.
- **D3** documented in `packages/ui/README.md`: no shadows in the page flow;
  overlays keep theirs.
- **Done:** M1, M2, M3, M4, M5, M6, W2, W3 (hash-router scroll only; the
  `aria-label` was already overridable), W4 (`TimelineTime render`), W5.
- **W1 was not a DS bug:** `DrawerContent` already wraps children in a
  `select-text` layer. The example's `select-text` can be deleted.
- **Left:** publish `0.1.0-rc.2`, then drop the example's workarounds; W6–W10,
  M7–M9 after `0.1.0`.

## 0 · Decisions needed first

| # | Question | Where | Default if nobody objects |
|---|---|---|---|
| D1 | `AlertDialogAction` is a plain Button and does not close the dialog. That is documented as deliberate (a confirm usually awaits something). Keep it, or close by default and let async confirms opt out? | `alert-dialog.tsx:142`, `registry.ts:4288` | Keep. Add an `AlertDialogClose`-wrapped variant only if a second consumer asks. |
| D2 | `--primary` is `#de2500`, so every `bg-primary` surface is red out of the box: own chat bubble, selected calendar day, active wizard step, `link` buttons. Conflicts with "no default accent colour". | `globals.css:141,206` | Needs the user's call — changes the whole palette. |
| D3 | Overlays (Dialog, Sheet, menus, popovers, chart tooltip) keep `shadow-md`. The charte is silent on elevation; the README says "no shadows". Remove, or document "in-flow flat, overlays elevated"? | 19 files, `grep -l shadow- src/components` | Document the rule in the README; keep overlay shadows. |

## 1 · Workarounds every consumer repeats

| # | Component | Problem | Consumer workaround today | Fix |
|---|---|---|---|---|
| W1 | Drawer | `DrawerContent` sets `select-none` on the whole panel (`drawer.tsx:75`, also 117/125/156) | `select-text` on the body | Keep `select-none` on the drag handle only |
| W2 | Carousel | Prev/next sit at `-start-12` / `-end-12`, outside the slides (`carousel.tsx:190`) | `px-12` on the wrapper | Place arrows inside, or add `controls="inside"` |
| W3 | Toc | Hard-coded `aria-label="On this page"` (`toc.tsx:10`); links are plain anchors, so hash routers navigate away | `preventDefault` + manual scroll | Accept `aria-label`; `TocLink` scrolls with `scrollIntoView` and calls `history.replaceState` |
| W4 | Timeline + RelativeTime | Both render `<time>` (`timeline.tsx:109`, `relative-time.tsx:145`), so nesting is invalid HTML | Put RelativeTime outside TimelineTime | `TimelineTime` accepts `render`, or renders a `span` when its child is a `<time>` |
| W5 | AvatarGroup | `-space-x-2` overlap clips two-letter initials at `size="sm"` (`avatar.tsx:76`) | Use default size | Reduce overlap for `sm`, or 1-letter fallback at `sm` |
| W6 | Select | `SelectValue` shows the raw value unless `items` is passed | Always pass `items` | Document loudly in the Select page, or derive labels from `SelectItem` children |
| W7 | DataTable | Built-in search filters one column; built-in pager is prev/next only, not the DS `Pagination` | Filter outside the table | `globalFilter` search; render `Pagination` in the footer |
| W8 | SpeedDial | `fixed end-6 bottom-6 z-40` by default (`speed-dial.tsx:52`) collides with toasts | Accept it | Default to in-flow; `position="fixed"` opt-in, or offset above the toast viewport |
| W9 | Agenda | `AgendaEvent.date: Date \| string` (`agenda.tsx:11`) forces casts when filtering | `as Date` casts | Normalise to `Date` internally; type the public field as `Date` |
| W10 | Status colours | No `text-success` / `text-danger` utilities, so Sparkline strokes use `var(--ds-success-ink)` | Raw CSS vars | Map `--ds-*-ink` to `--color-success` etc. in `@theme inline` |

## 2 · Missing features (no workaround possible)

| # | Component | Gap | Fix |
|---|---|---|---|
| M1 | PhoneInput | No `id` / `aria-*` reach the input; hard-codes `aria-label="Phone number"` (`phone-input.tsx:118`); no invalid state | Forward `id`, `aria-describedby`, `aria-invalid` to the number input; drop the hard-coded label when labelled |
| M2 | DateRangePicker | Props list (`date-range-picker.tsx:19-28`) takes no `id`, aria props or `aria-invalid` | Spread remaining props onto the trigger |
| M3 | ColorPicker | Always sets its own `aria-label` ("Colour"), so a `FieldLabel` is ignored | Only default the label when neither `aria-labelledby` nor `id` is given |
| M4 | Editable | Edit / Save / Cancel buttons are always labelled just that (`editable.tsx:98,108,135`) | `labels` prop, or derive "Edit {name}" from `aria-label` |
| M5 | Wizard | Cannot validate on Next; `disableNext` only greys the button (`wizard.tsx:21`) | `onBeforeNext?: (index) => boolean \| Promise<boolean>` |
| M6 | StatCardDelta | `direction` sets both arrow and colour (`stat-card.tsx:52`), so "up is bad" metrics lie | Add `tone="positive" \| "negative" \| "neutral"`, defaulting from `direction` |
| M7 | Treemap | No built-in legend; the demo draws its own | `legend` prop reusing `ChartLegend` |
| M8 | Icon | Registry has 3 names (bell, check, copy) — barely useful to apps | Decide: grow it, or stop exporting it publicly |
| M9 | TreeLeaf | Plain list item: no selection, no keyboard | Selectable leaves with roving tabindex |

## Suggested order for next session

1. Settle D1–D3 (15 min, user).
2. M1, M2, M3, M4 — accessibility, same shape of fix each (about 1 h).
3. W1–W5 — one-liners and small markup changes (about 45 min).
4. M5, M6 — small API additions (about 45 min).
5. Publish `0.1.0-rc.2`, delete the matching workarounds in the example, re-run its smoke test.
6. W6–W10, M7–M9 — after `0.1.0`, as they come up.
