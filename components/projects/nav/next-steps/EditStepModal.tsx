// frontend/components/projects/nav/next-steps/EditStepModal.tsx
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Loader2 } from "lucide-react"
import type { NextStep } from "@/types"
import { nextStepsService } from "@/app/services/next-steps/next-steps-service"

interface EditStepModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  step: NextStep
  onStepUpdated: (updatedStep: NextStep) => void
}

export function EditStepModal({ open, onOpenChange, step, onStepUpdated }: EditStepModalProps) {
  const [title, setTitle] = useState(step.title)
  const [description, setDescription] = useState(step.description || "")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim()) {
      setError("Title is required")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const updatedStep = await nextStepsService.updateNextStep(step.id, {
        title: title.trim(),
        description: description.trim() || undefined,
      })

      if (updatedStep) {
        onStepUpdated(updatedStep)
        onOpenChange(false)
      } else {
        setError("Failed to update step")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update step")
    } finally {
      setIsLoading(false)
    }
  }

  const handleOpenChange = (newOpen: boolean) => {
    if (!isLoading) {
      onOpenChange(newOpen)
      if (!newOpen) {
        setTitle(step.title)
        setDescription(step.description || "")
        setError(null)
      }
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Step</DialogTitle>
          <DialogDescription>Update the details of this step.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter step title..."
                disabled={isLoading}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter step description..."
                rows={3}
                disabled={isLoading}
              />
            </div>
            {error && <div className="text-sm text-red-500">{error}</div>}
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => handleOpenChange(false)} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}