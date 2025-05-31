/**
 * Team and member related types
 */

export interface TeamMember {
  id: string
  user_id: string
  project_id: string
  name: string
  email: string
  avatar?: string
  role: string
  title?: string
  bio?: string
  insight?: string
  skills: string[]
  joinedAt?: string
  is_cofounder?: boolean
  has_connected_wallet?: boolean
  created_at?: string
  updated_at?: string
}

export interface TeamMemberCreateInput {
  user_id: string
  project_id: string
  role: string
  title?: string
  bio?: string
  skills?: string[]
  is_cofounder?: boolean
  has_connected_wallet?: boolean
}

export interface TeamMemberUpdateInput {
  role?: string
  title?: string
  bio?: string
  skills?: string[]
  is_cofounder?: boolean
  has_connected_wallet?: boolean
}

export interface TeamRole {
  id: string
  title: string
  category: "business" | "technical" | "design" | "marketing" | "operations"
  type: "team-member" | "co-founder" | "freelancer" | "advisor"
  description: string
  requiredSkills: string[]
  assigned: boolean
  assignedTo?: string
  compensation?: {
    flatMoney?: {
      min: number
      max: number
      currency: string
    }
    equity?: number
    hourlyRate?: {
      min: number
      max: number
      currency: string
    }
  }
  priority: "high" | "medium" | "low"
  status: "open" | "filled" | "paused"
  created_at: string
  updated_at: string
}

export interface TeamInvitation {
  id: string
  project_id: string
  email: string
  role: string
  title?: string
  invited_by: string
  status: "pending" | "accepted" | "declined" | "expired"
  expires_at: string
  created_at: string
  updated_at: string
}

export interface TeamStats {
  totalMembers: number
  cofounders: number
  teamMembers: number
  freelancers: number
  advisors: number
  openRoles: number
  pendingInvitations: number
}
