import type { Profile } from "@/types";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Flame, Star, HelpCircle, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface CommunityCardProps {
  member: Profile;
}

const AchievementIcon = ({ achievement }: { achievement: string }) => (
  <div
    className="w-8 h-8 bg-primary/10 border border-primary/20 rounded-full flex items-center justify-center shadow-inner"
    title={achievement}
  >
    <Star className="w-5 h-5 text-primary" />
  </div>
);

const ReputationBar = ({ reputation }: { reputation: number }) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-1">
      <span className="text-xs font-medium text-muted-foreground">Reputation</span>
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Flame
            key={i}
            className={cn(
              "w-3 h-3 transition-colors",
              i < Math.min(reputation, 5) 
                ? "text-amber-500 fill-amber-400" 
                : "text-muted-foreground/30"
            )}
          />
        ))}
      </div>
    </div>
    <span className="text-xs font-medium text-foreground">{reputation}</span>
  </div>
);

export function CommunityCard({ member }: CommunityCardProps) {
  const displayedSkills = member.skills?.slice(0, 2) || [];
  const remainingSkills = member.skills ? member.skills.length - displayedSkills.length : 0;
  
  // Helper function to get full name or fallback
  const getDisplayName = () => {
    if (member.firstName && member.lastName) {
      return `${member.firstName} ${member.lastName}`;
    }
    if (member.firstName) {
      return member.firstName;
    }
    if (member.lastName) {
      return member.lastName;
    }
    return 'Anonymous';
  };
  
  // Helper function to get initials for avatar fallback
  const getInitials = () => {
    if (member.firstName && member.lastName) {
      return `${member.firstName.charAt(0)}${member.lastName.charAt(0)}`.toUpperCase();
    }
    if (member.firstName) {
      return member.firstName.slice(0, 2).toUpperCase();
    }
    if (member.lastName) {
      return member.lastName.slice(0, 2).toUpperCase();
    }
    return 'AN';
  };

  return (
    <Card className="w-full max-w-sm h-full flex flex-col rounded-lg shadow-md transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 bg-card border border-border overflow-hidden group">
      {/* Fixed 16:9 banner area */}
      <div className="relative w-full aspect-[16/9] overflow-hidden bg-gradient-to-tr from-primary/20 via-primary/10 to-primary/5">
        {member.banner_url ? (
          <Image
            src={member.banner_url}
            alt={`${getDisplayName()} banner`}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-tr from-primary/20 via-primary/10 to-primary/5" />
        )}
      </div>

      {/* Avatar section - properly contained within card */}
      <div className="flex justify-center -mt-8 px-4 relative z-10">
        <Avatar className="w-16 h-16 border-4 border-background shadow-lg ring-2 ring-background/50">
          <AvatarImage 
            src={member.avatar_url || ""} 
            alt={getDisplayName()}
            className="object-cover"
          />
          <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
            {getInitials()}
          </AvatarFallback>
        </Avatar>
      </div>

      <CardContent className="flex flex-col flex-1 p-4 pt-4 space-y-3">
        {/* Header with name and achievements - centered layout */}
        <div className="text-center space-y-2">
          <h3 className="font-semibold text-lg text-foreground line-clamp-1">
            {getDisplayName()}
          </h3>
          {member.achievements && member.achievements.length > 0 && (
            <div className="flex items-center justify-center gap-1">
              {member.achievements.slice(0, 3).map((ach, index) => (
                <AchievementIcon key={`${ach}-${index}`} achievement={ach} />
              ))}
            </div>
          )}
        </div>

        {/* Role badge */}
        {member.role && (
          <Badge variant="outline" className="w-fit text-xs">
            {member.role}
          </Badge>
        )}

        {/* Skills section */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Skills</p>
          <div className="flex flex-wrap gap-1">
            {displayedSkills.map((skill, index) => (
              <Badge key={`${skill}-${index}`} variant="secondary" className="text-xs">
                {skill}
              </Badge>
            ))}
            {remainingSkills > 0 && (
              <Badge variant="outline" className="text-xs text-primary">
                +{remainingSkills}
              </Badge>
            )}
          </div>
        </div>

        {/* Bio - clamped to 2-3 lines with fixed height */}
        <div className="flex-1">
          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed min-h-[2.5rem]">
            {member.bio || 'No bio available.'}
          </p>
        </div>

        {/* Reputation and CTA aligned to bottom */}
        <div className="space-y-3 pt-2">
          <ReputationBar reputation={member.reputation || 0} />
          
          <Link href={`/profile/${member.id}`} className="block">
            <Button variant="outline" size="sm" className="w-full">
              View Profile
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
