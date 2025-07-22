"use client"

import { useState } from "react"
import { AlertCards } from "./AlertCards"
import { CreateRoleModal } from "./CreateRoleModal/CreateRoleModal"
import { RecommendedRolesTable } from "./RecommendedRolesTable"
import { RoleFilterBadges } from "./RoleFilterBadges"
import type { TeamMember, TeamRole } from "@/types"

interface TeamRolesProps {
  roles: TeamRole[]
  teamMembers: TeamMember[]
  isProjectOwner: boolean
}

export function TeamRoles({ roles, teamMembers, isProjectOwner }: TeamRolesProps) {
  const [isCreateRoleModalOpen, setIsCreateRoleModalOpen] = useState(false)

  return (
    <div className="space-y-8">
      {isProjectOwner && (
        <RoleFilterBadges onCreateRoleClick={() => setIsCreateRoleModalOpen(true)} />
      )}
      
      <AlertCards />
      
      <RecommendedRolesTable onCreateRoleClick={() => setIsCreateRoleModalOpen(true)} />

      
      {isProjectOwner && (
        <CreateRoleModal 
          isOpen={isCreateRoleModalOpen} 
          onClose={() => setIsCreateRoleModalOpen(false)} 
        />
      )}
    </div>
  )
}