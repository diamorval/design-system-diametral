import * as React from "react"
import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"

import { cn } from "../lib/utils.js"

function Toc({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      aria-label="On this page"
      data-slot="toc"
      className={cn("sticky top-8 h-fit w-44 shrink-0", className)}
      {...props}
    />
  )
}

function TocLabel({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="toc-label"
      className={cn(
        "mb-3 font-mono text-[11px] tracking-wide text-muted-foreground uppercase",
        className
      )}
      {...props}
    />
  )
}

function TocList({ className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="toc-list"
      className={cn("flex flex-col gap-2 border-s border-border", className)}
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
      className={cn("group/toc-item", className)}
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
          "-ms-px block border-s border-transparent ps-3 text-sm text-muted-foreground transition-colors hover:border-foreground hover:text-foreground",
          "group-data-[level=2]/toc-item:ps-6",
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
