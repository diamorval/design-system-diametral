"use client"

import * as React from "react"
import { Collapsible as CollapsiblePrimitive } from "@base-ui/react/collapsible"

import { cn } from "@workspace/ui/lib/utils"
import { CaretRightIcon, CaretDownIcon } from "@phosphor-icons/react"

function Tree({ className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      role="tree"
      data-slot="tree"
      className={cn("flex w-full flex-col gap-0.5", className)}
      {...props}
    />
  )
}

function TreeItem({ className, ...props }: CollapsiblePrimitive.Root.Props) {
  return (
    <CollapsiblePrimitive.Root
      data-slot="tree-item"
      render={<li role="treeitem" />}
      className={cn("flex flex-col", className)}
      {...props}
    />
  )
}

function TreeItemTrigger({
  className,
  children,
  ...props
}: CollapsiblePrimitive.Trigger.Props) {
  return (
    <CollapsiblePrimitive.Trigger
      data-slot="tree-item-trigger"
      className={cn(
        "group/tree-item-trigger flex h-8 w-full items-center gap-2 rounded-none bg-transparent px-2 text-start text-sm outline-none transition-colors hover:bg-muted/50 focus-visible:ring-2 focus-visible:ring-ring/30 [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3.5",
        className
      )}
      {...props}
    >
      <CaretRightIcon className="size-3 text-muted-foreground group-data-panel-open/tree-item-trigger:hidden rtl:rotate-180" />
      <CaretDownIcon className="hidden size-3 text-muted-foreground group-data-panel-open/tree-item-trigger:block" />
      {children}
    </CollapsiblePrimitive.Trigger>
  )
}

function TreeItemContent({
  className,
  ...props
}: CollapsiblePrimitive.Panel.Props) {
  return (
    <CollapsiblePrimitive.Panel
      data-slot="tree-item-content"
      render={<ul role="group" />}
      className={cn(
        "ms-4 flex flex-col gap-0.5 border-s border-border ps-2",
        className
      )}
      {...props}
    />
  )
}

function TreeLeaf({ className, children, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      role="treeitem"
      data-slot="tree-leaf"
      className={cn(
        "flex h-8 items-center gap-2 rounded-none px-2 text-sm text-muted-foreground transition-colors hover:bg-muted/50 [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3.5",
        className
      )}
      {...props}
    >
      <span className="size-3 shrink-0" />
      {children}
    </li>
  )
}

export { Tree, TreeItem, TreeItemTrigger, TreeItemContent, TreeLeaf }
