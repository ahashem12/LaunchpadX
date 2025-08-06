"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { DocumentCard } from "./DocumentCard"
import { DocumentsSection } from "./DocumentsSection"
import { PrivateDocumentsUpload } from "./PrivateDocumentsUpload"
import type { Document, PredefinedDocument } from "@/types/documents"
import { DocumentService } from "@/app/services/document/document-service"
import { useToast } from "@/hooks/use-toast"

export function Documents() {
  const { toast } = useToast()
  const params = useParams()
  const projectId = params?.id as string

  const [documents, setDocuments] = useState<Document[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Predefined documents that users can upload to
  const predefinedDocuments: PredefinedDocument[] = [
    {
      id: "1",
      name: "Business Plan",
      type: "business-plan",
      canGenerate: true,
      project_id: projectId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "2",
      name: "Pitchdeck",
      type: "pitchdeck",
      canGenerate: false,
      project_id: projectId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ]

  const loadDocuments = async () => {
    if (!projectId) return

    try {
      setIsLoading(true)
      const docs = await DocumentService.getProjectDocuments(projectId)
      setDocuments(docs)
    } catch (error) {
      console.error("Failed to load documents:", error)
      toast({ title: "Error", description: "Failed to load documents", variant: "destructive" })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadDocuments()
  }, [projectId])

  const handleUploadSuccess = () => {
    loadDocuments() // Refresh the document list
  }

  const handleDocumentDelete = () => {
    loadDocuments() // Refresh the document list
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            <div className="h-16 bg-gray-200 rounded"></div>
            <div className="h-16 bg-gray-200 rounded"></div>
            <div className="h-16 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  // Filter out predefined documents from the uploaded documents list
  const predefinedTitles = predefinedDocuments.map((doc) => doc.name)
  const customDocuments = documents.filter((doc) => !predefinedTitles.includes(doc.title))

  // Separate public and private custom documents
  const publicDocuments = customDocuments.filter((doc) => !doc.privacy || doc.privacy === "public")
  const privateDocuments = customDocuments.filter((doc) => doc.privacy === "private")

  return (
    <div className="space-y-8">
      {/* Predefined Documents Section */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-foreground">Documentation</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {predefinedDocuments.map((doc) => (
            <DocumentCard key={doc.id} document={doc} projectId={projectId} onUploadSuccess={handleUploadSuccess} />
          ))}
        </div>
      </div>

      {/* Public Documents Section */}
      <DocumentsSection title="Public Documents" documents={publicDocuments} onDocumentDelete={handleDocumentDelete} />

      {/* Private Documents Section */}
      <DocumentsSection
        title="Private Documents"
        documents={privateDocuments}
        onDocumentDelete={handleDocumentDelete}
      />

      {/* Upload New Document Section */}
      <PrivateDocumentsUpload projectId={projectId} onUploadSuccess={handleUploadSuccess} />
    </div>
  )
}
