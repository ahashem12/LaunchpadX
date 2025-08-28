"use client"

import { useState, useRef, useEffect } from "react"
import type React from "react"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Upload, X, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

interface ProfilePictureSectionProps {
  avatarUrl: string | null;
  onFileSelect: (file: File) => void;
  onRemove: () => void;
  hasImage: boolean;
  isEditable?: boolean;
}

export function ProfilePictureSection({
  avatarUrl,
  onFileSelect,
  onRemove,
  hasImage,
  isEditable = true,
}: ProfilePictureSectionProps) {
  const [isDragOver, setIsDragOver] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  // Cleanup preview URL when component unmounts or when avatarUrl changes
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
      }
    }
  }, [])

  // Cleanup old preview URL when avatarUrl changes (e.g., after successful save)
  useEffect(() => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
      setPreviewUrl(null)
    }
  }, [avatarUrl])

  const validateFile = (file: File): string | null => {
    const maxSize = 5 * 1024 * 1024 // 5MB
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"]

    if (!allowedTypes.includes(file.type)) {
      return "Please upload a valid image file (JPEG, PNG, or WebP)"
    }

    if (file.size > maxSize) {
      return "File size must be less than 5MB"
    }

    return null
  }

  const handleFileSelect = (file: File) => {
    const validationError = validateFile(file)
    if (validationError) {
      toast({
        variant: "destructive",
        title: "Invalid file",
        description: validationError,
      })
      return
    }

    // Cleanup previous preview URL
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
    }

    // Create new preview URL for immediate display
    const newPreviewUrl = URL.createObjectURL(file)
    setPreviewUrl(newPreviewUrl)

    onFileSelect(file)
    toast({
      title: "Image selected",
      description: "Click 'Save Changes' to update your profile picture.",
    })
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const handleRemove = () => {
    // Cleanup preview URL when removing
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
      setPreviewUrl(null)
    }

    onRemove()
    toast({
      title: "Image removed",
      description: "Click 'Save Changes' to update your profile.",
    })
  }

  const showRemoveButton = hasImage && (previewUrl || (avatarUrl && avatarUrl !== "")) && isEditable;

  return (
    <div className="xl:col-span-1">
      <div className="bg-card rounded-lg border p-6 space-y-6">
        <div>
          <h3 className="text-lg font-semibold">Profile Picture</h3>
          {isEditable && (
            <p className="text-sm text-muted-foreground mt-1">Update your profile photo</p>
          )}
        </div>

        <div className="space-y-4">
          <div className="flex justify-center">
            <div className="relative group">
              <Avatar className="h-32 w-32 border-4 border-background shadow-lg">
                <AvatarImage 
                  src={previewUrl || avatarUrl || "/images/default-avatar.png"} 
                  alt="Profile picture" 
                  className={(previewUrl || avatarUrl) ? "object-cover" : "hidden"}
                />
                <AvatarFallback className="bg-muted">
                  <User className="h-12 w-12 text-muted-foreground" />
                </AvatarFallback>
              </Avatar>

              {showRemoveButton && (
                <Button
                  size="sm"
                  variant="destructive"
                  className="absolute -top-2 -right-2 h-8 w-8 rounded-full p-0 shadow-lg"
                  onClick={handleRemove}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          {isEditable && (
            <>
              <div
                className={cn(
                  "border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer",
                  isDragOver ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-primary/50",
                )}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={triggerFileInput}
              >
                <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm font-medium mb-1">Click to upload or drag and drop</p>
                <p className="text-xs text-muted-foreground">PNG, JPG, GIF up to 5MB</p>
              </div>

              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleInputChange} className="hidden" />

              <Button onClick={triggerFileInput} variant="outline" className="w-full bg-transparent">
                <Upload className="h-4 w-4 mr-2" />
                Choose Image
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
