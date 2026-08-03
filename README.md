# Diametral Design System — React

Monorepo for [`@diametral/ui`](packages/ui): **72 React components** built on
[Base UI](https://base-ui.com) and Tailwind CSS v4, in the Diametral visual
language — flat, 1px rules, no radius, no shadows.

It complements
[`@diametral/design-system`](https://www.npmjs.com/package/@diametral/design-system)
(v1), which remains the home of the buildless CSS, Web Components, email
templates and Keycloak theme. This repository is the React layer.

```
packages/ui   @diametral/ui — the published component library
apps/web      the documentation site: live playgrounds for every component
```

## Develop

```bash
pnpm install
pnpm dev          # docs site
pnpm typecheck
pnpm build        # builds packages/ui, then the docs site
```

`packages/ui` resolves to `src/` inside the monorepo, so editing a component
hot-reloads in the docs site. `publishConfig.exports` swaps those entries to
`dist/` at pack time — verify packaging with `pnpm --filter @diametral/ui pack`,
not by reading `exports` alone.

## Adding components

```bash
pnpm dlx shadcn@latest add button -c apps/web
```

Components land in `packages/ui/src/components`. The CLI writes alias-style
imports (`@diametral/ui/components/...`); rewrite them to **relative paths with
explicit `.js` extensions** (`../lib/utils.js`) to match the rest of the
package — that is what keeps the published ESM resolvable by Node without a
bundler.

## Using components

```tsx
import { Button } from "@diametral/ui/components/button"
```

See [`packages/ui/README.md`](packages/ui/README.md) for install, Tailwind setup,
theming and font licensing.

## License

[MIT](packages/ui/LICENSE) for the code. Fonts are covered separately — see
[NOTICE.md](packages/ui/NOTICE.md). **Ufficio is commercial and is never bundled
in the package or committed to this repository.**
