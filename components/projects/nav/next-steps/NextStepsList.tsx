"use client"

import { useState, useEffect } from "react"
import { StepItem } from "./StepItem"
import { NextStepContent } from "./NextStepContent"
import { nextStepsService } from "@/app/services/next-steps/next-steps-service"
import type { NextStep } from "@/types"

interface NextStepsListProps {
  projectId: string
  initialSteps?: NextStep[]
}

export function NextStepsList({ projectId, initialSteps = [] }: NextStepsListProps) {
  const [expandedStepId, setExpandedStepId] = useState<string | null>(null)
  const [stepsList, setStepsList] = useState<NextStep[]>(initialSteps)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (initialSteps.length === 0) {
      loadSteps()
    } else {
      setStepsList(initialSteps)
    }
  }, [projectId, initialSteps])

  const loadSteps = async () => {
    setIsLoading(true)
    try {
      const steps = await nextStepsService.getNextStepsByProjectId(projectId)
      setStepsList(steps)
    } catch (error) {
      console.error("Failed to load steps:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const toggleStep = (id: string) => {
    setExpandedStepId(expandedStepId === id ? null : id)
  }

  const handleStepUpdated = (updatedStep: NextStep) => {
    setStepsList(prevSteps =>
      prevSteps.map(step => (step.id === updatedStep.id ? updatedStep : step))
    )
  }

  const handleStepDeleted = (stepId: string) => {
    setStepsList(prevSteps => prevSteps.filter(step => step.id !== stepId))
  }

  const addNewStep = (newStep: NextStep) => {
    setStepsList(prevSteps => [...prevSteps, newStep])
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse">
            <div className="h-16 bg-gray-800 rounded-lg"></div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {stepsList.map((step) => (
        <StepItem
          key={step.id}
          step={step}
          isExpanded={expandedStepId === step.id}
          onToggle={() => toggleStep(step.id)}
          onStepUpdated={handleStepUpdated}
          onStepDeleted={handleStepDeleted}
        >
          <NextStepContent
            description={step.description ?? ""}
            stepId={step.id}
            onDelete={() => handleStepDeleted(step.id)}
          />
        </StepItem>
      ))}
    </div>
  )
}

export type NextStepsListRef = {
  addNewStep: (step: NextStep) => void
}