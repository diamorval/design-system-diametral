// Ambient type for Vite's `?raw` asset suffix, scoped narrowly rather than
// pulling in the whole `vite/client` lib (which would couple this
// bundler-agnostic package to Vite's ambient globals). wordmark.tsx is the
// only consumer today, inlining an @diametral/assets SVG so its
// `stroke="currentColor"` recolours with the surrounding text.
declare module "*.svg?raw" {
  const content: string
  export default content
}
