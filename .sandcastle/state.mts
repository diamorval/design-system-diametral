// Facts about the sandcastle installation that more than one command needs:
// whether a run is live, which logs exist, what the image was built from.
// Side-effect free and independent of config.mts — importing a command module
// runs it, so shared reads live here instead.

import { execFileSync } from "node:child_process"
import { createHash } from "node:crypto"
import { readdirSync, readFileSync, statSync, type Dirent } from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const here = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.join(here, "..")

/**
 * The single definition of "a run is happening" — `sc status` prints it and
 * `sc clean --all` refuses on it. Nothing else may re-derive the
 * `sandcastle-*` container filter.
 */
export function isRunLive(): { live: boolean; lanes: number } {
  try {
    const out = execFileSync(
      "docker",
      ["ps", "--filter", "name=sandcastle-", "--format", "{{.Names}}"],
      { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }
    )
    const lanes = out.split("\n").filter((l) => l.trim() !== "").length
    return { live: lanes > 0, lanes }
  } catch {
    // Docker absent, not running, or refusing the socket — no run is live.
    return { live: false, lanes: 0 }
  }
}

/** Every log file, newest mtime first. `[]` when the directory is absent. */
export function logInventory(): {
  name: string
  path: string
  size: number
  mtime: Date
}[] {
  const dir = path.join(here, "logs")
  let entries: Dirent[]
  try {
    entries = readdirSync(dir, { withFileTypes: true })
  } catch {
    return []
  }

  return entries
    .filter((e) => e.isFile())
    .map(({ name }) => {
      const file = path.join(dir, name)
      const st = statSync(file)
      return { name, path: file, size: st.size, mtime: st.mtime }
    })
    .sort((a, b) => b.mtime.getTime() - a.mtime.getTime())
}

/**
 * sha256 over the Dockerfile then pnpm-lock.yaml — the image's real build
 * inputs, since the Dockerfile bakes the pnpm store from the lockfile via
 * `pnpm fetch`. `sc image` stores this as a docker label and `sc doctor`
 * recomputes it. Content, never mtime: `git checkout` rewrites the lockfile's
 * mtime with identical content, so an mtime heuristic cries STALE after every
 * branch switch and gets ignored within a week.
 */
export function imageInputsHash(): string {
  return createHash("sha256")
    .update(readFileSync(path.join(here, "Dockerfile")))
    .update(readFileSync(path.join(repoRoot, "pnpm-lock.yaml")))
    .digest("hex")
}
