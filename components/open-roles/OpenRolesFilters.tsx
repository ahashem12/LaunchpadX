"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface OpenRolesFiltersProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
  roleType: string
  setRoleType: (roleType: string) => void
  category: string
  setCategory: (category: string) => void
  categories: string[]
  skill: string
  setSkill: (skill: string) => void
  skills: string[]
  sortBy: string
  setSortBy: (sort: string) => void
}

export function OpenRolesFilters({
  searchQuery,
  setSearchQuery,
  roleType,
  setRoleType,
  category,
  setCategory,
  categories,
  skill,
  setSkill,
  skills,
  sortBy,
  setSortBy,
}: OpenRolesFiltersProps) {
  return (
    <div className="mb-8 p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 max-w-full overflow-x-auto">
      <div className="flex flex-col lg:flex-row flex-wrap gap-4 items-center justify-between w-full">
        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
          <Select value={roleType} onValueChange={setRoleType}>
            <SelectTrigger className="w-full sm:w-[180px] bg-background/50">
              <SelectValue placeholder="Role Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="co-founder">Co-founder</SelectItem>
              <SelectItem value="team-member">Team Member</SelectItem>
              <SelectItem value="freelancer">Freelancer</SelectItem>
              <SelectItem value="advisor">Advisor</SelectItem>
            </SelectContent>
          </Select>

          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-full sm:w-[180px] bg-background/50">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={skill} onValueChange={setSkill}>
            <SelectTrigger className="w-full sm:w-[180px] bg-background/50">
              <SelectValue placeholder="Skill" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Skills</SelectItem>
              {skills.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
              <SelectItem value="UX Design">UX Design</SelectItem>
              <SelectItem value="Frontend Development">Frontend Development</SelectItem>
              <SelectItem value="Backend Development">Backend Development</SelectItem>
              <SelectItem value="Full Stack Development">Full Stack Development</SelectItem>
              <SelectItem value="AI/ML">AI/ML</SelectItem>
              <SelectItem value="Blockchain">Blockchain</SelectItem>
              <SelectItem value="Marketing">Marketing</SelectItem>
              <SelectItem value="Business Strategy">Business Strategy</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full sm:w-[180px] bg-background/50">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Date (newest - oldest)</SelectItem>
              <SelectItem value="oldest">Date (oldest - newest)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="relative w-full lg:w-80">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search by project name, role, etc."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-background/50"
          />
        </div>
      </div>
    </div>
  )
}
