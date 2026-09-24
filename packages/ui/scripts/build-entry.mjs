// Emits the published root entry (dist/index.js + .d.ts) and copies the brand
// assets into dist/assets.
//
// The root entry is generated from dist/components rather than committed, so a new
// component is exported the moment it exists — there is no list to forget to
// update. In-repo code keeps importing per file; only consumers see the root.
//
// Assets live in packages/assets (the source of truth); they ship inside this
// tarball so consumers install one package.

import { cp, readdir, writeFile } from "node:fs/promises"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..")
const dist = resolve(root, "dist")

const components = (await readdir(resolve(dist, "components")))
  .filter((f) => f.endsWith(".js"))
  .sort()

const lines = [
  ...components.map((f) => `export * from "./components/${f}"`),
  `export { cn } from "./lib/utils.js"`,
  `export { useIsMobile } from "./hooks/use-mobile.js"`,
]
const entry = lines.join("\n") + "\n"

await writeFile(resolve(dist, "index.js"), entry, "utf8")
await writeFile(resolve(dist, "index.d.ts"), entry, "utf8")

await cp(resolve(root, "../assets/logo"), resolve(dist, "assets"), {
  recursive: true,
})
// The marks are trademarks, not MIT — the notice travels with them.
await cp(resolve(root, "../assets/NOTICE.md"), resolve(dist, "assets/NOTICE.md"))

console.log(
  `build-entry: dist/index.js exports ${components.length} component modules; ` +
    `assets copied to dist/assets`
)
