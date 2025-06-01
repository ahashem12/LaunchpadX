import { Button } from "@/components/ui/button"
import { Camera } from "lucide-react"

export function ProjectMedia() {
  return (
    <div className="bg-muted rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Camera className="h-5 w-5 text-blue-500" />
          <h2 className="text-xl font-semibold text-white">Project Media</h2>
        </div>
        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
          <Camera className="h-4 w-4 mr-2" />
          Add Media
        </Button>
      </div>
      <div className="text-gray-400 italic">No media added for this project yet.</div>
    </div>
  )
}
