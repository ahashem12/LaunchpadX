"use client"

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
  roleCounts: Record<string, number>
  onCreateRoleClick: () => void
  isCreateRoleModalOpen: boolean
  onCloseCreateRoleModal: () => void
}

export function TeamRoles({ 
  roles, 
  isProjectOwner, 
  roleCounts, 
  onCreateRoleClick, 
  isCreateRoleModalOpen,
  onCloseCreateRoleModal,
  projectId
}: TeamRolesProps) {
  return (
    <div className="space-y-8">
      {isProjectOwner && (
        <RoleFilterBadges roleCounts={roleCounts} onCreateRoleClick={onCreateRoleClick} />
      )}
      
      <AlertCards roles={roles} />

      {roles.length > 0 && <OpenRolesTable roles={roles} />}
      
      {/* <RecommendedRolesTable onCreateRoleClick={() => setIsCreateRoleModalOpen(true)} /> */}

      
      {isProjectOwner && (
        <CreateRoleModal 
          isOpen={isCreateRoleModalOpen} 
          onClose={onCloseCreateRoleModal} 
          projectId={projectId}
        />
      )}
    </div>
  )
}