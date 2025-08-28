import { createClient } from "@/lib/supabase/client"
import type { TeamMember, TeamRole } from "@/types"

export async function getTeamMembers(projectId: string): Promise<TeamMember[]> {
  try {
    const supabase = createClient()

    const { data, error } = await supabase
      .from("project_members")
      .select(`
        id,
        user_id,
        project_id,
        role,
        has_connected_wallet,
        created_at,
        profiles:user_id (
          email,
          avatar_url,
          skills,
          firstName,
          lastName
        )
      `)
      .eq("project_id", projectId)

    if (error || !data) {
      return []
    }

    return data.map((member) => {
      const profile = member.profiles as {
        firstName?: string
        lastName?: string
        email?: string
        avatar_url?: string
        skills?: string[] | string
      } | null

      const skills = profile?.skills
        ? Array.isArray(profile.skills)
          ? profile.skills
          : typeof profile.skills === 'string'
            ? profile.skills.split(',').map(s => s.trim()).filter(Boolean)
            : []
        : []

      const isOwner = member.role?.toLowerCase() === 'owner'

      return {
        id: member.id,
        user_id: member.user_id,
        project_id: member.project_id,
        firstName: profile?.firstName || "",
        lastName: profile?.lastName || "",
        email: profile?.email || "No email",
        avatar_url: profile?.avatar_url || null,
        role: member.role || "",
        has_connected_wallet: member.has_connected_wallet || false,
        created_at: member.created_at,
        skills,
        is_owner: isOwner,
        insight: isOwner ? "Owner" : undefined,
        is_cofounder: undefined,
        joinedAt: member.created_at || new Date().toISOString(),
        updated_at: undefined,
      }
    })
  } catch (error) {
    return []
  }
}

export async function getProjectRoles(projectId: string): Promise<TeamRole[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("roles")
    .select("*, role_category:category_id(id, name)")
    .eq("project_id", projectId)

  if (error) {
    console.error("Error getting project roles:", error)
    return []
  }

  return data
}

export async function getRoleCategoryCounts(projectId: string): Promise<{ [key: string]: number }> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("roles")
    .select("role_category:category_id(name)")
    .eq("project_id", projectId)

  if (error) {
    console.error("Error getting role category counts:", error)
    return {}
  }

  const counts = data.reduce((acc: { [key: string]: number }, role: any) => {
    const categoryName = role.role_category?.name || "Uncategorized"
    acc[categoryName] = (acc[categoryName] || 0) + 1
    return acc
  }, {})

  return counts
}