"use client"

import { Download, Eye, Trash2, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { UploadButton } from "./UploadButton"
import { DocumentService } from "@/app/services/document/document-service"
import { toast } from "sonner"
import type { Document } from "@/types/documents"

interface DocumentActionsProps {
  document: Document
  onDeleteClick: (document: Document) => void
  onReplaceSuccess?: (document: Document) => void
  showReplace?: boolean
}

export function DocumentActions({
  document,
  onDeleteClick,
  onReplaceSuccess,
  showReplace = false,
}: DocumentActionsProps) {
  const handleView = () => {
    if (document.file_url) {
      window.open(document.file_url, "_blank")
    }
  }

  const handleDownload = async () => {
    try {
      const isPrivate = document.privacy === "private"
      await DocumentService.downloadFile(document.file_url, document.file_name, isPrivate)
      toast.success(`Downloaded ${document.title}`)
    } catch (error) {
      console.error("Download error:", error)
      toast.error(error instanceof Error ? error.message : "Download failed")
    }
  }

  return (
    <div className="flex items-center space-x-2 flex-shrink-0">
      <Button variant="outline" size="sm" onClick={handleView} className="text-xs h-7 bg-transparent">
        <Eye className="h-3 w-3 mr-1" />
        View
      </Button>

      <Button variant="outline" size="sm" onClick={handleDownload} className="text-xs h-7 bg-transparent">
        <Download className="h-3 w-3 mr-1" />
        Download
      </Button>

      {showReplace && (
        <UploadButton
          projectId={document.project_id}
          title={document.title}
          isPrivate={document.privacy === "private"}
          onUploadSuccess={onReplaceSuccess}
          acceptedTypes=".pdf,.doc,.docx,.txt,.xls,.xlsx,.ppt,.pptx"
          maxSize={25}
          className="text-xs h-7"
          isPredefined={false}
        >
          Replace
        </UploadButton>
      )}

      <Button
        variant="outline"
        size="sm"
        onClick={() => onDeleteClick(document)}
        className="text-xs h-7 bg-transparent text-red-600 hover:text-red-700 hover:bg-red-50"
      >
        <Trash2 className="h-3 w-3 mr-1" />
        Delete
      </Button>
    </div>
  )
}
