import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig, loadEnv } from "vite"

import { demoSource } from "./plugins/demo-source"

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // PORT_OFFSET comes from apps/web/.env, written by `make worktree-init` —
  // keeps a lane's dev/preview servers off the main checkout's ports.
  const offset = Number(loadEnv(mode, process.cwd(), "").PORT_OFFSET) || 0

  return {
    plugins: [react(), tailwindcss(), demoSource()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: { port: 5173 + offset, strictPort: true },
    preview: { port: 4173 + offset, strictPort: true },
  }
})
