// components/projects/selection/ProjectsTabs.tsx
"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProjectGrid } from "./ProjectGrid"
import { ProjectList } from "./ProjectList"
import type { Project } from "@/types"

interface ProjectsTabsProps {
  view: "grid" | "list"
  projects: Project[]
  tabFilters: {
    value: string
    label: string
    filter: (p: Project) => boolean
  }[]
}

export function ProjectsTabs({ view, projects, tabFilters }: ProjectsTabsProps) {
  return (
    <Tabs defaultValue="all" className="w-full">
      <TabsList className="bg-muted">
        {tabFilters.map(({ value, label }) => (
          <TabsTrigger
            key={value}
            value={value}
            className="data-[state=active]:bg-watermelon-green data-[state=active]:text-white"
          >
            {label}
          </TabsTrigger>
        ))}
      </TabsList>

      {tabFilters.map(({ value, filter }) => {
        const filteredProjects = value === "all" ? projects : projects.filter(filter)
        return (
          <TabsContent key={value} value={value} className="mt-4">
            {view === "grid" ? (
              <ProjectGrid projects={filteredProjects} />
            ) : (
              <ProjectList projects={filteredProjects} />
            )}
          </TabsContent>
        )
      })}
    </Tabs>
  )
}
