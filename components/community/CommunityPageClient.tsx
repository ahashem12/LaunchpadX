"use client"

import { useState, useMemo } from "react"
import { CommunityFilters, CommunityGrid } from "@/components/community"
import type { Profile } from "@/types"

interface CommunityPageClientProps {
  initialMembers: Profile[]
  achievements: string[]
  skills: string[]
  roles: string[]
}

export function CommunityPageClient({
  initialMembers,
  achievements,
  skills,
  roles,
}: CommunityPageClientProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("reputation")
  const [selectedAchievement, setSelectedAchievement] = useState("all")
  const [selectedSkill, setSelectedSkill] = useState("all")
  const [selectedRole, setSelectedRole] = useState("all")

  const filteredMembers = useMemo(() => {
    let filtered = [...initialMembers]

    if (searchQuery) {
      filtered = filtered.filter((member) =>
        member.username?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    if (selectedAchievement !== "all") {
      filtered = filtered.filter((member) =>
        member.achievements?.includes(selectedAchievement)
      )
    }

    if (selectedSkill !== "all") {
      filtered = filtered.filter((member) => member.skills?.includes(selectedSkill))
    }

    if (selectedRole !== "all") {
      filtered = filtered.filter((member) => member.role === selectedRole)
    }

    if (sortBy === "reputation") {
      filtered.sort((a, b) => (b.reputation || 0) - (a.reputation || 0))
    } else if (sortBy === "newest") {
      // Use created_at if available, otherwise fall back to id
      filtered.sort((a, b) => {
        const aDate = a.created_at ? new Date(a.created_at).getTime() : 0
        const bDate = b.created_at ? new Date(b.created_at).getTime() : 0
        return bDate - aDate
      })
    }

    return filtered
  }, [initialMembers, searchQuery, sortBy, selectedAchievement, selectedSkill, selectedRole])

  return (
    <>
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
      <CommunityGrid members={filteredMembers} loading={false} />
    </>
  )
}
