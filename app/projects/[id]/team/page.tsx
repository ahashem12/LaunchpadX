import { notFound, redirect } from "next/navigation"
import { projectService } from "@/app/services/projects/project-service"
import { ProjectNav } from "@/components/projects/nav/ProjectNav"
import { TeamRoles } from "@/components/projects/nav/team/TeamRoles"
import { TeamMembersTable } from "@/components/projects/nav/team/TeamMembersTable"
import { TeamHeader } from "@/components/projects/nav/team/TeamHeader"
import { InvitationLinkCard } from "@/components/projects/nav/team/InvitationLinkCard"
import { createClient } from "@/lib/supabase/server"

interface TeamPageProps {
  params: {
    id: string
  }
}

export default async function TeamPage(props: TeamPageProps) {
  const { id } = await props.params
  const supabase = await createClient()

  // Check authentication
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    redirect('/login')
  }

  try {
    const project = await projectService.getProject(id)
    if (!project) {
      notFound()
    }

    const teamMembers = await projectService.getTeamMembers(id)
    const currentUserMembership = teamMembers.find(member => member.user_id === user.id)
    const isProjectOwner = currentUserMembership?.role?.toLowerCase() === 'owner'

    return (
      <div className="space-y-6">
        <ProjectNav projectId={id} />
        
        <div className="mt-8 space-y-8">
          <TeamHeader 
            projectName={project.name} 
            memberCount={teamMembers.length}
          />
          
          {isProjectOwner && <InvitationLinkCard />}

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Team Members</h2>
            <TeamMembersTable
              teamMembers={teamMembers}
              currentUserId={user.id}
              isProjectOwner={isProjectOwner}
            />
          </div>

          <TeamRoles
            roles={[]}
            teamMembers={teamMembers}
            isProjectOwner={isProjectOwner}
          />        
        </div>
      </div>
    )
  } catch (error) {
    notFound()
  }
}