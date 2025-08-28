import ProjectBrowseCard from "./ProjectBrowseCard"
import type { Project } from "@/types"

interface ProjectBrowseGridProps {
  projects: Project[];
  userProjectIds: Set<string>;
}

export default function ProjectBrowseGrid({ projects, userProjectIds }: ProjectBrowseGridProps) {
  if (projects.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No projects found matching your criteria.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {projects.map((project) => (
        <ProjectBrowseCard key={project.id} project={project} isMember={userProjectIds.has(project.id)} />
      ))}
    </div>
  )
}
