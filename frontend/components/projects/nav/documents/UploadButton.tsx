"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Upload, FileText, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { toast } from "sonner"

interface UploadButton {
  onUpload?: (file: File) => Promise<void>
  acceptedTypes?: string
  maxSize?: number // in MB
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg"
  className?: string
  children?: React.ReactNode
}

export function UploadButton({
  onUpload,
  acceptedTypes = ".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg",
  maxSize = 10,
  variant = "outline",
  size = "sm",
  className = "",
  children,
}: UploadButton) {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file size
    if (file.size > maxSize * 1024 * 1024) {
      toast.error(`File size must be less than ${maxSize}MB`)
      return
    }

    // Validate file type
    const fileExtension = "." + file.name.split(".").pop()?.toLowerCase()
    if (!acceptedTypes.includes(fileExtension)) {
      toast.error(`File type not supported. Accepted types: ${acceptedTypes}`)
      return
    }

    setSelectedFile(file)
    handleUpload(file)
  }

  const handleUpload = async (file: File) => {
    setIsUploading(true)
    setUploadProgress(0)

    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return prev + 10
        })
      }, 200)

      // Call the upload function if provided
      if (onUpload) {
        await onUpload(file)
      } else {
        // Simulate upload delay for demo
        await new Promise((resolve) => setTimeout(resolve, 2000))
      }

      clearInterval(progressInterval)
      setUploadProgress(100)

      toast.success(`${file.name} uploaded successfully!`)

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
      toast.error("Upload failed. Please try again.")
      setIsUploading(false)
      setUploadProgress(0)
      setSelectedFile(null)
    }
  }

  const handleButtonClick = () => {
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
      <input ref={fileInputRef} type="file" accept={acceptedTypes} onChange={handleFileSelect} className="hidden" />
      <Button variant={variant} size={size} onClick={handleButtonClick} className={`${className}`}>
        <Upload className="h-3 w-3 mr-1" />
        {children || "Upload"}
      </Button>
    </>
  )
}
