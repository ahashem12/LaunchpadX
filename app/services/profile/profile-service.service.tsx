import { createClient } from "@/lib/supabase/server";
import type { Profile } from "@/types";

export async function getProfileById(profileId: string) {
  const supabase = await createClient();
  
  try {
    // Try to get the full profile first
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', profileId)
      .single();

    if (error) {
      console.error('Error fetching profile by ID:', error.message);
      return { profile: null, error };
    }

    if (!data) {
      return { profile: null, error: { message: 'Profile not found' } };
    }

    // Ensure all required Profile fields exist with proper defaults
    const profile: Profile = {
      id: data.id,
      email: data.email || null,
      username: data.username || null,
      avatar_url: data.avatar_url || null,
      banner_url: data.banner_url || null,
      bio: data.bio || null,
      role: data.role || null,
      skills: Array.isArray(data.skills) ? data.skills : [],
      is_active: data.is_active ?? true,
      wallet_address: data.wallet_address || null,
      reputation: typeof data.reputation === 'number' ? data.reputation : 0,
      achievements: Array.isArray(data.achievements) ? data.achievements : [],
      created_at: data.created_at,
      updated_at: data.updated_at,
    };
    
    return { profile, error: null };
  } catch (selectError) {
    console.error('Error in getProfileById:', selectError);
    return { profile: null, error: { message: 'Failed to fetch profile' } };
  }
}

export async function getCurrentAuthenticatedUser() {
    const supabase = await createClient();
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user) {
        return { user: null, error: error?.message || 'User not authenticated.' };
    }

    return { user, error: null };
}
