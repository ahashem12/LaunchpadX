import { createClient } from "@/lib/supabase/client";
import type { Profile } from "@/types";

export async function getAchievements(): Promise<string[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase.from("profiles").select("achievements");

    if (error) {
      console.error("Error getting achievements:", error);
      return [];
    }

    const allAchievements = data.flatMap((p) => p.achievements || []);
    return [...new Set(allAchievements)];
  } catch (error) {
    console.error("Unexpected error getting achievements:", error);
    return [];
  }
}

export async function getSkills(): Promise<string[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase.from("profiles").select("skills");

    if (error) {
      console.error("Error getting skills:", error);
      return [];
    }

    const allSkills = data.flatMap((p) => p.skills || []);
    return [...new Set(allSkills)];
  } catch (error) {
    console.error("Unexpected error getting skills:", error);
    return [];
  }
}

export async function getRoles(): Promise<string[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase.from("profiles").select("role");

    if (error) {
      console.error("Error getting roles:", error);
      return [];
    }

    const allRoles = data.map((p) => p.role).filter(Boolean) as string[];
    return [...new Set(allRoles)];
  } catch (error) {
    console.error("Unexpected error getting roles:", error);
    return [];
  }
}

export async function getCommunityMembers(): Promise<Profile[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase.from("profiles").select("*");

    if (error) {
      console.error("Error getting community members:", error);
      return [];
    }

    return data as Profile[];
  } catch (error) {
    console.error("Unexpected error getting community members:", error);
    return [];
  }
}
