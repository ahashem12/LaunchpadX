export interface Role {
  id: string
  project_id: string
  category_id: string
  type_id: string
  title: string
  description: string
  responsibilities: string
  requirements: string
  required_skills: string[]
  preferred_skills: string[]
  status: string
  created_at: string
  updated_at: string
  opened_at: string
  closed_at: string
  created_by: string
  updated_by: string
  flat_money_min: number
  flat_money_max: number
  equity_percentage: number
}