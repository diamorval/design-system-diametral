# Quality gates

Two Playwright suites run against the docs app. The docs app is only the
harness — the subject under test is `@diametral/ui`. Every component has a route
(`/docs/<slug>`) with a live playground, so driving the docs app exercises the
real components instead of fixtures written to make tests pass.

Both suites run against `vite preview` (a production build), not the dev server,
so what is measured is what consumers get.

```bash
pnpm --filter web test:a11y            # axe-core over every route, both themes
pnpm --filter web test:visual          # screenshot comparison, curated routes
pnpm --filter web test:visual:update   # regenerate baselines — CI ONLY, see below
```

## Route enumeration

`harness.ts` derives routes from `src/registry/registry.ts`, so a component added
to the registry is covered on the next run with no test edit. There is no
hand-maintained page list to drift.

Both suites also assert the theme actually applied (`expectTheme`). Without that,
a broken `ThemeProvider` would turn the dark half of each suite into a duplicate
of the light half and both gates would still pass.

## a11y suite — every route, both themes

Runs axe-core and fails on `critical` or `serious` impact. `moderate` and `minor`
are reported but tolerated, so the gate flags blocking issues rather than
aesthetic preferences.

Both themes are covered because the `.dark` block overrides **tier-2 semantics
only** — exactly where a contrast regression can be introduced without touching a
single component. A light-only suite would not see it.

### Current status: report-only

The suite does not pass yet, and the dominant cause is one token rather than many
component bugs:

| Rule | Count | Root cause |
| --- | --- | --- |
| `color-contrast` | ~87 | `--muted-foreground` (`#767884`, v1's `--ds-gris`) scores **4.38:1 on white** and **4.02:1 on the muted/sidebar surface**, where AA needs 4.50. Fails on every light surface. |
| `label` | 16 | form controls in demos without an associated label |
| `aria-required-children` | 8 | Base UI composition — a role expecting specific children |
| `button-name` | 8 | icon-only buttons without an accessible name |
| `aria-toggle-field-name` | 4 | toggle/switch without an accessible name |
| `nested-interactive` | 4 | interactive element nested inside another |

The contrast row is a **brand decision, not a test fix**: `--ds-gris` was ported
byte-identically from v1's `tokens/tokens.json`, so changing it diverges the two
systems. `--ds-ink-soft` (`#434649`) is declared but mapped to no slot and scores
8.71:1 — the obvious candidate if the decision is to fix it here.

`.github/workflows/a11y.yml` therefore runs the suite with `continue-on-error`
and uploads the report. **To arm the gate:** resolve the token, get the suite
green, then remove `continue-on-error` and mark the job required.

## visual suite — curated routes, both themes

Deliberately not all 72 routes:

1. **Cost.** 72 routes x 2 themes is 144 full-page baselines — tens of megabytes
   of PNGs in git, re-churned on every intentional design change. The a11y suite
   is the one that covers everything, because it needs no committed artefact.
2. **Signal.** The routes in `visual.spec.ts` were picked to exercise the *visual
   language* rather than component count: flat 1px rules, zero radius, the
   eight-colour tone axis, dense data display, overlay layering, chart palettes.
   A regression in any of those shows up here. One that shows up only on
   `/docs/aspect-ratio` is not a brand regression.

Add a route when it covers a visual property nothing else does.

### Baselines must be generated on Linux

`playwright.config.ts` sets `snapshotPathTemplate` without a platform key, so CI
compares against exactly what is committed. Sub-pixel font rendering differs
enough between macOS and Linux to exceed the 2% `maxDiffPixelRatio`.

**Do not run `test:visual:update` on a laptop and commit the result.** Instead:

1. Run the **Visual regression** workflow manually with `update_baselines: true`
2. Download the `visual-baselines` artifact
3. Commit it to `apps/web/tests/__screenshots__/`

Until baselines exist the comparison step is skipped rather than failed, so the
workflow arms itself the moment they land.

## Determinism

`settle()` waits for network idle, `document.fonts.ready`, then one extra beat
for animation that CSS neutralisation cannot reach — Recharts animates via
`requestAnimationFrame`, not transitions. The visual suite additionally injects a
stylesheet killing animations, transitions and the blinking caret, after load so
it wins on ordering.
