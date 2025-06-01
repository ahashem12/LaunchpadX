// app/projects/[id]/components/ProjectSections.tsx
import { Button } from "@/components/ui/button"
import { Edit } from "lucide-react"

export function ProjectSections() {
  return (
    <>
      <div className="bg-muted rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Edit className="h-5 w-5 text-green-500" />
            <h2 className="text-xl font-semibold text-white">Project Description</h2>
          </div>
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
            <Edit className="h-4 w-4 mr-2" />
            Edit Section
          </Button>
        </div>
        <div className="text-gray-400 italic">No description added for this project yet.</div>
      </div>
    </>
  )
}
