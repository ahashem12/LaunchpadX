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

export const skillService = {
  getAllSkills,
}
