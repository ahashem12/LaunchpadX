"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

interface RoleFilterBadgesProps {
  roleCounts: { [key: string]: number }
  onCreateRoleClick: () => void
}

export function RoleFilterBadges({ roleCounts, onCreateRoleClick }: RoleFilterBadgesProps) {
  const safeRoleCounts = roleCounts || {}
  const totalRoles = Object.values(safeRoleCounts).reduce((sum, count) => sum + count, 0)
  const requiredBadges = ["Admin", "Team Members", "Co-Founders", "Freelancers"]

  return (
    <div className="flex justify-between items-center">
      <div className="flex space-x-2 overflow-x-auto py-2">
        <Badge variant="outline" className="rounded-full px-4 py-1.5 bg-card border-border text-foreground">
          <span className="font-medium mr-1">{totalRoles}</span> All Roles
        </Badge>
        {requiredBadges.map(category => (
          <Badge
            key={category}
            variant="outline"
            className="rounded-full px-4 py-1.5 bg-card border-border text-foreground"
          >
            <span className="font-medium mr-1">{safeRoleCounts[category] || 0}</span> {category}
          </Badge>
        ))}
      </div>
      <Button className="bg-primary hover:bg-primary/90 text-primary-foreground" onClick={onCreateRoleClick}>
        <Plus className="h-4 w-4 mr-1" />
        Create Role
      </Button>
    </div>
  )
}
