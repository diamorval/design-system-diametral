import {
  StatCard,
  StatCardDelta,
  StatCardLabel,
  StatCardValue,
} from "@diametral/ui/components/stat-card"

// The arrow is decorative (`aria-hidden`) — the signed figure in the text is
// what actually carries the direction, so color is never the only cue.
export default function StatCardWithDelta() {
  return (
    <div className="flex flex-wrap gap-4">
      <StatCard className="w-48">
        <StatCardLabel>Revenue</StatCardLabel>
        <StatCardValue>84 200 €</StatCardValue>
        <StatCardDelta direction="up">+12.4%</StatCardDelta>
      </StatCard>
      <StatCard className="w-48">
        <StatCardLabel>Churn</StatCardLabel>
        <StatCardValue>3.1%</StatCardValue>
        <StatCardDelta direction="down">-0.6pt</StatCardDelta>
      </StatCard>
    </div>
  )
}
