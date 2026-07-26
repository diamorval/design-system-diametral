import {
  Status,
  StatusIndicator,
  StatusLabel,
} from "@diametral/ui/components/status"

// `pulse` is a prop of the indicator, not the status itself, so a live status
// can still carry a static label — the dot is what signals "in progress".
export default function StatusPulse() {
  return (
    <div className="flex flex-col gap-3">
      <Status tone="info">
        <StatusIndicator pulse />
        <StatusLabel>Deploying</StatusLabel>
      </Status>
      <Status tone="success">
        <StatusIndicator />
        <StatusLabel>Live</StatusLabel>
      </Status>
    </div>
  )
}
