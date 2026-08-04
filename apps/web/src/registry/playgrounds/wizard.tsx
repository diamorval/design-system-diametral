import type { ComponentProps } from "react"

import { Wizard } from "@diametral/ui/components/wizard"

const STEPS = [
  { label: "Workspace", content: <p className="text-sm">Name it.</p> },
  { label: "Members", content: <p className="text-sm">Invite the team.</p> },
  { label: "Review", content: <p className="text-sm">Check and finish.</p> },
]

// `steps` carries nodes, so the flow is fixed here and the panel only drives
// the button labels — the step itself moves by clicking Back and Next.
export default function WizardPlayground(
  props: Partial<Omit<ComponentProps<typeof Wizard>, "steps">>
) {
  return <Wizard steps={STEPS} className="max-w-lg" {...props} />
}
