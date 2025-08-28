import { createClient } from "@/lib/supabase/client"

export interface Skill {
  id: string
  name: string
}

async function getAllSkills(): Promise<Skill[]> {
  const supabase = createClient()
  const { data, error } = await supabase.from("skills").select("id, name")

  if (error) {
    console.error("Error fetching skills:", error)
    return []
  }

  return data
}

async function getSkillsByIds(ids: string[]): Promise<Skill[]> {
  if (!ids || ids.length === 0) return [];
  const supabase = createClient();
  const { data, error } = await supabase
    .from("skills")
    .select("id, name")
    .in("id", ids);

  if (error) {
    console.error("Error fetching skills by IDs:", error);
    return [];
  }
  return data;
}

export const skillService = {
  getAllSkills,
  getSkillsByIds,
}
