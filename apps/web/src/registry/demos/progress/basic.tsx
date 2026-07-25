import {
  Progress,
  ProgressLabel,
  ProgressValue,
} from "@diametral/ui/components/progress"

// `Progress` renders its own Track and Indicator, so children are the label and
// value only — adding a `ProgressTrack` here would draw a second bar.
export default function ProgressBasic() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-8">
      <Progress value={72}>
        <ProgressLabel>Uploading</ProgressLabel>
        <ProgressValue />
      </Progress>

      <Progress value={0.41} max={1} format={{ style: "percent" }}>
        <ProgressLabel>Coverage</ProgressLabel>
        <ProgressValue />
      </Progress>
    </div>
  )
}
