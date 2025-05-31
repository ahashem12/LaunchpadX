// services/projects/update.ts
import { createClient } from "@/lib/supabase/client"
import type { ProjectUpdateInput } from "./types"

export async function updateProject(
  projectId: string,
  projectData: ProjectUpdateInput
): Promise<boolean> {
  try {
    const supabase = createClient()
    const { error } = await supabase
      .from("projects")
      .update({
        ...projectData,
        updated_at: new Date().toISOString(),
      })
      .eq("id", projectId)

    if (error) {
      console.error("Error updating project:", error)
      return false
    }

    return true
  } catch (error) {
    console.error("Unexpected error updating project:", error)
    return false
  }
}