import { notFound } from "next/navigation"
import { ProjectHeader } from "@/components/projects/nav/details/ProjectHeader"
import { ProjectNav } from "@/components/projects/nav/ProjectNav"
import { ComingSoon } from "@/components/common/ComingSoon"
import { projectService } from "@/app/services/projects/project-service"

interface EventsPageProps {
  params: {
    id: string
  }
}

export default async function EventsPage(props: EventsPageProps) {
  const params = await props.params
  const project = await projectService.getProject(params.id)

  if (!project) {
    notFound()
  }
  return (
    <div className="space-y-6">
            <div className="flex flex-col space-y-6">
              <ProjectHeader project={project} />
            </div>
      <ProjectNav projectId={params.id} />

      <ComingSoon/>
    </div>
  )
}
