<div align="center">

# diametral-ds

> Diametral Design System — **72 React components** on [Base UI](https://base-ui.com)
> and Tailwind CSS v4.
> **Welcome to (the real).**

**Minimal · Enduring · Elegant**

</div>

---

Diametral is a flat, sharp visual language: **1px rules, no shadows, no
border-radius**, white / whitesmoke surfaces, black ink, **Ufficio** Light 300
titles over **Geist** body, uppercase labels at `0.08em`, tabular numerals.

This package is the **React layer**. It complements
[`@diametral/design-system`](https://www.npmjs.com/package/@diametral/design-system)
(v1), which remains the home of the buildless CSS, Web Components, email
templates and Keycloak theme. Use v1 when you need framework-agnostic CSS; use
this when you are building a React application.

## Install

```bash
pnpm add diametral-ds
```

`react`, `react-dom` (>= 19) and `tailwindcss` (v4) are **peer dependencies** —
this package will not pull its own copy of React.

## Setup

**1 · Import the stylesheet** once, at your app's entry:

```ts
import "diametral-ds/styles.css"
```

That single import brings in Tailwind, the `--ds-*` design tokens, the shadcn
slot mappings, the dark theme, and Geist. It also declares its own `@source`, so
Tailwind finds the classes used inside this package without extra configuration.

**2 · Point Tailwind at your own files** in that same CSS file or your own:

```css
@source "./src/**/*.{ts,tsx}";
```

## Usage

Import everything from the package root. The package declares
`sideEffects: ["**/*.css"]`, so bundlers drop the components you don't use:

```tsx
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Field,
  FieldLabel,
  Input,
} from "diametral-ds"

export function Example() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Approval</CardTitle>
      </CardHeader>
      <CardContent>
        <Field>
          <FieldLabel htmlFor="rate">Day rate</FieldLabel>
          <Input id="rate" />
        </Field>
        <Button size="sm">Submit</Button>
      </CardContent>
    </Card>
  )
}
```

`Button` composes two independent axes — `variant`
(`default` · `outline` · `secondary` · `ghost` · `destructive` · `link`) and
`tone`, an eight-colour brand scale drawn straight from the tier-1 primitives
(`black` · `red` · `brown` · `khaki` · `beige` · `green` · `blue` · `yellow`):

```tsx
<Button variant="outline" tone="red">Escalate</Button>
```

Each component also has its own path — `diametral-ds/button`,
`diametral-ds/data-table` — for faster dev-server loads in large apps. The root
also exports `cn` (class merging) and `useIsMobile`.

## Assets

Logos ship under `diametral-ds/assets/` as SVG, with PNG fallbacks in `raster/`:

```tsx
import mark from "diametral-ds/assets/diametral-mark.svg"
import lockup from "diametral-ds/assets/raster/diametral-lockup-horizontal-black.png"
```

The `<Wordmark>` component renders the lockups inline. The marks are trademarks
and are not covered by the MIT licence — see `dist/assets/NOTICE.md`.

Browse every component, with live playgrounds, in the documentation app
(`apps/web` in this repository).

## Theming

Tokens are declared in three tiers, and only the middle tier should ever be
edited to retheme:

| Tier | Example | Role |
| --- | --- | --- |
| 1 · primitives | `--ds-black`, `--ds-red-brand` | raw brand values, never referenced by components |
| 2 · semantics | `--ds-ink`, `--ds-rule`, `--ds-accent` | what retheming edits; the `.dark` block overrides these alone |
| 3 · shadcn slots | `--background`, `--border`, `--primary` | thin references onto tier 2 |

The flat parti pris lives in one value — `--ds-radius: 0px`. Every other radius
is derived from it by `calc()`, so overriding it rounds the whole system at once.

Colour semantics are shared with v1's `tokens/tokens.json`; spacing, type scale
and z-index are delegated to Tailwind rather than mirrored as `--ds-*`.

## Fonts

**Geist** and **Geist Mono** (SIL OFL 1.1) are bundled and imported for you.

**Ufficio is commercial and is deliberately not bundled.** It is already first
in `--ds-font-title`, so if your application self-hosts the font under its own
licence, headings pick it up with no further configuration. If you do not hold a
licence, do nothing — headings fall back to Geist, which is on-brand by design.

See [NOTICE.md](NOTICE.md) for the full clauses.

## Development

```bash
pnpm build       # tsc -> dist/, then dist/globals.css, dist/index.js, dist/assets
pnpm typecheck
pnpm lint
```

In this monorepo, `exports` resolves to `src/` so the docs app keeps hot module
reloading on component edits. `publishConfig.exports` swaps those entries to
`dist/` at pack time, and the publish workflow renames the package from
`@diametral/ui` to `diametral-ds` — so verify packaging changes with `pnpm pack`, not by
reading `exports` alone.

Internal imports are **relative and carry explicit `.js` extensions**
(`../lib/utils.js`). That is what makes the published ESM resolvable by Node
without a bundler; `shadcn add` writes alias-style imports instead, so rewrite
them after adding a component.

## License

[MIT](LICENSE) for the code. Fonts are covered separately — see
[NOTICE.md](NOTICE.md).
