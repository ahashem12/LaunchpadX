import { createClient } from "@/lib/supabase/client"
import type { Project } from "@/types"

export interface PendingUser {
  id: string
  email: string
  firstName?: string
  lastName?: string
  created_at: string
}

export const adminService = {
  // Get all pending projects (where is_active is false)
  async getPendingProjects(): Promise<Project[]> {
    try {
      const supabase = createClient()
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("is_active", false)
        .order("created_at", { ascending: false })

      if (error) {
        console.error("Error getting pending projects:", error)
        return []
      }

      return data as Project[]
    } catch (error) {
      console.error("Unexpected error getting pending projects:", error)
      return []
    }
  },

  // Get all pending users (where is_active is false)
  async getPendingUsers(): Promise<PendingUser[]> {
    try {
      const supabase = createClient()
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("is_active", false)
        .order("created_at", { ascending: false })

      if (error) {
        console.error("Error getting pending users:", error)
        return []
      }

      return data as PendingUser[]
    } catch (error) {
      console.error("Unexpected error getting pending users:", error)
      return []
    }
  },

  // Approve a project (set is_active to true)
  async approveProject(projectId: string): Promise<boolean> {
    try {
      const supabase = createClient()
      const { error } = await supabase
        .from("projects")
        .update({ is_active: true, updated_at: new Date().toISOString() })
        .eq("id", projectId)

      if (error) {
        console.error("Error approving project:", error)
        return false
      }

      return true
    } catch (error) {
      console.error("Unexpected error approving project:", error)
      return false
    }
  },

  // Approve a user (set is_active to true)
  async approveUser(userId: string): Promise<boolean> {
    try {
      const supabase = createClient()
      const { error } = await supabase
        .from("profiles")
        .update({ is_active: true, updated_at: new Date().toISOString() })
        .eq("id", userId)

      if (error) {
        console.error("Error approving user:", error)
        return false
      }

      return true
    } catch (error) {
      console.error("Unexpected error approving user:", error)
      return false
    }
  },

  // Check if current user is admin
  async isAdmin(): Promise<boolean> {
    try {
      const supabase = createClient()
      const { data: { user }, error } = await supabase.auth.getUser()

      if (error || !user) {
        console.error("Error getting user:", error)
        return false
      }

      // Get user's profile with is_admin status
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("is_admin")
        .eq("id", user.id)
        .single()

      if (profileError || !profile) {
        console.error("Error getting user profile:", profileError)
        return false
      }

      return profile.is_admin === true
    } catch (error) {
      console.error("Unexpected error checking admin status:", error)
      return false
    }
  }
}
