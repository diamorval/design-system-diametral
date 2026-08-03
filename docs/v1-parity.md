# v1 React parity

What `@diametral/ui` (this repo, v2) is missing relative to
`@diametral/design-system`'s `react/` layer (v1, at `../../design-system`), and
what differs where both ship the same thing.

Findings point **one direction only** — into v2. Where v2 is ahead, it is noted
but not itemised.

- **Compared:** v1's 80 React exports (63 files in `react/components/` plus 17
  primitives in `react/index.js`) against v2's 95 components in
  `packages/ui/src/components/`.
- **Method:** name mapping by hand, then prop surfaces from v1's `.d.ts` files
  against v2's TypeScript prop types. Capability-level, not prop-name-level —
  see "Why prop-name diffing misleads" below.
- **Date:** 2026-08-03, v1 at 0.11.0, v2 at 0.1.0.

---

## The two findings that reframe everything else

### 1. Config-driven vs compositional

v1 components take **configuration arrays**: `Accordion` has an `items` prop,
`DataGrid` has `columns`, `Select` has `options`, `Wizard` has `steps`. v2
components are **Base UI / shadcn part trees**: `<Accordion><AccordionItem>
<AccordionTrigger>…`.

This means a mechanical prop diff reports hundreds of "missing props" that are
not gaps — v1's `items` has no v2 equivalent *by design*, because you compose
children instead. v2's `autocomplete` exposes 10+ parts where v1's `Combobox`
exposed one `options` prop; that is v2 ahead, not behind.

Every prop delta in this document has been filtered against this. If a v1 prop
is absent because v2 composes instead, it is not listed.

### 2. Opinionated vs primitive, in charts

v1 ships **8 finished chart components** — hand-rolled inline SVG via
`React.createElement`, no chart library, no dependency on v1's CSS (they use
`currentColor` and explicit props). `Sparkline` is 97 lines end to end.

v2 ships **`chart.tsx`** — a recharts `ChartContainer` / `ChartTooltip` /
`ChartLegend` primitive set, with no opinionated wrappers on top. `recharts@3.8.0`
is already a dependency.

So this is not a coverage gap, it is an **abstraction-level gap**: v1 gives you
`<LineChart data={…} />`, v2 gives you the parts to build one. Closing it means
writing wrappers, not charts.

---

## Coverage: 24 renames that are not gaps

A raw inventory diff reports 34 v1 exports with no same-named v2 file. Most are
v2 renaming toward shadcn/Base UI vocabulary. These are **covered**:

| v1 | v2 | Note |
| --- | --- | --- |
| `Modal` | `dialog` | |
| `Dropdown` | `dropdown-menu` | |
| `NumberInput` | `number-field` | |
| `Range` | `slider` | |
| `EmptyState` | `empty` | |
| `FormField` | `field` | |
| `FieldHint` | `field` | `FieldDescription` / `FieldError` parts |
| `Radio` | `radio-group` | |
| `Segmented` | `toggle-group` | |
| `TagInput` | `tags-input` | |
| `CommandPalette` | `command` | |
| `DataGrid` | `data-table` | **large capability delta — see below** |
| `ToastProvider` | `toast` | `ToastProvider` exists as a part |
| `Callout` | `alert` | |
| `Chip` | `tag` | documented port |
| `Metric` | `stat-card` | |
| `SectionHeading` | `page-header` | |
| `VerticalNav` | `sidebar` | |
| `ButtonGroup` | `button-group` | `IconButton`/`SplitButton` still absent |
| `Combobox` | `combobox` + `autocomplete` | v2 ahead: two components, part-based |
| `MultiSelect` | `multi-select` | |
| `Tree` | `tree` | compositional in v2 |
| `Stepper` | `stepper` | presentational only — `Wizard` state absent |
| `AppShell` / `ConsoleLayout` | `sidebar` | partial — see scope section |

### Already ported, with the receipt in the code

Six v2 components carry a header comment citing the exact v1 source they came
from. Checking these first avoids re-porting shipped work:

`description-list` · `gauge` ← `GaugeChart` · `icon` · `panel` · `stat-card` ←
`StatCard` · `tag` ← `Chip`

`gauge.tsx` is a complete port of `GaugeChart` — identical prop surface
(`value`, `max`, `size`, `thickness`, `label`, `color`, `thresholds`, `format`).
**Keep this convention:** every component ported by the issues below should cite
`react/components/<X>.js` in its header.

### Where v2 is ahead

48 v2 components have no v1 counterpart, including `alert-dialog`, `attachment`,
`bubble`, `carousel`, `context-menu`, `editable`, `hover-card`, `input-otp`,
`marker`, `masonry`, `menubar`, `message` / `message-scroller`, `meter`,
`navigation-menu`, `phone-input`, `qr-code`, `relative-time`, `resizable`,
`scroll-area`, `sheet`, `snippet`, `theme-switcher`, `toc`. Also `avatar`, which
gains `AvatarGroup` / `AvatarGroupCount` / `AvatarBadge` over v1's single `max`
prop.

---

## Ranking method

Ordered by **measured v1 usage** — the number of files under v1's `examples/`,
`starters/` and `docs/` that reference each export — with ties broken by porting
effort.

Caveat, stated plainly: that count includes v1's own documentation pages, so it
is a proxy for "how load-bearing in v1" and not pure application usage. `DataGrid`
at 14 and `Sparkline` at 9 are clearly real; the items at 2–3 are within noise of
each other and their relative order should not be over-read.

---

## 1. `DataTable` parity — the largest single gap

**Usage: 14 files, the highest of anything measured.**

v1 `DataGrid` has ~30 props. v2 `DataTable` has 7: `columns`, `data`, `pageSize`,
`searchColumn`, `searchPlaceholder`, `emptyMessage`, `className`.

v2 wires only client-side TanStack row models (`getSortedRowModel`,
`getFilteredRowModel`, `getPaginationRowModel`). Absent:

| Capability | v1 API | Notes |
| --- | --- | --- |
| Row selection | `selectable`, `selectedKeys`, `defaultSelectedKeys`, `onSelectionChange` | TanStack `getRowSelection`; v2 has `checkbox` already |
| Expandable detail rows | `expandable`, `renderDetail` | TanStack `getExpandedRowModel` |
| Server-side loading | `loadPage`, `lazyMode: "pagination" \| "infinite"` | needs `manualPagination`/`manualSorting`; v1 also ships `restLoadPage` as a ready adapter |
| Column visibility | `columnToggle` | TanStack `columnVisibility` state |
| Column reordering | `reorderable` | TanStack `columnOrder`; `@dnd-kit` already a dep |
| Inline cell editing | `editable`, `onCellEdit` | double-click to edit in v1 |
| Header slots | `title`, `toolbar` | v2 has neither |
| Controlled sort | `defaultSort`, `onSortChange` | v2 keeps sort in internal state only |

TanStack Table supports every one of these. None is wired up. This is
configuration work, not new machinery.

## 2. Charts

**Decision taken:** build the wrappers on the existing `chart.tsx` recharts
primitives — one chart stack, tooltips/legends/theming inherited for free.
**Exception:** `Sparkline` stays hand-rolled SVG. Recharts is overkill for a
single `<polyline>`, and a sparkline has to stay cheap enough to drop into every
row of a table.

| Item | v1 usage | v1 props to preserve |
| --- | --- | --- |
| `Sparkline` (port SVG as-is) | 9 | `data`, `width`, `height`, `stroke`, `fill`, `showDot`, `animate` |
| `LineChart` (establishes the wrapper pattern) | 5 | `data`, `series`, `labels`, `name`, `color`, `dots`, `grid`, `width`, `height` |
| `BarChart` | 5 | `data`, `value`, `label`, `max`, `status`, `horizontal` |
| `AreaChart` | 4 | same shape as `LineChart` |
| `DonutChart` | 4 | `data`, `value`, `label`, `centerLabel`, `color`, `size`, `thickness` |
| `PieChart` | 2 | `data`, `value`, `label`, `legend`, `color`, `size` |
| `StackedBar` | 2 | `data`, `value`, `label`, `segments`, `color`, `showLegend` |

`GaugeChart` is **already done** — it is v2's `gauge`.

## 3. Component absences

| Item | v1 usage | Note |
| --- | --- | --- |
| `ColorPicker` | 3 | `value`, `defaultValue`, `onChange`, `swatches`, `name`, `disabled`. No v2 equivalent. |
| `Agenda` | 3 | Day/event list: `date`, `events`, `time`, `title`, `meta`, `status`, `emptyMessage`. Related: v1's `Calendar` is an **event calendar** (`events`, `status`, `maxPerDay`, `showToday`) while v2's is `react-day-picker` date selection. Same gap, two entry points. |
| `IconButton` + `SplitButton` | 3 / 2 | v1 ships both in `ButtonExtras.js`. `ButtonGroup` is already covered by v2's `button-group`. `IconButton` requires `label` — it is the accessible-name-enforcing variant, which v2 currently has no equivalent of. |
| `Wizard` | 5 | v2's `stepper` is presentational parts only. `Wizard` adds the state machine: `active`, `defaultActive`, `onStepChange`, `onFinish`, `disableNext`, `steps`, `content`. |
| `DateTimePicker` | — | v2 has `date-picker` and `time-picker` as separate components but nothing combining them. v1: `value`, `defaultValue`, `onChange`, `min`, `max`, `step`. |
| `Kanban` | 5 | `columns`, `items`, `itemKey`, `onMove`, `renderCard`. Would be the **first consumer of `@dnd-kit`** — see side findings. Needs triage before building. |

## 4. Small capability deltas on overlapping pairs

Filtered to gaps that are not composition artifacts:

| Pair | Missing in v2 |
| --- | --- |
| `Pagination` → `pagination` | v2 is parts only (`PaginationItem`, `PaginationLink`, `PaginationEllipsis`) with **no page-window logic**. v1's `pageCount` + `siblingCount` computes which pages and ellipses to show. Every v2 consumer hand-rolls that today. |
| `Alert` → `alert` | No `dismissible` / `onDismiss`. v2 has `AlertAction` but no close affordance. |
| `Spinner` → `spinner` | No `label`. v1's spinner carried an accessible name; v2's is a bare `<svg>`, so a spinner is announced as nothing. **This is an a11y gap, not a convenience one.** |
| `Skeleton` → `skeleton` | No `count` / `variant` / `width` / `height`. Genuinely covered by Tailwind classes — listed for completeness, recommend no action. |
| `Progress` → `progress` | v1's `indeterminate` maps to Base UI's `value={null}`. Believed covered by the primitive; worth one confirming check. |

---

## Needs a scope decision, not a port

v2's README says v1 "remains the home of the buildless CSS, Web Components,
email templates and Keycloak theme" and that "this repository is the React
layer" — but it is silent on v1's React **hooks and shells**, which is exactly
the contested strip. These are listed, not ranked, because whether they belong
in v2 at all is undecided.

### The form and data layer

v1 ships `useForm` (3.7K), `useResource`, `restLoadPage`. v2 has **no form-state
story at all**: no `react-hook-form`, no `zod`, no data-fetching dependency, and
`form.tsx` is a 338-byte retired stub (`field` replaced it). v2's two hooks
(`use-controllable-value`, `use-mobile`) are both internal.

`restLoadPage` is also the ready-made adapter for `DataTable`'s absent
server-side loading, so this decision partly blocks item 1 above.

**The question:** is v2 deliberately presentation-only, with form state left to
the consumer, or does "the React layer" include it?

### The app shell

`AppShell` (2 files) and `ConsoleLayout` (7 files — the highest-usage item in
this section). v2 has `sidebar` (21.5K, the largest component in the package),
but a sidebar is not a shell: `ConsoleLayout` bundles brand, nav, search,
command palette, theme switcher, user menu and sign-out into one opinionated
frame.

**The question:** does a component library ship an application frame, or is that
a starter-template concern? v1 answers yes; v2 has no position.

---

## Side findings

- **`@dnd-kit` is three unused dependencies.** `@dnd-kit/core`,
  `@dnd-kit/sortable` and `@dnd-kit/utilities` are declared in
  `packages/ui/package.json` but imported nowhere in `packages/ui/src` or
  `apps/web/src`. Either `Kanban` / column reordering becomes their first
  consumer, or they should be removed.
- **The README component count is stale.** Root `README.md` says "72 React
  components"; there are 95 files in `packages/ui/src/components/`.
- **`cva` is the minority convention.** 20 of 95 components use it. New ported
  components should follow the surrounding file, not assume variants.
- **Every port touches four places.** The registry is the sidebar, the playground
  source *and* the Playwright test manifest. A component added without a
  `ComponentDoc` entry is invisible and untested. Definition of done for any
  port issue:
  1. `packages/ui/src/components/<slug>.tsx` — relative imports with explicit
     `.js` extensions
  2. `apps/web/src/registry/registry.ts` — `ComponentDoc` entry
  3. `apps/web/src/registry/demos/<slug>/*.tsx` — 3–4 demos
  4. `apps/web/src/registry/playgrounds.ts` — knob set

  Exports are wildcarded (`./components/*`), so no barrel edit is needed.
