import { createClient } from "@/lib/supabase/client"
import type { Project } from "@/types"
import type { ProjectCreateInput } from "./types"

export async function createProject(projectData: ProjectCreateInput): Promise<Project | null> {
  try {
    const supabase = createClient()
    const { data: userData, error: userError } = await supabase.auth.getUser()

    if (userError || !userData.user) {
      console.error("Error getting user:", userError)
      return null
    }

    const userId = userData.user.id
    const now = new Date().toISOString()

    const { data, error } = await supabase
      .from("projects")
      .insert({
        name: projectData.name,
        description: projectData.description,
        short_description: projectData.short_description || null,
        logo_url: projectData.logo_url || null,
        banner_url: projectData.banner_url || null,
        category: projectData.category || null,
        status: projectData.status || "planning",
        created_at: now,
        updated_at: now,
      })
      .select()
      .single()

    if (error) {
      console.error("Error creating project:", error)
      return null
    }

    const { error: memberError } = await supabase.from("project_members").insert({
      project_id: data.id,
      user_id: userId,
      role: "owner",
      created_at: now,
    })

    if (memberError) {
      console.error("Error adding project owner:", memberError)
      await supabase.from("projects").delete().eq("id", data.id)
      return null
    }

    return data as Project
  } catch (error) {
    console.error("Unexpected error creating project:", error)
    return null
  }
}