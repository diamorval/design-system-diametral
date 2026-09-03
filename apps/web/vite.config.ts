import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

import { demoSource } from "./plugins/demo-source"

// https://vite.dev/config/
export default defineConfig({
  // Served from https://diamorval.github.io/design-system-diametral/ (GitHub Pages project site).
  base: "/design-system-diametral/",
  plugins: [react(), tailwindcss(), demoSource()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
