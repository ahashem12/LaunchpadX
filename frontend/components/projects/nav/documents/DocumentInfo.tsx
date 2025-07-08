"use client"

import { FileText } from "lucide-react"
import type { Document } from "@/types/documents"

interface DocumentInfoProps {
  document: Document
  showPrivacyBadge?: boolean
}

export function DocumentInfo({ document, showPrivacyBadge = false }: DocumentInfoProps) {
  const formatFileSize = (bytes?: number) => {
    if (!bytes) return "Unknown size"
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(1024))
    return Math.round((bytes / Math.pow(1024, i)) * 100) / 100 + " " + sizes[i]
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div className="flex items-center space-x-3 flex-1 min-w-0">
      <div className="p-2 rounded-full bg-muted flex-shrink-0">
        <FileText className="h-5 w-5 text-muted-foreground" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-2 mb-1">
          <h4 className="font-medium text-foreground truncate">{document.title}</h4>
        </div>
        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
          <span>{document.file_name}</span>
          <span>•</span>
          <span>{formatFileSize(document.file_size)}</span>
          <span>•</span>
          <span>Uploaded {formatDate(document.created_at)}</span>
        </div>
      </div>
    </div>
  )
}
