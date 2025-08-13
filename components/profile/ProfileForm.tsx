"use client"

import { useState, useEffect } from "react"
import { ProfileService } from "@/app/services/profile/profile-service"
import { useToast } from "@/hooks/use-toast"
import type { Profile, ProfileUpdateInput } from "@/types/profile"
import { ProfileLoading } from "./ProfileLoading"
import { ProfileHeader } from "./ProfileHeader"
import { ProfilePictureSection } from "./ProfilePictureSection"
import { PersonalInfoSection } from "./PersonalInfoSection"
import { BioSection } from "./BioSection"
import { SkillsSection } from "./SkillsSection"
import { ReputationSection } from "./ReputationSection"
import { AchievementsSection } from "./AchievementsSection"
import { WalletAddressSection } from "./WalletAddressSection"
import { ProfileActions } from "./ProfileActions"
import { BannerSection } from "./BannerSection"

export function ProfileForm() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Form data state
  const [username, setUsername] = useState("")
  const [bio, setBio] = useState("")
  const [skills, setSkills] = useState<string[]>([])
  const [walletAddress, setWalletAddress] = useState<string | null>(null)

  // Track original state for changes
  const [initialState, setInitialState] = useState<Partial<Profile>>({})

  // Profile picture state
  const [newProfilePictureFile, setNewProfilePictureFile] = useState<File | null>(null)
  
  // Banner state
  const [newBannerFile, setNewBannerFile] = useState<File | null>(null)

  const { toast } = useToast()

  useEffect(() => {
    async function loadProfile() {
      try {
        setLoading(true)
        const { data, error } = await ProfileService.getCurrentUserProfile()

        if (error) throw new Error(error)

        if (data) {
          setProfile(data)
          // Set initial state for form fields and for tracking changes
          const initial = {
            username: data.username || "",
            bio: data.bio || "",
            skills: data.skills || [],
            wallet_address: data.wallet_address || null,
            avatar_url: data.avatar_url || null,
            banner_url: data.banner_url || null,
          }
          setInitialState(initial)
          setUsername(initial.username)
          setBio(initial.bio)
          setSkills(initial.skills)
          setWalletAddress(initial.wallet_address)
        }
      } catch (err: any) {
        setError(err.message)
        toast({ title: "Error loading profile", description: err.message, variant: "destructive" })
      } finally {
        setLoading(false)
      }
    }

    loadProfile()
  }, [toast])

  const isDirty =
    initialState?.username !== username ||
    initialState?.bio !== bio ||
    JSON.stringify(initialState?.skills) !== JSON.stringify(skills) ||
    initialState?.wallet_address !== walletAddress ||
    newProfilePictureFile !== null ||
    newBannerFile !== null

  const handleSave = async () => {
    if (!isDirty) return
    setSaving(true)

    const updates: ProfileUpdateInput = {
      username,
      bio,
      skills,
      wallet_address: walletAddress,
    }

    const { data, error } = await ProfileService.updateProfileWithPictureAndBanner(
      updates,
      newProfilePictureFile ?? undefined,
      newBannerFile ?? undefined
    )

    if (error) {
      toast({ title: "Error saving profile", description: error, variant: "destructive" })
    } else if (data) {
      setProfile(data)
      const newInitialState = { ...initialState, ...data };
      setInitialState(newInitialState);
      setNewProfilePictureFile(null)
      setNewBannerFile(null)
      toast({ title: "Profile saved successfully!" })
    }
    setSaving(false)
  }

  const handleDiscard = () => {
    setUsername(initialState.username || "")
    setBio(initialState.bio || "")
    setSkills(initialState.skills || [])
    setWalletAddress(initialState.wallet_address || null)
    setNewProfilePictureFile(null)
    setNewBannerFile(null)
    toast({ title: "Changes discarded" })
  }

  if (loading) return <ProfileLoading />
  if (error) return <div className="text-center text-destructive py-10">Error: {error}</div>
  if (!profile) return <div className="text-center text-muted-foreground py-10">Could not load profile.</div>

  return (
    <div className="space-y-8 max-w-5xl mx-auto py-10 px-4">
      <ProfileHeader error={error} />
      
      <BannerSection
        bannerUrl={profile.banner_url}
        onBannerChange={setNewBannerFile}
        isEditable={true}
      />

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        <ProfilePictureSection
          avatarUrl={profile.avatar_url}
          onFileSelect={setNewProfilePictureFile}
          onRemove={() => { /* TODO: Implement remove logic if needed */ }}
          hasImage={!!profile.avatar_url}
          isEditable={true}
        />

        <div className="xl:col-span-2 space-y-6">
          <PersonalInfoSection
            username={username}
            email={profile.email || ""}
            onUsernameChange={setUsername}
          />
          <BioSection bio={bio} onBioChange={setBio} isEditable={true} />
          <SkillsSection skills={skills} onChange={setSkills} />
        </div>

        <div className="xl:col-span-1 space-y-6">
          <ReputationSection reputation={profile.reputation} />
          <AchievementsSection achievements={profile.achievements} />
          <WalletAddressSection walletAddress={walletAddress} onWalletAddressChange={setWalletAddress} />
        </div>
      </div>

      <ProfileActions
        onSave={handleSave}
        onDiscard={handleDiscard}
        saving={saving}
        hasChanges={isDirty}
      />
    </div>
  )
}