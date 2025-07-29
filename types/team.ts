// frontend\types\team.ts
export interface TeamMember {
  id: string;
  user_id: string;
  project_id: string;
  username: string;
  email: string;
  profile_picture?: string | null;
  role: string;
  skills: string[];
  has_connected_wallet: boolean;
  created_at: string;
  is_owner: boolean;
  insight?: string; 
}

export interface TeamRole {
  id: string;
  title: string;
  description: string;
  requiredSkills: string[];
  assigned: boolean;
  assignedTo?: string;
  created_at: string;
}
