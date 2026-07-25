declare module "virtual:demo-source" {
  /** Keyed by `<slug>/<demo-name>`, populated by the demo-source Vite plugin. */
  export const sources: Record<string, { code: string; html: string }>
}
