"use client"

import { useState, useEffect } from "react"
import type { Project, TeamMember, TeamRole } from "@/types"
import { projectService } from "@/app/services/projects/project-service"
import { createClient } from "@/lib/supabase/client"
import { ProjectNav } from "@/components/projects/nav/ProjectNav"
import { TeamMembersTable } from "@/components/projects/nav/team/TeamMembersTable"
import { TeamRoles } from "@/components/projects/nav/team/TeamRoles"

interface TeamPageClientProps {
  projectId: string
}

export function TeamPageClient({ projectId }: TeamPageClientProps) {
  const [project, setProject] = useState<Project | null>(null)
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [roles, setRoles] = useState<TeamRole[]>([])
  const [roleCounts, setRoleCounts] = useState<Record<string, number> | null>(null)
  const [isCreateRoleModalOpen, setCreateRoleModalOpen] = useState(false)
  const [currentUserId, setCurrentUserId] = useState<string | null>(null)
  const [isProjectOwner, setIsProjectOwner] = useState(false)

  useEffect(() => {
    async function fetchData() {
      if (!projectId) return

      try {
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
          setCurrentUserId(user.id)
        }

        const [projectData, membersData, rolesData, countsData] = await Promise.all([
          projectService.getProject(projectId),
          projectService.getTeamMembers(projectId),
          projectService.getProjectRoles(projectId),
          projectService.getRoleCategoryCounts(projectId),
        ])

        setProject(projectData)
        setTeamMembers(membersData)
        setRoles(rolesData)
        setRoleCounts(countsData)

        if (user && membersData) {
          const currentUserMembership = membersData.find(member => member.user_id === user.id)
          setIsProjectOwner(currentUserMembership?.is_owner || false)
        }

      } catch (error) {
        console.error("Failed to fetch project data:", error)
      }
    }

    fetchData()
  }, [projectId])

  const handleRoleCreated = async () => {
    if (projectId) {
      const rolesData = await projectService.getProjectRoles(projectId)
      const countsData = await projectService.getRoleCategoryCounts(projectId)
      setRoles(rolesData)
      setRoleCounts(countsData)
    }
  }

  return (
    <div className="space-y-6">
      <ProjectNav projectId={projectId} />

      <div className="p-6 space-y-8">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Team & Roles</h1>
            <p className="text-muted-foreground">Manage your project's team members and roles.</p>
          </div>
        </header>

        <div>
          <h2 className="text-xl font-semibold mb-4">Team Members</h2>
          <TeamMembersTable 
            teamMembers={teamMembers} 
            isProjectOwner={isProjectOwner} 
            currentUserId={currentUserId || undefined} 
          />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Roles</h2>
          <TeamRoles 
            roles={roles} 
            teamMembers={teamMembers} 
            isProjectOwner={isProjectOwner} 
            projectId={projectId} 
            roleCounts={roleCounts || {}} 
            onCreateRoleClick={() => setCreateRoleModalOpen(true)} 
            isCreateRoleModalOpen={isCreateRoleModalOpen}
            onCloseCreateRoleModal={() => {
              setCreateRoleModalOpen(false)
              handleRoleCreated()
            }}
          />
        </div>
      </div>
    </div>
  )
}
