import { createClient } from "@/lib/supabase/client";
import {
  FILE_UPLOAD_LIMITS,
  ALLOWED_IMAGE_TYPES,
} from "@/lib/constants/file-upload";

export class ProjectBannerService {
  private static supabase = createClient();

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
      if (!ALLOWED_IMAGE_TYPES.includes(file.type as any)) {
        return {
          url: null,
          error: "Only JPEG, PNG, WebP, and GIF images are allowed",
        };
      }

      // Validate file size
      if (file.size > FILE_UPLOAD_LIMITS.MAX_BANNER_SIZE) {
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
}
