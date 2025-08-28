import notFound from "@/app/not-found";
import { projectService } from "@/app/services/projects/project-service";
import { ProjectNav } from "@/components/projects/nav/ProjectNav";
import { ProjectHeader } from "@/components/projects/nav/details/ProjectHeader";
import { Documents } from "@/components/projects/nav/documents/Documents";
import { FileText } from "lucide-react";

interface DocumentsPageProps {
  params: {
    id: string;
  };
}

export default async function DocumentsPage(props: DocumentsPageProps) {
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
      <ProjectNav projectId={params.id} /> {/* Keep nav for consistency */}
      <div className="space-y-8">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 rounded-full bg-primary/10 text-primary">
            <FileText className="h-5 w-5" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">Documents</h2>
        </div>

        <div className="mt-8">
          <Documents />
        </div>
      </div>
    </div>
  );
}
