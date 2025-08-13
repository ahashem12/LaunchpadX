"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

interface AchievementsSectionProps {
  achievements: string[];
}

export function AchievementsSection({ achievements }: AchievementsSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Achievements</CardTitle>
      </CardHeader>
      <CardContent>
        {achievements && achievements.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {achievements.map((achievement) => (
              <Badge key={achievement} variant="secondary" className="flex items-center gap-1.5 pl-2 pr-3 py-1 text-sm">
                <Star className="w-4 h-4 text-primary" />
                <span>{achievement}</span>
              </Badge>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            No achievements unlocked yet. Keep contributing!
          </p>
        )}
      </CardContent>
    </Card>
  );
}
