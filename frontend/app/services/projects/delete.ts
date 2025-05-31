// services/projects/delete.ts
import { createClient } from "@/lib/supabase/client"

export async function deleteProject(projectId: string): Promise<boolean> {
  try {
    const supabase = createClient()
    const { error } = await supabase.from("projects").delete().eq("id", projectId)

    if (error) {
      console.error("Error deleting project:", error)
      return false
    }

    return true
  } catch (error) {
    console.error("Unexpected error deleting project:", error)
    return false
  }
}