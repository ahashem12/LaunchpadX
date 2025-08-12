"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Flame } from "lucide-react";

interface ReputationSectionProps {
  reputation: number;
}

export function ReputationSection({ reputation }: ReputationSectionProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Reputation</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1">
            {[...Array(10)].map((_, i) => (
              <Flame
                key={i}
                className={`w-5 h-5 transition-colors ${
                  i < reputation
                    ? "text-amber-500 fill-amber-400"
                    : "text-muted-foreground/30"
                }`}
              />
            ))}
          </div>
          <span className="font-bold text-xl text-amber-500">{reputation}</span>
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          Your community standing based on contributions and activity.
        </p>
      </CardContent>
    </Card>
  );
}
