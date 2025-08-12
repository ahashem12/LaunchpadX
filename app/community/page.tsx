"use client"

import { useState, useMemo, useEffect } from "react"
import { CommunityHeader, CommunityFilters, CommunityGrid } from "@/components/community"
import { communityService } from "@/app/services/community/community-service"
import type { Profile } from "@/types"

export default function CommunityPage() {
  const [members, setMembers] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("reputation");
  const [achievements, setAchievements] = useState<string[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const [roles, setRoles] = useState<string[]>([]);
  const [selectedAchievement, setSelectedAchievement] = useState("all");
  const [selectedSkill, setSelectedSkill] = useState("all");
  const [selectedRole, setSelectedRole] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [
          communityMembers,
          achievementsData,
          skillsData,
          rolesData,
        ] = await Promise.all([
          communityService.getCommunityMembers(),
          communityService.getAchievements(),
          communityService.getSkills(),
          communityService.getRoles(),
        ]);
        setMembers(communityMembers);
        setAchievements(achievementsData);
        setSkills(skillsData);
        setRoles(rolesData);
      } catch (error) {
        console.error("Error fetching community data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredMembers = useMemo(() => {
    let filtered = [...members];

    if (searchQuery) {
      filtered = filtered.filter((member) =>
        member.username?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedAchievement !== "all") {
      filtered = filtered.filter((member) =>
        member.achievements?.includes(selectedAchievement)
      );
    }

    if (selectedSkill !== "all") {
      filtered = filtered.filter((member) => member.skills?.includes(selectedSkill));
    }

    if (selectedRole !== "all") {
      filtered = filtered.filter((member) => member.role === selectedRole);
    }

    if (sortBy === "reputation") {
      filtered.sort((a, b) => (b.reputation || 0) - (a.reputation || 0));
    } else if (sortBy === "newest") {
      // Assuming 'id' can be used for newest sorting as a proxy for creation time.
      // For a more accurate sort, a 'created_at' timestamp is recommended.
      filtered.sort((a, b) => b.id.localeCompare(a.id));
    }

    return filtered;
  }, [members, searchQuery, sortBy, selectedAchievement, selectedSkill, selectedRole]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 pb-8">
        <CommunityHeader />
        <CommunityFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          sortBy={sortBy}
          setSortBy={setSortBy}
          achievements={achievements}
          selectedAchievement={selectedAchievement}
          setSelectedAchievement={setSelectedAchievement}
          skills={skills}
          selectedSkill={selectedSkill}
          setSelectedSkill={setSelectedSkill}
          roles={roles}
          selectedRole={selectedRole}
          setSelectedRole={setSelectedRole}
        />
        <CommunityGrid members={filteredMembers} loading={loading} />
      </div>
    </div>
  )
}
