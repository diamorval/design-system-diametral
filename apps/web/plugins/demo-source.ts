import fs from "node:fs/promises"
import path from "node:path"

import { codeToHtml } from "shiki"
import type { Plugin } from "vite"

import { diametralDark, diametralLight } from "./shiki-theme"

const VIRTUAL_ID = "virtual:demo-source"
const RESOLVED_ID = "\0" + VIRTUAL_ID
const DEMOS_DIR = path.resolve(import.meta.dirname, "../src/registry/demos")

/** `demos/button/button-variants.tsx` -> `button/button-variants` */
function toKey(absolute: string) {
  return path
    .relative(DEMOS_DIR, absolute)
    .replace(/\\/g, "/")
    .replace(/\.tsx$/, "")
}

async function listDemoFiles(dir: string): Promise<string[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  const nested = await Promise.all(
    entries.map((entry) => {
      const full = path.join(dir, entry.name)
      if (entry.isDirectory()) return listDemoFiles(full)
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
async function buildSource() {
  const files = (await listDemoFiles(DEMOS_DIR)).sort()
  const entries = await Promise.all(
    files.map(async (file) => {
      const raw = await fs.readFile(file, "utf8")
      const code = raw.trimEnd()
      const html = await codeToHtml(code, {
        lang: "tsx",
        themes: { light: diametralLight, dark: diametralDark },
        defaultColor: false,
        cssVariablePrefix: "--shiki-",
      })
      return [toKey(file), { code, html }] as const
    })
  )
  return Object.fromEntries(entries)
}

export function demoSource(): Plugin {
  return {
    name: "diametral:demo-source",

    resolveId(id) {
      if (id === VIRTUAL_ID) return RESOLVED_ID
    },

    async load(id) {
      if (id !== RESOLVED_ID) return
      const sources = await buildSource()
      return `export const sources = ${JSON.stringify(sources)}`
    },

    configureServer(server) {
      // A demo edit changes both the module graph (the component) and this
      // virtual module (its highlighted source); only the latter needs a nudge.
      const invalidate = (file: string) => {
        if (!file.startsWith(DEMOS_DIR)) return
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
