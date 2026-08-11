import * as React from "react"
import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"

import { cn } from "../lib/utils.js"

function Toc({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      aria-label="On this page"
      data-slot="toc"
      className={cn("ds-toc sticky top-8", className)}
      {...props}
    />
  )
}

function TocLabel({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="toc-label"
      className={cn("ds-toc-label mb-3", className)}
      {...props}
    />
  )
}

function TocList({ className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="toc-list"
      className={cn("ds-toc-list gap-2", className)}
      {...props}
    />
  )
}

function TocItem({
  className,
  level = 1,
  ...props
}: React.ComponentProps<"li"> & { level?: 1 | 2 }) {
  return (
    <li
      data-slot="toc-item"
      data-level={level}
      className={cn(className)}
      {...props}
    />
  )
}

function TocLink({
  className,
  render,
  ...props
}: useRender.ComponentProps<"a">) {
  return useRender({
    defaultTagName: "a",
    props: mergeProps<"a">(
      {
        className: cn(
          "ds-toc-link border-transparent text-sm text-muted-foreground hover:border-foreground hover:text-foreground",
          className
        ),
      },
      props
    ),
    render,
    state: {
      slot: "toc-link",
    },
  })
}

export { Toc, TocLabel, TocList, TocItem, TocLink }
