import { ProjectNav } from "@/components/projects/nav/ProjectNav"
import { Agreement } from "@/components/projects/nav/agreements/Agreement"

interface AgreementPageProps {
  params: {
    id: string
  }
}

export default async function AgreementPage(props: AgreementPageProps) {
  const params = await props.params

  return (
    <div className="space-y-6">
      <ProjectNav projectId={params.id} />

      <div className="mt-8">
        {/* <h1 className="text-2xl font-bold text-white">Agreement</h1> */}
        {/* <p className="mt-4 text-gray-400">This page is under construction.</p> */}
        <Agreement />
      </div>
    </div>
  )
}
