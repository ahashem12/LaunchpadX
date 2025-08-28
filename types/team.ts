// frontend\types\team.ts
export interface TeamMember {
  id: string;
  user_id: string;
  project_id: string;
  firstName: string | null;
  lastName: string | null;
  email: string;
  avatar_url?: string | null;
  role: string;
  skills: string[];
  has_connected_wallet: boolean;
  created_at: string;
  is_owner: boolean;
  insight?: string; 
}

export interface TeamRole {
  id: string
  title: string
  description: string
  requiredSkills: string[]
  assigned: boolean
  assignedTo?: string
  created_at: string
  status: string
  role_type?: string
  flat_money_min?: number | null
  flat_money_max?: number | null
  equity_percentage?: number | null
  role_category?: {
    id: string
    name: string
  }
  project?: {
    id: string
    name: string
    logo_url: string
  }
}
