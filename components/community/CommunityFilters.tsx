import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CommunityFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sortBy: string;
  setSortBy: (value: string) => void;
  achievements: string[];
  selectedAchievement: string;
  setSelectedAchievement: (value: string) => void;
  skills: string[];
  selectedSkill: string;
  setSelectedSkill: (value: string) => void;
  roles: string[];
  selectedRole: string;
  setSelectedRole: (value: string) => void;
}

export function CommunityFilters({
  searchQuery,
  setSearchQuery,
  sortBy,
  setSortBy,
  achievements,
  selectedAchievement,
  setSelectedAchievement,
  skills,
  selectedSkill,
  setSelectedSkill,
  roles,
  selectedRole,
  setSelectedRole,
}: CommunityFiltersProps) {
  return (
    <div className="flex items-center justify-between py-4">
      <div className="flex items-center gap-4">
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="reputation">Reputation</SelectItem>
            <SelectItem value="newest">Newest</SelectItem>
          </SelectContent>
        </Select>
        <Select value={selectedAchievement} onValueChange={setSelectedAchievement}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter Achievement" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Achievements</SelectItem>
            {achievements.map((ach) => (
              <SelectItem key={ach} value={ach}>{ach}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={selectedSkill} onValueChange={setSelectedSkill}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter Skill" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Skills</SelectItem>
            {skills.map((skill) => (
              <SelectItem key={skill} value={skill}>{skill}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={selectedRole} onValueChange={setSelectedRole}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            {roles.map((role) => (
              <SelectItem key={role} value={role}>{role}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Input
        placeholder="Search by name..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="max-w-sm"
      />
    </div>
  );
}
