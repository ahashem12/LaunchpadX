
import { notFound } from "next/navigation";
import { ProjectNav } from "@/components/projects/nav/ProjectNav";
import { StepsHeader, NextStepsList } from "@/components/projects/nav/next-steps";
import { ProjectHeader } from "@/components/projects/nav/details/ProjectHeader";
import { nextStepsService } from "@/app/services/next-steps/next-steps-service";
import { projectService } from "@/app/services/projects/project-service";
import type { NextStep } from "@/types";

interface NextStepsPageProps {
  params: {
    id: string;
  };
}

export default async function NextStepsPage(props: NextStepsPageProps) {
  const { id } = props.params;
  const project = await projectService.getProject(id);
  if (!project) {
    notFound();
  }
  let nextSteps: NextStep[] = [];
  try {
    nextSteps = await nextStepsService.getNextStepsByProjectId(id);
  } catch (err) {
    // Optionally handle error, e.g. show a message or log
    nextSteps = [];
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-6">
        {/* <ProjectBanner bannerUrl={project.banner_url} /> */}
        <ProjectHeader project={project} />
      </div>
      <ProjectNav projectId={id} />
      <div className="mt-8">
        <StepsHeader title="Next Steps" projectId={id} />
        <NextStepsList projectId={id} initialSteps={nextSteps} />
      </div>
    </div>
  );
}