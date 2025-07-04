// frontend/components/projects/nav/next-steps/NextStepsList.tsx
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
  const [stepsList, setStepsList] = useState<NextStep[]>(steps)

  const toggleStep = (id: string) => {
    setExpandedStepId(expandedStepId === id ? null : id)
  }

  const handleEditStep = (id: string) => {
    // In a real app, this would open an edit form/modal
    console.log("Editing step with id:", id)
    // For mock data, you would update the step in the list
  }

  const handleDeleteStep = (id: string) => {
    setStepsList(prevSteps => prevSteps.filter(step => step.id !== id))
    // In a real app, you would also make an API call here
  }

  return (
    <div className="space-y-4">
      {stepsList.map((step) => (
        <StepItem
          key={step.id}
          done={step.done}
          title={step.title}
          isExpanded={expandedStepId === step.id}
          onToggle={() => toggleStep(step.id)}
        >
          <NextStepContent
            description={step.description ?? ""}
            stepId={step.id}
            onEdit={handleEditStep}
            onDelete={handleDeleteStep}
          />
        </StepItem>
      ))}
    </div>
  )
}