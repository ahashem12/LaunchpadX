import { createClient } from "@/lib/supabase/client"
import { sendEmail } from "@/lib/utils/email-service"
import type { Project } from "@/types"

export interface PendingUser {
  id: string
  email: string
  firstName?: string | null
  lastName?: string | null
  phoneNumber?: string | null
  fieldOfExpertise?: string | null
  joiningReason?: string | null
  bio?: string | null
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

  // Get a full profile by id
  async getProfileById(userId: string) {
    try {
      const supabase = createClient()
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single()
      if (error) {
        console.error("Error getting profile by id:", error)
        return null
      }
      return data
    } catch (error) {
      console.error("Unexpected error getting profile by id:", error)
      return null
    }
  },

  // Get the project owner's profile by looking up the user with role 'owner' in project_members
  async getProjectOwner(projectId: string) {
    try {
      const supabase = createClient()
      
      // First, get the user_id of the owner from project_members
      const { data: member, error: memberError } = await supabase
        .from("project_members")
        .select("user_id")
        .eq("project_id", projectId)
        .eq("role", "owner")
        .single()
      
      if (memberError || !member) {
        console.error("Error fetching project owner from members:", memberError)
        return null
      }
      
      // Then get the full profile of the owner
      const { data: owner, error: ownerError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", member.user_id)
        .single()
      
      if (ownerError) {
        console.error("Error fetching project owner profile:", ownerError)
        return null
      }
      
      return owner
    } catch (error) {
      console.error("Unexpected error getting project owner:", error)
      return null
    }
  },

  // Get all project members including their profiles
  async getProjectMembers(projectId: string) {
    try {
      const supabase = createClient()
      const { data: members, error } = await supabase
        .from("project_members")
        .select(`
          role,
          profiles:profiles (
            id,
            firstName,
            lastName,
            email,
            avatar_url,
            role,
            reputation,
            githubUrl,
            websiteUrl,
            linkedinUrl,
            bio
          )`)
        .eq("project_id", projectId)
      
      if (error) {
        console.error("Error fetching project members:", error)
        return []
      }
      
      return members.map(m => ({
        ...m.profiles,
        role: m.role
      }))
    } catch (error) {
      console.error("Unexpected error getting project members:", error)
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
      const { error: updateError } = await supabase
        .from("projects")
        .update({ is_active: true, updated_at: new Date().toISOString() })
        .eq("id", projectId)

      if (updateError) {
        console.error("Error approving project:", updateError)
        return false
      }

      // Get project details to find the owner's email
      const { data: projectData, error: projectError } = await supabase
        .from("projects")
        .select("name, user_id")
        .eq("id", projectId)
        .single()

      if (projectError || !projectData) {
        console.error("Error fetching project details for email:", projectError)
        return true // Project was approved, but email failed.
      }

      const { data: userData, error: userError } = await supabase
        .from("profiles")
        .select("email, firstName")
        .eq("id", projectData.user_id)
        .single()

      if (userError || !userData) {
        console.error("Error fetching user email for project approval:", userError)
        return true // Project was approved, but email failed.
      }

      const projectEmailHtml = `
        <p>Hello ${userData.firstName || ''},</p>
        <p>Congratulations — your project <strong>${projectData.name}</strong> has been accepted and is now live on LPX!<br>
        The community can now discover, contribute, and collaborate with you to bring your vision to life.</p>
        <p>Here’s what you can do next:</p>
        <ul>
          <li>Invite contributors to join your project</li>
          <li>Share updates and milestones</li>
          <li>Explore funding and collaboration opportunities</li>
        </ul>
        <p><a href="https://lpx-lime.vercel.app/dashboard">Manage Your Project</a></p>
        <p>We’re excited to see your ideas grow and thrive within LPX.</p>
        <p>Best regards,<br>
        The LPX Team</p>
      `;

      await sendEmail(
        userData.email,
        "Your project is live on LPX 🚀",
        projectEmailHtml
      );

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
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ is_active: true, updated_at: new Date().toISOString() })
        .eq("id", userId)
      if (updateError) {
        console.error("Error approving user:", updateError)
        return false
      }

      // Get user details for email
      const { data: userData, error: userError } = await supabase
        .from("profiles")
        .select("email, firstName")
        .eq("id", userId)
        .single()

      if (userError || !userData) {
        console.error("Error fetching user email for approval:", userError)
        return true // User was approved, but email failed.
      }

      const userEmailHtml = `
        <p>Hello ${userData.firstName || ''},</p>
        <p>Welcome to LPX — the ecosystem designed to simplify how you build, contribute, and get funded.</p>
        <p>Your journey starts here:</p>
        <ul>
          <li>Discover projects that need your skills</li>
          <li>Collaborate with a community of innovators</li>
          <li>Access opportunities for growth and funding</li>
        </ul>
        <p><a href="https://lpx-lime.vercel.app/dashboard">Start Exploring LPX</a></p>
        <p>We look forward to being part of your success.</p>
        <p>Best regards,<br>
        LPX Team</p>
      `;

      await sendEmail(
        userData.email,
        "You’re in! Start building with LPX",
        userEmailHtml
      );

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
