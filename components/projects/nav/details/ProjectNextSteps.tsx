"use client"

import { useState, useEffect } from "react"
import { nextStepsService } from "@/app/services/next-steps/next-steps-service"
import type { NextStep } from "@/types"

interface ProjectNextStepsProps {
  projectId: string
}

export function ProjectNextSteps({ projectId }: ProjectNextStepsProps) {
  const [stepsList, setStepsList] = useState<NextStep[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    loadSteps()
  }, [projectId])

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


  if (isLoading) {
    return (
      <div className="bg-muted rounded-lg p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Next Steps</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="h-16 bg-gray-800 rounded-lg"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-muted rounded-lg p-6">
      <h2 className="text-xl font-semibold text-white mb-4">Next Steps</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {stepsList.map((step) => (
          <div
            key={step.id}
            className="flex items-start gap-4 p-4 rounded-lg bg-black/20 hover:bg-black/30 transition-colors"
          >
            <div className="w-10 h-10 rounded bg-blue-500 flex items-center justify-center">
              <span className="text-white text-xl">AI</span>
            </div>
            <div className="flex-1">
              <p className="font-medium text-white">{step.title}</p>
              {step.description && (
                <p className="text-sm text-gray-400 mt-1">{step.description}</p>
              )}
            </div>
            <div className="text-gray-400">
              <span>›</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
