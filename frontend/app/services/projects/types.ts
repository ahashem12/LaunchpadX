// services/projects/types.ts
import type { Project, TeamMember } from "@/types"

export interface ProjectCreateInput {
  name: string
  description: string
  short_description?: string
  logo_url?: string
  banner_url?: string
  category?: string
  status?: "planning" | "in-progress" | "completed"
}

export interface ProjectUpdateInput {
  name?: string
  description?: string
  short_description?: string
  logo_url?: string
  banner_url?: string
  category?: string
  status?: "planning" | "in-progress" | "completed"
}