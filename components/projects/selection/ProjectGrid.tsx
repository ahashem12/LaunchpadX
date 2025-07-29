"use client"

import type { Project } from "@/types"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "date-fns"

interface ProjectGridProps {
  projects: Project[]
}

// Inline the ProjectCard component to avoid import issues
function ProjectCard({ project, onClick }: { project: Project; onClick?: () => void }) {
  return (
    <div
      className="h-full rounded-lg bg-muted border border-border overflow-hidden transition-all hover:border-watermelon-green cursor-pointer"
      onClick={onClick}
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-medium text-white line-clamp-1">{project.name}</h3>
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
        <p className="line-clamp-2 text-sm text-gray-400 mb-4">{project.description}</p>
        <div className="text-xs text-gray-500">
          Updated {formatDistanceToNow(new Date(project.updated_at), { addSuffix: true })}
        </div>
      </div>
    </div>
  )
}

export function ProjectGrid({ projects }: ProjectGridProps) {
  const router = useRouter()

  const handleProjectClick = (projectId: string) => {
    router.push(`/projects/${projectId}`)
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} onClick={() => handleProjectClick(project.id)} />
      ))}
    </div>
  )
}
