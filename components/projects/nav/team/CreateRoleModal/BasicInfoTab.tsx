import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { projectService } from "@/app/services/projects/project-service";
import { Skill } from "@/app/services/skills";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { useCachedSkillService } from "@/lib/services/cached/useCachedSkillService";
import { useCachedRoleService } from "@/lib/services/cached/useCachedRoleService";

interface RoleType {
  id: string;
  name: string;
}

interface RoleCategory {
  id: string;
  name: string;
}

interface BasicInfoTabProps {
  data: {
    title: string;
    description: string;
    role_type: string;
    role_category: string;
    required_skills: string[];
  };
  onDataChange: (field: string, value: string | string[]) => void;
}

export function BasicInfoTab({ data, onDataChange }: BasicInfoTabProps) {
  const [roleTypes, setRoleTypes] = useState<RoleType[]>([]);
  const [roleCategories, setRoleCategories] = useState<RoleCategory[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const { getAllSkills } = useCachedSkillService();
  const { getRoleCategories } = useCachedRoleService();
  const { getRoleTypes } = useCachedRoleService();
  useEffect(() => {
    const fetchInitialData = async () => {
      const { data: typesData } = await getRoleTypes();
      const { data: categoriesData } = await getRoleCategories();
      const skillsData = await getAllSkills();
      setRoleTypes(typesData || []);
      setRoleCategories(categoriesData || []);
      setSkills(skillsData);
    };
    fetchInitialData();
  }, []);

  const handleSkillSelect = (skillId: string) => {
    if (!data.required_skills.includes(skillId)) {
      onDataChange("required_skills", [...data.required_skills, skillId]);
    }
    setSearchTerm("");
    setDropdownOpen(false);
  };

  const handleSkillRemove = (skillId: string) => {
    onDataChange(
      "required_skills",
      data.required_skills.filter((id) => id !== skillId),
    );
  };

  const filteredSkills = skills.filter((skill) =>
    skill.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="space-y-6 focus-visible:outline-none focus-visible:ring-0">
      <div>
        <Label htmlFor="role-type" className="text-foreground">
          Role Type <span className="text-red-500">*</span>
        </Label>
        <Select
          value={data.role_type}
          onValueChange={(value) => onDataChange("role_type", value)}
        >
          <SelectTrigger className="mt-1.5 bg-muted border-border text-foreground">
            <SelectValue placeholder="Select a Role Type" />
          </SelectTrigger>
          <SelectContent className="bg-card border-border text-foreground">
            {roleTypes.map((type) => (
              <SelectItem key={type.id} value={type.id}>
                {type.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="role-category" className="text-foreground">
          Role Category <span className="text-red-500">*</span>
        </Label>
        <Select
          value={data.role_category}
          onValueChange={(value) => onDataChange("role_category", value)}
        >
          <SelectTrigger className="mt-1.5 bg-muted border-border text-foreground">
            <SelectValue placeholder="Select a Category" />
          </SelectTrigger>
          <SelectContent className="bg-card border-border text-foreground">
            {roleCategories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="title" className="text-foreground">
          Role Title <span className="text-red-500">*</span>
        </Label>
        <Input
          id="title"
          value={data.title}
          onChange={(e) => onDataChange("title", e.target.value)}
          className="mt-1.5 bg-muted border-border text-foreground"
          placeholder="e.g., Lead Frontend Developer"
        />
      </div>

      <div>
        <Label htmlFor="required-skills" className="text-foreground">
          Required skills <span className="text-red-500">*</span>
        </Label>
        <div className="relative">
          <Input
            id="required-skills"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setDropdownOpen(true)}
            onBlur={() => setTimeout(() => setDropdownOpen(false), 150)} // Delay to allow click
            className="mt-1.5 bg-muted border-border text-foreground"
            placeholder="Search for skills..."
          />
          {isDropdownOpen && (
            <ul className="absolute z-10 w-full bg-card border border-border rounded-md mt-1 max-h-60 overflow-auto">
              {filteredSkills.map((skill) => (
                <li
                  key={skill.id}
                  className="px-3 py-2 cursor-pointer hover:bg-muted"
                  onMouseDown={() => handleSkillSelect(skill.id)}
                >
                  {skill.name}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {data.required_skills.map((skillId) => {
            const skill = skills.find((s) => s.id === skillId);
            return (
              skill && (
                <Badge
                  key={skill.id}
                  variant="secondary"
                  className="flex items-center gap-1"
                >
                  {skill.name}
                  <button
                    onClick={() => handleSkillRemove(skill.id)}
                    className="focus:outline-none"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )
            );
          })}
        </div>
      </div>

      <div>
        <Label htmlFor="role-description" className="text-foreground">
          Role description <span className="text-red-500">*</span>
        </Label>
        <Textarea
          id="role-description"
          value={data.description}
          onChange={(e) => onDataChange("description", e.target.value)}
          placeholder="Describe the role, responsibilities, and what you're looking for."
          className="resize-none mt-1.5 bg-muted border-border text-foreground placeholder:text-muted-foreground"
          rows={4}
        />
      </div>
    </div>
  );
}
