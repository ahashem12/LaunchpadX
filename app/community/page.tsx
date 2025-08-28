import { CommunityHeader, CommunityPageClient } from "@/components/community"
import { communityService } from "@/app/services/community/community-service"
import type { Profile } from "@/types"

export default async function CommunityPage() {
  // Fetch data server-side
  const [
    members,
    achievements,
    skills,
    roles,
  ] = await Promise.all([
    communityService.getCommunityMembers(),
    communityService.getAchievements(),
    communityService.getSkills(),
    communityService.getRoles(),
  ]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 pb-8">
        <CommunityHeader />
        <CommunityPageClient
          initialMembers={members}
          achievements={achievements}
          skills={skills}
          roles={roles}
        />
      </div>
    </div>
  )
}
