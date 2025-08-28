import notFound from "@/app/not-found";
import { projectService } from "@/app/services/projects/project-service";
import { ProjectNav } from "@/components/projects/nav/ProjectNav";
import { Agreement } from "@/components/projects/nav/agreements/Agreement";
import { ProjectHeader } from "@/components/projects/nav/details/ProjectHeader";

interface AgreementPageProps {
  params: {
    id: string;
  };
}

export default async function AgreementPage(props: AgreementPageProps) {
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

      <div className="mt-8">
        {/* <h1 className="text-2xl font-bold text-white">Agreement</h1> */}
        {/* <p className="mt-4 text-gray-400">This page is under construction.</p> */}
        <Agreement projectId={params.id} />
      </div>
    </div>
  );
}
