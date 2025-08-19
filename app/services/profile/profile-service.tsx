import { createClient } from "@/lib/supabase/client";
import { createClient as createServerClient } from "@/lib/supabase/server";
import type { Profile, ProfileUpdateInput } from "@/types/profile";
import type { Profile as ProfileType } from "@/types";

export class ProfileService {
  private static supabase = createClient();
  private static readonly PROFILE_PICTURE_BUCKET = "profile-pictures";
  private static readonly BANNER_BUCKET = "profile-banners";
  private static readonly ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
  private static readonly MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

  static async getCurrentUserProfile(): Promise<{ data: Profile | null; error: string | null }> {
    try {
      const { data: { user }, error: authError } = await this.supabase.auth.getUser();
      if (authError || !user) {
        return { data: null, error: "User not authenticated" };
      }

      const { data, error } = await this.supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) return { data: null, error: error.message };
      return { data: data as Profile, error: null };
    } catch {
      return { data: null, error: "Failed to fetch profile" };
    }
  }

  static async updateProfile(updates: ProfileUpdateInput): Promise<{ data: Profile | null; error: string | null }> {
    try {
      const { data: { user }, error: authError } = await this.supabase.auth.getUser();
      if (authError || !user) {
        return { data: null, error: "User not authenticated" };
      }

      const { data, error } = await this.supabase
        .from("profiles")
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id)
        .select()
        .single();

      if (error) return { data: null, error: error.message };
      return { data: data as Profile, error: null };
    } catch {
      return { data: null, error: "Failed to update profile" };
    }
  }

  static async uploadProfilePicture(file: File): Promise<{ url: string | null; error: string | null }> {
    try {
      const { data: { user }, error: authError } = await this.supabase.auth.getUser();
      if (authError || !user) {
        return { url: null, error: "User not authenticated" };
      }

      if (!this.ALLOWED_FILE_TYPES.includes(file.type)) {
        return { url: null, error: "Only JPEG, PNG, and WebP images are allowed" };
      }

      if (file.size > this.MAX_FILE_SIZE) {
        return { url: null, error: "Image size must be less than 5MB" };
      }

      const fileExt = file.name.split(".").pop()?.toLowerCase() || 'jpg';
      const fileName = `user_${user.id}/profile_${Date.now()}.${fileExt}`;

      const { data: uploadData, error: uploadError } = await this.supabase.storage
        .from(this.PROFILE_PICTURE_BUCKET)
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false,
          contentType: file.type,
        });

      if (uploadError) return { url: null, error: uploadError.message };
      const publicUrl = this.getProfilePictureUrl(uploadData.path);
      return { url: publicUrl, error: null };
    } catch {
      return { url: null, error: "Failed to upload profile picture" };
    }
  }

  static async deleteProfilePicture(url: string | null): Promise<{ error: string | null }> {
    try {
      if (!url) return { error: null };

      const urlObj = new URL(url);
      const filePath = urlObj.pathname.split(`/storage/v1/object/public/${this.PROFILE_PICTURE_BUCKET}/`)[1];

      if (!filePath) {
        return { error: "Invalid profile picture URL" };
      }

      const { error } = await this.supabase.storage
        .from(this.PROFILE_PICTURE_BUCKET)
        .remove([filePath]);

      if (error) return { error: error.message };
      return { error: null };
    } catch {
      return { error: "Failed to delete profile picture" };
    }
  }

  static async updateProfileWithPicture(
    updates: ProfileUpdateInput,
    file?: File
  ): Promise<{ data: Profile | null; error: string | null }> {
    try {
      const { data: { user }, error: authError } = await this.supabase.auth.getUser();
      if (authError || !user) {
        return { data: null, error: "User not authenticated" };
      }

      let profilePictureUrl = updates.profile_picture;
      let oldPictureUrl: string | null = null;

      if (file) {
        const { data: currentProfile } = await this.supabase
          .from("profiles")
          .select("profile_picture")
          .eq("id", user.id)
          .single();

        oldPictureUrl = currentProfile?.profile_picture || null;

        const { url, error: uploadError } = await this.uploadProfilePicture(file);
        if (uploadError) return { data: null, error: uploadError };
        profilePictureUrl = url ?? "";
      }

      const { data, error } = await this.supabase
        .from("profiles")
        .update({
          ...updates,
          profile_picture: profilePictureUrl,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id)
        .select()
        .single();

      if (error) return { data: null, error: error.message };

      if (oldPictureUrl && file) {
        await this.deleteProfilePicture(oldPictureUrl);
      }

      return { data: data as Profile, error: null };
    } catch (err) {
      return { 
        data: null, 
        error: err instanceof Error ? err.message : "Failed to update profile with picture" 
      };
    }
  }

  static getProfilePictureUrl(path: string | null): string | null {
    if (!path) return null;
    try {
      const { data } = this.supabase.storage
        .from(this.PROFILE_PICTURE_BUCKET)
        .getPublicUrl(path);
      return data.publicUrl;
    } catch {
      return null;
    }
  }

  static getBannerUrl(path: string): string {
    try {
      const { data } = this.supabase.storage
        .from(this.BANNER_BUCKET)
        .getPublicUrl(path);
      return data.publicUrl;
    } catch {
      return "";
    }
  }

  static async uploadBanner(file: File): Promise<{ url: string | null; error: string | null }> {
    try {
      const { data: { user }, error: authError } = await this.supabase.auth.getUser();
      if (authError || !user) {
        return { url: null, error: "User not authenticated" };
      }

      if (!this.ALLOWED_FILE_TYPES.includes(file.type)) {
        return { url: null, error: "Only JPEG, PNG, and WebP images are allowed" };
      }

      if (file.size > this.MAX_FILE_SIZE) {
        return { url: null, error: "Image size must be less than 5MB" };
      }

      const fileExt = file.name.split(".").pop()?.toLowerCase() || 'jpg';
      const fileName = `user_${user.id}/banner_${Date.now()}.${fileExt}`;

      const { data: uploadData, error: uploadError } = await this.supabase.storage
        .from(this.BANNER_BUCKET)
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false,
          contentType: file.type,
        });

      if (uploadError) return { url: null, error: uploadError.message };
      const publicUrl = this.getBannerUrl(uploadData.path);
      return { url: publicUrl, error: null };
    } catch {
      return { url: null, error: "Failed to upload banner" };
    }
  }

  static async deleteBanner(url: string | null): Promise<{ error: string | null }> {
    try {
      if (!url) return { error: null };

      const urlObj = new URL(url);
      const filePath = urlObj.pathname.split(`/storage/v1/object/public/${this.BANNER_BUCKET}/`)[1];

      if (!filePath) {
        return { error: "Invalid banner URL" };
      }

      const { error } = await this.supabase.storage
        .from(this.BANNER_BUCKET)
        .remove([filePath]);

      if (error) return { error: error.message };
      return { error: null };
    } catch {
      return { error: "Failed to delete banner" };
    }
  }

  static async updateProfileWithPictureAndBanner(
    updates: ProfileUpdateInput,
    profilePictureFile?: File,
    bannerFile?: File
  ): Promise<{ data: Profile | null; error: string | null }> {
    try {
      const { data: { user }, error: authError } = await this.supabase.auth.getUser();
      if (authError || !user) {
        return { data: null, error: "User not authenticated" };
      }

      let profilePictureUrl = updates.avatar_url;
      let bannerUrl = updates.banner_url;
      let oldPictureUrl: string | null = null;
      let oldBannerUrl: string | null = null;

      // Get current profile data for cleanup
      const { data: currentProfile } = await this.supabase
        .from("profiles")
        .select("avatar_url, banner_url")
        .eq("id", user.id)
        .single();

      // Handle profile picture upload
      if (profilePictureFile) {
        oldPictureUrl = currentProfile?.avatar_url || null;
        const { url, error: uploadError } = await this.uploadProfilePicture(profilePictureFile);
        if (uploadError) return { data: null, error: uploadError };
        profilePictureUrl = url ?? "";
      }

      // Handle banner upload
      if (bannerFile) {
        oldBannerUrl = currentProfile?.banner_url || null;
        const { url, error: uploadError } = await this.uploadBanner(bannerFile);
        if (uploadError) return { data: null, error: uploadError };
        bannerUrl = url ?? "";
      }

      const { data, error } = await this.supabase
        .from("profiles")
        .update({
          ...updates,
          avatar_url: profilePictureUrl,
          banner_url: bannerUrl,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id)
        .select()
        .single();

      if (error) return { data: null, error: error.message };

      // Clean up old files
      if (oldPictureUrl && profilePictureFile) {
        await this.deleteProfilePicture(oldPictureUrl);
      }
      if (oldBannerUrl && bannerFile) {
        await this.deleteBanner(oldBannerUrl);
      }

      return { data: data as Profile, error: null };
    } catch {
      return { data: null, error: "Failed to update profile" };
    }
  }

  private static getProfilePicturePathFromUrl(url: string): string | null {
    try {
      const urlObj = new URL(url);
      const pathParts = urlObj.pathname.split('/');
      const bucketIndex = pathParts.indexOf(this.PROFILE_PICTURE_BUCKET);
      if (bucketIndex === -1) return null;
      return pathParts.slice(bucketIndex + 1).join('/');
    } catch {
      return null;
    }
  }
}

// Server-side functions for SSR and server components
export async function getProfileById(profileId: string) {
  const supabase = await createServerClient();
  
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
    const profile: ProfileType = {
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
      firstName: data.firstName || null,
      lastName: data.lastName || null
    };
    
    return { profile, error: null };
  } catch (selectError) {
    console.error('Error in getProfileById:', selectError);
    return { profile: null, error: { message: 'Failed to fetch profile' } };
  }
}

export async function getCurrentAuthenticatedUser() {
    const supabase = await createServerClient();
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user) {
        return { user: null, error: error?.message || 'User not authenticated.' };
    }

    return { user, error: null };
}
