// frontend/components/projects/nav/next-steps/DeleteConfirmationModal.tsx
"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { AlertTriangle } from "lucide-react"

interface DeleteConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  itemName: string
}

export function DeleteConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  itemName,
}: DeleteConfirmationModalProps) {
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true)
    }
  }, [isOpen])

  const handleClose = () => {
    setIsAnimating(false)
    setTimeout(onClose, 300)
  }

  const handleConfirm = () => {
    setIsAnimating(false)
    setTimeout(() => {
      onConfirm()
      onClose()
    }, 300)
  }

  if (!isOpen && !isAnimating) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div
        className={cn(
          "bg-black bg-opacity-40 border border-gray-600 rounded-xl p-6 w-full max-w-md transform transition-all duration-300 shadow-xl",
          isAnimating ? "scale-100 opacity-100" : "scale-95 opacity-0"
        )}
      >
        <div className="flex items-start gap-3 mb-4">
          <div className="p-2 rounded-full bg-red-500/20 text-red-500">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Delete Confirmation</h3>
            <p className="text-gray-400 mt-1">
              This action cannot be undone
            </p>
          </div>
        </div>

        <p className="text-gray-300 pl-11 mb-6">
          Are you sure you want to delete <span className="font-medium text-white">"{itemName}"</span>?
        </p>

        <div className="flex justify-end space-x-3 pt-2">
          <button
            onClick={handleClose}
            className={cn(
              "px-4 py-2 rounded-lg border",
              "border-gray-700 bg-gray-800 text-gray-300",
              "hover:bg-gray-700 hover:border-gray-600",
              "transition-colors duration-200"
            )}
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className={cn(
              "px-4 py-2 rounded-lg font-medium",
              "bg-red-500 text-white hover:bg-red-600",
              "transition-colors duration-200",
              "focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            )}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}