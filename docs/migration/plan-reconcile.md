# Plan reconcile — the batch plan against `feat/css-conversion`

Resolution artifact for [Reconcile the batch plan against feat/css-conversion](https://github.com/diamorval/design-system-diametral/issues/169), under [the absorption map](https://github.com/diamorval/design-system-diametral/issues/168). Re-measures the inputs of [`batch-plan.md`](./batch-plan.md); does **not** re-open which components absorb or in what order.

Measured 2026-09-01 against source `packages/ui/src` @ `feat/css-conversion` **9182a91** and target `/Users/augustinmorval/code/design-system` @ `feat/components-migration` **23a0198**.

---

## Headline

**Five rows checked. Four confirmed unchanged, one corrected, and one input the plan never had.**

| | |
| --- | --- |
| rows re-measured | **5** |
| confirmed, no movement | **4** — `z-index: 50`, dedupe exceptions, ledger verdicts, per-batch LOC |
| corrected | **1** — `.ds-input` is **not** a four-way collision |
| ledger verdicts flipped | **0** |
| batches needing a re-cut on LOC | **0** — every batch measures within 1 LOC of its stated figure |
| **new** — unrecorded input | **17 forward cross-batch imports** across 12 components, 1 of which has no target fallback |

**The plan's premise correction.** #169 assumes the plan's task list was measured before `feat/css-conversion` landed. It was not. `batch-plan.md`'s own header cites `9182a91`, which is the current tip of `feat/css-conversion`, and `git rev-list --count main..feat/css-conversion` = 91 with `git diff --shortstat main...feat/css-conversion` = `224 files changed, 11853 insertions(+), 2062 deletions(-)` — the exact figures #169 quotes. **The plan already consumed all 91 commits.** What was measured pre-conversion is #157's inherited list, and `css-ledger.md` §5.1–5.3 already re-measured and corrected it. That is why four of five rows confirm.

**The one thing worth acting on** is not on #169's list: twelve components in batches 1, 2, 3 and 6 import source symbols that do not land until batch 7, and `item` (batch 2) imports `separator` (batch 3), for which the target has no fallback at all. See row 6.

---

## Row 1 — the `z-index: 50` remap · **CONFIRMED**

**Plan says** (§7, §4): 18 rules, distributed **B1 7 · B7 2 · B8 9**. `css-ledger.md` §5.2 adds: "18 rules, not 28", 14 concentrated in the overlay family.

**True now.**

```
$ grep -rn "z-index: *50\b" packages/ui/src | wc -l
28
```

The raw count is **28**, exactly the ledger's stated raw figure. Broken out:

| component | rules | batch |
| --- | --- | --- |
| `context-menu` | 2 | B1 |
| `hover-card` | 2 | B1 |
| `autocomplete` | 1 | B1 |
| `navigation-menu` | 1 | B1 |
| `speed-dial` | 1 | B1 |
| **B1 subtotal** | **7** | |
| `select` | 2 | **B7 = 2** |
| `drawer` | 3 | B8 |
| `sheet` | 2 | B8 |
| `tooltip` | 4 | B8 |
| **B8 subtotal** | **9** | |
| `alert-dialog` 2 · `dialog` 2 · `dropdown-menu` 2 · `popover` 2 · `combobox` 1 · `toast` 1 | 10 | **none** — held source, never lands |

**7 + 2 + 9 = 18.** The distribution reproduces exactly. The 10 remainder sit on components no batch absorbs, so their stylesheets are discarded and they are free.

Also confirmed as a by-product: `grep -rn 'z-\[50\]\|z-50\|zIndex: *50' packages/ui/src` returns **nothing** — the Tailwind `z-50` literals are fully gone, so all 18 are plain-CSS rules ready to remap.

**Batch impact: none.**

---

## Row 2 — the "41 documented dedupe exceptions" · **CONFIRMED (the two numbers were never in conflict)**

**Plan / ledger says** (`css-ledger.md` §5.3 tail): "The **56 documented dedupe exceptions across 43 files** stand as #157 described them: a defect checklist, not nuance. 41 are in CSS, 15 in TSX."

**True now.** The 41/56 tension #169 raises does not exist — **41 and 56 are the same measurement read two ways**, and no commit ever claimed "56 documented exceptions" (`git log main..feat/css-conversion --format='%B' | grep -i exception` returns one hit, and it is prose about a single commit's four files). What the numbers actually are:

```
$ grep -rn -i 'dedupe' packages/ui/src | wc -l       →  56   (line hits)
$ grep -rl -i 'dedupe' packages/ui/src | wc -l       →  43   (files)
$ grep -rl -i 'dedupe' packages/ui/src/styles | wc -l →  41   (CSS files)
$ grep -rl -i 'dedupe' packages/ui/src/components | wc -l → 2 (TSX files)
```

So **56** is the raw line count and **43** the file count; **41** is the CSS *file* count, not a CSS *exception* count. The ledger's "41 in CSS, 15 in TSX" splits 56 into 41 + 15, but the true TSX side is **2 files**, not 15. The ledger's split is arithmetic on a line count, not a measurement of the TSX side.

Counted properly — one exception per comment block, since several files carry more than one:

| | blocks | files |
| --- | --- | --- |
| CSS | **49** | 41 |
| TSX | **2** | 2 |
| **total** | **51** | **43** |

Multi-exception files: `toc.css` 4 · `sidebar.css` 3 · `field-array.css`, `input-group.css`, `number-field.css` 2 each.

### Which are still owed

Every one of the 51 documents the same thing: **a Tailwind utility literal deliberately left in a `className` because `tailwind-merge` must be able to dedupe an override against it.** The target has no `tailwind-merge` — `package-lock.json` is 5.0 K and the package is zero-dependency; `package.json` exports a `./tailwind-preset` but ships no runtime merge. **So every exception on a stylesheet that lands must be resolved, not carried.** Mapped to batches:

| batch | files | exceptions | owed? |
| --- | --- | --- | --- |
| B1 | `navigation-menu`, `speed-dial` | 2 | yes |
| B2 | `bubble`, `message-scroller`, `toc` (4), `resizable` | 7 | yes |
| B3 | `carousel`, `phone-input`, `button-group.tsx`, `field-array` (2), `wordmark`, `separator` | 7 | yes |
| B4 | `chart`, `donut-chart`, `stacked-bar`, `pie-chart.css`, `pie-chart.tsx` | 5 | yes |
| B5 | `funnel-chart`, `treemap`, `scatter-chart`, `radar-chart`, `waterfall-chart` | 5 | yes |
| B6 | `timeline`, `pagination`, `table` | 3 | yes |
| B7 | `select`, `input-group` (2), `card`, `textarea`, `checkbox-group` | 6 | yes |
| B8 | `sheet` | 1 | yes |
| B8 (sidebar) | `sidebar` (3) | 3 | **no** — `sidebar.css` does not land; only the two cherry-picks do |
| **none** | `calendar`, `command`, `date-picker`, `date-range-picker`, `dialog`, `dropdown-menu`, `file-upload`, `number-field` (2), `radio-group`, `tabs`, `tags-input` | 12 | **no** — held source, discarded with the file |

**36 exceptions across 31 files are owed; 15 across 12 files are free.** The four the last commit documented (`date-picker`, `date-range-picker`, `timeline`, `number-field`) split: `timeline` is owed in B6, the other three are free.

**Batch impact:** no batch's *component contents* change. Every batch gains an explicit exception count as a checklist line; three batches (`sidebar`'s 3, the 12 held) can strike theirs.

---

## Row 3 — `.ds-input`'s four-way collision · **CORRECTED**

**Plan says** (§4 Batch 7; `css-ledger.md` §6.6): "`.ds-input`'s four-way dedupe — defined in `field.css` (canonical, frozen) plus `color-picker.css`, `combobox.css` and `time-picker.css`, resolved silently by load order today. Three redefinitions of a frozen class."

**True now: it is one-way. `.ds-input` is declared in exactly one file.**

```
$ grep -rn '\.ds-input' css/ | ...          (target @ 23a0198, HEAD — unmoved)
css/components/field.css:15,36,39,45,47,48,51,54   ← the only declarations
css/components/combobox.css:3                      ← a comment: ".ds-input look (1px border…)"
css/components/color-picker.css:5                  ← a comment
css/components/time-picker.css:3                   ← a comment
css/components/color-picker.css:54  .ds-colorpicker__row .ds-input { … }
css/components/time-picker.css:13   .ds-timepicker > .ds-input { min-width: 140px; }
```

`combobox.css` does not style `.ds-input` **at all** — its only mention is prose in the file header. `color-picker.css` and `time-picker.css` carry **descendant/child overrides**, not redefinitions: `.ds-colorpicker__row .ds-input` sets `width`/`font-variant-numeric`/`text-transform`; `.ds-timepicker > .ds-input` sets `min-width`. Both are higher-specificity contextual rules that win on specificity, not on load order — there is no silent-cascade defect.

The original figure came from a `grep '.ds-input'` that counted comments and descendant selectors as definitions. Two things follow:

1. **There is no three-way redefinition to dedupe.** The batch 7 line item as written has no work behind it.
2. **If contextual overrides are what is meant, it is six files, not four** — `toolbar.css:38`, `date-picker.css:16` and `date-range.css:17` do exactly the same thing (`.ds-toolbar .ds-input`, `.ds-datepicker > .ds-input`, `.ds-daterange > .ds-input`), and none were listed. Three of those six (`toolbar`, `date-picker`, `date-range`) belong to files the plan holds or replaces in a different batch.

This is **not** movement caused by `feat/css-conversion`: the target is at `23a0198`, unchanged since the plan measured, and the source's own `.ds-input` lives only in `packages/ui/src/styles/components/input.css` (8 rules, one file). It is a mis-measurement in the inherited input.

**Batch impact:** batch 7 loses one line item. `.ds-input`'s four-way dedupe should be struck. What survives is a much smaller obligation belonging to the `field.css` absorption: **when `.ds-input` is renamed into the frozen grammar, six contextual overrides in five other stylesheets must be renamed with it** (`color-picker`, `time-picker`, `toolbar`, `date-picker`, `date-range` — all held or non-batch-7 files, so this genuinely is safe nowhere earlier than batch 7, which the plan got right for the wrong reason).

---

## Row 4 — ledger verdicts that might have flipped like `stat-card` · **CONFIRMED — zero flips**

**Plan says** (§1.1): `stat-card` flips to *incumbent holds* because the source is a regression, moving the ledger headline 40/46/29/4 → **40/45/30/4**. #169 asks whether any of the 23 components `feat/css-conversion` rewrote does the same.

**True now: none of them. The headline stays 40/45/30/4.**

The structural reason first, because it decides most of the 23. Before the conversion the source had **no per-component stylesheets at all**:

```
$ git ls-tree -r --name-only $(git merge-base main feat/css-conversion) packages/ui/src/styles/
packages/ui/src/styles/globals.css
```

One file. All 111 of `packages/ui/src/styles/components/*.css` were *created* by the 91 commits — that is what the 11,853 insertions are. So there is no pre-conversion source CSS for any of the 23 to have regressed against, and the ledger measured the post-conversion tree anyway.

That leaves the test #169 actually names: **is the source's CSS worse than the target's held version?** A flip needs a target version to lose to. Of the 23:

| | components | can it flip? |
| --- | --- | --- |
| **no target counterpart** (15) | `carousel`, `resizable`, `editable`, `field-array`, `theme-switcher`, `speed-dial`, `button-group`, `attachment`, `marker`, `masonry`, `separator`, `wordmark`, `label`\*, `input-group`\*, `checkbox-group`\* | no — nothing to lose to; these are additions |
| **already held** (5) | `tabs` → `tabs.css`, `code-block` → `code-block.css`, `command` → `command-palette.css`, `tags-input` → `tag-input.css`, `sidebar` → `app-shell.css` | no — the incumbent already holds; no verdict left to flip |
| **real candidates** (3) | `card`, `table`, `pagination` | yes |

\* `label`, `input-group` and `checkbox-group` have no file of their own in the target; they map into `form-controls.css`, whose seven-way split §1.3 already decided. 15 + 5 + 3 = 23.

The three candidates, probed for the capability a wholesale replacement would drop:

| pair | source | target |
| --- | --- | --- |
| `card.css` | 42 decls, 0 `:focus-visible`, 0 `:hover` | 36 decls, 1 `:focus-visible`, 1 `:hover` |
| `table.css` | 39 decls, 1 `:hover` | 34 decls, 2 `:hover` |
| `pagination.css` | **16 decls, 0 `:focus-visible`, 0 `:hover`** | **50 decls, 2 `:focus-visible`, 5 `:hover`** |

`card` and `table` are near parity and `card` is an absorb-into-contract anyway, so the target's `--clickable` hover/focus rules survive by construction. **`pagination` looks like a flip and is not.** Its source stylesheet is layout-only — no border, no colour, no token, no active-page fill, no disabled state, no focus ring — because `pagination.tsx:4` imports `Button` and `:95` renders every page as one, with `aria-current="page"` at `:102`. All the visual state lives in `button.css`. Delegation, not regression.

**No verdict flips. Batch impact: none.** Two smaller obligations fall out, neither a flip:

- **Batch 6, `table`.** The plan says `table.css` "replaces on its own". It does not replace cleanly: the target's `.ds-table--hover`, `.ds-table__num`, `.ds-table__name` and `.ds-table__row-action` have no source equivalent and have in-repo readers — `examples/demo/views/files.js`, `examples/components/table.html`, `examples/components/console-layout.html`, `examples/kitchen-sink.html`, `docs/components.md`, `docs/migration.md`. Editable per `css-ledger.md` §6.3, so a task, not a freeze — but a task batch 6 does not currently carry.
- **Batch 7, `card`.** `react/components/Card.js` renders `ds-card--clickable` and `ds-card__media`, and `docs/components.md` + four `examples/` pages read `ds-card__block`. The batch-7 frozen-reader list does not name them.
- **Batch 6, `pagination`.** §8.1's "one look owed" stands, unchanged — but it is a *React* question only. The CSS thinness is not evidence against the source, and should not be read as such when that look is taken.

---

## Row 5 — per-batch landing LOC · **CONFIRMED**

**Plan says** (§4): B1 2,031 · B2 2,345 · B3 1,839 · B4 1,591 · B5 1,889 · B6 2,464 · B7 2,715 · B8 1,528; total **16,402**.

**True now.** Recomputed as `wc -l` of each listed component's `components/<c>.tsx` + `styles/components/<c>.css` at `9182a91`:

| batch | stated | measured | delta |
| --- | --- | --- | --- |
| 1 | 2,031 | **2,031** | 0 |
| 2 | 2,345 | **2,345** | 0 |
| 3 | 1,839 | **1,840** | +1 |
| 4 | 1,591 | **1,591** | 0 |
| 5 | 1,889 | **1,889** | 0 |
| 6 | 2,464 | **2,464** | 0 |
| 7 | 2,715 | **2,715** | 0 |
| 8 | 1,528 | **1,528** | 0 |
| **total** | **16,402** | **16,403** | +1 |

Exact to one line across eight batches — further confirmation that the plan was measured on this tree. **No batch has moved materially off its figure. No re-cut is warranted on LOC.**

One arithmetic correction, inside the plan's own footnotes rather than its table. Both CSS-only-admit adjustments are overstated, because a CSS-only admit drops the `.tsx` and keeps the `.css`:

| batch | plan's "real" figure | correct | why |
| --- | --- | --- | --- |
| B2 | ~2,197 | **2,175** | −`message-scroller.tsx` 128 −`resizable.tsx` 42 |
| B3 | ~1,668 | **1,536** | −`carousel.tsx` 226 −`input-otp.tsx` 78 (the plan appears to have subtracted `input-otp` only) |

Neither crosses a threshold — B3 simply becomes the smallest batch instead of the third-smallest, and the ~2,050 target is unaffected. Related and also confirmed: `@layer utilities` is present in **111 files** (`grep -rl '@layer utilities' packages/ui/src | wc -l` = 111, 222 open/close markers), of which **82** belong to landing components — exactly `css-ledger.md` §5.1. The row is right as written.

---

## Row 6 — **NEW**: forward cross-batch imports the plan does not record

Not on #169's list. It surfaced from row 4's `pagination` investigation and is the only finding here that changes what a batch has to do.

**Plan says** (§2, override 1): *"Dependency beats tier."* The plan applies this override exactly once — `chart` before the eight net-new charts, which is why batches 4 and 5 sit at the T1/T2 boundary. It also records four re-wiring obligations where an absorbed component imports a **held** source component: `menubar`→`dropdown-menu` (B1), `theme-switcher`→`dropdown-menu`/`toggle-group` (B2), `snippet`→`code-block` (B2).

**True now.** Those four held-imports are confirmed, exactly four, no more. But scanning every absorbed component's `from "./<x>.js"` imports against the batch assignment finds **17 additional imports that point *forward* to a later batch**:

| importer | batch | imports | lands in |
| --- | --- | --- | --- |
| `autocomplete` | B1 | `input-group` | B7 |
| `speed-dial` | B1 | `button` | B7 |
| `attachment` | B2 | `button` | B7 |
| `message-scroller` | B2 | `button` | B7 |
| `theme-switcher` | B2 | `button` | B7 |
| **`item`** | **B2** | **`separator`** | **B3** |
| `carousel` | B3 | `button` | B7 |
| `editable` | B3 | `button`, `input` | B7 |
| `field-array` | B3 | `button` | B7 |
| `icon-button` | B3 | `button` | B7 |
| `phone-input` | B3 | `input`, `select` | B7 |
| `agenda` | B6 | `status` | B7 |
| `pagination` | B6 | `button` | B7 |
| `toolbar` | B6 | `button`, `input` | B7 |

Sixteen of the seventeen point at batch 7 (`button` ×9, `input` ×3, `select`, `status`, `input-group`), and **all sixteen have a target symbol to re-compose onto** — `Button` and `Input` at `react/index.js:20` and `:38`, `Status` at `:97`, `Select` in `react/components/Select.js:11`, `InputGroup` in `react/components/InputGroup.js:9`. So each is a **re-wiring obligation of exactly the same class as the four the plan already lists**, and the plan lists none of them. Each also gets re-wired twice: onto the incumbent in its own batch, then back onto the source when batch 7 absorbs the real one.

**The seventeenth cannot be re-wired.** `item.tsx:7` imports `Separator` from `./separator.js`. `item` is batch 2; `separator` is batch 3. The target has **no `Separator` component and no `.ds-separator` rule anywhere in `react/` or `css/`** — the plan itself notes `separator` "has no target stylesheet at all". There is nothing to compose onto for one batch.

**Batch impact.** Batches 1, 2, 3 and 6 each gain re-wiring line-items they do not currently carry (2 · 4 · 7 · 3). And one cluster boundary is missing from §6: **`item` and `separator` cannot be one batch apart in that direction.** Under the plan's own override 1 — dependency beats tier, the rule that already moved `chart` — `separator` (39 LOC, T1, no target file, admits outright) belongs in batch 2 alongside `item`, or `item` moves to batch 3. Both are net-new T1 additions in adjacent batches, so this is a re-cut the ordering rule permits without re-deciding anything: −39 LOC on B3 (1,840→1,801), +39 on B2 (2,345→2,384).

---

## Summary table

| # | row | verdict | batch contents change? |
| --- | --- | --- | --- |
| 1 | `z-index: 50` — 18 across B1/B7/B8 | **confirmed**, 7+2+9 reproduces exactly | no |
| 2 | dedupe exceptions | **confirmed** — 41 and 56 were the same measurement; true count 51 across 43 files, **36 owed** | no; each batch gains a checklist count |
| 3 | `.ds-input` four-way | **corrected** — one-way, not four | yes, B7 loses a line item |
| 4 | ledger verdicts | **confirmed** — zero flips, headline stays 40/45/30/4 | no; B6 `table` and B7 `card` gain reader obligations |
| 5 | per-batch LOC | **confirmed** — exact to 1 line in 16,403 | no; two footnote figures corrected |
| 6 | forward cross-batch imports | **new** — 17 unrecorded, 1 unresolvable | yes, B1/B2/B3/B6 gain re-wiring; `item`+`separator` is a cluster boundary |

Nothing here re-opens which components absorb or in what order.
