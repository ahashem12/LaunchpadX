"use client"

import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

interface CreateProjectButtonProps {
  onProjectCreated?: () => void
}

export function CreateProjectButton({ onProjectCreated }: CreateProjectButtonProps) {
  const router = useRouter()

  const handleCreateProject = () => {
    router.push("/projects/new")
  }

  return (
    <Button onClick={handleCreateProject}>
      <Plus className="mr-2 h-4 w-4" /> Create Project
    </Button>
  )
}
