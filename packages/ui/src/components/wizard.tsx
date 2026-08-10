"use client"

import * as React from "react"

import { useControllableValue } from "../hooks/use-controllable-value.js"
import { cn } from "../lib/utils.js"
import { Button } from "./button.js"
import {
  Stepper,
  StepperContent,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTitle,
} from "./stepper.js"

export interface WizardStep {
  label: React.ReactNode
  content?: React.ReactNode
  /** Hold the flow here — Next is disabled until the step is satisfied. */
  disableNext?: boolean
}

// The state machine v2's `Stepper` deliberately lacks, ported from v1's Wizard
// (react/components/Wizard.js). `Stepper` is presentational parts only: it
// draws steps, it does not drive them. Wizard supplies the current index, the
// Back/Next/Finish navigation and the panel, and composes the existing parts
// for the trail rather than re-drawing one.
//
// Controlled with `active` + `onStepChange`, uncontrolled with `defaultActive`.
function Wizard({
  className,
  steps,
  active,
  defaultActive = 0,
  onStepChange,
  onFinish,
  label = "Progress",
  backLabel = "Back",
  nextLabel = "Next",
  finishLabel = "Finish",
  ...props
}: Omit<React.ComponentProps<"div">, "onChange"> & {
  steps: WizardStep[]
  active?: number
  defaultActive?: number
  onStepChange?: (index: number) => void
  onFinish?: () => void
  /** Accessible name for the step trail. */
  label?: string
  backLabel?: React.ReactNode
  nextLabel?: React.ReactNode
  finishLabel?: React.ReactNode
}) {
  const [current, setCurrent] = useControllableValue<number>({
    value: active,
    defaultValue: defaultActive,
    onChange: onStepChange,
  })

  const count = steps.length
  const isFirst = current <= 0
  const isLast = current >= count - 1
  const step = steps[current]

  const goTo = (index: number) => {
    const next = Math.max(0, Math.min(count - 1, index))
    if (next !== current) setCurrent(next)
  }

  return (
    <div
      data-slot="wizard"
      className={cn("ds-wizard", className)}
      {...props}
    >
      <Stepper aria-label={label}>
        {steps.map((entry, index) => (
          <React.Fragment key={index}>
            <StepperItem
              state={
                index === current
                  ? "active"
                  : index < current
                    ? "completed"
                    : "inactive"
              }
              aria-current={index === current ? "step" : undefined}
            >
              <StepperIndicator>{index + 1}</StepperIndicator>
              <StepperContent>
                <StepperTitle>{entry.label}</StepperTitle>
              </StepperContent>
            </StepperItem>
            {index < count - 1 ? <StepperSeparator /> : null}
          </React.Fragment>
        ))}
      </Stepper>

      <div data-slot="wizard-panel">{step?.content}</div>

      <div
        data-slot="wizard-footer"
        className="ds-wizard-footer"
      >
        <Button
          variant="ghost"
          disabled={isFirst}
          onClick={() => goTo(current - 1)}
        >
          {backLabel}
        </Button>
        <Button
          // `disableNext` gates advancing, never finishing: a flow whose last
          // step is unsatisfied should say so rather than trap the reader.
          disabled={!isLast && Boolean(step?.disableNext)}
          onClick={() => (isLast ? onFinish?.() : goTo(current + 1))}
        >
          {isLast ? finishLabel : nextLabel}
        </Button>
      </div>
    </div>
  )
}

export { Wizard }
