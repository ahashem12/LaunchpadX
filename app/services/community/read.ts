"use server"

import { createClient } from "@/lib/supabase/server";
import type { Profile } from "@/types";

export async function getAchievements(): Promise<string[]> {
  try {
    const supabase = await createClient();
    
    // First try to get achievements column, fallback to empty array if column doesn't exist
    const { data, error } = await supabase
      .from("profiles")
      .select("id") // Select a column that definitely exists
      .limit(1);

    if (error) {
      console.error("Error accessing profiles table:", error.message);
      return [];
    }

    // Try to check if achievements column exists by attempting to select it
    try {
      const { data: achievementsData, error: achievementsError } = await supabase
        .from("profiles")
        .select("achievements")
        .not("achievements", "is", null)
        .limit(10);

      if (achievementsError) {
        console.log("Achievements column not found, returning empty array");
        return [];
      }

      if (!achievementsData || achievementsData.length === 0) {
        return [];
      }

      const allAchievements = achievementsData.flatMap((p) => p.achievements || []);
      return [...new Set(allAchievements)];
    } catch (columnError) {
      console.log("Achievements column does not exist in database, returning empty array");
      return [];
    }
  } catch (error) {
    console.error("Unexpected error getting achievements:", error instanceof Error ? error.message : String(error));
    return [];
  }
}

export async function getSkills(): Promise<string[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("profiles")
      .select("skills")
      .not("skills", "is", null);

    if (error) {
      console.error("Error getting skills:", error.message);
      return [];
    }

    if (!data || data.length === 0) {
      return [];
    }

    const allSkills = data.flatMap((p) => p.skills || []);
    return [...new Set(allSkills)];
  } catch (error) {
    console.error("Unexpected error getting skills:", error instanceof Error ? error.message : String(error));
    return [];
  }
}

export async function getRoles(): Promise<string[]> {
  try {
    const supabase = await createClient();
    
    // Try to check if role column exists by attempting to select it
    try {
      const { data: rolesData, error: rolesError } = await supabase
        .from("profiles")
        .select("role")
        .not("role", "is", null)
        .limit(50);

      if (rolesError) {
        console.log("Role column not found, returning empty array");
        return [];
      }

      if (!rolesData || rolesData.length === 0) {
        return [];
      }

      const allRoles = rolesData.map((p) => p.role).filter(Boolean) as string[];
      return [...new Set(allRoles)];
    } catch (columnError) {
      console.log("Role column does not exist in database, returning empty array");
      return [];
    }
  } catch (error) {
    console.error("Unexpected error getting roles:", error instanceof Error ? error.message : String(error));
    return [];
  }
}

export async function getCommunityMembers(): Promise<Profile[]> {
  try {
    const supabase = await createClient();
    
    // Try to get all profile data, with graceful handling for missing columns
    let profiles: Profile[] = [];
    
    // First, try to get the full profile with all columns
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error getting community members with all columns:", error.message);
        // Fall back to essential columns only
        return await getCommunityMembersEssential(supabase);
      }

      if (!data || data.length === 0) {
        return [];
      }

      // Map the data to ensure all required fields exist with proper defaults
      profiles = data.map(profile => ({
        id: profile.id,
        email: profile.email || null,
        username: profile.username || null,
        firstName: profile.firstName || null,
        lastName: profile.lastName || null,
        avatar_url: profile.avatar_url || null,
        banner_url: profile.banner_url || null,
        bio: profile.bio || null,
        role: profile.role || null,
        skills: Array.isArray(profile.skills) ? profile.skills : [],
        is_active: profile.is_active ?? true,
        wallet_address: profile.wallet_address || null,
        reputation: typeof profile.reputation === 'number' ? profile.reputation : 0,
        achievements: Array.isArray(profile.achievements) ? profile.achievements : [],
        created_at: profile.created_at,
        updated_at: profile.updated_at,
      }));

      return profiles;
    } catch (selectError) {
      console.log("Some columns may not exist, falling back to essential columns");
      return await getCommunityMembersEssential(supabase);
    }
  } catch (error) {
    console.error("Unexpected error getting community members:", error instanceof Error ? error.message : String(error));
    return [];
  }
}

// Fallback function for when some columns don't exist
async function getCommunityMembersEssential(supabase: any): Promise<Profile[]> {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select(`
        id,
        email,
        username,
        avatar_url,
        banner_url,
        bio,
        is_active,
        wallet_address,
        created_at,
        updated_at
      `)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error getting essential community member data:", error.message);
      return [];
    }

    if (!data || data.length === 0) {
      return [];
    }

    // Map with default values for missing columns
    const profiles: Profile[] = data.map((profile: any) => ({
      ...profile,
      role: null,
      skills: [],
      reputation: 0,
      achievements: [],
    }));

    return profiles;
  } catch (error) {
    console.error("Error in fallback community members query:", error instanceof Error ? error.message : String(error));
    return [];
  }
}
