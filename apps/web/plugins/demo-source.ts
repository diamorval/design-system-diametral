import fs from "node:fs/promises"
import path from "node:path"

import { codeToHtml } from "shiki"
import type { Plugin } from "vite"

import {
  extractPlaygroundBindings,
  extractTemplate,
  extractVariants,
  type VariantMeta,
} from "./extract-variants"
import { diametralDark, diametralLight, palette } from "./shiki-theme"

const VIRTUAL_ID = "virtual:demo-source"
const RESOLVED_ID = "\0" + VIRTUAL_ID
const APP_SRC = path.resolve(import.meta.dirname, "../src")
const DEMOS_DIR = path.join(APP_SRC, "registry/demos")
const PLAYGROUNDS_DIR = path.join(APP_SRC, "registry/playgrounds")
const DECLARATIONS = path.join(APP_SRC, "registry/playgrounds.ts")
const UI_COMPONENTS = path.resolve(
  import.meta.dirname,
  "../../../packages/ui/src/components"
)

/** `demos/button/button-variants.tsx` -> `button/button-variants` */
function toKey(absolute: string, root: string) {
  return path
    .relative(root, absolute)
    .replace(/\\/g, "/")
    .replace(/\.tsx$/, "")
}

async function listFiles(dir: string): Promise<string[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true }).catch(() => [])
  const nested = await Promise.all(
    entries.map((entry) => {
      const full = path.join(dir, entry.name)
      if (entry.isDirectory()) return listFiles(full)
      return entry.name.endsWith(".tsx") ? [full] : []
    })
  )
  return nested.flat()
}

/**
 * Highlighting runs here, in the Vite process, rather than in the browser:
 * shiki's grammars and themes are megabytes, and the snippets are fully known
 * at build time. The client receives only the rendered HTML string.
 *
 * Both themes are emitted into one payload as CSS variables (--shiki-light /
 * --shiki-dark) so a theme switch is a repaint, not a re-highlight.
 */
async function highlight(code: string) {
  return codeToHtml(code, {
    lang: "tsx",
    themes: { light: diametralLight, dark: diametralDark },
    defaultColor: false,
    cssVariablePrefix: "--shiki-",
  })
}

async function buildDemos() {
  const files = (await listFiles(DEMOS_DIR)).sort()
  const entries = await Promise.all(
    files.map(async (file) => {
      const code = (await fs.readFile(file, "utf8")).trimEnd()
      return [toKey(file, DEMOS_DIR), { code, html: await highlight(code) }] as const
    })
  )
  return Object.fromEntries(entries)
}

/**
 * For every declared playground: the JSX template its file renders, and the
 * variant axes of the cva const it binds to. A binding that no longer resolves
 * throws — a rename in packages/ui must not quietly hollow out a control panel.
 */
async function buildPlaygrounds() {
  const declarationsText = await fs.readFile(DECLARATIONS, "utf8").catch(() => "")
  const bindings = declarationsText
    ? extractPlaygroundBindings(DECLARATIONS, declarationsText)
    : {}

  const variants: Record<string, VariantMeta> = {}
  for (const [slug, from] of Object.entries(bindings)) {
    if (!from) continue
    const componentFile = path.join(UI_COMPONENTS, `${slug}.tsx`)
    const text = await fs.readFile(componentFile, "utf8").catch(() => undefined)
    if (text === undefined) {
      throw new Error(
        `[diametral:demo-source] ${slug}: declares variantsFrom "${from}" but ` +
          `${path.relative(process.cwd(), componentFile)} does not exist.`
      )
    }
    const found = extractVariants(componentFile, text)
    const meta = found[from]
    if (!meta) {
      throw new Error(
        `[diametral:demo-source] ${slug}: variantsFrom "${from}" not found in ` +
          `${slug}.tsx. Found: ${Object.keys(found).join(", ") || "none"}.`
      )
    }
    variants[slug] = meta
  }

  const files = (await listFiles(PLAYGROUNDS_DIR)).sort()
  const templates: Record<string, string> = {}
  for (const file of files) {
    const slug = toKey(file, PLAYGROUNDS_DIR)
    const text = await fs.readFile(file, "utf8")
    const template = extractTemplate(file, text)
    if (!template) {
      throw new Error(
        `[diametral:demo-source] ${slug}: could not find the JSX returned by ` +
          `the default export of playgrounds/${slug}.tsx.`
      )
    }
    templates[slug] = template
  }

  return { variants, templates }
}

export function demoSource(): Plugin {
  return {
    name: "diametral:demo-source",

    resolveId(id) {
      if (id === VIRTUAL_ID) return RESOLVED_ID
    },

    async load(id) {
      if (id !== RESOLVED_ID) return
      const [sources, playgrounds] = await Promise.all([
        buildDemos(),
        buildPlaygrounds(),
      ])
      return [
        `export const sources = ${JSON.stringify(sources)}`,
        `export const palette = ${JSON.stringify(palette)}`,
        `export const variants = ${JSON.stringify(playgrounds.variants)}`,
        `export const templates = ${JSON.stringify(playgrounds.templates)}`,
      ].join("\n")
    },

    configureServer(server) {
      // A demo edit changes both the module graph (the component) and this
      // virtual module (its highlighted source); only the latter needs a nudge.
      // Component files count too: their cva blocks feed the control panels.
      const invalidate = (file: string) => {
        const watched =
          file.startsWith(DEMOS_DIR) ||
          file.startsWith(PLAYGROUNDS_DIR) ||
          file === DECLARATIONS ||
          file.startsWith(UI_COMPONENTS)
        if (!watched) return
        const mod = server.moduleGraph.getModuleById(RESOLVED_ID)
        if (!mod) return
        server.moduleGraph.invalidateModule(mod)
        server.ws.send({ type: "full-reload" })
      }
      server.watcher.on("add", invalidate)
      server.watcher.on("unlink", invalidate)
      server.watcher.on("change", invalidate)
    },
  }
}
