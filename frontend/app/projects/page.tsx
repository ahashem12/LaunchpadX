"use client"

import { useState, useEffect } from "react"
import { ProjectsHeader } from "@/components/projects/selection/ProjectsHeader"
import { ProjectsTabs } from "@/components/projects/selection/ProjectsTabs"
import { projectTabFilters } from "@/lib/constants/projectTabFilters"
import { projectService } from "@/app/services/projects/project-service"
import type { Project } from "@/types"
import { Skeleton } from "@/components/ui/skeleton"

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [view, setView] = useState<"grid" | "list">("grid")

  const refreshProjects = async () => {
    setLoading(true)
    try {
      const userProjects = await projectService.getUserProjects()
      setProjects(userProjects)
    } catch (error) {
      console.error("Error fetching projects:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    refreshProjects()
  }, [])

  return (
    <div className="space-y-6">
      <ProjectsHeader view={view} setView={setView} />

      {loading ? (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="border rounded-lg p-4 space-y-3">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <div className="flex justify-between pt-2">
                  <Skeleton className="h-4 w-1/4" />
                  <Skeleton className="h-4 w-1/4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <ProjectsTabs view={view} projects={projects} tabFilters={projectTabFilters} />
      )}
    </div>
  )
}
