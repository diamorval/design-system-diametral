import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

import { demoSource } from "./plugins/demo-source"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), demoSource()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
