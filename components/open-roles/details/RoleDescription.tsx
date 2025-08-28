
import type { Role } from "@/types/role";
import type { Skill } from "@/app/services/skills";
import { Badge } from "@/components/ui/badge";

interface RoleDescriptionProps {
  role: Role;
  skills: Skill[];
}

export function RoleDescription({ role, skills }: RoleDescriptionProps) {
  return (
    <div className="bg-muted rounded-lg p-6">
      <h2 className="text-xl font-semibold text-white mb-4">Role Description</h2>
      <div className="text-gray-300 leading-relaxed">
        {role.description ? (
          <p>{role.description}</p>
        ) : (
          <div className="text-gray-400 italic">No description added for this role yet.</div>
        )}
      </div>
      {/* Skills section */}
      <div className="space-y-2 mt-4">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Skills</p>
        <div className="flex flex-wrap gap-1">
          {skills.map((skill, index) => (
            <Badge key={skill.id || index} variant="secondary" className="text-xs">
              {skill.name}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
