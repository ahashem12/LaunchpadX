import { notFound } from "next/navigation"
import { getProjectById } from "@/lib/mock-data"
import { ProjectNav } from "@/components/projects/nav/ProjectNav"

interface EventsPageProps {
  params: {
    id: string
  }
}

export default function EventsPage({ params }: EventsPageProps) {
  const project = getProjectById(params.id)

  if (!project) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <ProjectNav projectId={params.id} />

      <div className="mt-8">
        <h1 className="text-2xl font-bold text-white">Events</h1>
        <p className="mt-4 text-gray-400">This page is under construction.</p>
      </div>
    </div>
  )
}
