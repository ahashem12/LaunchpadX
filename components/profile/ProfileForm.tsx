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
import { SocialMediaSection } from "./SocialMediaSection"
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
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [bio, setBio] = useState("")
  const [skills, setSkills] = useState<string[]>([])
  const [walletAddress, setWalletAddress] = useState<string | null>(null)
  
  // Social media state
  const [discordUrl, setDiscordUrl] = useState("")
  const [githubUrl, setGithubUrl] = useState("")
  const [linkedinUrl, setLinkedinUrl] = useState("")
  const [twitterUrl, setTwitterUrl] = useState("")
  const [telegramUrl, setTelegramUrl] = useState("")
  const [websiteUrl, setWebsiteUrl] = useState("")

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
            firstName: data.firstName || "",
            lastName: data.lastName || "",
            bio: data.bio || "",
            skills: data.skills || [],
            wallet_address: data.wallet_address || null,
            avatar_url: data.avatar_url || null,
            banner_url: data.banner_url || null,
            discordUrl: data.discordUrl || "",
            githubUrl: data.githubUrl || "",
            linkedinUrl: data.linkedinUrl || "",
            twitterUrl: data.twitterUrl || "",
            telegramUrl: data.telegramUrl || "",
            websiteUrl: data.websiteUrl || "",
          }
          setInitialState(initial)
          setFirstName(initial.firstName)
          setLastName(initial.lastName)
          setBio(initial.bio)
          setSkills(initial.skills)
          setWalletAddress(initial.wallet_address)
          setDiscordUrl(initial.discordUrl)
          setGithubUrl(initial.githubUrl)
          setLinkedinUrl(initial.linkedinUrl)
          setTwitterUrl(initial.twitterUrl)
          setTelegramUrl(initial.telegramUrl)
          setWebsiteUrl(initial.websiteUrl)
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
    initialState?.firstName !== firstName ||
    initialState?.lastName !== lastName ||
    initialState?.bio !== bio ||
    JSON.stringify(initialState?.skills) !== JSON.stringify(skills) ||
    initialState?.wallet_address !== walletAddress ||
    initialState?.discordUrl !== discordUrl ||
    initialState?.githubUrl !== githubUrl ||
    initialState?.linkedinUrl !== linkedinUrl ||
    initialState?.twitterUrl !== twitterUrl ||
    initialState?.telegramUrl !== telegramUrl ||
    initialState?.websiteUrl !== websiteUrl ||
    newProfilePictureFile !== null ||
    newBannerFile !== null

  const handleSave = async () => {
    if (!isDirty) return
    setSaving(true)

    const updates: ProfileUpdateInput = {
      firstName,
      lastName,
      bio,
      skills,
      wallet_address: walletAddress,
      discordUrl: discordUrl || null,
      githubUrl: githubUrl || null,
      linkedinUrl: linkedinUrl || null,
      twitterUrl: twitterUrl || null,
      telegramUrl: telegramUrl || null,
      websiteUrl: websiteUrl || null,
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
    setFirstName(initialState.firstName || "")
    setLastName(initialState.lastName || "")
    setBio(initialState.bio || "")
    setSkills(initialState.skills || [])
    setWalletAddress(initialState.wallet_address || null)
    setDiscordUrl(initialState.discordUrl || "")
    setGithubUrl(initialState.githubUrl || "")
    setLinkedinUrl(initialState.linkedinUrl || "")
    setTwitterUrl(initialState.twitterUrl || "")
    setTelegramUrl(initialState.telegramUrl || "")
    setWebsiteUrl(initialState.websiteUrl || "")
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
            firstName={firstName}
            lastName={lastName}
            email={profile.email || ""}
            onFirstNameChange={setFirstName}
            onLastNameChange={setLastName}
          />
          <BioSection bio={bio} onBioChange={setBio} isEditable={true} />
          <SkillsSection skills={skills} onChange={setSkills} />
          <SocialMediaSection
            discordUrl={discordUrl}
            githubUrl={githubUrl}
            linkedinUrl={linkedinUrl}
            twitterUrl={twitterUrl}
            telegramUrl={telegramUrl}
            websiteUrl={websiteUrl}
            onDiscordChange={setDiscordUrl}
            onGithubChange={setGithubUrl}
            onLinkedinChange={setLinkedinUrl}
            onTwitterChange={setTwitterUrl}
            onTelegramChange={setTelegramUrl}
            onWebsiteChange={setWebsiteUrl}
            isEditable={true}
          />
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