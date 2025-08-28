"use client"

import { useState, useMemo, useEffect } from "react"
import { OpenRolesHeader, OpenRolesFilters, RolesGrid } from "@/components/open-roles"
import { projectService } from "@/app/services/projects/project-service"
import type { TeamRole } from "@/types"
import { Skeleton } from "@/components/ui/skeleton"

export default function OpenRolesPage() {
  const [roles, setRoles] = useState<TeamRole[]>([])
  const [userProjectIds, setUserProjectIds] = useState<Set<string>>(new Set())
  const [searchQuery, setSearchQuery] = useState("")
  const [roleType, setRoleType] = useState("all")
  const [category, setCategory] = useState("all")
  const [skill, setSkill] = useState("all")
  const [sortBy, setSortBy] = useState("newest")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRoles = async () => {
      setLoading(true)
      try {
        const [allRoles, userProjects] = await Promise.all([
          projectService.getAllOpenRoles(),
          projectService.getUserProjects(),
        ])
        setRoles(allRoles)
        setUserProjectIds(new Set(userProjects.map((p) => p.id)))
      } catch (err) {
        console.error("Error fetching roles:", err)
        setRoles([])
      } finally {
        setLoading(false)
      }
    }
    fetchRoles()
  }, [])

  const [categories, setCategories] = useState<string[]>([])
  const [skills, setSkills] = useState<string[]>([])

  useEffect(() => {
    const fetchRolesAndOptions = async () => {
      const openRoles = await projectService.getAllOpenRoles()
      setRoles(openRoles)

      const uniqueCategories = [
        ...new Set(
          openRoles
            .map((role) => role.role_category?.name)
            .filter((name): name is string => !!name),
        ),
      ]
      setCategories(uniqueCategories)

      const allSkills = openRoles.flatMap((role) => role.requiredSkills || [])
      const uniqueSkills = [...new Set(allSkills)]
      setSkills(uniqueSkills)
    }
    fetchRolesAndOptions()
  }, [])

  const filteredRoles = useMemo(() => {
    let filtered = [...roles]

    if (searchQuery) {
      filtered = filtered.filter(
        (role) =>
          role.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          role.project?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          role.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    if (category !== "all") {
      filtered = filtered.filter((role) => role.role_category?.name === category)
    }

    if (roleType !== "all") {
      filtered = filtered.filter((role) => role.role_type === roleType)
    }

    if (skill !== "all") {
      filtered = filtered.filter((role) => role.requiredSkills && role.requiredSkills.includes(skill))
    }

    filtered.sort((a, b) => {
      if (sortBy === "newest") {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      } else {
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      }
    })

    return filtered
  }, [roles, searchQuery, roleType, category, skill, sortBy])

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 pb-8">
        <OpenRolesHeader />
        <OpenRolesFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          roleType={roleType}
          setRoleType={setRoleType}
          categories={categories}
          category={category}
          setCategory={setCategory}
          skills={skills}
          skill={skill}
          setSkill={setSkill}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1,2,3,4,5,6,7,8].map((i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="h-32 w-full rounded-t-lg bg-muted/50" />
                <div className="p-4 space-y-3">
                  <Skeleton className="h-6 w-3/4 bg-muted/50" />
                  <Skeleton className="h-4 w-full bg-muted/50" />
                  <Skeleton className="h-4 w-full bg-muted/50" />
                  <Skeleton className="h-8 w-20 bg-muted/50" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <RolesGrid roles={filteredRoles} userProjectIds={userProjectIds} />
        )}
      </div>
    </div>
  )
}
