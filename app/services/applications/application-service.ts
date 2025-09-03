import { createClient } from "@/lib/supabase/client";
import type {
  RoleApplication,
  RoleApplicationWithProfile,
} from "@/types/application";

export class ApplicationService {
  private static supabase = createClient();

  /**
   * Apply for a role
   */
  static async applyForRole(
    roleId: string
  ): Promise<{ data: RoleApplication | null; error: string | null }> {
    try {
      const {
        data: { user },
        error: authError,
      } = await this.supabase.auth.getUser();
      if (authError || !user) {
        return { data: null, error: "User not authenticated" };
      }

      // Check if user already applied
      const { data: existingApplication } = await this.supabase
        .from("role_applications")
        .select("id")
        .eq("role_id", roleId)
        .eq("applicant_id", user.id)
        .single();

      if (existingApplication) {
        return { data: null, error: "You have already applied for this role" };
      }

      // Create new application
      const { data, error } = await this.supabase
        .from("role_applications")
        .insert({
          role_id: roleId,
          applicant_id: user.id,
          status: "pending",
        })
        .select()
        .single();

      if (error) {
        return { data: null, error: error.message };
      }

      return { data: data as RoleApplication, error: null };
    } catch (err) {
      return { data: null, error: "Failed to apply for role" };
    }
  }

  /**
   * Get applications for a specific role (for project owners)
   */
  static async getApplicationsForRole(
    roleId: string
  ): Promise<{ data: RoleApplicationWithProfile[]; error: string | null }> {
    try {
      const { data, error } = await this.supabase
        .from("role_applications")
        .select(
          `
          id,
          role_id,
          applicant_id,
          applied_at,
          status,
          profiles!applicant_id (
            id,
            email,
            firstName,
            lastName,
            avatar_url,
            banner_url,
            bio,
            role,
            skills,
            fieldOfExpertise,
            is_active,
            wallet_address,
            reputation,
            achievements,
            discordUrl,
            githubUrl,
            linkedinUrl,
            twitterUrl,
            telegramUrl,
            websiteUrl,
            created_at,
            updated_at
          )
        `
        )
        .eq("role_id", roleId)
        .order("applied_at", { ascending: false });

      if (error) {
        return { data: [], error: error.message };
      }

      // Transform the data to match our interface
      const transformedData =
        data?.map((item: any) => ({
          id: item.id,
          role_id: item.role_id,
          applicant_id: item.applicant_id,
          applied_at: item.applied_at,
          status: item.status,
          applicant: item.profiles,
        })) || [];

      return {
        data: transformedData as RoleApplicationWithProfile[],
        error: null,
      };
    } catch (err) {
      return { data: [], error: "Failed to fetch applications" };
    }
  }

  /**
   * Get user's application status for a specific role
   */
  static async getUserApplicationStatus(
    roleId: string
  ): Promise<{ data: RoleApplication | null; error: string | null }> {
    try {
      const {
        data: { user },
        error: authError,
      } = await this.supabase.auth.getUser();
      if (authError || !user) {
        return { data: null, error: "User not authenticated" };
      }

      const { data, error } = await this.supabase
        .from("role_applications")
        .select("*")
        .eq("role_id", roleId)
        .eq("applicant_id", user.id)
        .single();

      if (error && error.code !== "PGRST116") {
        // PGRST116 is "not found"
        return { data: null, error: error.message };
      }

      return { data: data as RoleApplication | null, error: null };
    } catch (err) {
      return { data: null, error: "Failed to check application status" };
    }
  }

  /**
   * Get application counts for multiple roles
   */
  static async getApplicationCountsForRoles(
    roleIds: string[]
  ): Promise<{ data: Record<string, number>; error: string | null }> {
    try {
      if (roleIds.length === 0) {
        return { data: {}, error: null };
      }

      const { data, error } = await this.supabase
        .from("role_applications")
        .select("role_id")
        .in("role_id", roleIds);

      if (error) {
        return { data: {}, error: error.message };
      }

      // Count applications per role
      const counts: Record<string, number> = {};
      roleIds.forEach(roleId => {
        counts[roleId] = 0;
      });

      data?.forEach((application: any) => {
        counts[application.role_id] = (counts[application.role_id] || 0) + 1;
      });

      return { data: counts, error: null };
    } catch (err) {
      return { data: {}, error: "Failed to get application counts" };
    }
  }

  /**
   * Update application status (for project owners)
   */
  static async updateApplicationStatus(
    applicationId: string,
    status: "accepted" | "rejected"
  ): Promise<{ data: RoleApplication | null; error: string | null }> {
    try {
      const { data, error } = await this.supabase
        .from("role_applications")
        .update({ status })
        .eq("id", applicationId)
        .select()
        .single();

      if (error) {
        return { data: null, error: error.message };
      }

      return { data: data as RoleApplication, error: null };
    } catch (err) {
      return { data: null, error: "Failed to update application status" };
    }
  }
}
