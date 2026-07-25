# @diametral/assets

Diametral brand assets: the logo marks and lockups, as themeable SVG with raster
fallbacks.

Buildless — the files are the artifact. There is no build step and no `dist`.

## Install

```bash
pnpm add @diametral/assets
```

## Files

| File | What it is | Use it for |
| --- | --- | --- |
| `logo/diametral-mark.svg` | The symbol — circle, square, diagonal line. `stroke="currentColor"`, no intrinsic size. | The primary mark, everywhere. |
| `logo/diametral-lockup-horizontal.svg` | Symbol + "DIAMETRAL" wordmark, side by side (`2751×519`). | Headers, navbars, email signatures. |
| `logo/diametral-lockup-square.svg` | Wordmark set inside the symbol (`1770×1769`). | Avatars, app icons, square placements. |
| `logo/raster/*.png` | Black and white PNG renderings of the mark and the horizontal lockup. | Contexts that cannot use SVG — Office documents, some email clients. |

The symbol is built from three elements: **the circle** (the space of intelligence
and complexity), **the square** (the structure that brings stability), and **the
line** (Diametral's clear positioning).

## Usage

All three SVGs use `stroke="currentColor"` and carry no `width`/`height`, so they
inherit colour from CSS and scale to their container. That is why there is no
separate "white" SVG — set `color` instead.

```tsx
import mark from "@diametral/assets/logo/diametral-mark.svg"

// As an image (colour cannot be inherited through <img>; use the raster
// variants or inline the SVG if you need to recolour it)
<img src={mark} alt="Diametral" width={32} height={32} />
```

Inline it when you want it to follow the text colour — which is the point of
`currentColor`:

```tsx
// Vite: the ?raw suffix gives you the markup as a string
import markSvg from "@diametral/assets/logo/diametral-mark.svg?raw"

<span className="text-foreground [&_svg]:size-8" dangerouslySetInnerHTML={{ __html: markSvg }} />
```

In CSS:

```css
.brand {
  background-image: url("@diametral/assets/logo/diametral-mark.svg");
}
```

## Provenance

Sourced from the Diametral brand charter export (`Logo/`), then transformed:

1. Black and white variants were **identical geometry differing only in colour**
   (`#161616` vs `white`), so each pair was collapsed into one file with
   `currentColor`.
2. `width`/`height` attributes were removed so `viewBox` drives sizing — intrinsic
   attributes otherwise beat CSS in `<img>` and email contexts.
3. A `<title>Diametral</title>` was added for assistive technology.
4. Optimised with `svgo --multipass` (~35% smaller).

The charter also ships `Logo/LOGO/SVG/*.svg` at 300–500 KB each. Those are **not**
included: they contain base64-embedded rasters and colour-matrix filters, so they
are not true vectors and are far too heavy to ship. The small top-level exports
used here are the real paths.

## Not in this package

- **Fonts.** Ufficio is commercial and its licence requires offline-only storage
  (see [`@diametral/ui`'s NOTICE.md](../ui/NOTICE.md)). It is never bundled or
  committed. Geist ships with `@diametral/ui` via `@fontsource-variable/geist`.
- **Photography** (`Diametral Pictures/`, ~406 MB across 60 files at 2–14 MB
  each). Far too large for an npm package or a git repository. These belong in a
  DAM, an object store, or a CDN — see below.
- **Brand documents** (`DRAFT/`, ~125 MB: the 99 MB brandbook PDF, the graphic
  charter, the PowerPoint template). Reference material for humans, not runtime
  assets. Same recommendation.

`v1`'s [`@diametral/design-system`](https://www.npmjs.com/package/@diametral/design-system)
also ships a small logo set under `assets/logo/`, including a hand-simplified
56×56 reconstruction of the mark. This package carries the **charter export**
instead, so the two are visually equivalent but not byte-identical.

## License

[MIT](LICENSE) for the packaging. The marks themselves are Diametral trademarks —
see [NOTICE.md](NOTICE.md).
