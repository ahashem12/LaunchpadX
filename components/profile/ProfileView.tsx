"use client";

import type { Profile } from "@/types";
import { ProfileHeader } from "./ProfileHeader";
import { ProfilePictureSection } from "./ProfilePictureSection";
import { PersonalInfoSection } from "./PersonalInfoSection";
import { SkillsSection } from "./SkillsSection";
import { WalletSection } from "./WalletSection";
import { ReputationSection } from "./ReputationSection";
import { AchievementsSection } from "./AchievementsSection";

interface ProfileViewProps {
  profile: Profile;
}

export function ProfileView({ profile }: ProfileViewProps) {
  return (
    <div className="w-full bg-background">
      <div className="container mx-auto">
        <ProfileHeader error={null} />

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
              username={profile.username || ""}
              email={profile.email || ""}
              isEditable={false}
            />

            <SkillsSection
              skills={profile.skills || []}
              isEditable={false}
            />
          </div>

          <div className="xl:col-span-1 space-y-6">
            <WalletSection walletAddress={profile.wallet_address || ""} />
            <ReputationSection reputation={profile.reputation || 0} />
            <AchievementsSection achievements={profile.achievements || []} />
          </div>
        </div>
      </div>
    </div>
  );
}
