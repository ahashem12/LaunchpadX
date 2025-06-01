// app/projects/[id]/next-steps/page.tsx
import { StepsHeader, NextStepsList } from "@/components/projects/nav/next-steps"
import { ProjectNav } from "@/components/projects/nav/ProjectNav"
import { getAllNextSteps } from "@/lib/mock-data"

interface NextStepsPageProps {
  params: { id: string }
}

export default async function NextStepsPage( props: NextStepsPageProps) {
  const params = await props.params
  // Get all steps without filtering by project ID
  const nextSteps = getAllNextSteps()

  return (
    <div className="space-y-6">
      <ProjectNav projectId={params.id} />
      <div className="mt-8">
        <StepsHeader title="Next Steps" />
        <NextStepsList steps={nextSteps} />
      </div>
    </div>
  )
}