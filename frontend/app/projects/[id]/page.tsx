import { notFound } from "next/navigation"
import { ProjectNav } from "@/components/projects/nav/ProjectNav"
import { ProjectHeader } from "@/components/projects/nav/details/ProjectHeader"
import { ProjectDescription } from "@/components/projects/nav/details/ProjectDescription"
import { ProjectMedia } from "@/components/projects/nav/details/ProjectMedia"
import { ProjectNextSteps } from "@/components/projects/nav/details/ProjectNextSteps"
import { ProjectReviews } from "@/components/projects/nav/details/ProjectReviews"
import { projectService } from "@/app/services/projects/project-service"

interface DetailsPageProps {
  params: {
    id: string
  }
}

export default async function DetailsPage(props: DetailsPageProps) {
  const params = await props.params
  const project = await projectService.getProject(params.id)

  if (!project) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-6">
        {/* <ProjectBanner bannerUrl={project.banner_url} /> */}
        <ProjectHeader project={project} />
      </div>

      <ProjectNav projectId={params.id} />
      <ProjectDescription description={project.description} />
      <ProjectMedia />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProjectNextSteps />
        <ProjectReviews />
      </div>
    </div>
  )
}
