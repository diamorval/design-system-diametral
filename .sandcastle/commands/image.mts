// Rebuild the lane image. Was a shell one-liner in package.json, so the
// $(id -u) / $(id -g) interpolation moves to os.userInfo() — execFileSync runs
// docker directly, with no shell to expand anything.
//
// Usage: pnpm sc image

import { execFileSync } from "node:child_process"
import { userInfo } from "node:os"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { imageInputsHash } from "../state.mts"

const here = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.join(here, "..", "..")

// The build context must be the repo root, not .sandcastle/, or the
// Dockerfile's `pnpm fetch` layer cannot see pnpm-lock.yaml. Resolved from this
// file rather than cwd so the command works from any directory.
const { uid, gid } = userInfo()

execFileSync(
  "docker",
  [
    "build",
    "-f",
    path.join(repoRoot, ".sandcastle", "Dockerfile"),
    "--build-arg",
    `AGENT_UID=${uid}`,
    "--build-arg",
    `AGENT_GID=${gid}`,
    // `sc doctor` recomputes this hash and compares: it is the only way to
    // tell a current image from one built before the lockfile changed.
    "--label",
    `sc.inputs=${imageInputsHash()}`,
    "-t",
    "sandcastle:design-system-diametral",
    repoRoot,
  ],
  { stdio: "inherit" }
)
