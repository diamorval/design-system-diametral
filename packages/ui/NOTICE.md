# NOTICE — third-party assets & licensing

This package's own source code (React components, CSS, design tokens, build
scripts) is licensed under the [MIT License](LICENSE). The clauses below govern
third-party assets, which that MIT license does **not** cover.

## Fonts

### Ufficio — title typeface (commercial, NOT bundled)

`--ds-font-title` lists **Ufficio** first. The font itself is **not included in
this package and is never distributed by it.**

Ufficio is a commercial typeface licensed from Giulia B. (`giuliaboggio.xyz`).
The licence on file is held by **LittleBigCode** and covers Desktop/Print, Web,
Social Media & Broadcasting, and Logo/Wordmark use at the ≤200-employee tier.
Two clauses drive how this package handles it:

- **EULA §2.1 (Web)** — a Web licence is priced **per website URL** and the font
  **must be self-hosted on the licence owner's own server(s)**.
- **EULA §4.2 (Confidentiality)** — fonts must be stored **offline only** and
  must not be uploaded to online storage platforms or cloud-hosted services.

Consequently this package ships **no font binary and no `@font-face` for
Ufficio**. A licensed Diametral application self-hosts the font under its own
Web seat and provides the `@font-face` itself; headings then resolve to Ufficio
automatically, because it is already first in the stack.

**If you do not hold an Ufficio licence, do nothing.** Headings fall back to
Geist, which is bundled and on-brand by design.

Publishing this package does not grant any right to use, copy, embed, or
redistribute Ufficio. Obtain your own licence from the foundry.

### Geist — body typeface (bundled, free)

**Geist** and **Geist Mono** are licensed under the **SIL Open Font License
1.1** and are bundled via `@fontsource-variable/geist` and
`@fontsource-variable/geist-mono`, which `globals.css` imports.

## Summary

| Asset | License | Bundled here? | May third parties redistribute? |
| --- | --- | --- | --- |
| This package's code | MIT | — | Yes |
| Ufficio | Commercial (Giulia B.) | **No** | **No** — obtain your own |
| Geist / Geist Mono | SIL OFL 1.1 | Yes | Yes (under OFL) |

Related: the v1 system's `assets/fonts/LICENSE-FONTS.md` and `NOTICE.md` in
[`@diametral/design-system`](https://www.npmjs.com/package/@diametral/design-system).
