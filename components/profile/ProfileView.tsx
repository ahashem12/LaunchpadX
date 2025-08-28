"use client";

import type { Profile } from "@/types";
import { ProfileHeader } from "./ProfileHeader";
import { ProfilePictureSection } from "./ProfilePictureSection";
import { PersonalInfoSection } from "./PersonalInfoSection";
import { SkillsSection } from "./SkillsSection";
import { SocialMediaSection } from "./SocialMediaSection";
import { WalletSection } from "./WalletSection";
import { ReputationSection } from "./ReputationSection";
import { AchievementsSection } from "./AchievementsSection";
import { BannerSection } from "./BannerSection";
import { BioSection } from "./BioSection";

interface ProfileViewProps {
  profile: Profile;
}

export function ProfileView({ profile }: ProfileViewProps) {
  return (
    <div className="space-y-8 max-w-5xl mx-auto py-10 px-4">
      <ProfileHeader error={null} />
      
      <BannerSection
        bannerUrl={profile.banner_url}
        onBannerChange={() => {}}
        isEditable={false}
      />

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          <ProfilePictureSection
            avatarUrl={profile.avatar_url || ""}
            onFileSelect={() => {}}
            onRemove={() => {}}
            hasImage={!!profile.avatar_url}
            isEditable={false}
          />

          <div className="xl:col-span-2 space-y-6">
            <PersonalInfoSection
              firstName={profile.firstName || ""}
              lastName={profile.lastName || ""}
              email={profile.email || ""}
              isEditable={false}
            />

            <BioSection bio={profile.bio || ""} isEditable={false} />
            <SkillsSection
              skills={profile.skills || []}
              isEditable={false}
            />
            {/* Social Media Icons - Compact Display */}
            <div className="bg-card rounded-lg border p-4">
              <h3 className="text-lg font-semibold mb-3">Social Media</h3>
              <SocialMediaSection
                discordUrl={profile.discordUrl || ""}
                githubUrl={profile.githubUrl || ""}
                linkedinUrl={profile.linkedinUrl || ""}
                twitterUrl={profile.twitterUrl || ""}
                telegramUrl={profile.telegramUrl || ""}
                websiteUrl={profile.websiteUrl || ""}
                isEditable={false}
                showIconsOnly={true}
              />
            </div>
          </div>

          <div className="xl:col-span-1 space-y-6">
            <WalletSection walletAddress={profile.wallet_address || ""} />
            <ReputationSection reputation={profile.reputation || 0} />
            <AchievementsSection achievements={profile.achievements || []} />
          </div>
        </div>
    </div>
  );
}
