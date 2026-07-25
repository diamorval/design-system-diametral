import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@diametral/ui/components/resizable"

// This build of react-resizable-panels takes `orientation`, not `direction` —
// the group styles itself off the resulting `aria-orientation`.
export default function ResizableBasic() {
  return (
    <ResizablePanelGroup
      orientation="horizontal"
      className="h-48 max-w-xl border border-border"
    >
      <ResizablePanel defaultSize={35} minSize={20}>
        <div className="flex size-full items-center justify-center p-4 text-xs font-semibold tracking-widest uppercase">
          Sidebar
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel minSize={30}>
        <div className="flex size-full items-center justify-center p-4 text-xs font-semibold tracking-widest uppercase">
          Editor
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
