import { FileIcon, FolderIcon } from "@phosphor-icons/react"

import {
  Tree,
  TreeItem,
  TreeItemContent,
  TreeItemTrigger,
  TreeLeaf,
} from "@workspace/ui/components/tree"

export default function TreeBasic() {
  return (
    <Tree className="max-w-xs">
      <TreeItem defaultOpen>
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
          <TreeLeaf>
            <FileIcon /> item.tsx
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
