# Re-fitting the `site/` move to the target's real layout

Research artifact for [#173](https://github.com/diamorval/design-system-diametral/issues/173),
under the handoff map [#168](https://github.com/diamorval/design-system-diametral/issues/168).
Revises the eight-step move checklist from
[#158](https://github.com/diamorval/design-system-diametral/issues/158) (as carried into
batch 0.2 of the batch execution plan, where it is already nine items).

Measured 2026-09-01 against primary sources only:

| | ref |
| --- | --- |
| target | `LittleBigCode/design-system` @ `30e758b` (`chore/agent-scaffolding`), v0.11.0, local clone `/Users/augustinmorval/code/design-system` |
| source | `diamorval/design-system-diametral` @ `feat/css-conversion` (`9182a91`), `apps/web` |

Everything below is read from the trees, `package.json`, `.github/workflows/`,
`vite.config.ts`, `plugins/demo-source.ts` and the two Playwright specs. No secondary
summaries.

---

## 0. Two of the ticket's premises need correcting first

**"If the target has no Vite app, `base`/`basename`/`404.html` answer a problem that does
not exist."** — The Vite app *arrives with the move*. `apps/web/package.json` is a Vite 8 +
React 19 + React Router 8 SPA (`"build": "tsc -b && vite build"`, `BrowserRouter` in
`src/App.tsx:10`); step 1 of batch 0.2 copies it in as `site/`. The target being buildless
today is precisely why those three steps exist: they are what makes an SPA survive on
GitHub Pages under a repo subpath. **All three stand, unchanged in intent.**

**"`pages.yml` already publishes something — whatever it publishes is the incumbent, and
#158 never accounted for it."** — #158's D2 did account for it, and named it: `examples/`
stays verbatim because `tests/visual.spec.js` (12 pages) and `tests/a11y.spec.js` (5 pages
plus `demo.html`) read it over `python3 -m http.server` at the repo root. Confirmed:
`.github/workflows/pages.yml:28` is `cp -r css assets components react examples emails
_site/`, and both specs address `/examples/...`.

What #158 genuinely did **not** account for is narrower and entirely mechanical. Six real
defects, below.

---

## 1. What the target actually carries (measured)

Root, tracked: `assets/ components/ configs/ css/ deploy/ docs/ ds-bundle/ emails/
examples/ keycloak/ react/ scripts/ starters/ tests/ tokens/`, plus `playwright.config.js`,
`llms.txt`, `package-lock.json`. `dist/`, `node_modules/` and `.claude/` are **untracked**
(`.gitignore`; `git ls-files .claude` → empty).

- **No `site/`.** The directory name is free. No collision on step 1.
- **The build is four Node scripts** (`build-tokens`, `build-css`, `build-components`,
  `build-figma`). `scripts/` writes nothing into `react/`
  (`grep -rln "react/" scripts/` → no hits).
- **`react/` is 137 committed, hand-authored files.** `react/components/` holds 128
  PascalCase `.js`/`.d.ts` pairs; `react/index.js` (11.6 K) is a *separate monolith* that
  defines its 84 exports inline (`export const Button = React.forwardRef(...)` at
  `react/index.js:20`) rather than re-exporting `react/components/*`. Barrel and per-symbol
  modules are two parallel implementations.
- **`_site` is served at `https://littlebigcode.github.io/design-system/`**
  (`package.json:homepage`) — a repo subpath.
- **`_site/index.html` today is `deploy/pages-redirect.html`**, a meta-refresh to
  `examples/index.html` (`pages.yml:37`).
- **`docs/` is not published by `pages.yml` at all.** Its 20 markdown files ship in the npm
  tarball (`files` includes `docs`) and are pointed at by `llms.txt`. `docs/absorption/`
  and `docs/agents/` were added by #170.

Source side: `apps/web` holds **1,109 `@diametral/ui` import lines across 576 files**, over
**121 distinct specifiers** — 119 `components/*`, plus `globals` and `lib/utils`.
`src/registry/registry.ts` is 5,017 lines. Routes are exactly `/`, `/docs/:slug`,
`/showcase`, and a catch-all (`src/App.tsx:13–21`).

---

## 2. Verdict on each of the nine steps

| # | step (as written in batch 0.2) | verdict |
| --- | --- | --- |
| 1 | copy `apps/web` in as `site/`, own lockfile, not a workspace member | **stands** |
| 2 | Vite `base`, router `basename`, `404.html`, deployed by existing `pages.yml` | **stands, amended** — see §3 defect A and B |
| 3 | install the package `file:..` | **stands, amended** — ordering is now load-bearing, §3 defect C |
| 4 | repoint `demo-source`'s source path | **stands, amended** — path depth changes *and* the plugin hard-throws, §3 defect D |
| 5 | rewrite 1,109 deep imports to the barrel | **stands, amended** — two specifiers have no mapping, §3 defect E |
| 6 | swap the stylesheet entry to `dist/diametral.css` | **stands, amended** — `dist/` is generated and gitignored, §3 defect C |
| 7 | local chrome CSS redefining the ~10 shadcn slot names | **stands, unchanged** |
| 8 | delete `showcase.tsx`; copy the `components-page` skill | **stands, amended** — the skill's commands are pnpm-workspace-shaped, §3 defect F |
| 9 | seed `registry.ts` with the 30 held target components | **stands, unchanged** |

**Nothing is dropped.** No step of #158 is answering a problem that does not exist. Every
amendment below is an addition or a correction of a literal, not a reversal of a decision.

---

## 3. The six defects the checklist does not cover

### A. Vite's default `assetsDir` collides with the target's published `assets/`

`apps/web/vite.config.ts` sets no `build` block, so Vite's default
`build.assetsDir = "assets"` applies: `vite build` emits `dist/index.html` + `dist/assets/*`.
`pages.yml:28` already copies the repo's `assets/` (fonts, logos) into `_site/assets`, and
the static pages read it from there — `examples/index.html` references
`../assets/fonts/ufficio.css` and `../assets/logo/favicon.svg`; the root-level pages use the
same paths unprefixed.

Copying `site/dist/*` into `_site/` therefore merges the SPA's hashed bundles into the font
and logo directory. Best case it is untidy; a `rm -rf` or a clean-copy step anywhere makes
it fatal, and the license-stripping lines commented into `pages.yml:33–34` target exactly
those files.

**Fix, one line:** `build: { assetsDir: "_app" }` in `site/vite.config.ts`. This is the only
true *directory* collision the move creates. (`css/`, `components/`, `react/`, `emails/`,
`examples/` do not collide: the SPA's only routes are `/`, `/docs/:slug` and the catch-all.)

### B. The `pages.yml` copy order silently clobbers the SPA, and `deploy/` goes dead

`pages.yml:37` runs `cp deploy/pages-redirect.html _site/index.html` **after** the bulk copy.
Appending a `cp -r site/dist/* _site/` above it leaves the redirect overwriting the SPA's
`index.html` — the site would still land on `examples/index.html`, and the failure looks
like the build not running.

`deploy/pages-redirect.html` exists only to point the bare root at the showcase. Once the
SPA owns the root, it is dead: **delete the file and its `cp` line**, don't reorder around it.

### C. `dist/diametral.css` does not exist in a fresh checkout

Step 6 points `main.tsx` at `@diametral/design-system/dist/diametral.css`. That file is
written by `scripts/build-css.mjs:33` and `dist/` is the first entry in `.gitignore`. So the
`file:..` install of D3 resolves to a **package whose stylesheet is absent until `npm run
build` has run at the target root**.

That makes #158's D3 ordering note ("the docs build must run after `npm run build`") a hard
prerequisite *now*, not once #155 lands. Three places need it:

- `pages.yml` gains `actions/setup-node`, then `npm ci && npm run build` at the root,
  then `npm ci && npm run build` in `site/`.
- the PR check (D4) does the same.
- `site/README` / `CONTRIBUTING` say it, because a contributor cloning and running
  `npm --prefix site run dev` gets an unstyled site with a resolution error and no clue why.

### D. `demo-source` reads a directory the target does not have yet — and throws when it misses

`apps/web/plugins/demo-source.ts:26` resolves `UI_COMPONENTS` by climbing **three** levels
(`apps/web/plugins` → repo root) into `packages/ui/src/components`. In the target the plugin
sits at `site/plugins`, which is **two** levels from the root — the literal changes shape,
not just its tail.

More importantly, the directory it must point at is the TSX source that batch **0.1**
creates ("establish the tsc-only build"), and at 0.2 time it is effectively empty: no
component has been absorbed yet, and the target's `react/` is hand-written `.js`, not TSX.
The plugin does not degrade — `demo-source.ts:98–104` throws
`"declares variantsFrom … but <file> does not exist"` for any playground whose component
file is missing, and `listFiles(UI_COMPONENTS)` at line 204 drives anatomy extraction. A
`site/` copied in with its 118 playgrounds intact **cannot build** until the components it
documents have landed.

Two ways out; pick one in the 0.2 ticket rather than discovering it mid-batch:

1. **Gate the registry by what exists** — 0.2 lands `site/` with the registry filtered to
   components present in the target, and each absorption batch un-filters its own slugs.
   This is the honest shape: the site grows with the migration and the gate's route list
   equals the migrated set at every point.
2. **Land `site/` at the end of 0.2 but keep it out of CI until batch 1**, which contradicts
   #163 V10 (`site/` load-bearing, never excluded from CI) and leaves batch 1 ungated.

Option 1 is the only one compatible with V10. It also makes step 9's registry seeding
(the 30 held components) the *first* population of the filter, which is coherent.

Resolve the path from the installed package rather than by climbing, so the nesting depth
stops mattering: `path.dirname(require.resolve("@diametral/design-system/package.json"))`
plus the TSX subdirectory 0.1 chooses.

### E. Two of the 121 specifiers have no target equivalent

The rewrite is described as one `sed` over `@diametral/ui/components/*`. That covers 119 of
121 distinct specifiers. The other two:

- **`@diametral/ui/globals`** → step 6 handles it (the stylesheet entry).
- **`@diametral/ui/lib/utils`**, imported by **5 files** as `import { cn }`. The target's
  `exports` map has **no `./lib/*` entry**, so this specifier does not resolve after the
  move. `cn` is `twMerge(clsx(inputs))` (`packages/ui/src/lib/utils.ts`) — and #157 removes
  Tailwind, which removes the only reason `twMerge` is there. The target barrel already
  exports the replacement: `export const cx = (...a) => a.filter(Boolean).join(" ")`
  (`react/index.js:17`).

  **Fix:** 5 files switch `cn` → `cx` from the barrel. Do not add a `./lib/*` export to the
  package for the docs site's benefit; that is new published surface bought for a helper the
  site can import from the barrel.

Also note step 5's premise: the rewrite targets **the barrel**, but the target's barrel is
the hand-written monolith of §1 with 84 inline definitions. Until 0.1's tsc emit regenerates
`react/index.js` from TSX, rewriting 1,109 imports onto it points them at a file that does
not export the names. **Step 5 is strictly downstream of 0.1's build establishment**, and
should say so.

### F. The `components-page` skill is pnpm-workspace-shaped

#158's D7 says "copy it in, with its `apps/web/...` paths rewritten to `site/...`". The paths
are the easy half. `SKILL.md:72` instructs `pnpm --filter web build` — the target has no
workspace and no pnpm (`package-lock.json`, npm). It becomes `npm --prefix site run build`.
The skill also lands in a `.claude/` that is **untracked in the target today**, so 0.2 adds
`.claude/skills/` to version control and must not sweep `settings.local.json` in with it.

---

## 4. What `pages.yml` does afterwards

One job, same trigger (`push: [main]`), same `actions/deploy-pages`. Concretely:

```
- uses: actions/checkout@v4
- uses: actions/setup-node@v4          # NEW — with node 20 + npm cache
- run: npm ci && npm run build         # NEW — produces dist/diametral.css (defect C)
- run: npm ci && npm run build         # NEW — working-directory: site
- name: Assemble _site
  run: |
    mkdir -p _site
    cp -r css assets components react examples emails _site/
    cp -r site/dist/* _site/           # NEW — SPA takes the root; assetsDir=_app (defect A)
    cp _site/index.html _site/404.html # NEW — SPA fallback for /docs/:slug on refresh
    # cp deploy/pages-redirect.html _site/index.html   ← DELETED (defect B)
    touch _site/.nojekyll
```

The commented-out Ufficio-stripping block at `pages.yml:33–34` survives verbatim, and with
`assetsDir: "_app"` its `rm -f _site/assets/fonts/*` stays correct. Its
`grep -rl … --include='*.html' | xargs sed` would now also sweep the SPA's `index.html` and
`404.html`; harmless (they carry no `ufficio.css` link — the font arrives through the
bundled stylesheet), but the block's comment should say the SPA is out of its scope.

Everything else about the incumbent is unchanged: `examples/` still ships at `/examples/**`,
the two Playwright suites still read it from the repo root over `python3 -m http.server`,
and `npm run serve` keeps working for them. The SPA has its own harness
(`playwright.config.ts` → `vite preview --port 4173`), which is what #163's gate runs
against.

---

## 5. Collisions with existing target directories

| directory | collides? | note |
| --- | --- | --- |
| `site/` | **no** | name is free at the target root |
| `assets/` | **yes** | Vite's default `assetsDir` — defect A, the only real one |
| `deploy/` | **obsoleted** | `pages-redirect.html` dies with the SPA at root — defect B |
| `examples/` | no | stays verbatim; it is the only committed fixture the visual + a11y suites have |
| `docs/` | no | not published by `pages.yml`; `docs/components.md` becomes generated (#158 D5) |
| `react/` | no at the site level | but the barrel/per-symbol split of §1 is what step 5 lands on |
| `starters/vite-react` | **no** | a second Vite app with its own `package.json`, in no workflow and not in `files`. Harmless *because* `site/` is not a workspace member (D1) — a root `workspaces` field added later would sweep both in |
| `emails/` | no | copied into `_site/emails` (JS + `.d.ts`); no SPA route touches it |
| `keycloak/` | no | not published to Pages at all |
| `ds-bundle/`, `configs/`, `tokens/`, `scripts/`, `tests/` | no | untouched by the move |

`docs/migration.md` vs `docs/migration/` — the collision #170 hit — has **no analogue here**.
The move creates exactly one new top-level directory.

---

## 6. Impact on #163's gate

#163's tiering is unaffected in shape: the gate is `site/tests/a11y.spec.ts` over routes
derived from `registry.ts`, with the target's own `tests/a11y.spec.js` keeping the buildless
/ web-component surface. Three consequences follow from the findings above.

1. **The gate's route list is not 118 at batch 1 — it equals the migrated set.** Defect D
   forces the registry to be filtered by what exists in the target (option 1). That is
   strictly better for the gate: a route only exists once its component has landed, so a
   green run means something at every batch instead of only at the end. The 0.2 ticket
   should state this, because the batch plan's "route-filtered per batch" phrasing reads as
   an optimisation and is in fact a correctness requirement.

2. **The map's open question resolves in the negative, for a concrete reason.** "Whether the
   verification gate can run before batch 0.2 completes" — it cannot, and now not only
   because `registry.ts` does not exist yet: `site/` **cannot build** before 0.1 establishes
   the TSX source (defect D) and the regenerated barrel (defect E), and cannot render before
   0.1's build produces `dist/diametral.css` (defect C). Batches 0.1 and 0.3 have no gate,
   by construction. The interim check for 0.1 and 0.3 is the tier-3 contract work 0.1 itself
   installs (the ported `package` job, #155's two CI checks, the `@layer utilities` check) —
   which is the right bar for two batches that publish no component.

3. **One gate-integrity defect, cheap to fix on the way in.**
   `apps/web/src/App.tsx:21` is `<Route path="*" element={<Navigate to="/" replace />} />`.
   A gate that derives a route from `registry.ts`, navigates to `/docs/<slug>` and asserts
   the page rendered will **pass on a silent redirect to the overview** when the slug has no
   page. Combined with (1) — a registry filtered by what exists — the failure mode is
   exactly "component silently absent from the docs, gate green". Replace the catch-all with
   a real not-found route that renders a non-200-shaped page, or have the gate assert
   `page.url()` after load. Either is one line; without one, tier 1 is not sound.

---

## 7. The revised batch 0.2, as a task list

1. Copy `apps/web` in as `site/`; own lockfile; not a workspace member; `.gitignore`'s
   `dist/` and `node_modules/` already cover its build output.
2. `site/vite.config.ts`: `base: "/design-system/"` **and** `build.assetsDir: "_app"` (A).
3. `BrowserRouter basename`; `pages.yml` copies `_site/index.html` → `_site/404.html`;
   delete `deploy/pages-redirect.html` and its `cp` line (B).
4. Install the package `file:..`; `pages.yml` and the PR check run the **root** build before
   the site build (C).
5. Repoint `demo-source` at 0.1's TSX source directory, resolved via `require.resolve` of
   the package rather than by climbing; filter `registry.ts` to components present in the
   target so the plugin's hard throw stays a real coverage gate instead of a wall (D).
6. Rewrite the 1,109 deep imports to the regenerated barrel — **after** 0.1's tsc emit —
   and switch the 5 `cn` importers to the barrel's `cx`; add no `./lib/*` export (E).
7. Swap the stylesheet entry to `dist/diametral.css`.
8. `site/src/styles/chrome.css` redefines the ~10 shadcn slot names 0.3 deletes.
9. Delete `showcase.tsx` and its route; replace the `*` catch-all with a real not-found
   route (§6.3).
10. Copy `.claude/skills/components-page/` in, rewriting `apps/web/…` → `site/…` **and**
    `pnpm --filter web build` → `npm --prefix site run build`; add `.claude/skills/` to git
    without `settings.local.json` (F).
11. Seed `registry.ts` with the 30 held target components, using 0.1's
    `docs/migration/variants.json` as the coverage input.
12. `pages.yml` as in §4.

Nothing from #158's nine is dropped. Items 2–6, 9 and 10 carry the amendments, and §4's
`pages.yml` assembly is spelled out as item 12 rather than left implicit.
