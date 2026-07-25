// Checks src/components/*.tsx against the conventions the package already
// follows, so new components stay coherent with the 72 that exist.
//
// These rules were derived by measuring the existing files, not invented — each
// one is a convention >95% of components already keep. The point is to stop the
// remaining few from becoming precedent. Rules that the codebase is genuinely
// split on are warnings, not errors.
//
// Usage:
//   node scripts/lint-components.mjs              # whole package
//   node scripts/lint-components.mjs src/components/badge.tsx  # one file
//
// Exits 1 on any error, 0 when only warnings remain.

import { readFile, readdir } from "node:fs/promises"
import { basename, dirname, relative, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..")
const componentsDir = resolve(root, "src/components")

// Matches a rounded-* utility, optionally side-qualified (rounded-e-none) and
// optionally prefixed by variants (**:data-[x]:rounded-none), capturing the
// value so it can be judged on what it resolves to rather than on the class
// name. Counting `rounded-` hits without reading the value produces false
// positives on every side reset and every token reference in the package.
const RADIUS =
  /\brounded(?:-(?:t|b|s|e|l|r|tl|tr|bl|br|ss|se|es|ee))?(?:-([^\s"'`]+))?/g

// A radius is fine when it resolves flat or circular:
//   none      — the explicit reset the components write, incl. `rounded-none!`
//   full      — a circle (avatar, radio dot); not a rounded rectangle
//   (--x)     — a CSS variable reference, e.g. calendar's [--cell-radius:0]
//   [inherit] — defers to the parent surface (drawer body, scroll-area viewport)
// A bare `rounded` resolves to --radius, which is --ds-radius = 0px, so it is
// flat today; it is still rejected because it silently rounds if that token is
// ever raised, which is not something a component should opt into implicitly.
const radiusIsFlat = (value) =>
  value !== undefined &&
  (/^(none|full)!?$/.test(value) ||
    value.startsWith("(--") ||
    value === "[inherit]")

const STATE_API =
  /React\.(useState|useReducer|useEffect|useLayoutEffect|useRef|useContext|useMemo|useCallback|useImperativeHandle|createContext)\b/

/** Files that are providers/config rather than rendered components. */
const NOT_A_COMPONENT = new Set(["direction.tsx"])

const rules = [
  {
    id: "use-client-when-stateful",
    level: "error",
    // A component touching React state or context is a client component. Without
    // the directive it throws the moment a consumer renders it from a React
    // Server Component, which is the default in Next.js app router.
    check: (src) =>
      STATE_API.test(src) && !/^"use client"$/m.test(src)
        ? [`uses React state/context but has no "use client" directive`]
        : [],
  },
  {
    id: "no-forward-ref",
    level: "error",
    // React 19 passes ref as an ordinary prop; the whole package relies on that.
    check: (src) =>
      /forwardRef/.test(src)
        ? ["uses forwardRef; take `ref` as a prop instead"]
        : [],
  },
  {
    id: "no-alias-imports",
    level: "error",
    // The published ESM must resolve without a bundler, so imports stay relative.
    check: (src) =>
      [...src.matchAll(/from\s+"((?:@diametral\/ui|@workspace)[^"]*)"/g)].map(
        (m) => `imports via alias "${m[1]}"; use a relative path`
      ),
  },
  {
    id: "relative-imports-need-js",
    level: "error",
    // Node cannot resolve extensionless relative specifiers in ESM.
    check: (src) =>
      [...src.matchAll(/from\s+"(\.\.?\/[^"]*)"/g)]
        .filter(([, spec]) => !spec.endsWith(".js") && !spec.endsWith(".css"))
        .map(
          ([, spec]) => `relative import "${spec}" is missing its .js extension`
        ),
  },
  {
    id: "no-default-export",
    level: "error",
    check: (src) =>
      /^export default\b/m.test(src)
        ? ["has a default export; the package exports named bindings only"]
        : [],
  },
  {
    id: "flat-radius",
    level: "error",
    // --ds-radius is 0px and components write rounded-none explicitly. A stray
    // rounded-md from a copied shadcn/Radix snippet is the drift this catches.
    check: (src) =>
      [...src.matchAll(RADIUS)]
        .filter(([, value]) => !radiusIsFlat(value))
        .map(
          ([cls]) =>
            `uses "${cls}"; the system is flat (none/full/(--var) only)`
        ),
  },
  {
    id: "data-slot-on-root",
    level: "warn",
    // Either written literally, or produced by Base UI's useRender, which turns
    // `state: { slot: "badge" }` into data-slot="badge" on the rendered element.
    check: (src, file) =>
      NOT_A_COMPONENT.has(file) || /data-slot=|slot: "/.test(src)
        ? []
        : [
            "renders no data-slot attribute; consumers target components by slot",
          ],
  },
  {
    id: "function-declarations",
    level: "warn",
    // Components are `function X(...)`, which keeps them hoisted and gives the
    // devtools a stable name.
    check: (src) =>
      [...src.matchAll(/^const ([A-Z][A-Za-z0-9]*) = \(/gm)].map(
        (m) =>
          `"${m[1]}" is an arrow const; declare components with \`function\``
      ),
  },
]

const targets = process.argv.slice(2)
const files = targets.length
  ? targets.map((f) => resolve(process.cwd(), f))
  : (await readdir(componentsDir))
      .filter((f) => f.endsWith(".tsx"))
      .map((f) => resolve(componentsDir, f))

let errors = 0
let warnings = 0

for (const path of files) {
  const src = await readFile(path, "utf8")
  const file = basename(path)

  for (const rule of rules) {
    for (const message of rule.check(src, file)) {
      const rel = relative(root, path)
      const where = rel.startsWith("..") ? path : rel
      console.log(
        `${rule.level === "error" ? "✖" : "⚠"} ${where}: ${message} [${rule.id}]`
      )
      rule.level === "error" ? errors++ : warnings++
    }
  }
}

const scope = targets.length
  ? `${files.length} file(s)`
  : `${files.length} components`
console.log(
  errors || warnings
    ? `\nlint-components: ${errors} error(s), ${warnings} warning(s) across ${scope}`
    : `lint-components: ${scope} clean`
)

process.exit(errors ? 1 : 0)
