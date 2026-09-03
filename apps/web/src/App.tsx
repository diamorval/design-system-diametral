import { BrowserRouter, Navigate, Route, Routes } from "react-router"

import { ComponentPage } from "@/docs/component-page"
import { DocsLayout } from "@/docs/docs-layout"
import { Overview } from "@/docs/overview"
import { Showcase } from "@/pages/showcase"

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DocsLayout />}>
          <Route index element={<Overview />} />
          <Route path="docs/:slug" element={<ComponentPage />} />
          {/* The original single-page showcase still renders every demo that
              predates the per-component pages, so nothing is unreachable while
              the remaining components are migrated. */}
          <Route path="showcase" element={<Showcase />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
