import { Users } from "lucide-react"

export function TeamHeader() {
  return (
    <div className="flex items-center space-x-3 mb-6">
      <div className="p-2 rounded-full bg-primary/10 text-primary">
        <Users className="h-5 w-5" />
      </div>
      <h2 className="text-2xl font-bold text-foreground">Team & Roles</h2>
    </div>
  )
}
