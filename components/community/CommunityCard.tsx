import type { Profile } from "@/types";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Flame, Star, HelpCircle } from "lucide-react";

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
  <div className="flex items-center gap-1.5 mt-4">
    <div className="flex items-center gap-1">
      {[...Array(10)].map((_, i) => (
        <Flame
          key={i}
          className={`w-5 h-5 transition-colors ${i < reputation ? "text-amber-500 fill-amber-400" : "text-muted-foreground/30"}`}
        />
      ))}
    </div>
    <HelpCircle className="w-4 h-4 text-muted-foreground/50 cursor-pointer hover:text-primary" />
  </div>
);

export function CommunityCard({ member }: CommunityCardProps) {
  const displayedSkills = member.skills?.slice(0, 2) || [];
  const remainingSkills = member.skills ? member.skills.length - displayedSkills.length : 0;

  

  return (
    <Link href={`/profile/${member.id}`} className="block group">
      <Card className="w-full max-w-sm rounded-2xl shadow-lg transition-all duration-300 group-hover:shadow-primary/20 bg-card border border-border/50 overflow-visible">
        <div className="relative">
          <div className="h-32 rounded-t-2xl overflow-hidden">
            {member.banner_url ? (
              <img
                src={member.banner_url}
                alt={`${member.username} banner`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-tr from-green-500 via-teal-600 to-green-800" />
            )}
          </div>
          
          <Avatar className="absolute top-20 left-4 w-20 h-20 border-4 border-card shadow-xl z-10">
            <AvatarImage src={member.avatar_url || ""} alt={member.username || ""} />
            <AvatarFallback className="bg-gradient-to-br from-green-600 to-teal-700 text-white font-bold">
              {member.username?.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>

        <div className="p-4 pt-12 bg-card/80 backdrop-blur-sm rounded-b-2xl">
          <div className="flex justify-between items-start">
            <h3 className="font-bold text-xl text-foreground line-clamp-1">
              {member.username}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              {member.achievements?.slice(0, 2).map((ach) => (
                <AchievementIcon key={ach} achievement={ach} />
              ))}
            </div>
          </div>

          <div className="mt-2">
            <p className="text-xs font-semibold text-muted-foreground tracking-wider uppercase">Skills</p>
            <div className="flex flex-wrap items-center gap-2 mt-2">
              {displayedSkills.map((skill) => (
                <Badge key={skill} variant="secondary" className="text-xs font-medium bg-muted-foreground/10 hover:bg-muted-foreground/20 text-muted-foreground">
                  {skill}
                </Badge>
              ))}
              {remainingSkills > 0 && (
                <span className="text-xs font-bold text-orange-500 hover:underline cursor-pointer">
                  +{remainingSkills} MORE SKILLS
                </span>
              )}
            </div>
          </div>

          <p className="text-sm text-muted-foreground mt-4 line-clamp-3 leading-relaxed h-[60px]">
            {member.bio || 'No bio available.'}
          </p>

          <ReputationBar reputation={member.reputation || 0} />
        </div>
      </Card>
    </Link>
  );
}
