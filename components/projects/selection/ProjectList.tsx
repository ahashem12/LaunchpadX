// components/projects/selection/ProjectList.tsx
"use client"

import Link from "next/link"
import { ProjectCard } from "./ProjectCard"
import type { Project } from "@/types"

interface ProjectListProps {
  projects: Project[]
}

export function ProjectList({ projects }: ProjectListProps) {
  return (
    <div className="space-y-4">
      {projects.map((project) => (
        <Link key={project.id} href={`/projects/${project.id}`} className="block">
          <ProjectCard project={project} variant="list" />
        </Link>
      ))}
    </div>
  )
}
