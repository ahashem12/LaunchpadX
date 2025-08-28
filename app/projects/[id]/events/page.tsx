import { ProjectNav } from "@/components/projects/nav/ProjectNav"
import { ComingSoon } from "@/components/common/ComingSoon"

interface EventsPageProps {
  params: {
    id: string
  }
}

export default async function EventsPage(props: EventsPageProps) {
  const params = await props.params

  return (
    <div className="space-y-6">
      <ProjectNav projectId={params.id} />

      <ComingSoon/>
    </div>
  )
}
