"use client"

import { useState } from "react"
import { AlertCards } from "./AlertCards"
import { CreateRoleModal } from "./CreateRoleModal/CreateRoleModal"
import { RecommendedRolesTable } from "./RecommendedRolesTable"
import { RoleFilterBadges } from "./RoleFilterBadges"
import { TeamMembersTable } from "./TeamMembersTable"
import { getAllTeamMembers } from "@/lib/mock-data"

export function TeamRoles() {
  const [isCreateRoleModalOpen, setIsCreateRoleModalOpen] = useState(false)
  const [teamMembers] = useState(getAllTeamMembers()) // Using mock data

  return (
    <div className="space-y-8">
      <RoleFilterBadges onCreateRoleClick={() => setIsCreateRoleModalOpen(true)} />
      <TeamMembersTable teamMembers={teamMembers} />
      <AlertCards />
      <RecommendedRolesTable onCreateRoleClick={() => setIsCreateRoleModalOpen(true)} />
      <CreateRoleModal isOpen={isCreateRoleModalOpen} onClose={() => setIsCreateRoleModalOpen(false)} />
    </div>
  )
}
