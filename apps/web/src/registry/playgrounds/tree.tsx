import type { ComponentProps } from "react"
import { FileIcon, FolderIcon } from "@phosphor-icons/react"

import {
  Tree,
  TreeItem,
  TreeItemContent,
  TreeItemTrigger,
  TreeLeaf,
} from "@diametral/ui/components/tree"

// The controls drive the branch, not the tree: `TreeItem` is a Collapsible, so
// open state and disabling belong to it.
export default function TreePlayground(props: ComponentProps<typeof TreeItem>) {
  return (
    <Tree className="w-full max-w-3xs">
      <TreeItem defaultOpen {...props}>
        <TreeItemTrigger>
          <FolderIcon /> components
        </TreeItemTrigger>
        <TreeItemContent>
          <TreeLeaf>
            <FileIcon /> button.tsx
          </TreeLeaf>
          <TreeLeaf>
            <FileIcon /> badge.tsx
          </TreeLeaf>
        </TreeItemContent>
      </TreeItem>
      <TreeItem>
        <TreeItemTrigger>
          <FolderIcon /> lib
        </TreeItemTrigger>
        <TreeItemContent>
          <TreeLeaf>
            <FileIcon /> utils.ts
          </TreeLeaf>
        </TreeItemContent>
      </TreeItem>
    </Tree>
  )
}
