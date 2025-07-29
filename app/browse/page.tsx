"use client"

import { useState, useEffect } from "react"
import BrowseHeader from "@/components/browse/BrowseHeader"
import BrowseFilters from "@/components/browse/BrowseFilters"
import ProjectBrowseGrid from "@/components/browse/ProjectBrowseGrid"
import { projectService } from "@/app/services/projects/project-service"
import type { Project } from "@/types"
import { Skeleton } from "@/components/ui/skeleton"

export default function BrowsePage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([])
  const [filters, setFilters] = useState({
    sortBy: "relevance",
    category: "all",
    events: "all",
    search: "",
  })

  const loadProjects = async () => {
    setLoading(true)
    try {
      const allProjects = await projectService.getUserProjects()
      setProjects(allProjects)
      setFilteredProjects(allProjects)
    } catch (error) {
      console.error("Error fetching projects:", error)
      setProjects([])
      setFilteredProjects([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadProjects()
  }, [])

  useEffect(() => {
    // Apply filters
    let filtered = [...projects]

    // Search filter
    if (filters.search) {
      filtered = filtered.filter(
        (project) =>
          project.name.toLowerCase().includes(filters.search.toLowerCase()) ||
          project.description.toLowerCase().includes(filters.search.toLowerCase()) ||
          (project.category && project.category.toLowerCase().includes(filters.search.toLowerCase())),
      )
    }

    // Category filter
    if (filters.category !== "all") {
      filtered = filtered.filter((project) => project.category === filters.category)
    }

    // Sort
    if (filters.sortBy === "relevance") {
      filtered.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
    } else if (filters.sortBy === "newest") {
      filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    } else if (filters.sortBy === "oldest") {
      filtered.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
    }

    setFilteredProjects(filtered)
  }, [filters, projects])

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 pb-8 space-y-8">
        <BrowseHeader />
        <BrowseFilters filters={filters} onFiltersChange={setFilters} />

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="h-32 w-full rounded-t-lg bg-muted/50" />
                <div className="p-4 space-y-3">
                  <Skeleton className="h-6 w-3/4 bg-muted/50" />
                  <Skeleton className="h-4 w-full bg-muted/50" />
                  <Skeleton className="h-4 w-full bg-muted/50" />
                  <Skeleton className="h-8 w-20 bg-muted/50" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <ProjectBrowseGrid projects={filteredProjects} />
        )}
      </div>
    </div>
  )
}
