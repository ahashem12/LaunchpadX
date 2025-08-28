import { createClient } from "@/lib/supabase/client"
import type { Project, Role, RoleType,RoleCategory, TeamRole } from "@/types"
import { validateId } from "./utils"

export async function getProject(projectId: string): Promise<Project | null> {
  try {
    if (!validateId(projectId)) {
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

export async function getAllProjects(): Promise<Project[]> {
  try {
    const supabase = createClient()
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("is_active", true)

    if (error) {
      console.error("Error getting all projects:", error)
      return []
    }

    return data as Project[]
  } catch (error) {
    console.error("Unexpected error getting all projects:", error)
    return []
  }
}

export async function getProjectRoles(projectId: string): Promise<TeamRole[]> {
  try {
    if (!validateId(projectId)) {
      console.error("Invalid UUID format for project ID:", projectId)
      return []
    }

    const supabase = createClient()
    const { data, error } = await supabase
      .from("roles")
      .select(`
        *,
        role_category:category_id (
          id,
          name
        )
      `)
      .eq("project_id", projectId)
      .eq("status", "Open")

    if (error) {
      console.error("Error getting project roles:", error)
      return []
    }

    return data as TeamRole[]
  } catch (error) {
    console.error("Unexpected error getting project roles:", error)
    return []
  }
}

export async function getAllOpenRoles(): Promise<TeamRole[]> {
  try {
    const supabase = createClient()
    const { data, error } = await supabase
      .from("roles")
      .select(
        `
        *,
        project:project_id (id, name, logo_url),
        role_category:category_id (id, name)
      `,
      )
      .eq("status", "Open")

    if (error) {
      console.error("Error getting all open roles:", error)
      return []
    }

    return data as TeamRole[]
  } catch (error) {
    console.error("Unexpected error getting all open roles:", error)
    return []
  }
}
export async function getRole(roleId: string): Promise<Role | null> {
  try {
    if (!validateId(roleId)) {
      console.error("Invalid UUID format:", roleId)
      return null
    }

    const supabase = createClient()
    const { data, error } = await supabase.from("roles").select().eq("id", roleId).single()
    if (error) {
      return null
    }

    return data as Role
  } catch (error) {
    console.error("Unexpected error getting role:", error)
    return null
  }
}
export async function getRoleType(roleTypeId: string): Promise<RoleType | null> {
  try {
    if (!validateId(roleTypeId)) {
      console.error("Invalid UUID format:", roleTypeId)
      return null
    }

    const supabase = createClient()
    const { data, error } = await supabase.from("role_types").select().eq("id", roleTypeId).single()
    if (error) {
      return null
    }

    return data as RoleType
  } catch (error) {
    console.error("Unexpected error getting role type:", error)
    return null
  }
}
export async function getRoleCategory(roleCategoryID: string): Promise<RoleCategory | null> {
  try {
    if (!validateId(roleCategoryID)) {
      console.error("Invalid UUID format:", roleCategoryID)
      return null
    }
    console.log("roleCategoryID",roleCategoryID)
    const supabase = createClient()
    const { data, error } = await supabase.from("role_categories").select().eq("id", roleCategoryID).single()
    console.log(data)
    if (error) {
      return null
    }

    return data as RoleCategory
  } catch (error) {
    console.error("Unexpected error getting role type:", error)
    return null
  }
}