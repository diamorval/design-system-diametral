#!/usr/bin/env node
// Confirms this worktree's isolation actually took: apps/web/.env exists,
// its offset differs from the unshifted defaults, and — if a server is
// already running — that it answers on the shifted port (not 4173/5173,
// which would mean env-shadowing slipped past the guard).

import { existsSync, readFileSync } from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const envPath = path.join(repoRoot, "apps/web/.env")

if (!existsSync(envPath)) {
  console.error(`No ${envPath} — run \`NAME=lane-N OFFSET=N00 make worktree-init\` first.`)
  process.exit(1)
}

const fileEnv = {}
for (const line of readFileSync(envPath, "utf8").split("\n")) {
  const match = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/)
  if (match) fileEnv[match[1]] = match[2]
}

const offset = Number(fileEnv.PORT_OFFSET)
if (!offset) {
  console.error(`${envPath} has no non-zero PORT_OFFSET — isolation did not take.`)
  process.exit(1)
}

const previewPort = 4173 + offset
const devPort = 5173 + offset
console.log(`${fileEnv.WORKTREE_NAME}: PORT_OFFSET=${offset} (dev ${devPort}, preview ${previewPort})`)

async function probe(port) {
  try {
    const res = await fetch(`http://localhost:${port}/`, { signal: AbortSignal.timeout(2000) })
    return res.status
  } catch {
    return null
  }
}

const status = await probe(previewPort)
if (status === 200) {
  console.log(`preview (${previewPort}): 200 OK`)
} else {
  console.log(`preview (${previewPort}): not running — start with \`pnpm --filter web run preview\` to check live`)
}
