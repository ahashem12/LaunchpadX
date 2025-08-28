export interface Document {
  id: string
  project_id: string
  title: string
  file_url: string
  file_name: string
  file_size?: number
  file_type?: string
  privacy: "private" | "public"
  created_at: string
  updated_at: string
}

export interface DocumentCreateInput {
  project_id: string
  title: string
  file_url: string
  file_name: string
  file_size?: number
  file_type?: string
  privacy: "private" | "public"
}

export interface DocumentUpdateInput {
  title?: string
  is_private?: boolean
}
export interface PredefinedDocument {
  id: string
  name: string
  type: "business-plan" | "pitchdeck" 
  canGenerate: boolean
  project_id: string
  createdAt: string
  updatedAt: string
  url?: string
}
