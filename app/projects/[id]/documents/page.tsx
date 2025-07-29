import { ProjectNav } from "@/components/projects/nav/ProjectNav"
import { Documents } from "@/components/projects/nav/documents/Documents"
import { FileText } from "lucide-react"

interface DocumentsPageProps {
  params: {
    id: string
  }
}

export default async function DocumentsPage(props: DocumentsPageProps) {
  const params = await props.params
  return (
    <div className="space-y-6">
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
  )
}