"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { DocumentInfo } from "./DocumentInfo"
import { DocumentActions } from "./DocumentActions"
import { DeleteDocumentDialog } from "./DeleteDocumentDialog"
import type { Document } from "@/types/documents"

interface DocumentsSectionProps {
  title: string
  documents: Document[]
  onDocumentDelete?: () => void
  onDocumentReplace?: () => void
}

export function DocumentsSection({ title, documents, onDocumentDelete, onDocumentReplace }: DocumentsSectionProps) {
  const [documentToDelete, setDocumentToDelete] = useState<Document | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  const handleDeleteClick = (document: Document) => {
    setDocumentToDelete(document)
    setDeleteDialogOpen(true)
  }

  const handleDeleteSuccess = () => {
    if (onDocumentDelete) {
      onDocumentDelete()
    }
  }

  const handleReplaceSuccess = () => {
    if (onDocumentReplace) {
      onDocumentReplace()
    }
  }

  if (documents.length === 0) {
    return null
  }

  return (
    <>
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <div className="space-y-3">
          {documents.map((document) => (
            <Card key={document.id} className="border-border bg-card hover:bg-card/80 transition-colors">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <DocumentInfo document={document} />
                  <DocumentActions
                    document={document}
                    onDeleteClick={handleDeleteClick}
                    onReplaceSuccess={handleReplaceSuccess}
                    showReplace={true}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <DeleteDocumentDialog
        document={documentToDelete}
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onDeleteSuccess={handleDeleteSuccess}
      />
    </>
  )
}
