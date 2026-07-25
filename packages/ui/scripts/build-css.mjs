// Emits dist/globals.css from the authored stylesheet.
//
// The only thing that changes is the @source block. In-repo, globals.css scans
// the monorepo via paths that climb out of the package (../../../apps/**), which
// resolve to nothing once the package is installed under node_modules. The
// published copy sits at dist/globals.css beside dist/components/*.js, so it
// scans its own emitted JS instead — consumers still declare their own sources.

import { mkdir, readFile, writeFile } from "node:fs/promises"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..")
const from = resolve(root, "src/styles/globals.css")
const to = resolve(root, "dist/globals.css")

const PACKAGED_SOURCE = `@source "./**/*.js";`

const css = await readFile(from, "utf8")

// Collapse the contiguous run of @source directives into the packaged one.
const sourceRun = /^@source\s+"[^"]*";\s*$(\n^@source\s+"[^"]*";\s*$)*/m
if (!sourceRun.test(css)) {
  throw new Error(
    `No @source block found in ${from}. build-css.mjs rewrites that block for ` +
      `the published layout; if the directives moved, update this script.`
  )
}

const out = css.replace(sourceRun, PACKAGED_SOURCE)

await mkdir(dirname(to), { recursive: true })
await writeFile(to, out, "utf8")

const dropped = css.match(/^@source\s+"[^"]*";\s*$/gm) ?? []
console.log(
  `build-css: dist/globals.css written (${dropped.length} @source ` +
    `directive(s) replaced with ${PACKAGED_SOURCE})`
)
