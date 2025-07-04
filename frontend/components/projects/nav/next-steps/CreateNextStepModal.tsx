"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Loader2 } from "lucide-react"
import { nextStepsService } from "@/app/services/next-steps/next-steps-service"
import type { NextStep } from "@/types"

interface CreateNextStepModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  projectId: string
  onStepCreated: (step: NextStep) => void
}

export function CreateNextStepModal({ open, onOpenChange, projectId, onStepCreated }: CreateNextStepModalProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
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
      const newStep = await nextStepsService.createNextStep({
        project_id: projectId,
        title: title.trim(),
        description: description.trim() || undefined,
      })

      if (newStep) {
        onStepCreated(newStep)
        onOpenChange(false)
        setTitle("")
        setDescription("")
      } else {
        setError("Failed to create step")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create step")
    } finally {
      setIsLoading(false)
    }
  }

  const handleOpenChange = (newOpen: boolean) => {
    if (!isLoading) {
      onOpenChange(newOpen)
      if (!newOpen) {
        setTitle("")
        setDescription("")
        setError(null)
      }
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Step</DialogTitle>
          <DialogDescription>Add a new step to help track your project progress.</DialogDescription>
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
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => handleOpenChange(false)} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create Step
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
