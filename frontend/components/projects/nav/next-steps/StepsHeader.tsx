"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { CreateNextStepModal } from "./CreateNextStepModal"
import type { NextStep } from "@/types"

interface StepsHeaderProps {
  title: string
  projectId: string
  onStepCreated: (step: NextStep) => void
}

export function StepsHeader({ title, projectId, onStepCreated }: StepsHeaderProps) {
  const [showCreateModal, setShowCreateModal] = useState(false)

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">{title}</h1>
        <Button onClick={() => setShowCreateModal(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Create Step
        </Button>
      </div>

      <CreateNextStepModal
        open={showCreateModal}
        onOpenChange={setShowCreateModal}
        projectId={projectId}
        onStepCreated={onStepCreated}
      />
    </>
  )
}
