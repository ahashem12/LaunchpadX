// frontend/components/projects/nav/next-steps/ToggleDoneButton.tsx
"use client"

import { Button } from "@/components/ui/button"
import { Check, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { nextStepsService } from "@/app/services/next-steps/next-steps-service"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface ToggleDoneButtonProps {
  stepId: string
  done: boolean
  onToggled: (done: boolean) => void
  disabled?: boolean
}

export function ToggleDoneButton({ stepId, done, onToggled, disabled }: ToggleDoneButtonProps) {
  const [isToggling, setIsToggling] = useState(false)

  const handleToggle = async () => {
    setIsToggling(true)
    try {
      const updatedStep = await nextStepsService.toggleNextStepDone(stepId, !done)
      if (updatedStep) {
        onToggled(updatedStep.done)
      }
    } finally {
      setIsToggling(false)
    }
  }

  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Button
        variant="ghost"
        size="sm"
        onClick={handleToggle}
        disabled={disabled || isToggling}
        className={cn(
          "p-2",
          done ? "text-green-500 hover:text-green-400" : "text-gray-400 hover:text-gray-300"
        )}
      >
        <AnimatePresence mode="wait" initial={false}>
          {done ? (
            <motion.span
              key="undo"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.2 }}
            >
              <X className="h-4 w-4" />
            </motion.span>
          ) : (
            <motion.span
              key="done"
              initial={{ opacity: 0, rotate: 90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: -90 }}
              transition={{ duration: 0.2 }}
            >
              <Check className="h-4 w-4" />
            </motion.span>
          )}
        </AnimatePresence>
      </Button>
    </motion.div>
  )
}