# Coding Standards

Diametral design system — pnpm + Turbo monorepo (`packages/ui` components, `apps/web` docs site). Components wrap Base UI primitives, styled with Tailwind v4.

## Design rules (non-negotiable)

- **Flat design**: no `shadow-*` classes anywhere. `rounded-full` is intentional and allowed.
- **Tone inks**: never fade a `--ds-<tone>-ink` color with opacity — it breaks WCAG AA contrast. Use font-weight for hierarchy instead.
- **Fonts**: Ufficio is commercial and must never be bundled or fetched. Geist is the only fallback; no third typeface.
- **Motion & tracking are tokenized**: use the easing/duration variables and tracking scale defined in `globals.css`, not ad-hoc values.
- `data-horizontal:` / `data-vertical:` Tailwind variants are valid shorthand for `data-[orientation=…]` — do not "fix" them.

## Accessibility

- Wrapper components must forward `aria-label` (and similar a11y props) to the underlying interactive element — a label left on a wrapping div fails axe as critical.
- Base UI gotchas: state attributes often live on the trigger (not the popup), separator orientation is inverted, radios render as spans.

## Style

- Match the existing component idiom in `packages/ui/src` — named exports, `data-slot` attributes, `cn()` for class merging.
- No comments that restate the code; only comment non-obvious constraints or workarounds.
- Prefer the smallest diff that solves the issue; no speculative abstractions or configurability.

## Formatting & checks

- Never run `pnpm format` — HEAD is not prettier-clean and it rewrites the whole repo. Run `prettier --check <changed files>` (or `--write` on your own files only).
- Feedback loops: `pnpm typecheck` and `pnpm lint` must pass. There is no unit-test suite; the a11y/visual Playwright suite in `apps/web` needs a browser and is report-only.
