import { createClient } from "@/lib/supabase/client"
import type { Project } from "@/types"
import { validateProjectId } from "./utils"

export async function getProject(projectId: string): Promise<Project | null> {
  try {
    if (!validateProjectId(projectId)) {
      console.error("Invalid UUID format:", projectId)
      return null
    }

    const supabase = createClient()
    const { data, error } = await supabase.from("projects").select().eq("id", projectId).single()

    if (error) {
      console.error("Error getting project:", error)
      return null
    }

    return data as Project
  } catch (error) {
    console.error("Unexpected error getting project:", error)
    return null
  }
}

export async function getUserProjects(): Promise<Project[]> {
  try {
    const supabase = createClient()
    const { data: userData, error: userError } = await supabase.auth.getUser()

    if (userError || !userData.user) {
      console.error("Error getting user:", userError)
      return []
    }

    const userId = userData.user.id

    const { data, error } = await supabase
      .from("project_members")
      .select(`project:project_id(*)`)
      .eq("user_id", userId)

    if (error) {
      console.error("Error getting user projects:", error)
      return []
    }

    return data.map((item: any) => item.project) as Project[]
  } catch (error) {
    console.error("Unexpected error getting user projects:", error)
    return []
  }
}