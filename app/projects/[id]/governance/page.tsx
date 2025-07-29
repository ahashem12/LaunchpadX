import { ProjectNav } from "@/components/projects/nav/ProjectNav"
import { ComingSoon } from "@/components/common/ComingSoon"

interface GovernancePageProps {
  params: {
    id: string
  }
}

export default async function GovernancePage(props: GovernancePageProps) {
  const params = await props.params

  return (
    <div className="space-y-6">
      <ProjectNav projectId={params.id} />

      <ComingSoon/>
    </div>
  )
}
