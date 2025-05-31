import { notFound } from "next/navigation"
import { getProjectById } from "@/lib/mock-data"
import { ProjectNav } from "@/components/projects/nav/ProjectNav"

interface TokenPageProps {
  params: {
    id: string
  }
}

export default async function TokenPage(props: TokenPageProps) {
  const params = await props.params
  const project = getProjectById(params.id)

  if (!project) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <ProjectNav projectId={params.id} />

      <div className="mt-8">
        <h1 className="text-2xl font-bold text-white">Token</h1>
        <p className="mt-4 text-gray-400">This page is under construction.</p>
      </div>
    </div>
  )
}
