"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

interface RoleFilterBadgesProps {
  onCreateRoleClick: () => void
}

export function RoleFilterBadges({ onCreateRoleClick }: RoleFilterBadgesProps) {
  return (
    <div className="flex justify-between items-center">
      <div className="flex space-x-2 overflow-x-auto py-2">
        <Badge variant="outline" className="rounded-full px-4 py-1.5 bg-card border-border text-foreground">
          <span className="font-medium mr-1">6</span> Admin
        </Badge>
        <Badge variant="outline" className="rounded-full px-4 py-1.5 bg-card border-border text-foreground">
          <span className="font-medium mr-1">2</span> Team Members
        </Badge>
        <Badge variant="outline" className="rounded-full px-4 py-1.5 bg-card border-border text-foreground">
          <span className="font-medium mr-1">0</span> Co-Founders
        </Badge>
        <Badge variant="outline" className="rounded-full px-4 py-1.5 bg-card border-border text-foreground">
          <span className="font-medium mr-1">0</span> Freelancers
        </Badge>
      </div>
      <Button className="bg-primary hover:bg-primary/90 text-primary-foreground" onClick={onCreateRoleClick}>
        <Plus className="h-4 w-4 mr-1" />
        Create Role
      </Button>
    </div>
  )
}
