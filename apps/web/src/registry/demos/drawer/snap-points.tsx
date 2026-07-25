import { Button } from "@workspace/ui/components/button"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@workspace/ui/components/drawer"
import {
  Item,
  ItemContent,
  ItemGroup,
  ItemTitle,
} from "@workspace/ui/components/item"

// With snap points the popup takes the full viewport height and the snap offset
// moves it, which is why the sizing rules switch on `data-snap-points`.
export default function DrawerSnapPoints() {
  return (
    <Drawer snapPoints={["30%", "60%", 1]} showSwipeHandle>
      <DrawerTrigger render={<Button variant="outline" />}>
        Open with snap points
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Nearby sites</DrawerTitle>
          <DrawerDescription>
            Drag the handle between 30%, 60% and full height.
          </DrawerDescription>
        </DrawerHeader>
        <div className="overflow-y-auto px-8 pb-8">
          <ItemGroup>
            {["Régie Ouest", "Atelier Nord", "Studio Sud", "Dépôt Est"].map(
              (site) => (
                <Item key={site} variant="outline" size="sm">
                  <ItemContent>
                    <ItemTitle>{site}</ItemTitle>
                  </ItemContent>
                </Item>
              )
            )}
          </ItemGroup>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
