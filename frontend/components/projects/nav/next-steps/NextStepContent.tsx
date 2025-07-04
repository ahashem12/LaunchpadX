// frontend/components/projects/nav/next-steps/NextStepContent.tsx
"use client"

import { useState } from "react"
import { Pencil, Trash2 } from "lucide-react"
import { DeleteConfirmationModal } from "./DeleteConfirmationModal"
import { motion } from "framer-motion"

interface NextStepContentProps {
  description: string
  stepId: string
  onEdit: (id: string) => void
  onDelete: (id: string) => void
}

export function NextStepContent({
  description,
  stepId,
  onEdit,
  onDelete,
}: NextStepContentProps) {
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="space-y-4 text-sm text-gray-300"
    >
      <p>{description}</p>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.2 }}
        className="flex space-x-2"
      >
        <button
          onClick={() => onEdit(stepId)}
          className="flex items-center gap-2 px-3 py-1.5 rounded border border-gray-600 text-gray-300 hover:bg-gray-700 transition hover:text-white"
        >
          <Pencil size={16} />
          Edit
        </button>
        <button
          onClick={() => setShowDeleteModal(true)}
          className="flex items-center gap-2 px-3 py-1.5 rounded border border-red-500/30 text-red-500 hover:bg-red-500/10 transition hover:text-red-400"
        >
          <Trash2 size={16} />
          Delete
        </button>
      </motion.div>
      
      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={() => onDelete(stepId)}
        itemName="this step"
      />
    </motion.div>
  )
}