// frontend/components/projects/nav/next-steps/DeleteStepButton.tsx
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { motion } from "framer-motion"
import { DeleteConfirmationModal } from "./DeleteConfirmationModal"
import { nextStepsService } from "@/app/services/next-steps/next-steps-service"

interface DeleteStepButtonProps {
  stepId: string
  stepTitle: string
  onDeleted: () => void
  disabled?: boolean
}

export function DeleteStepButton({ stepId, stepTitle, onDeleted, disabled }: DeleteStepButtonProps) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      const success = await nextStepsService.deleteNextStep(stepId)
      if (success) {
        onDeleted()
      }
    } finally {
      setIsDeleting(false)
      setIsDeleteModalOpen(false)
    }
  }

  return (
    <>
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsDeleteModalOpen(true)}
          className="p-2 opacity-70 hover:opacity-100 text-red-400 hover:text-red-300"
          disabled={disabled || isDeleting}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </motion.div>

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        itemName={stepTitle}
      />
    </>
  )
}