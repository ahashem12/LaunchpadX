import { Card, CardContent } from "@/components/ui/card"
import { MemberRow } from "./MemberRow"
import type { TeamMember } from "@/types/team"

interface TeamMembersTableProps {
  teamMembers: TeamMember[]
}

export function TeamMembersTable({ teamMembers }: TeamMembersTableProps) {
  if (teamMembers.length === 0) {
    return (
      <Card className="border-border bg-card">
        <CardContent className="p-6 text-center text-muted-foreground">
          No team members found for this project.
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-border bg-card overflow-hidden">
      <CardContent className="p-0">
        <div className="grid grid-cols-5 gap-4 w-full bg-muted p-4 border-b border-border">
          <div className="font-medium text-foreground">Name</div>
          <div className="font-medium text-foreground">Assigned Role</div>
          <div className="font-medium text-foreground">Profile Skills</div>
          <div className="font-medium text-foreground">Insights</div>
          <div className="font-medium text-foreground">Actions</div>
        </div>

        <div className="divide-y divide-border">
          {teamMembers.map((member, index) => (
            <MemberRow key={member.id || member.user_id || `member-${index}`} member={member} />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
