import { notFound } from "next/navigation"
import { ProjectHeader } from "@/components/projects/nav/details/ProjectHeader"
import { ProjectDescription } from "@/components/projects/nav/details/ProjectDescription"
import { ProjectNextSteps } from "@/components/projects/nav/details/ProjectNextSteps"
import { projectService } from "@/app/services/projects/project-service"

interface BrowseProjectPageProps {
  params: {
    id: string
  }
}

export default async function BrowseProjectPage({ params }: BrowseProjectPageProps) {
    const p = await params;
  const project = await projectService.getProject(p.id)

  if (!project) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-6">
        <ProjectHeader project={project} />
      </div>
      <ProjectDescription description={project.description} />
      <ProjectNextSteps />
    </div>
  )
}
