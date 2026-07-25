import type { ComponentProps } from "react"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@diametral/ui/components/tabs"

export default function TabsPlayground(props: ComponentProps<typeof TabsList>) {
  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList {...props}>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="activity">Activity</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="pt-4 text-sm">
        Overview panel content.
      </TabsContent>
      <TabsContent value="activity" className="pt-4 text-sm">
        Activity panel content.
      </TabsContent>
    </Tabs>
  )
}
