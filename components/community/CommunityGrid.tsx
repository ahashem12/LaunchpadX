import type { Profile } from "@/types";
import { CommunityCard } from "./CommunityCard";

interface CommunityGridProps {
  members: Profile[];
  loading: boolean;
}

export function CommunityGrid({ members, loading }: CommunityGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="bg-muted rounded-lg h-80 animate-pulse" />
        ))}
      </div>
    );
  }

  if (members.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No members found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {members.map((member) => (
        <CommunityCard key={member.id} member={member} />
      ))}
    </div>
  );
}
