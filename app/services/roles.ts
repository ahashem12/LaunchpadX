import { createClient } from "@/lib/supabase/client"

export interface RoleType {
  id: string
  name: string
}

export interface RoleCategory {
  id: string
  name: string
}

async function getRoleTypes(): Promise<{ data: RoleType[] | null; error: any }> {
  const supabase = createClient()
  const { data, error } = await supabase.from("role_types").select("id, name")
  return { data, error }
}

async function getRoleCategories(): Promise<{ data: RoleCategory[] | null; error: any }> {
  const supabase = createClient()
  const { data, error } = await supabase.from("role_categories").select("id, name")
  return { data, error }
}

export const roleService = {
  getRoleTypes,
  getRoleCategories,
}
