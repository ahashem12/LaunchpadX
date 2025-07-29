"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MemberRow } from "./MemberRow"
import type { TeamMember } from "@/types"
import { useRouter } from "next/navigation"
import { Skeleton } from "@/components/ui/skeleton"

interface TeamMembersTableProps {
  teamMembers: TeamMember[]
  currentUserId?: string
  isProjectOwner: boolean
  isLoading?: boolean
}

export function TeamMembersTable({ 
  teamMembers, 
  currentUserId, 
  isProjectOwner,
  isLoading = false 
}: TeamMembersTableProps) {
  const router = useRouter()

  const handleDeleteMember = () => {
    router.refresh()
  }

  if (isLoading) {
    return (
      <Card className="border-border bg-card">
        <CardContent className="p-6 space-y-4">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </CardContent>
      </Card>
    )
  }

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
        <div className={`grid gap-4 w-full bg-muted p-4 border-b border-border ${
          isProjectOwner ? 'grid-cols-5' : 'grid-cols-4'
        }`}>
          <div className="font-medium text-foreground">User</div>
          <div className="font-medium text-foreground">Assigned Role</div>
          <div className="font-medium text-foreground">Profile Skills</div>
          <div className="font-medium text-foreground">Wallet</div>
          {isProjectOwner && (
            <div className="font-medium text-foreground">Actions</div>
          )}
        </div>

        <div className="divide-y divide-border">
          {teamMembers.map((member) => (
            <MemberRow
              key={member.id}
              member={member}
              currentUserId={currentUserId}
              isProjectOwner={isProjectOwner}
              onDeleteMember={handleDeleteMember}
              showActions={isProjectOwner} 
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}