import { supabase } from "@/lib/supabase/supabase"

export interface TeamMember {
  id: string
  project_id: string
  user_id: string
  role: string
  title?: string
  bio?: string
  skills?: string[]
  is_cofounder: boolean
  has_connected_wallet: boolean
  created_at: string
  updated_at: string
  user?: {
    email: string
    wallet_address?: string
  }
}

export interface TeamMemberCreateInput {
  project_id: string
  user_id: string
  role: string
  title?: string
  bio?: string
  skills?: string[]
  is_cofounder?: boolean
}

export interface TeamMemberUpdateInput {
  role?: string
  title?: string
  bio?: string
  skills?: string[]
  is_cofounder?: boolean
  has_connected_wallet?: boolean
}

export const teamService = {
  /**
   * Add a team member to a project
   */
  addTeamMember: async (data: TeamMemberCreateInput): Promise<TeamMember | null> => {
    try {
      const now = new Date().toISOString()

      const { data: teamMember, error } = await supabase
        .from("team_members")
        .insert({
          ...data,
          is_cofounder: data.is_cofounder || false,
          has_connected_wallet: false,
          created_at: now,
          updated_at: now,
        })
        .select()
        .single()

      if (error) {
        console.error("Error adding team member:", error)
        return null
      }

      // Also add as a project member for access control
      await supabase.from("project_members").insert({
        project_id: data.project_id,
        user_id: data.user_id,
        role: data.is_cofounder ? "co-founder" : "member",
        created_at: now,
      })

      return teamMember as TeamMember
    } catch (error) {
      console.error("Unexpected error adding team member:", error)
      return null
    }
  },

  /**
   * Get all team members for a project
   */
  getProjectTeamMembers: async (projectId: string): Promise<TeamMember[]> => {
    try {
      const { data, error } = await supabase
        .from("team_members")
        .select(`
          *,
          user:profiles!inner(
            email:auth.users!inner(email),
            wallet_address
          )
        `)
        .eq("project_id", projectId)

      if (error) {
        console.error("Error getting team members:", error)
        return []
      }

      return data as TeamMember[]
    } catch (error) {
      console.error("Unexpected error getting team members:", error)
      return []
    }
  },

  /**
   * Update a team member
   */
  updateTeamMember: async (teamMemberId: string, data: TeamMemberUpdateInput): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from("team_members")
        .update({
          ...data,
          updated_at: new Date().toISOString(),
        })
        .eq("id", teamMemberId)

      if (error) {
        console.error("Error updating team member:", error)
        return false
      }

      return true
    } catch (error) {
      console.error("Unexpected error updating team member:", error)
      return false
    }
  },

  /**
   * Remove a team member
   */
  removeTeamMember: async (teamMemberId: string): Promise<boolean> => {
    try {
      // Get the team member to remove their project access too
      const { data: teamMember, error: fetchError } = await supabase
        .from("team_members")
        .select("project_id, user_id")
        .eq("id", teamMemberId)
        .single()

      if (fetchError) {
        console.error("Error fetching team member:", fetchError)
        return false
      }

      // Remove from team_members
      const { error: deleteError } = await supabase.from("team_members").delete().eq("id", teamMemberId)

      if (deleteError) {
        console.error("Error removing team member:", deleteError)
        return false
      }

      // Also remove from project_members to revoke access
      await supabase
        .from("project_members")
        .delete()
        .eq("project_id", teamMember.project_id)
        .eq("user_id", teamMember.user_id)

      return true
    } catch (error) {
      console.error("Unexpected error removing team member:", error)
      return false
    }
  },

  /**
   * Get team members with connected wallets for a project
   */
  getTeamMembersWithWallets: async (projectId: string): Promise<TeamMember[]> => {
    try {
      const { data, error } = await supabase
        .from("team_members")
        .select(`
          *,
          user:profiles!inner(
            email:auth.users!inner(email),
            wallet_address
          )
        `)
        .eq("project_id", projectId)
        .eq("has_connected_wallet", true)
        .not("user.wallet_address", "is", null)

      if (error) {
        console.error("Error getting team members with wallets:", error)
        return []
      }

      return data as TeamMember[]
    } catch (error) {
      console.error("Unexpected error getting team members with wallets:", error)
      return []
    }
  },

  /**
   * Update wallet connection status for a team member
   */
  updateWalletConnectionStatus: async (
    projectId: string,
    userId: string,
    hasConnectedWallet: boolean,
  ): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from("team_members")
        .update({
          has_connected_wallet: hasConnectedWallet,
          updated_at: new Date().toISOString(),
        })
        .eq("project_id", projectId)
        .eq("user_id", userId)

      if (error) {
        console.error("Error updating wallet connection status:", error)
        return false
      }

      return true
    } catch (error) {
      console.error("Unexpected error updating wallet connection status:", error)
      return false
    }
  },

  /**
   * Count co-founders with connected wallets for a project
   */
  countCoFoundersWithWallets: async (projectId: string): Promise<number> => {
    try {
      const { count, error } = await supabase
        .from("team_members")
        .select("id", { count: "exact", head: true })
        .eq("project_id", projectId)
        .eq("is_cofounder", true)
        .eq("has_connected_wallet", true)

      if (error) {
        console.error("Error counting co-founders with wallets:", error)
        return 0
      }

      return count || 0
    } catch (error) {
      console.error("Unexpected error counting co-founders with wallets:", error)
      return 0
    }
  },
}
