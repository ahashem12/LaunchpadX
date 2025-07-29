import { createClient } from "@/lib/supabase/client";
import type { ProfileData, ProfileUpdateInput } from "@/types/profile";

export class ProfileService {
  private static supabase = createClient();
  private static readonly PROFILE_PICTURE_BUCKET = "profile-pictures";
  private static readonly ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
  private static readonly MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

  static async getCurrentUserProfile(): Promise<{ data: ProfileData | null; error: string | null }> {
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
      return { data: data as ProfileData, error: null };
    } catch {
      return { data: null, error: "Failed to fetch profile" };
    }
  }

  static async updateProfile(updates: ProfileUpdateInput): Promise<{ data: ProfileData | null; error: string | null }> {
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
      return { data: data as ProfileData, error: null };
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
  ): Promise<{ data: ProfileData | null; error: string | null }> {
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

      return { data: data as ProfileData, error: null };
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
      const { data: { publicUrl } } = this.supabase.storage
        .from(this.PROFILE_PICTURE_BUCKET)
        .getPublicUrl(path);
      return publicUrl;
    } catch {
      return null;
    }
  }
}
