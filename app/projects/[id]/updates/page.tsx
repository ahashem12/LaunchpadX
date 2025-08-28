import { ProjectNav } from "@/components/projects/nav/ProjectNav";
import { ComingSoon } from "@/components/common/ComingSoon";
import { ProjectHeader } from "@/components/projects/nav/details/ProjectHeader";
import { projectService } from "@/app/services/projects/project-service";
import notFound from "@/app/not-found";

interface UpdatesPageProps {
  params: {
    id: string;
  };
}

export default async function UpdatesPage(props: UpdatesPageProps) {
  const params = await props.params;
  const project = await projectService.getProject(params.id);

  if (!project) {
    notFound();
  }
  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-6">
        {/* <ProjectBanner bannerUrl={project.banner_url} /> */}
        {project && <ProjectHeader project={project} />}
      </div>
      <ProjectNav projectId={params.id} />

      <ComingSoon />
    </div>
  );
}
