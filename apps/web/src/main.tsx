import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import "@workspace/ui/globals.css"
import { App } from "./App.tsx"
import { ThemeProvider } from "@/components/theme-provider.tsx"
import { DirectionProvider } from "@workspace/ui/components/direction"
import { TooltipProvider } from "@workspace/ui/components/tooltip"
import { Toaster } from "@workspace/ui/components/toast"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <DirectionProvider>
        <TooltipProvider>
          {/* Toaster both provides the toast context and mounts the portal +
              viewport, so it has to wrap the tree rather than sit beside it. */}
          <Toaster>
            <App />
          </Toaster>
        </TooltipProvider>
      </DirectionProvider>
    </ThemeProvider>
  </StrictMode>
)
