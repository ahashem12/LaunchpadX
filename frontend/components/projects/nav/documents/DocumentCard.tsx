"use client"

import { FileText, Download, Eye, Sparkles } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { UploadButton } from "./UploadButton"
import type { PredefinedDocument } from "@/types/documents"
import { toast } from "sonner"
import { DocumentService } from "@/app/services/document/document-service"
import { useState, useEffect } from "react"

interface DocumentCardProps {
  document: PredefinedDocument
  projectId: string
  onUploadSuccess?: () => void
}

export function DocumentCard({ document, projectId, onUploadSuccess }: DocumentCardProps) {
  const [uploadedDoc, setUploadedDoc] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadDocument()
  }, [document.name, projectId])

  const loadDocument = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const doc = await DocumentService.getDocumentByTitle(projectId, document.name)
      setUploadedDoc(doc)
    } catch (error) {
      console.error("Failed to load document:", error)
      setError(error instanceof Error ? error.message : "Failed to load document")
    } finally {
      setIsLoading(false)
    }
  }

  const handleUploadSuccess = (uploadedDocument: any) => {
    setUploadedDoc(uploadedDocument)
    setError(null)
    if (onUploadSuccess) {
      onUploadSuccess()
    }
  }

  const handleGenerateWithAI = () => {
    toast.info(`Generating ${document.name} with AI...`)
  }

  const handleView = () => {
    if (uploadedDoc?.file_url) {
      window.open(uploadedDoc.file_url, "_blank")
    }
  }

  const handleDownload = async () => {
    if (uploadedDoc?.file_url && uploadedDoc?.file_name) {
      try {
        const isPrivate = uploadedDoc.privacy === "private"
        await DocumentService.downloadFile(uploadedDoc.file_url, uploadedDoc.file_name, isPrivate)
        toast.success(`Downloaded ${document.name}`)
      } catch (error) {
        console.error("Download error:", error)
        toast.error(error instanceof Error ? error.message : "Download failed")
      }
    }
  }

  const hasDocument = uploadedDoc && uploadedDoc.file_url

  if (isLoading) {
    return (
      <Card className="border-border bg-card">
        <CardContent className="p-4">
          <div className="animate-pulse">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-full bg-muted">
                <div className="h-5 w-5 bg-gray-300 rounded"></div>
              </div>
              <div>
                <div className="h-4 bg-gray-300 rounded w-24 mb-1"></div>
                <div className="h-3 bg-gray-200 rounded w-16"></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="border-border bg-card border-red-200">
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-full bg-red-100">
              <FileText className="h-5 w-5 text-red-500" />
            </div>
            <div>
              <h4 className="font-medium text-foreground">{document.name}</h4>
              <p className="text-xs text-red-500">Error: {error}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-border bg-card hover:bg-card/80 transition-colors">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-full bg-muted">
              <FileText className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <h4 className="font-medium text-foreground">{document.name}</h4>
              <p className="text-xs text-muted-foreground">{hasDocument ? "Uploaded" : "Not uploaded"}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {document.canGenerate && !hasDocument && (
              <Button variant="outline" size="sm" className="text-xs h-7 bg-transparent" onClick={handleGenerateWithAI}>
                <Sparkles className="h-3 w-3 mr-1" />
                Generate
              </Button>
            )}

            <UploadButton
              projectId={projectId}
              title={document.name}
              isPrivate={["Business Plan", "Pitchdeck"].includes(document.name)}
              onUploadSuccess={handleUploadSuccess}
              acceptedTypes=".pdf,.doc,.docx,.txt"
              maxSize={10}
              className="text-xs h-7"
              isPredefined={true}
            >
              {hasDocument ? "Replace" : "Upload"}
            </UploadButton>

            {hasDocument && (
              <>
                <Button variant="outline" size="sm" onClick={handleView} className="text-xs h-7 bg-transparent">
                  <Eye className="h-3 w-3 mr-1" />
                  View
                </Button>
                <Button variant="outline" size="sm" onClick={handleDownload} className="text-xs h-7 bg-transparent">
                  <Download className="h-3 w-3 mr-1" />
                  Download
                </Button>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
