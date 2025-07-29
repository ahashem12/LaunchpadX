"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface RecommendedRolesTableProps {
  onCreateRoleClick: () => void
}

export function RecommendedRolesTable({ onCreateRoleClick }: RecommendedRolesTableProps) {
  return (
    <Card className="border-border bg-card overflow-hidden">
      <CardContent className="p-0">
        <div className="grid grid-cols-3 gap-4 w-full bg-muted p-4 border-b border-border">
          <div className="font-medium text-foreground">Recommended Roles</div>
          <div className="font-medium text-foreground">Role</div>
          <div className="font-medium text-foreground">Actions</div>
        </div>

        <div className="p-4">
          <div className="grid grid-cols-3 gap-4 items-center">
            <div className="flex items-center space-x-3">
              <Badge variant="outline" className="bg-muted text-foreground border-border">
                NOT ASSIGNED
              </Badge>
            </div>
            <div>
              <Badge className="bg-primary/20 text-primary border-none">CTO - PRODUCT</Badge>
            </div>
            <div>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground" onClick={onCreateRoleClick}>
                Create
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
