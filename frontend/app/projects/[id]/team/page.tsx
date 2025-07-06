import { notFound } from "next/navigation"
import { projectService } from "@/app/services/projects/project-service"
import { ProjectNav } from "@/components/projects/nav/ProjectNav"
import { TeamRoles } from "@/components/projects/nav/team/TeamRoles"
import { TeamMembersTable } from "@/components/projects/nav/team/TeamMembersTable"
import { TeamHeader } from "@/components/projects/nav/team/TeamHeader"
import { InvitationLinkCard } from "@/components/projects/nav/team/InvitationLinkCard"

interface TeamPageProps {
  params: {
    id: string
  }
}

export default async function TeamPage(props: TeamPageProps) {
  const params = await props.params
  const project = await projectService.getProject(params.id)

  if (!project) {
    notFound()
  }

  // Fetch team members from Supabase
  const teamMembers = await projectService.getTeamMembers(params.id)

  return (
    <div className="space-y-6">
      <ProjectNav projectId={params.id} />

      <div className="mt-8 space-y-8">
        <TeamHeader />
        <InvitationLinkCard />
        

        {/* Display team members */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Team Members</h2>
          <TeamMembersTable teamMembers={teamMembers} />
        </div>

        <TeamRoles />
      </div>
    </div>
  )
}
