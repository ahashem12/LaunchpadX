"use client"

import { useEffect, useState } from "react"
import { notFound, redirect } from "next/navigation"
import { projectService } from "@/app/services/projects/project-service"
import { ProjectNav } from "@/components/projects/nav/ProjectNav"
import { TeamRoles } from "@/components/projects/nav/team/TeamRoles"
import { TeamMembersTable } from "@/components/projects/nav/team/TeamMembersTable"
import { TeamHeader } from "@/components/projects/nav/team/TeamHeader"
import { InvitationLinkCard } from "@/components/projects/nav/team/InvitationLinkCard"
import { RoleFilterBadges } from "@/components/projects/nav/team/RoleFilterBadges"
import { createClient } from "@/lib/supabase/client"
import type { Project, TeamMember, TeamRole } from "@/types"

interface TeamPageProps {
  params: {
    id: string
  }
}

export default function TeamPage({ params }: TeamPageProps) {
  const [project, setProject] = useState<Project | null>(null)
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [projectRoles, setProjectRoles] = useState<TeamRole[]>([])
  const [roleCounts, setRoleCounts] = useState<{ [key: string]: number }>({})
  const [isProjectOwner, setIsProjectOwner] = useState(false)
  const [createRoleModalOpen, setCreateRoleModalOpen] = useState(false)
  const [currentUserId, setCurrentUserId] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient()
      const { data: { user }, error: authError } = await supabase.auth.getUser()

      if (authError || !user) {
        redirect("/login")
        return
      }
      setCurrentUserId(user.id)

      try {
        const fetchedProject = await projectService.getProject(params.id)
        if (!fetchedProject) {
          notFound()
          return
        }
        setProject(fetchedProject)

        const fetchedTeamMembers = await projectService.getTeamMembers(params.id)
        setTeamMembers(fetchedTeamMembers)

        const fetchedProjectRoles = await projectService.getProjectRoles(params.id)
        setProjectRoles(fetchedProjectRoles)

        const fetchedRoleCounts = await projectService.getRoleCategoryCounts(params.id)
        setRoleCounts(fetchedRoleCounts)

        const currentUserMembership = fetchedTeamMembers.find(member => member.user_id === user.id)
        setIsProjectOwner(currentUserMembership?.role?.toLowerCase() === 'owner')
      } catch (error) {
        notFound()
      }
    }

    fetchData()
  }, [params.id])

  if (!project) {
    return <div>Loading...</div> // Or a proper skeleton loader
  }

  return (
    <div className="space-y-6">
      <ProjectNav projectId={params.id} />

      <div className="mt-8 space-y-8">
        <RoleFilterBadges
          roleCounts={roleCounts}
          onCreateRoleClick={() => setCreateRoleModalOpen(true)}
        />
        <TeamHeader
          projectName={project.name}
          memberCount={teamMembers.length}
        />

        {isProjectOwner && <InvitationLinkCard />}

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Team Members</h2>
          <TeamMembersTable
            teamMembers={teamMembers}
            currentUserId={currentUserId || ""}
            isProjectOwner={isProjectOwner}
          />
        </div>

        <TeamRoles
          roles={projectRoles}
          teamMembers={teamMembers}
          isProjectOwner={isProjectOwner}
          projectId={params.id}
        />
      </div>
    </div>
  )
}