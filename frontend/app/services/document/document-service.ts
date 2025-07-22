import { createClient } from "@/lib/supabase/client"
import type { Document, DocumentCreateInput } from "@/types/documents"

const supabase = createClient()

export class DocumentService {
  /**
   * Upload file to Supabase Storage (now supports private/public)
   */
  static async uploadFile(
    file: File,
    projectId: string,
    privacy: "private" | "public" = "public",
  ): Promise<{ url: string; path: string }> {
    const bucketName = privacy === "private" ? "private-documents" : "public-documents"
    const fileExt = file.name.split(".").pop()
    const fileName = `${projectId}/${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`

    const { data, error } = await supabase.storage.from(bucketName).upload(fileName, file, {
      cacheControl: "3600",
      upsert: false,
      contentType: file.type,
    })

    if (error) {
      console.error("Upload error:", error)
      throw new Error(`Upload failed: ${error.message}`)
    }

    let url: string
    if (privacy === "private") {
      const { data: signedUrl } = await supabase.storage.from(bucketName).createSignedUrl(data.path, 3600) // 1 hour expiry
      url = signedUrl?.signedUrl || ""
    } else {
      const {
        data: { publicUrl },
      } = supabase.storage.from(bucketName).getPublicUrl(data.path)
      url = publicUrl
    }

    return {
      url,
      path: data.path,
    }
  }

  /**
   * Create document record in database
   */
  static async createDocument(input: DocumentCreateInput): Promise<Document> {
    const { data, error } = await supabase
      .from("documents")
      .insert({
        project_id: input.project_id,
        title: input.title,
        file_url: input.file_url,
        file_name: input.file_name,
        file_size: input.file_size,
        file_type: input.file_type,
        privacy: input.privacy,
      })
      .select()
      .single()

    if (error) {
      throw new Error(`Failed to create document: ${error.message}`)
    }

    return {
      id: data.id,
      project_id: data.project_id,
      title: data.title,
      file_url: data.file_url,
      file_name: data.file_name,
      file_size: data.file_size,
      file_type: data.file_type,
      privacy: data.privacy,
      created_at: data.created_at,
      updated_at: data.updated_at,
    }
  }

  /**
   * Replace existing document or create new one
   * This method ensures only one document exists per title per project
   */
  static async replaceDocument(
    projectId: string,
    title: string,
    file: File,
    privacy: "private" | "public" = "public",
  ): Promise<Document> {
    try {
      // 1. Check if document with this title already exists
      const existingDoc = await this.getDocumentByTitle(projectId, title)

      // 2. Upload new file
      const { url } = await this.uploadFile(file, projectId, privacy)

      if (existingDoc) {
        // 3. If document exists, delete old file from storage first
        await this.deleteFileFromStorage(existingDoc.file_url, existingDoc.privacy)

        // 4. Update existing record with new file details
        const { data, error } = await supabase
          .from("documents")
          .update({
            file_url: url,
            file_name: file.name,
            file_size: file.size,
            file_type: file.type,
            privacy: privacy, // Allow privacy to be updated
            updated_at: new Date().toISOString(),
          })
          .eq("id", existingDoc.id)
          .select()
          .single()

        if (error) {
          throw new Error(`Failed to update document: ${error.message}`)
        }

        return {
          id: data.id,
          project_id: data.project_id,
          title: data.title,
          file_url: data.file_url,
          file_name: data.file_name,
          file_size: data.file_size,
          file_type: data.file_type,
          privacy: data.privacy,
          created_at: data.created_at,
          updated_at: data.updated_at,
        }
      } else {
        // 5. Create new document if none exists
        return this.createDocument({
          project_id: projectId,
          title: title,
          file_url: url,
          file_name: file.name,
          file_size: file.size,
          file_type: file.type,
          privacy: privacy,
        })
      }
    } catch (error) {
      console.error("Error in replaceDocument:", error)
      throw new Error(`Failed to replace document: ${error instanceof Error ? error.message : "Unknown error"}`)
    }
  }

  /**
   * Delete file from storage (helper method)
   */
  static async deleteFileFromStorage(fileUrl: string, privacy: "private" | "public"): Promise<void> {
    try {
      const bucketName = privacy === "private" ? "private-documents" : "public-documents"

      // Extract path from URL
      const url = new URL(fileUrl)
      const pathParts = url.pathname.split("/")
      const filePath = pathParts.slice(2).join("/")

      const { error } = await supabase.storage.from(bucketName).remove([filePath])

      if (error) {
        console.warn("Storage delete warning:", error.message)
      }
    } catch (error) {
      console.warn("Failed to delete file from storage:", error)
    }
  }

  /**
   * Update existing document (deprecated - use replaceDocument instead)
   */
  static async updateDocument(
    projectId: string,
    title: string,
    file: File,
    privacy: "private" | "public" = "public",
  ): Promise<Document> {
    return this.replaceDocument(projectId, title, file, privacy)
  }

  /**
   * Get documents for a project (RLS handles permissions)
   */
  static async getProjectDocuments(projectId: string): Promise<Document[]> {
    try {
      const { data, error } = await supabase
        .from("documents")
        .select("*")
        .eq("project_id", projectId)
        .order("created_at", { ascending: false })

      if (error) {
        throw new Error(`Failed to fetch documents: ${error.message}`)
      }

      return data.map((doc) => ({
        id: doc.id,
        project_id: doc.project_id,
        title: doc.title,
        file_url: doc.file_url,
        file_name: doc.file_name,
        file_size: doc.file_size,
        file_type: doc.file_type,
        privacy: doc.privacy,
        created_at: doc.created_at,
        updated_at: doc.updated_at,
      }))
    } catch (error) {
      console.error("Error fetching project documents:", error)
      throw new Error(`Failed to fetch documents: ${error instanceof Error ? error.message : "Unknown error"}`)
    }
  }

  /**
   * Get document by title
   */
  static async getDocumentByTitle(projectId: string, title: string): Promise<Document | null> {
    try {
      const { data, error } = await supabase
        .from("documents")
        .select("*")
        .eq("project_id", projectId)
        .eq("title", title)
        .maybeSingle()

      if (error) {
        if (error.code === "PGRST116") return null
        throw new Error(`Failed to fetch document: ${error.message}`)
      }

      return data
        ? {
            id: data.id,
            project_id: data.project_id,
            title: data.title,
            file_url: data.file_url,
            file_name: data.file_name,
            file_size: data.file_size,
            file_type: data.file_type,
            privacy: data.privacy,
            created_at: data.created_at,
            updated_at: data.updated_at,
          }
        : null
    } catch (error) {
      console.error("Error fetching document by title:", error)
      throw new Error(`Failed to fetch document: ${error instanceof Error ? error.message : "Unknown error"}`)
    }
  }

  /**
   * Delete document (handles both buckets)
   */
  static async deleteDocument(documentId: string): Promise<void> {
    try {
      const { data: document, error: fetchError } = await supabase
        .from("documents")
        .select("file_url, privacy")
        .eq("id", documentId)
        .single()

      if (fetchError) {
        throw new Error(`Failed to fetch document for deletion: ${fetchError.message}`)
      }

      // Delete file from storage
      await this.deleteFileFromStorage(document.file_url, document.privacy)

      // Delete from database
      const { error: deleteError } = await supabase.from("documents").delete().eq("id", documentId)

      if (deleteError) {
        throw new Error(`Failed to delete document from database: ${deleteError.message}`)
      }
    } catch (error) {
      console.error("Error deleting document:", error)
      throw new Error(`Failed to delete document: ${error instanceof Error ? error.message : "Unknown error"}`)
    }
  }

  /**
   * Download file (handles both public and private)
   */
  static async downloadFile(fileUrl: string, fileName: string, isPrivate = false): Promise<void> {
    try {
      let blob: Blob

      if (isPrivate) {
        const path = new URL(fileUrl).pathname.split("/").pop()!
        const { data, error } = await supabase.storage.from("private-documents").download(path)

        if (error) throw error
        blob = data
      } else {
        const response = await fetch(fileUrl)
        if (!response.ok) throw new Error("Download failed")
        blob = await response.blob()
      }

      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = fileName
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      throw new Error(`Download failed: ${error instanceof Error ? error.message : "Unknown error"}`)
    }
  }

  /**
   * Get secure URL for private documents
   */
  static async getDocumentUrl(documentId: string): Promise<string> {
    try {
      const { data: document, error } = await supabase
        .from("documents")
        .select("file_url, privacy, project_id")
        .eq("id", documentId)
        .single()

      if (error) throw new Error(`Document not found: ${error.message}`)
      if (document.privacy === "public") return document.file_url

      // Verify project membership
      const { count } = await supabase
        .from("project_members")
        .select("*", { count: "exact" })
        .eq("project_id", document.project_id)
        .eq("user_id", (await supabase.auth.getUser()).data.user?.id)

      if (!count || count === 0) throw new Error("Unauthorized access")

      // Generate signed URL
      const path = new URL(document.file_url).pathname.split("/").slice(2).join("/")
      const { data: signedUrl } = await supabase.storage.from("private-documents").createSignedUrl(path, 3600) // 1 hour expiry

      if (!signedUrl?.signedUrl) throw new Error("Failed to generate access URL")
      return signedUrl.signedUrl
    } catch (error) {
      console.error("Error getting document URL:", error)
      throw new Error(`Failed to get document URL: ${error instanceof Error ? error.message : "Unknown error"}`)
    }
  }
}
