"use client"

import { useState } from "react"
import { StepItem } from "./StepItem"
import { NextStepContent } from "./NextStepContent"
import type { NextStep } from "@/types"

interface NextStepsListProps {
  steps: NextStep[]
}

export function NextStepsList({ steps }: NextStepsListProps) {
  const [expandedStepId, setExpandedStepId] = useState<string | null>(null)

  const toggleStep = (id: string) => {
    setExpandedStepId(expandedStepId === id ? null : id)
  }

  return (
    <div className="space-y-4">
      {steps.map((step) => (
        <StepItem
          key={step.id}
          done={step.done}
          title={step.title}
          isExpanded={expandedStepId === step.id}
          onToggle={() => toggleStep(step.id)}
        >
          <NextStepContent description={step.description ?? ""} buttonText={step.buttonText} />
        </StepItem>
      ))}
    </div>
  )
}
