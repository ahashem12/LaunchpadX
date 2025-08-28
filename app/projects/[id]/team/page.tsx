import { use } from "react"
import { TeamPageClient } from "./TeamPageClient"

interface TeamPageProps {
  params: Promise<{ id: string }>
}

export default function TeamPage({ params }: TeamPageProps) {
  const { id: projectId } = use(params)

  return <TeamPageClient projectId={projectId} />
}