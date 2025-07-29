"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { StepsHeader, NextStepsList } from "@/components/projects/nav/next-steps"
import { ProjectNav } from "@/components/projects/nav/ProjectNav"
import { nextStepsService } from "@/app/services/next-steps/next-steps-service"
import type { NextStep } from "@/types"

export default function NextStepsPage() {
  const params = useParams()
  const projectId = params.id as string
  
  const [nextSteps, setNextSteps] = useState<NextStep[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadNextSteps = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const steps = await nextStepsService.getNextStepsByProjectId(projectId)
        setNextSteps(steps)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load next steps")
      } finally {
        setIsLoading(false)
      }
    }
    
    if (projectId) {
      loadNextSteps()
    }
  }, [projectId])

  const handleStepCreated = (newStep: NextStep) => {
    setNextSteps((prevSteps) => [...prevSteps, newStep])
  }

  if (error) {
    return (
      <div className="space-y-6">
        <ProjectNav projectId={projectId} />
        <div className="mt-8">
          <div className="text-center py-8">
            <p className="text-red-400 mb-4">Error: {error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <ProjectNav projectId={projectId} />
      <div className="mt-8">
        <StepsHeader 
          title="Next Steps" 
          projectId={projectId} 
          onStepCreated={handleStepCreated} 
        />
        <NextStepsList 
          projectId={projectId} 
          initialSteps={nextSteps} 
        />
      </div>
    </div>
  )
}