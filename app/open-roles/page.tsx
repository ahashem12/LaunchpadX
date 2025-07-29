"use client"

import { useState, useMemo } from "react"
import { OpenRolesHeader, OpenRolesFilters, RolesGrid } from "@/components/open-roles"
import { mockRoles } from "@/lib/mock-roles-data"

export default function OpenRolesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [roleType, setRoleType] = useState("all")
  const [category, setCategory] = useState("all")
  const [skill, setSkill] = useState("all")
  const [sortBy, setSortBy] = useState("newest")

  const filteredRoles = useMemo(() => {
    let filtered = [...mockRoles]

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (role) =>
          role.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          role.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
          role.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Filter by role type
    if (roleType !== "all") {
      filtered = filtered.filter((role) => role.type === roleType)
    }

    // Filter by category
    if (category !== "all") {
      filtered = filtered.filter((role) => role.category === category)
    }

    // Filter by skill
    if (skill !== "all") {
      filtered = filtered.filter((role) => role.skills.includes(skill))
    }

    // Sort
    filtered.sort((a, b) => {
      if (sortBy === "newest") {
        return new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime()
      } else {
        return new Date(a.postedAt).getTime() - new Date(b.postedAt).getTime()
      }
    })

    return filtered
  }, [searchQuery, roleType, category, skill, sortBy])

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 pb-8">
        <OpenRolesHeader />

        <OpenRolesFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          roleType={roleType}
          setRoleType={setRoleType}
          category={category}
          setCategory={setCategory}
          skill={skill}
          setSkill={setSkill}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        <RolesGrid roles={filteredRoles} />
      </div>
    </div>
  )
}
