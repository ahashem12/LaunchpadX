import { Users } from "lucide-react"

interface TeamHeaderProps {
  projectName?: string
  memberCount?: number
}

export function TeamHeader({ projectName, memberCount }: TeamHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center space-x-3">
        <div className="p-2 rounded-full bg-primary/10 text-primary">
          <Users className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-foreground">Team & Roles</h2>
          {projectName && (
            <p className="text-sm text-muted-foreground">
              {memberCount ? `${memberCount} members` : 'Loading...'} in {projectName}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}