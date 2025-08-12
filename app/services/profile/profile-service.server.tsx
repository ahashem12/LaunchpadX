import { createClient } from "@/lib/supabase/server";
import type { Profile } from "@/types";

export async function getProfileById(profileId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', profileId)
    .single();

  if (error) {
    console.error('Error fetching profile by ID:', error.message);
    return { profile: null, error };
  }
  
  return { profile: data as Profile, error: null };
}

export async function getCurrentAuthenticatedUser() {
    const supabase = await createClient();
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user) {
        return { user: null, error: error?.message || 'User not authenticated.' };
    }

    return { user, error: null };
}
