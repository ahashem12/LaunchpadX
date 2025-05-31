/**
 * Document management types
 */

export interface Document {
  id: string
  name: string
  type: "business-plan" | "pitchdeck" | "litepaper" | "whitepaper" | "tokenomics" | "custom"
  url?: string
  canGenerate: boolean
  createdAt: string
  updatedAt: string
  createdBy?: {
    id: string
    name: string
  }
  project_id: string
  file_size?: number
  file_type?: string
}

export interface DocumentCreateInput {
  name: string
  type: Document["type"]
  project_id: string
  url?: string
  file_size?: number
  file_type?: string
}

export interface DocumentUpdateInput {
  name?: string
  type?: Document["type"]
  url?: string
}
