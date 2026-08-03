import fs from "node:fs/promises"
import path from "node:path"

import { codeToHtml } from "shiki"
import type { Plugin } from "vite"

import {
  extractAnatomy,
  type Anatomy,
  type AnatomySource,
} from "./extract-anatomy"
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
      return [
        toKey(file, DEMOS_DIR),
        { code, html: await highlight(code) },
      ] as const
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
  const declarationsText = await fs
    .readFile(DECLARATIONS, "utf8")
    .catch(() => "")
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

/**
 * Parts no demo and no playground can honestly show, with the reason. Keyed
 * `<slug>/<Part>`. Every entry is an export whose composition does not exist:
 * the three menu portals because their own Content portals itself, the
 * navigation menu's indicator because the trigger draws its own caret, and the
 * toaster because it mounts once in the app root rather than in a page.
 *
 * Adding a line here is a claim that a reader has nothing to look at. Prefer
 * writing the part into a playground or a demo.
 */
const ANATOMY_EXCEPTIONS: Record<string, string> = {
  "context-menu/ContextMenuPortal": "ContextMenuContent portals itself",
  "dropdown-menu/DropdownMenuPortal": "DropdownMenuContent portals itself",
  "menubar/MenubarPortal": "MenubarContent portals itself",
  "navigation-menu/NavigationMenuIndicator":
    "NavigationMenuTrigger renders its own caret",
  "toast/Toaster": "mounted once in the app root, not inside a page",
}

/**
 * Every part is written somewhere a reader can reach: its own playground, one of
 * its demos, or the component's own source. A part in none of those has no
 * example at all, which the anatomy index can only report as a dead row — so it
 * fails the build instead, here, where the fix is a few lines of JSX away.
 */
function checkCoverage(anatomy: Record<string, Anatomy>) {
  const missing: string[] = []

  for (const [slug, data] of Object.entries(anatomy)) {
    // Mirrors the index: a lone export with no types never renders a row.
    if (data.parts.length < 2 && !data.types.length) continue
    // Nothing documents this component yet — the page says so itself, and
    // per-part rows would be noise on top of that.
    if (!Object.keys(data.coverage).length) continue

    const written = new Set(Object.values(data.coverage).flat())
    const internal = new Set(
      data.rows.filter((row) => row.internal).map((row) => row.part)
    )

    for (const part of data.parts) {
      if (written.has(part) || internal.has(part)) continue
      if (ANATOMY_EXCEPTIONS[`${slug}/${part}`]) continue
      missing.push(`${slug}/${part}`)
    }
  }

  if (missing.length) {
    throw new Error(
      `[diametral:demo-source] ${missing.length} exported part(s) appear in no ` +
        `playground and no demo, so the anatomy index can only mark them as ` +
        `having no example:\n  ${missing.join("\n  ")}\n` +
        `Write each one into playgrounds/<slug>.tsx or demos/<slug>/, or add it ` +
        `to ANATOMY_EXCEPTIONS in plugins/demo-source.ts with the reason.`
    )
  }
}

/**
 * The composition grammar of every component, merged from its demos, its
 * playground and its own source. Derived rather than declared: 432 parts across
 * 80 components is more than anyone will keep true by hand, and the demos
 * already are the truth.
 */
async function buildAnatomy() {
  const componentFiles = (await listFiles(UI_COMPONENTS)).sort()
  const anatomy: Record<string, Anatomy> = {}

  for (const file of componentFiles) {
    const slug = path.basename(file, ".tsx")
    const demoFiles = (await listFiles(path.join(DEMOS_DIR, slug))).sort()
    const sources: AnatomySource[] = await Promise.all(
      demoFiles.map(async (demo) => ({
        label: toKey(demo, DEMOS_DIR),
        fileName: demo,
        text: await fs.readFile(demo, "utf8"),
      }))
    )

    const playground = path.join(PLAYGROUNDS_DIR, `${slug}.tsx`)
    const playgroundText = await fs
      .readFile(playground, "utf8")
      .catch(() => undefined)
    if (playgroundText !== undefined) {
      sources.push({
        label: "playground",
        fileName: playground,
        text: playgroundText,
      })
    }

    anatomy[slug] = extractAnatomy(
      { fileName: file, text: await fs.readFile(file, "utf8") },
      sources
    )
  }

  checkCoverage(anatomy)
  return anatomy
}

export function demoSource(): Plugin {
  return {
    name: "diametral:demo-source",

    resolveId(id) {
      if (id === VIRTUAL_ID) return RESOLVED_ID
    },

    async load(id) {
      if (id !== RESOLVED_ID) return
      const [sources, playgrounds, anatomy] = await Promise.all([
        buildDemos(),
        buildPlaygrounds(),
        buildAnatomy(),
      ])
      return [
        `export const sources = ${JSON.stringify(sources)}`,
        `export const palette = ${JSON.stringify(palette)}`,
        `export const variants = ${JSON.stringify(playgrounds.variants)}`,
        `export const templates = ${JSON.stringify(playgrounds.templates)}`,
        `export const anatomy = ${JSON.stringify(anatomy)}`,
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
