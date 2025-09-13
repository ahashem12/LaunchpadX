"use client";

import { useState } from "react";
import type { Profile } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
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

interface ProfileDialogProps {
  profile: Profile | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProfileDialog({
  profile,
  open,
  onOpenChange,
}: ProfileDialogProps) {
  const [emailCopied, setEmailCopied] = useState(false);
  const { toast } = useToast();

  if (!profile) return null;

  const handleCopyEmail = async () => {
    if (!profile.email) return;

    try {
      await navigator.clipboard.writeText(profile.email);
      setEmailCopied(true);
      toast({
        title: "Email copied!",
        description: "The email address has been copied to your clipboard.",
      });

      // Reset the copied state after 2 seconds
      setTimeout(() => setEmailCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Could not copy email to clipboard.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between pr-8">
            <DialogTitle className="text-xl">
              {profile.firstName} {profile.lastName} - Profile
            </DialogTitle>
            {profile.email && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyEmail}
                className="flex items-center space-x-2"
              >
                {emailCopied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
                <span>{emailCopied ? "Copied!" : "Copy Email"}</span>
              </Button>
            )}
          </div>
        </DialogHeader>

        <div className="space-y-6">
          <BannerSection
            bannerUrl={profile.banner_url}
            onBannerChange={() => {}}
            isEditable={false}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <ProfilePictureSection
                avatarUrl={profile.avatar_url || ""}
                onFileSelect={() => {}}
                onRemove={() => {}}
                hasImage={!!profile.avatar_url}
                isEditable={false}
              />
            </div>

            <div className="lg:col-span-2 space-y-6">
              <PersonalInfoSection
                firstName={profile.firstName || ""}
                lastName={profile.lastName || ""}
                email={profile.email || ""}
                isEditable={false}
              />

              <BioSection bio={profile.bio || ""} isEditable={false} />

              <SkillsSection skills={profile.skills || []} isEditable={false} />

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
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <WalletSection walletAddress={profile.wallet_address || ""} />
            <ReputationSection reputation={profile.reputation || 0} />
          </div>

          <AchievementsSection achievements={profile.achievements || []} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
