"use client"

import { useState } from "react"
import { AlertCircle } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { DocumentService } from "@/app/services/document/document-service"
import { useToast } from "@/hooks/use-toast"
import type { Document } from "@/types/documents"

interface DeleteDocumentDialogProps {
  document: Document | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onDeleteSuccess?: () => void
}

export function DeleteDocumentDialog({ document, open, onOpenChange, onDeleteSuccess }: DeleteDocumentDialogProps) {
  const { toast } = useToast()
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDeleteConfirm = async () => {
    if (!document) return

    try {
      setIsDeleting(true)
      await DocumentService.deleteDocument(document.id)
      toast({ title: "Success", description: `${document.title} deleted successfully` })

      if (onDeleteSuccess) {
        onDeleteSuccess()
      }

      onOpenChange(false)
    } catch (error) {
      console.error("Delete error:", error)
      toast({ title: "Error", description: error instanceof Error ? error.message : "Failed to delete document", variant: "destructive" })
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center space-x-2">
            <AlertCircle className="h-5 w-5 text-red-500" />
            <span>Delete Document</span>
          </AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete "{document?.title}"? This action cannot be undone and the file will be
            permanently removed from storage.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDeleteConfirm}
            disabled={isDeleting}
            className="bg-red-600 hover:bg-red-700"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
