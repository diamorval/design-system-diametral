// Emits dist/globals.css from the authored stylesheet.
//
// The only thing that changes is the @source block. In-repo, globals.css scans
// the monorepo via paths that climb out of the package (../../../apps/**), which
// resolve to nothing once the package is installed under node_modules. The
// published copy sits at dist/globals.css beside dist/components/*.js, so it
// scans its own emitted JS instead — consumers still declare their own sources.

import { execFileSync } from "node:child_process"
import { copyFile, mkdir, readFile, rm, writeFile } from "node:fs/promises"
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
// globals.css imports the vendored shadcn layer by relative path.
await copyFile(resolve(root, "src/styles/shadcn.css"), resolve(root, "dist/shadcn.css"))

const dropped = css.match(/^@source\s+"[^"]*";\s*$/gm) ?? []
console.log(
  `build-css: dist/globals.css written (${dropped.length} @source ` +
    `directive(s) replaced with ${PACKAGED_SOURCE})`
)

// Also emit dist/styles.compiled.css: plain CSS for consumers on Tailwind 3 or
// no Tailwind at all. Font imports are kept as bare @imports rather than
// inlined, because inlining breaks fontsource's relative url(./files/...) paths.
const FONT_IMPORT = /^@import "@fontsource-variable\/[^"]+";\s*$/gm
const fontImports = out.match(FONT_IMPORT) ?? []
const input = resolve(root, "dist/.compile-input.css")
const compiled = resolve(root, "dist/styles.compiled.css")

await writeFile(input, out.replace(FONT_IMPORT, ""), "utf8")
try {
  execFileSync("tailwindcss", ["-i", input, "-o", compiled, "--minify"], {
    cwd: root,
    stdio: ["ignore", "ignore", "inherit"],
  })
} finally {
  await rm(input)
}
// Unwrap the cascade layers. Unlayered CSS beats any layered CSS, so in a
// Tailwind 3 app (whose @layer is compile-time only) its preflight
// `button { background-color: transparent }` would override our utilities.
// Tailwind emits the layers in cascade order, so unwrapping keeps our own order.
function unwrapLayers(css) {
  let out = ""
  let i = 0
  while (i < css.length) {
    const at = css.indexOf("@layer", i)
    if (at === -1) return out + css.slice(i)
    out += css.slice(i, at)
    const end = css.slice(at).search(/[{;]/) + at
    if (css[end] === ";") {
      i = end + 1
      continue
    }
    let depth = 1
    let j = end + 1
    let quote = null
    for (; depth > 0; j++) {
      const c = css[j]
      // Escapes appear outside strings too: class names like .content-\[\'\'\].
      if (c === "\\") j++
      else if (quote) {
        if (c === quote) quote = null
      } else if (c === '"' || c === "'") quote = c
      else if (c === "{") depth++
      else if (c === "}") depth--
    }
    // Recurse: the body is kept, the wrapper and its closing brace dropped.
    out += unwrapLayers(css.slice(end + 1, j - 1))
    i = j
  }
  return out
}

const body = unwrapLayers(await readFile(compiled, "utf8"))
if (body.includes("@layer")) throw new Error("build-css: @layer left in compiled CSS")
await writeFile(compiled, fontImports.join("\n") + "\n" + body, "utf8")
console.log(
  `build-css: dist/styles.compiled.css written (${(body.length / 1024).toFixed(0)} KB)`
)
