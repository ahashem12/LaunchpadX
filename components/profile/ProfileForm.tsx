"use client"

import { useState, useEffect } from "react"
import { ProfileService } from "@/app/services/profile/profile-service"
import { useToast } from "@/hooks/use-toast"
import type { ProfileData } from "@/types/profile"
import { ProfileLoading } from "./ProfileLoading"
import { ProfileHeader } from "./ProfileHeader"
import { ProfilePictureSection } from "./ProfilePictureSection"
import { PersonalInfoSection } from "./PersonalInfoSection"
import { SkillsSection } from "./SkillsSection"
import { WalletSection } from "./WalletSection"
import { ProfileActions } from "./ProfileActions"

export function ProfileForm() {
  const [profile, setProfile] = useState<ProfileData | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Form state
  const [formData, setFormData] = useState({
    username: "",
    skills: [] as string[],
    profile_picture: "",
  })

  // Track changes
  const [originalData, setOriginalData] = useState({
    username: "",
    skills: [] as string[],
    profile_picture: "",
  })

  // Profile picture state
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string>("")
  const [isImageDeleted, setIsImageDeleted] = useState(false)

  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})
  const { toast } = useToast()

  useEffect(() => {
    loadProfile()
  }, [])

  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl)
      }
    }
  }, [previewUrl])

  const loadProfile = async () => {
    try {
      setLoading(true)
      setError(null)

      const { data, error } = await ProfileService.getCurrentUserProfile()

      if (error) {
        setError(error)
        return
      }

      if (data) {
        const profileData = {
          username: data.username || "",
          skills: data.skills || [],
          profile_picture: data.profile_picture || "",
        }

        setProfile(data)
        setFormData(profileData)
        setOriginalData(profileData)
        setIsImageDeleted(false)
        setSelectedFile(null)
        setPreviewUrl("")
      }
    } catch {
      setError("Failed to load profile")
    } finally {
      setLoading(false)
    }
  }

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {}

    if (!formData.username.trim()) {
      errors.username = "Username is required"
    } else if (formData.username.length < 2) {
      errors.username = "Username must be at least 2 characters"
    } else if (formData.username.length > 50) {
      errors.username = "Username must be less than 50 characters"
    }

    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const hasChanges = (): boolean => {
    return (
      formData.username !== originalData.username ||
      JSON.stringify(formData.skills) !== JSON.stringify(originalData.skills) ||
      selectedFile !== null ||
      isImageDeleted
    )
  }

  const handleSave = async () => {
    if (!validateForm()) return

    if (!hasChanges()) {
      toast({
        title: "No changes to save",
        description: "Your profile is already up to date.",
      })
      return
    }

    try {
      setSaving(true)
      setError(null)

      let finalProfilePicture = formData.profile_picture

      // Handle profile picture deletion
      if (isImageDeleted && originalData.profile_picture) {
        const { error: deleteError } = await ProfileService.deleteProfilePicture(originalData.profile_picture)
        if (deleteError) {
          throw new Error(deleteError)
        }
        finalProfilePicture = ""
      }

      // Handle new profile picture upload
      if (selectedFile) {
        // If there was an old image and we're replacing it, delete it first
        if (originalData.profile_picture && !isImageDeleted) {
          await ProfileService.deleteProfilePicture(originalData.profile_picture)
        }

        const { url, error } = await ProfileService.uploadProfilePicture(selectedFile)
        if (error) throw new Error(error)
        if (url) finalProfilePicture = url
      }

      const { data, error } = await ProfileService.updateProfile({
        username: formData.username,
        skills: formData.skills,
        profile_picture: finalProfilePicture,
      })

      if (error) throw new Error(error)

      if (data) {
        const updatedData = {
          username: data.username || "",
          skills: data.skills || [],
          profile_picture: data.profile_picture || "",
        }

        setProfile(data)
        setFormData(updatedData)
        setOriginalData(updatedData)
        setSelectedFile(null)
        setIsImageDeleted(false)
        if (previewUrl && previewUrl.startsWith("blob:")) {
          URL.revokeObjectURL(previewUrl)
        }
        setPreviewUrl("")

        toast({
          title: "Profile updated",
          description: "Your changes have been saved successfully.",
        })
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to update profile"
      setError(errorMessage)
      toast({
        variant: "destructive",
        title: "Update failed",
        description: errorMessage,
      })
    } finally {
      setSaving(false)
    }
  }

  const handleDiscard = () => {
    setFormData(originalData)
    setSelectedFile(null)
    setIsImageDeleted(false)
    if (previewUrl && previewUrl.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrl)
    }
    setPreviewUrl("")
    setValidationErrors({})

    toast({
      title: "Changes discarded",
      description: "All changes have been reverted.",
    })
  }

  const handleFileSelect = (file: File) => {
    setSelectedFile(file)
    setIsImageDeleted(false)
    if (previewUrl && previewUrl.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrl)
    }
    setPreviewUrl(URL.createObjectURL(file))
  }

  const handleImageRemove = () => {
    setSelectedFile(null)
    setIsImageDeleted(true)
    if (previewUrl && previewUrl.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrl)
    }
    setPreviewUrl("")
  }

  const getCurrentImageUrl = () => {
    if (previewUrl) return previewUrl
    if (isImageDeleted) return ""
    return formData.profile_picture || ""
  }

  const hasCurrentImage = () => {
    if (previewUrl) return true
    if (isImageDeleted) return false
    return !!formData.profile_picture
  }

  if (loading) {
    return <ProfileLoading />
  }

  if (error && !profile) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center p-6">
        <div className="text-center space-y-4 max-w-md">
          <div className="text-destructive text-lg font-medium">Failed to load profile</div>
          <p className="text-muted-foreground">{error}</p>
          <button onClick={loadProfile} className="px-4 py-2 bg-primary text-primary-foreground rounded-md">
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full bg-background">
      <div className="container mx-auto">
        <ProfileHeader error={error} />

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          <ProfilePictureSection
            currentUrl={getCurrentImageUrl()}
            onFileSelect={handleFileSelect}
            onRemove={handleImageRemove}
            hasImage={hasCurrentImage()}
          />

          <div className="xl:col-span-2 space-y-6">
            <PersonalInfoSection
              username={formData.username}
              email={profile?.email || ""}
              validationErrors={validationErrors}
              onUsernameChange={(username) => setFormData((prev) => ({ ...prev, username }))}
            />

            <SkillsSection
              skills={formData.skills}
              onChange={(skills) => setFormData((prev) => ({ ...prev, skills }))}
            />
          </div>

          <div className="xl:col-span-1 space-y-6">
            <WalletSection walletAddress={profile?.wallet_address || ""} />

            <ProfileActions onSave={handleSave} onDiscard={handleDiscard} saving={saving} hasChanges={hasChanges()} />
          </div>
        </div>
      </div>
    </div>
  )
}