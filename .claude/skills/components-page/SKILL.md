---
name: components-page
description: Document a component on the Diametral docs site following the canonical page structure (intro → workbench → examples). Use whenever the user asks to document a component, write or improve a component's docs page, add examples or demos for a component, add or fix a playground/workbench, or says "document X", "add examples for X", "X's page is empty", "showcase X's possibilities" — even if they don't mention the docs site by name.
---

# Component documentation page

Every component page in `apps/web` is generated from data — there is no per-component page file. Documenting a component means editing three places; the shared template (`apps/web/src/docs/component-page.tsx`) renders whatever it finds:

1. **Registry entry** — `apps/web/src/registry/registry.ts` (intro, examples, part notes)
2. **Demo files** — `apps/web/src/registry/demos/<slug>/*.tsx` (one file per example)
3. **Playground** — `apps/web/src/registry/playgrounds/<slug>.tsx` + an entry in `apps/web/src/registry/playgrounds.ts` (powers the Workbench)

**Before writing anything, read `references/exemplar.md` (in this skill's directory).** It is a complete annotated worked example — all four surfaces of one component (Panel) documented to the house standard, plus the `PlaygroundConfig` type contract. Match its register: the field discipline, the demo realism, the sparseness. It travels with the skill, so it stays the standard even if the live Panel files drift.

The page renders: unlabeled intro (badge, name, description, intro paragraphs, import line) → **Workbench** h2 (only when a playground exists) → **Examples** h2 with one h3 subsection per example → a nested TOC (sections level 1, examples level 2). All of this is automatic; you never touch the template to document a component.

## Step 1 — Registry entry

Fields and their jobs (don't blur them):

- `description` — a one-line tagline, ideally positioning the component against a sibling ("Card without the shadow"). Not a paragraph.
- `intro?: string[]` — one to two when-to-use paragraphs, one `Prose` block each. Paragraph 1: what it is and when to reach for it. Paragraph 2 (optional): the one architectural fact that changes how you use it (the exemplar's: the root owns `--panel-spacing`). Skip `intro` entirely rather than padding it — the page falls back to the description cleanly.
- `examples` — each entry is **one use case backed by one demo file** (`demo: "<slug>/<file>"`). Titles name the use, not the prop ("Settings rows", not "Rows"; "Form section", not "With footer"). Descriptions say when you'd build this and name the one non-obvious mechanism in backticks.
- `parts?: Record<string, string>` — gotcha notes surfaced when a part is selected in the Workbench. Deliberately sparse: only write an entry when a part has a constraint the nesting can't show ("Bottom padding is keyed off `.border-b`"). Silence is correct for obvious parts.

Prose fields render through `Prose`, which supports **backticks only** — no markdown links, bold, or lists.

## Step 2 — Demo files

One file per example in `apps/web/src/registry/demos/<slug>/`. They auto-register via glob (key = `<slug>/<file-name>`); a demo file with no registry entry still renders, as an "orphan" at the end of Examples — so always pair the file with a registry `examples` entry.

Conventions (full worked demos are in `references/exemplar.md`, Surface 2):

- Default-export a single component named `<Component><UseCase>` (e.g. `PanelFormSection`).
- Realistic content — real labels, plausible values, working sub-components (a footer with `Cancel`/`Save` buttons, not `<Button>Action</Button>`). The demo's code is shown verbatim in the Code tab, so it doubles as copy-paste documentation.
- **No comments.** The demo's code is shown verbatim in the Code tab and reads as copy-paste output; a non-obvious why belongs in the registry example `description`, not in the file.
- Constrain width on the demo root (`w-full max-w-sm`-style), not the preview.

**Choosing the example set**: cover the component's distinct *shapes of use*, not its prop matrix. The exemplar's set — Basic (self-contained summary), Settings rows (a divided list), Form section (fields + acting footer) — each answers "when would I build this?". Variant sweeps (sizes, tones) earn a demo only when the axis is the component's point. Three to five examples is the healthy range.

## Step 3 — Playground (Workbench)

Two coordinated pieces:

**`playgrounds/<slug>.tsx`** — a typed template that renders the subject with prop pass-through (`{...props}`). Render **every exported part**: the Workbench's code strip doubles as the anatomy navigator, so an unrendered part is unselectable. Place a literal `{children}` marker for the main editable text and `{key}` markers for each entry in `texts`.

**`PLAYGROUNDS[slug]` in `playgrounds.ts`** — only what cva cannot know (the full `PlaygroundConfig` type contract is at the end of `references/exemplar.md`):

- `variantsFrom` — name of the cva const; variant axes are parsed from it at build time, never listed here.
- `extras` — plain props worth exposing (`boolean`, `text`, `select`). Use `always: true` only for props the component requires.
- `children` / `texts` — editable text content with sensible defaults and short labels. Each key needs a matching literal `{key}` marker in the template's JSX.
- `note` — one sentence, only when the subject genuinely needs explaining (the exemplar's explains why `size` isn't a cva axis).

## Verify

1. `pnpm exec prettier --check <files you touched>` — **never** `pnpm format` (it rewrites the whole repo).
2. `pnpm --filter web exec tsc --noEmit`.
3. Dev server (usually already running on port 5473): open `/docs/<slug>` — intro paragraphs render with code spans, Workbench controls work and every part is selectable, each example previews and its Code tab matches, TOC nests and its anchors scroll.
