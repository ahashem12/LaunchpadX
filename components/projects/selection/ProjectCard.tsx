// components/projects/selection/ProjectCard/ProjectCard.tsx
"use client"

import type { Project } from "@/types"
import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "date-fns"

interface ProjectCardProps {
  project: Project
  onClick?: () => void
  variant?: "grid" | "list"
}

export function ProjectCard({ project, onClick, variant = "grid" }: ProjectCardProps) {
  return (
    <div
      className={`rounded-lg bg-muted border border-border ${
        variant === "grid" ? "h-full" : ""
      } overflow-hidden transition-all hover:border-watermelon-green cursor-pointer`}
      onClick={onClick}
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className={`font-medium text-white ${variant === "grid" ? "line-clamp-1" : ""}`}>{project.name}</h3>
          <Badge
            variant={
              project.status === "completed" ? "default" : project.status === "in-progress" ? "secondary" : "outline"
            }
            className={
              project.status === "completed"
                ? "bg-watermelon-green text-white"
                : project.status === "in-progress"
                  ? "bg-watermelon-red text-white"
                  : "bg-transparent text-gray-400 border-gray-600"
            }
          >
            {project.status.replace("-", " ")}
          </Badge>
        </div>
        <p className={`line-clamp-2 text-sm text-gray-400 ${variant === "grid" ? "mb-4" : "mt-2"}`}>
          {project.description}
        </p>
        <div className="text-xs text-gray-500">
          Updated {formatDistanceToNow(new Date(project.updated_at), { addSuffix: true })}
        </div>
      </div>
    </div>
  )
}
