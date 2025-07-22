"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Check, ChevronDown, Edit2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ToggleDoneButton } from "./ToggleDoneButton"
import { DeleteStepButton } from "./DeleteStepButton"
import { EditStepModal } from "./EditStepModal"
import type { NextStep } from "@/types"
import { useState } from "react"

interface StepItemProps {
  step: NextStep
  isExpanded?: boolean
  onToggle?: () => void
  onStepUpdated: (updatedStep: NextStep) => void
  onStepDeleted: (stepId: string) => void
  children?: React.ReactNode
}

export function StepItem({ 
  step,
  isExpanded = false, 
  onToggle, 
  onStepUpdated,
  onStepDeleted,
  children 
}: StepItemProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  return (
    <>
      <motion.div
        initial={false}
        animate={{
          borderLeftColor: step.done ? "#10B981" : "#EF4444",
          backgroundColor: step.done ? "rgba(16, 185, 129, 0.05)" : "transparent"
        }}
        transition={{ duration: 0.3 }}
        className={cn(
          "mb-4 rounded-lg border overflow-hidden",
          "border-l-4 border-transparent border-gray" // Base styles
        )}
      >
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3 cursor-pointer flex-1" onClick={onToggle}>
            <motion.div
              key={`status-${step.done}`}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className={cn(
                "flex h-6 w-6 items-center justify-center rounded-full",
                step.done ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500",
              )}
            >
              <AnimatePresence mode="wait">
                {step.done ? (
                  <motion.div
                    key="check"
                    initial={{ scale: 0.5, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0.5, rotate: 90 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  >
                    <Check className="h-4 w-4" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="circle"
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0.5 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="2" />
                    </svg>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            <div className="flex-1">
              <motion.div
                animate={{ 
                  color: step.done ? "#9CA3AF" : "#FFFFFF",
                }}
                transition={{ duration: 0.3 }}
                className="text-xs uppercase font-medium"
              >
                {step.done ? "DONE" : "TO DO"}
              </motion.div>
              <motion.div
                animate={{ 
                  color: step.done ? "#9CA3AF" : "#FFFFFF",
                }}
                transition={{ duration: 0.3 }}
                className="font-medium"
              >
                {step.title}
              </motion.div>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <ToggleDoneButton
              stepId={step.id}
              done={step.done}
              onToggled={(done) => onStepUpdated({ ...step, done })}
            />

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setIsEditModalOpen(true)} 
                className="p-2 opacity-70 hover:opacity-100"
                disabled={step.done}
              >
                <Edit2 className="h-4 w-4" />
              </Button>
            </motion.div>

            <DeleteStepButton
              stepId={step.id}
              stepTitle={step.title}
              onDeleted={() => onStepDeleted(step.id)}
            />

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="ghost" size="sm" onClick={onToggle} className="p-2">
                <ChevronDown className={cn(
                  "h-5 w-5 text-gray-400 transition-transform duration-300",
                  isExpanded && "rotate-180"
                )} />
              </Button>
            </motion.div>
          </div>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="px-4 pb-4 pt-0">
                {children}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <EditStepModal
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        step={step}
        onStepUpdated={onStepUpdated}
      />
    </>
  )
}