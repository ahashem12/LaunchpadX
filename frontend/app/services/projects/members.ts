// services/projects/members.ts
import { createClient } from "@/lib/supabase/client"

export async function hasProjectAccess(projectId: string): Promise<boolean> {
  try {
    const supabase = createClient()
    const { data: userData, error: userError } = await supabase.auth.getUser()

    if (userError || !userData.user) {
      console.error("Error getting user:", userError)
      return false
    }

    const userId = userData.user.id

    const { data, error } = await supabase
      .from("project_members")
      .select("id")
      .eq("user_id", userId)
      .eq("project_id", projectId)
      .limit(1)

    if (error) {
      console.error("Error checking project access:", error)
      return false
    }

    return data && data.length > 0
  } catch (error) {
    console.error("Unexpected error checking project access:", error)
    return false
  }
}

export async function addProjectMember(
  projectId: string,
  userId: string,
  role: string
): Promise<boolean> {
  try {
    const supabase = createClient()
    const { error } = await supabase.from("project_members").insert({
      project_id: projectId,
      user_id: userId,
      role,
      created_at: new Date().toISOString(),
    })

    if (error) {
      console.error("Error adding project member:", error)
      return false
    }

    return true
  } catch (error) {
    console.error("Unexpected error adding project member:", error)
    return false
  }
}

export async function removeProjectMember(projectId: string, userId: string): Promise<boolean> {
  try {
    const supabase = createClient()
    const { error } = await supabase
      .from("project_members")
      .delete()
      .eq("project_id", projectId)
      .eq("user_id", userId)

    if (error) {
      console.error("Error removing project member:", error)
      return false
    }

    return true
  } catch (error) {
    console.error("Unexpected error removing project member:", error)
    return false
  }
}