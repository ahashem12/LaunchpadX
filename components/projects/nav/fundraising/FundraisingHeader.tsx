import { FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface FundraisingHeaderProps {
  projectId?: string
}

export function FundraisingHeader({ projectId }: FundraisingHeaderProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-full bg-green-500/20">
          <FileText className="h-6 w-6 text-green-500" />
        </div>
        <h1 className="text-2xl font-bold text-white">Enable Fundraising Tools</h1>
      </div>
      
      <p className="text-gray-400">
        Create an agreement with your co-founders to access powerful fundraising tools, 
        manage collections, set up funding rounds, and launch your project webpage.
      </p>
      
      <Link href={`/projects/${projectId}/agreement`}>
        <Button className="bg-green-600 hover:bg-green-700 text-white mt-5 ">
          Set Up Agreement
        </Button>
      </Link>
      
      <div className="border-t border-gray-700 my-6"></div>
    </div>
  )
}