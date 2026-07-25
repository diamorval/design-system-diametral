import type { ThemeRegistrationRaw } from "shiki"

/**
 * Two code themes built from declared Diametral tokens rather than an
 * off-the-shelf palette, so a snippet reads as part of the system.
 *
 * Deliberately only six token roles — the charter is flat and restrained, and a
 * twelve-colour rainbow would fight it. Light mode leans on the chart ramp
 * (which is tuned for white); dark mode leans on the brand *secondaries*
 * (rouge/vert/bleu/beige), which exist precisely for vivid-on-dark use.
 */

const LIGHT = {
  fg: "#161616", // --ds-noir
  faint: "#767884", // --ds-gris
  keyword: "#7b5ea7", // --ds-chart-5
  string: "#2e7d4f", // --ds-chart-3
  tag: "#ff2a00", // --ds-chart-1 / --ds-rouge
  attr: "#1488a6", // --ds-chart-2 / --ds-info
}

const DARK = {
  fg: "#f3f3f1", // --ds-ink (dark)
  faint: "#8b8d97", // --ds-ink-faint (dark)
  keyword: "#23e2ff", // --ds-bleu
  string: "#89fc79", // --ds-vert
  tag: "#ff2a00", // --ds-rouge
  attr: "#d5d3c4", // --ds-beige
}

function theme(
  name: string,
  type: "light" | "dark",
  c: typeof LIGHT
): ThemeRegistrationRaw {
  return {
    name,
    type,
    // Transparent: the surrounding surface token provides the background, so
    // code blocks inherit card/muted styling instead of punching a hole in it.
    colors: { "editor.foreground": c.fg, "editor.background": "#00000000" },
    settings: [
      { scope: ["comment", "punctuation.definition.comment"], settings: { foreground: c.faint, fontStyle: "italic" } },
      {
        scope: [
          "keyword",
          "keyword.control",
          "storage.type",
          "storage.modifier",
          "keyword.operator.expression",
          "keyword.operator.new",
          "variable.language",
        ],
        settings: { foreground: c.keyword },
      },
      {
        scope: ["string", "string.template", "punctuation.definition.string", "string.quoted"],
        settings: { foreground: c.string },
      },
      {
        // JSX component tags and type names both name things the design system
        // exports, so they share the brand signal colour.
        scope: [
          "entity.name.tag",
          "support.class.component",
          "entity.name.type",
          "entity.name.class",
          "support.type",
        ],
        settings: { foreground: c.tag },
      },
      {
        scope: [
          "entity.other.attribute-name",
          "constant.numeric",
          "constant.language",
          "meta.object-literal.key",
        ],
        settings: { foreground: c.attr },
      },
      {
        scope: [
          "punctuation",
          "meta.brace",
          "punctuation.separator",
          "punctuation.terminator",
          "punctuation.definition.tag",
          "keyword.operator",
        ],
        settings: { foreground: c.faint },
      },
      {
        scope: ["entity.name.function", "support.function", "variable", "variable.other"],
        settings: { foreground: c.fg },
      },
    ],
  }
}

export const diametralLight = theme("diametral-light", "light", LIGHT)
export const diametralDark = theme("diametral-dark", "dark", DARK)
