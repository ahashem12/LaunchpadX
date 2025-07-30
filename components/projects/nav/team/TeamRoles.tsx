"use client"

import { useState } from "react"
import { AlertCards } from "./AlertCards"
import { CreateRoleModal } from "./CreateRoleModal/CreateRoleModal"
// import { RecommendedRolesTable } from "./RecommendedRolesTable"
import { OpenRolesTable } from "./OpenRolesTable"
import { RoleFilterBadges } from "./RoleFilterBadges"
import type { TeamMember, TeamRole } from "@/types"

interface TeamRolesProps {
  roles: TeamRole[]
  teamMembers: TeamMember[]
  isProjectOwner: boolean
  projectId: string
}

export function TeamRoles({ roles, teamMembers, isProjectOwner, projectId }: TeamRolesProps) {
  const [isCreateRoleModalOpen, setIsCreateRoleModalOpen] = useState(false)

  return (
    <div className="space-y-8">
      {isProjectOwner && (
        <RoleFilterBadges onCreateRoleClick={() => setIsCreateRoleModalOpen(true)} />
      )}
      
      <AlertCards roles={roles} />

      {roles.length > 0 && <OpenRolesTable roles={roles} />}
      
      {/* <RecommendedRolesTable onCreateRoleClick={() => setIsCreateRoleModalOpen(true)} /> */}

      
      {isProjectOwner && (
        <CreateRoleModal 
          isOpen={isCreateRoleModalOpen} 
          onClose={() => setIsCreateRoleModalOpen(false)} 
          projectId={projectId}
        />
      )}
    </div>
  )
}