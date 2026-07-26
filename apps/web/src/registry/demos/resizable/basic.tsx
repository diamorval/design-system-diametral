import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@diametral/ui/components/resizable"

// This build of react-resizable-panels takes `orientation`, not `direction` —
// the group styles itself off the resulting `aria-orientation`.
//
// react-resizable-panels wraps each panel's children in its own `overflow:
// auto` div, which we can't reach through `ResizablePanel`'s props. `tabIndex`
// on this content div gives that scrollable region a focusable descendant so
// keyboard users can still reach clipped content once a panel is resized down.
export default function ResizableBasic() {
  return (
    <ResizablePanelGroup
      orientation="horizontal"
      className="h-48 max-w-xl border border-border"
    >
      <ResizablePanel defaultSize={35} minSize={20}>
        <div
          tabIndex={0}
          className="flex size-full items-center justify-center p-4 text-xs font-semibold tracking-widest uppercase"
        >
          Sidebar
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel minSize={30}>
        <div
          tabIndex={0}
          className="flex size-full items-center justify-center p-4 text-xs font-semibold tracking-widest uppercase"
        >
          Editor
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
