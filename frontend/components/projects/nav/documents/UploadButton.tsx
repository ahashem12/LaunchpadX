"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Upload, FileText, X, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { DocumentService } from "@/app/services/document/document-service"
import { toast } from "sonner"
import type { Document } from "@/types/documents"

interface UploadButtonProps {
  projectId: string
  title: string
  isPrivate?: boolean
  onUploadSuccess?: (document: Document) => void
  acceptedTypes?: string
  maxSize?: number
  className?: string
  children?: React.ReactNode
  isPredefined?: boolean
  disabled?: boolean
}

export function UploadButton({
  projectId,
  title,
  isPrivate = false,
  onUploadSuccess,
  acceptedTypes = ".pdf,.doc,.docx,.txt",
  maxSize = 10,
  className = "",
  children = "Upload",
  isPredefined = true,
  disabled = false,
}: UploadButtonProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file size
    if (file.size > maxSize * 1024 * 1024) {
      toast.error(`File size must be less than ${maxSize}MB`)
      return
    }

    // Validate file type
    const fileExtension = `.${file.name.split(".").pop()?.toLowerCase()}`
    const allowedTypes = acceptedTypes.split(",").map((type) => type.trim().toLowerCase())
    if (!allowedTypes.includes(fileExtension)) {
      toast.error(`File type not supported. Allowed types: ${acceptedTypes}`)
      return
    }

    // Validate title for non-predefined documents
    if (!isPredefined && !title.trim()) {
      toast.error("Document title is required")
      return
    }

    setSelectedFile(file)
    await handleUpload(file)
  }

  const handleUpload = async (file: File) => {
    setIsUploading(true)
    setUploadProgress(0)

    try {
      // Simulate progress for better UX
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 80) {
            clearInterval(progressInterval)
            return 80
          }
          return prev + 20
        })
      }, 300)

      const privacy = isPrivate ? "private" : "public"
      const document = await DocumentService.replaceDocument(projectId, title.trim(), file, privacy)

      clearInterval(progressInterval)
      setUploadProgress(100)

      toast.success(`${title} uploaded successfully!`)

      if (onUploadSuccess) {
        onUploadSuccess(document)
      }

      // Reset after success
      setTimeout(() => {
        setIsUploading(false)
        setUploadProgress(0)
        setSelectedFile(null)
        if (fileInputRef.current) {
          fileInputRef.current.value = ""
        }
      }, 1000)
    } catch (error) {
      console.error("Upload error:", error)
      toast.error(error instanceof Error ? error.message : "Upload failed")
      setIsUploading(false)
      setUploadProgress(0)
      setSelectedFile(null)
    }
  }

  const handleClick = () => {
    if (disabled || isUploading) return

    if (!isPredefined && !title.trim()) {
      toast.error("Please enter a document title first")
      return
    }

    fileInputRef.current?.click()
  }

  const cancelUpload = () => {
    setIsUploading(false)
    setUploadProgress(0)
    setSelectedFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const isButtonDisabled = disabled || isUploading || (!isPredefined && !title.trim())

  if (isUploading) {
    return (
      <div className="space-y-2 min-w-[120px]">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FileText className="h-3 w-3" />
            <span className="text-xs font-medium truncate max-w-[80px]">{selectedFile?.name}</span>
          </div>
          <Button variant="ghost" size="sm" onClick={cancelUpload} className="h-4 w-4 p-0">
            <X className="h-2 w-2" />
          </Button>
        </div>
        <Progress value={uploadProgress} className="h-1" />
        <p className="text-xs text-muted-foreground">{uploadProgress < 100 ? `${uploadProgress}%` : "Done!"}</p>
      </div>
    )
  }

  return (
    <>
      <Button variant="outline" size="sm" onClick={handleClick} disabled={isButtonDisabled} className={className}>
        {isUploading ? (
          <>
            <Loader2 className="h-3 w-3 mr-1 animate-spin" />
            Uploading...
          </>
        ) : (
          <>
            <Upload className="h-3 w-3 mr-1" />
            {children}
          </>
        )}
      </Button>

      <input ref={fileInputRef} type="file" accept={acceptedTypes} onChange={handleFileSelect} className="hidden" />
    </>
  )
}
