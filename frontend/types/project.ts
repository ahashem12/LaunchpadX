/**
 * Project related types
 */

export interface Project {
  id: string
  name: string
  description: string
  short_description?: string | null
  status: "planning" | "in-progress" | "completed"
  created_at: string
  updated_at: string
  logo_url?: string | null
  banner_url?: string | null
  category?: string | null
}

export interface ProjectCreateInput {
  name: string
  description: string
  short_description?: string
  category?: string
  logo_url?: string
  banner_url?: string
}

export interface ProjectUpdateInput {
  name?: string
  description?: string
  short_description?: string
  category?: string
  logo_url?: string
  banner_url?: string
  status?: "planning" | "in-progress" | "completed"
}

export interface ProjectDetails extends Project {
  foundedBy: {
    id: string
    name: string
  }
  media: ProjectMedia[]
  teamCount: number
  documentsCount: number
}

export interface ProjectMedia {
  id: string
  type: "image" | "video"
  url: string
  title: string
  description?: string
}

export interface ProjectEvent {
  id: string
  title: string
  description: string
  startDate: string
  endDate: string
  location?: string
  virtual: boolean
  link?: string
  attendees?: number
}

export interface ProjectUpdate {
  id: string
  title: string
  content: string
  author: {
    id: string
    name: string
    avatar?: string
  }
  createdAt: string
  attachments?: {
    id: string
    name: string
    url: string
    type: string
  }[]
}

export interface NextStep {
  id: string
  title: string
  description?: string
  done: boolean
  priority: number
  buttonText: string
  project_id: string
  created_at?: string
  updated_at?: string
}
