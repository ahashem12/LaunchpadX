// services/projects/team.ts
import { createClient } from "@/lib/supabase/client"
import type { TeamMember } from "@/types"

export async function getTeamMembers(projectId: string): Promise<TeamMember[]> {
  try {
    const supabase = createClient()

    const { data: teamMembers, error: teamError } = await supabase
      .from("team_members")
      .select(`
        id,
        user_id,
        role,
        title,
        bio,
        skills,
        is_cofounder,
        has_connected_wallet,
        created_at
      `)
      .eq("project_id", projectId)

    if (teamError) {
      console.error("Error fetching team members:", teamError)
      return []
    }

    if (!teamMembers || teamMembers.length === 0) {
      return []
    }

    const { data: currentUserData } = await supabase.auth.getUser()
    const currentUserId = currentUserData?.user?.id

    const teamMembersWithUserData: TeamMember[] = teamMembers.map((member, index) => {
      let email = "Unknown User"
      let name = "Unknown User"
      let avatar = undefined

      if (currentUserId === member.user_id && currentUserData?.user) {
        const user = currentUserData.user
        email = user.email || "No email"
        name = user.user_metadata?.full_name || user.email || "Unknown User"
        avatar = user.user_metadata?.avatar_url
      } else {
        email = `user-${member.user_id?.slice(0, 8) || index}`
        name = member.title || member.role || `Team Member ${member.user_id?.slice(0, 8) || index}`
      }

      const initials = name
        .split(" ")
        .map((part: string) => part[0])
        .join("")
        .toUpperCase()
        .substring(0, 2)

      const parsedSkills = member.skills
        ? typeof member.skills === "string"
          ? member.skills
              .split(",")
              .map((s: string) => s.trim())
              .filter(Boolean)
          : Array.isArray(member.skills)
            ? member.skills
            : []
        : []

      return {
        id: member.id || `temp-${index}`,
        user_id: member.user_id || `temp-user-${index}`,
        project_id: projectId,
        name,
        email,
        avatar,
        initials,
        role: member.role || member.title || "Team Member",
        title: member.title,
        bio: member.bio,
        insight: member.is_cofounder ? "Co-founder" : undefined,
        hasAlert: !member.has_connected_wallet,
        skills: parsedSkills,
        joinedAt: member.created_at || new Date().toISOString(),
        is_cofounder: member.is_cofounder || false,
        has_connected_wallet: member.has_connected_wallet || false,
        created_at: member.created_at,
      }
    })

    return teamMembersWithUserData
  } catch (error) {
    console.error("Unexpected error fetching team members:", error)
    return []
  }
}