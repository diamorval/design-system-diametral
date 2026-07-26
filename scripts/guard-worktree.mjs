#!/usr/bin/env node
// Refuses to boot the dev/preview/test scripts from a linked worktree that
// hasn't run `make worktree-init`, and catches shell-exported vars that would
// shadow apps/web/.env. The main checkout is never guarded — no .env, no gate.

import { execFileSync } from "node:child_process"
import { existsSync, readFileSync } from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const envPath = path.join(repoRoot, "apps/web/.env")

function git(args) {
  return execFileSync("git", args, { cwd: repoRoot }).toString().trim()
}

const gitDir = git(["rev-parse", "--path-format=absolute", "--git-dir"])
const commonDir = git(["rev-parse", "--path-format=absolute", "--git-common-dir"])
const isLinkedWorktree = gitDir !== commonDir

if (!isLinkedWorktree) process.exit(0)

if (!existsSync(envPath)) {
  console.error(
    "This is a linked worktree with no apps/web/.env.\n" +
      "Run `NAME=lane-N OFFSET=N00 make worktree-init` from the worktree root first.",
  )
  process.exit(1)
}

const fileEnv = {}
for (const line of readFileSync(envPath, "utf8").split("\n")) {
  const match = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/)
  if (match) fileEnv[match[1]] = match[2]
}

for (const key of ["PORT_OFFSET", "WORKTREE_NAME"]) {
  if (process.env[key] !== undefined && process.env[key] !== fileEnv[key]) {
    console.error(
      `Shell has ${key}=${process.env[key]} exported, shadowing apps/web/.env's ` +
        `${key}=${fileEnv[key]}. Unset it, or boot with ` +
        `env -i PATH="$PATH" HOME="$HOME" pnpm <script>.`,
    )
    process.exit(1)
  }
}
