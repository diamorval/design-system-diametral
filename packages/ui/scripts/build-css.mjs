// Emits dist/globals.css from the authored stylesheet.
//
// The only thing that changes is the @source block. In-repo, globals.css scans
// the monorepo via paths that climb out of the package (../../../apps/**), which
// resolve to nothing once the package is installed under node_modules. The
// published copy sits at dist/globals.css beside dist/components/*.js, so it
// scans its own emitted JS instead — consumers still declare their own sources.

import { execFileSync } from "node:child_process"
import { mkdir, readFile, rm, writeFile } from "node:fs/promises"
import { createRequire } from "node:module"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..")
const from = resolve(root, "src/styles/globals.css")
const to = resolve(root, "dist/globals.css")

const PACKAGED_SOURCE = `@source "./**/*.js";`

// Component stylesheets are @imported relative to src/styles; that folder is
// not published, so inline them in place.
const COMPONENT_IMPORT = /^@import "(\.\/components\/[^"]+\.css)";\s*$/gm
const authored = await readFile(from, "utf8")
const imports = [...authored.matchAll(COMPONENT_IMPORT)]
const bodies = await Promise.all(
  imports.map(([, path]) => readFile(resolve(dirname(from), path), "utf8"))
)
let css = authored
imports.forEach(([line], i) => {
  css = css.replace(line, () => bodies[i].trimEnd())
})
if (/^@import\s+["']\.{1,2}\//m.test(css)) {
  throw new Error(
    `A relative @import in ${from} was not inlined; it would point into the ` +
      `unpublished src/styles. Use the form @import "./components/<name>.css";`
  )
}

// Collapse the contiguous run of @source directives into the packaged one.
const sourceRun = /^@source\s+"[^"]*";\s*$(\n^@source\s+"[^"]*";\s*$)*/m
if (!sourceRun.test(css)) {
  throw new Error(
    `No @source block found in ${from}. build-css.mjs rewrites that block for ` +
      `the published layout; if the directives moved, update this script.`
  )
}

// shadcn is a devDependency (its CLI is authoring tooling), so the published
// stylesheet cannot @import it: inline its tailwind.css after the last @import
// (an @import below other rules is ignored).
const SHADCN_IMPORT = /^@import "shadcn\/tailwind\.css";\s*\n/m
if (!SHADCN_IMPORT.test(css)) {
  throw new Error(
    `No @import "shadcn/tailwind.css" in ${from}; update build-css.mjs.`
  )
}
const shadcnCss = await readFile(
  createRequire(import.meta.url).resolve("shadcn/tailwind.css"),
  "utf8"
)

const out = css
  .replace(sourceRun, PACKAGED_SOURCE)
  .replace(SHADCN_IMPORT, "")
  .replace(
    /((?:^@import [^\n]*;\s*\n)+)/m,
    (imports) => `${imports}\n${shadcnCss.trimEnd()}\n`
  )

await mkdir(dirname(to), { recursive: true })
await writeFile(to, out, "utf8")

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
