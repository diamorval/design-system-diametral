import * as React from "react"
import { Link, useParams } from "react-router"
import { CheckIcon, CopyIcon } from "@phosphor-icons/react"

import { Badge } from "@diametral/ui/components/badge"
import { Button } from "@diametral/ui/components/button"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@diametral/ui/components/empty"

import { ExampleBlock } from "@/docs/example"
import { Playground } from "@/docs/playground"
import { Prose } from "@/docs/prose"
import { demoKeysFor } from "@/registry/demos"
import { hasPlayground } from "@/registry/playground-registry"
import { exampleAnchor, findComponent, importPath } from "@/registry/registry"

function ImportLine({ slug }: { slug: string }) {
  const [copied, setCopied] = React.useState(false)
  const line = `import { … } from "${importPath(slug)}"`

  React.useEffect(() => {
    if (!copied) return
    const timer = window.setTimeout(() => setCopied(false), 2000)
    return () => window.clearTimeout(timer)
  }, [copied])

  return (
    <div className="flex items-center gap-2 border border-border bg-muted/40 px-3 py-2">
      <code className="flex-1 truncate font-mono text-xs">{line}</code>
      <Button
        size="icon-sm"
        variant="ghost"
        aria-label={copied ? "Copied" : "Copy import path"}
        onClick={async () => {
          await navigator.clipboard.writeText(importPath(slug))
          setCopied(true)
        }}
      >
        {copied ? <CheckIcon /> : <CopyIcon />}
      </Button>
    </div>
  )
}

export function ComponentPage() {
  const { slug = "" } = useParams()
  const component = findComponent(slug)

  // Scrolling is per-page here: react-router keeps the layout mounted across
  // navigations, so without this you land mid-page on the next component.
  React.useEffect(() => {
    if (!window.location.hash) window.scrollTo(0, 0)
  }, [slug])

  if (!component) {
    return (
      <Empty className="mt-12">
        <EmptyHeader>
          <EmptyTitle>Unknown component</EmptyTitle>
          <EmptyDescription>
            No component is registered under “{slug}”.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    )
  }

  const examples = component.examples ?? []
  const documented = new Set(examples.map((example) => example.demo))
  const orphans = demoKeysFor(slug).filter((key) => !documented.has(key))
  const playground = hasPlayground(slug)

  return (
    <div className="flex gap-12">
      <article className="min-w-0 flex-1">
        <header className="mb-8">
          <Badge variant="outline" className="mb-3">
            {component.category}
          </Badge>
          <h1 className="font-heading text-3xl font-light tracking-tight">
            {component.name}
          </h1>
          <Prose className="mt-2 max-w-2xl">{component.description}</Prose>
          <div className="mt-5 max-w-2xl">
            <ImportLine slug={component.slug} />
          </div>
        </header>

        <div className="mb-12">
          <Playground slug={component.slug} />
        </div>

        {examples.length > 0 ? (
          <div className="flex flex-col gap-12">
            {examples.map((example) => (
              <ExampleBlock key={example.demo} example={example} />
            ))}
            {orphans.map((key) => (
              <ExampleBlock
                key={key}
                example={{ demo: key, title: key.split("/").slice(1).join(" ") }}
              />
            ))}
          </div>
        ) : playground ? (
          // A playground already gives this page working content, so the missing
          // examples are a footnote rather than an empty state.
          <p className="text-sm text-muted-foreground">
            Curated usages for {component.name} are still to be written — the{" "}
            <Link to="/showcase" className="underline">
              legacy showcase
            </Link>{" "}
            may already demo it.
          </p>
        ) : (
          <Empty className="border border-dashed border-border">
            <EmptyHeader>
              <EmptyTitle>Usages not written yet</EmptyTitle>
              <EmptyDescription>
                {component.name} ships and is exported — only its documented
                examples are pending. The single-page{" "}
                <Link to="/showcase" className="underline">
                  legacy showcase
                </Link>{" "}
                still renders every original demo in the meantime.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        )}
      </article>

      {(playground ? 1 : 0) + examples.length > 1 ? (
        <nav className="sticky top-8 hidden h-fit w-44 shrink-0 xl:block">
          <p className="mb-3 font-mono text-[11px] tracking-wide text-muted-foreground uppercase">
            On this page
          </p>
          <ul className="flex flex-col gap-2 border-s border-border">
            {playground ? (
              <li>
                <a
                  href="#playground"
                  className="-ms-px block border-s border-transparent ps-3 text-sm text-muted-foreground hover:border-foreground hover:text-foreground"
                >
                  Playground
                </a>
              </li>
            ) : null}
            {examples.map((example) => (
              <li key={example.demo}>
                <a
                  href={`#${exampleAnchor(example)}`}
                  className="-ms-px block border-s border-transparent ps-3 text-sm text-muted-foreground hover:border-foreground hover:text-foreground"
                >
                  {example.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </div>
  )
}
