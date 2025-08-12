import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { BookUser } from 'lucide-react';

interface BioSectionProps {
  bio: string;
  onBioChange?: (bio: string) => void;
  isEditable?: boolean;
}

export function BioSection({ bio, onBioChange, isEditable = false }: BioSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg font-semibold">
            <BookUser className="w-5 h-5" />
            Bio
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isEditable ? (
          <div className="grid gap-2">
            <Label htmlFor="bio">Tell us about yourself</Label>
            <Textarea
              id="bio"
              placeholder="What makes you tick?"
              value={bio}
              onChange={(e) => onBioChange?.(e.target.value)}
              rows={4}
            />
          </div>
        ) : (
          <div className="space-y-2">
            {bio ? (
              <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
                {bio}
              </p>
            ) : (
              <p className="text-sm text-muted-foreground italic">
                No bio available
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
