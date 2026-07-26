// Playwright config for the @diametral/ui quality gates.
//
// The docs app is the harness; the subject under test is the component library.
// Every component has a route (/docs/<slug>) and a live playground, so driving
// the docs app exercises the real components rather than fixtures written for
// the tests.
//
// Tests run against `vite preview` (a production build), not the dev server, so
// what is measured is what consumers get: minified output, no HMR runtime, and
// the same Tailwind pass that ships.

import { existsSync, readFileSync } from "node:fs"
import path from "node:path"
import { defineConfig } from "@playwright/test"

// Offset comes from apps/web/.env, written by `make worktree-init` — keeps a
// lane's preview server off the main checkout's port (and other lanes').
function portOffset() {
  const envPath = path.resolve(__dirname, ".env")
  if (!existsSync(envPath)) return 0
  const match = readFileSync(envPath, "utf8").match(/^PORT_OFFSET=(\d+)/m)
  return match ? Number(match[1]) : 0
}

const PORT = 4173 + portOffset()

export default defineConfig({
  testDir: "tests",

  // Baselines are grouped per spec file and are deliberately NOT keyed by
  // OS/arch: CI (Linux) must match what is committed. See tests/README.md —
  // baselines have to be generated on Linux for that to hold.
  snapshotPathTemplate: "tests/__screenshots__/{testFilePath}/{arg}{ext}",

  // Sub-pixel font rendering and anti-aliasing move a little between runs.
  expect: {
    toHaveScreenshot: { maxDiffPixelRatio: 0.02 },
  },

  // Fail the run if someone commits a .only
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [["html"], ["list"]] : [["list"]],

  webServer: {
    // Build then serve. reuseExistingServer lets a local `pnpm preview` stand in
    // so the suite does not rebuild on every invocation while iterating.
    command: `pnpm run build && pnpm exec vite preview --port ${PORT} --strictPort`,
    url: `http://localhost:${PORT}/`,
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },

  use: {
    baseURL: `http://localhost:${PORT}`,
    // Deterministic rendering: fixed viewport and 1x scale.
    viewport: { width: 1280, height: 900 },
    deviceScaleFactor: 1,
  },

  // One Chromium project keeps baselines stable and CI fast.
  projects: [{ name: "chromium", use: { browserName: "chromium" } }],
})
