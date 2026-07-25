import { Button } from "@diametral/ui/components/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@diametral/ui/components/drawer"

// `swipeDirection` is the single source of truth: the content derives its axis,
// edge, border and close transform from it, so there is no separate `side`.
export default function DrawerBasic() {
  return (
    <Drawer showSwipeHandle>
      <DrawerTrigger render={<Button variant="outline" />}>
        Open drawer
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Filters</DrawerTitle>
          <DrawerDescription>
            Swipe down or press Escape to dismiss.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <DrawerClose render={<Button />}>Apply</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
