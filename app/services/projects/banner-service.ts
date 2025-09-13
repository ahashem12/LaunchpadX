import { createClient } from "@/lib/supabase/client";

export class ProjectBannerService {
  private static supabase = createClient();
  private static readonly BUCKET_NAME = "public-documents"; // Use existing bucket
  private static readonly MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  private static readonly ALLOWED_FILE_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
    "image/gif",
  ];

  /**
   * Upload a banner image for a project
   * For development: converts image to base64 data URL for direct storage
   */
  static async uploadBanner(
    file: File,
    projectId: string
  ): Promise<{ url: string | null; error: string | null }> {
    try {
      // Validate file type
      if (!this.ALLOWED_FILE_TYPES.includes(file.type)) {
        return {
          url: null,
          error: "Only JPEG, PNG, WebP, and GIF images are allowed",
        };
      }

      // Validate file size
      if (file.size > this.MAX_FILE_SIZE) {
        return { url: null, error: "Image size must be less than 5MB" };
      }

      // Convert file to base64 data URL for direct storage in database
      const dataUrl = await this.fileToDataUrl(file);
      return { url: dataUrl, error: null };
    } catch (error) {
      console.error("Banner upload error:", error);
      return { url: null, error: "Failed to process banner image" };
    }
  }

  /**
   * Convert file to data URL
   */
  private static fileToDataUrl(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  /**
   * Get the public URL for a banner image
   */
  static getBannerUrl(path: string): string {
    const { data } = this.supabase.storage
      .from(this.BUCKET_NAME)
      .getPublicUrl(path);

    return data.publicUrl;
  }

  /**
   * Delete a banner image from storage
   */
  static async deleteBanner(
    bannerUrl: string
  ): Promise<{ success: boolean; error: string | null }> {
    try {
      // Extract path from URL
      const url = new URL(bannerUrl);
      const pathParts = url.pathname.split("/");
      const filePath = pathParts.slice(-2).join("/"); // Get the last two parts (folder/filename)

      const { error } = await this.supabase.storage
        .from(this.BUCKET_NAME)
        .remove([filePath]);

      if (error) {
        console.warn("Storage delete warning:", error.message);
        return { success: false, error: error.message };
      }

      return { success: true, error: null };
    } catch (error) {
      console.warn("Failed to delete banner from storage:", error);
      return { success: false, error: "Failed to delete banner" };
    }
  }
}
