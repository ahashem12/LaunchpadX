"use client"

import type React from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { Project } from "@/types"

import type { TeamMember } from "@/types";

interface ProjectRoleSectionProps {
  project: Project;
  teamMembers?: TeamMember[];
}

export function ProjectRoleSection({ project, teamMembers }: ProjectRoleSectionProps) {
  return (
    <Card className="overflow-hidden bg-card border-border p-6">
      <h2 className="text-lg font-bold text-foreground mb-4">About Project</h2>
      {/* Row: Icon and Title */}
      <div className="flex items-center gap-4 mb-4">
        <Avatar className="w-14 h-14 border-2 border-background shadow-lg">
          <AvatarImage src={project.logo_url || "/placeholder.svg"} alt={project.name} />
          <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-primary-foreground font-bold text-lg">
            {project.name.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <h3 className="font-semibold text-xl text-foreground">{project.name}</h3>
      </div>
      {/* Row: Description */}
      <div className="mb-2">
        <p className="text-sm text-muted-foreground">{project.description}</p>
      </div>
      {/* Category and Dates */}
      <div className="flex items-center gap-4 text-xs text-muted-foreground mt-2">
        {project.category && (
          <Badge variant="secondary" className="text-xs">
            {project.category}
          </Badge>
        )}
        <span>Created: {new Date(project.created_at).toLocaleDateString()}</span>
        <span>Updated: {new Date(project.updated_at).toLocaleDateString()}</span>
      </div>

      {/* Team Members Section */}
      {Array.isArray(teamMembers) && teamMembers.length > 0 && (
        <div className="mt-6">
          <h4 className="text-md font-semibold text-foreground mb-2">Team Members</h4>
          <div className="flex flex-col gap-2">
            {teamMembers.map((member) => (
              <div key={member.id} className="flex items-center gap-4">
                <Avatar className="w-10 h-10 border border-background">
                  <AvatarImage src={member.avatar_url || "/placeholder.svg"} alt={member.firstName || "Team Member"} />
                  <AvatarFallback className="bg-muted text-muted-foreground font-bold text-sm">
                    {(member.firstName?.[0] || "") + (member.lastName?.[0] || "")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium text-foreground">{member.firstName} {member.lastName}</div>
                  <div className="text-xs text-muted-foreground">{member.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  )
}
