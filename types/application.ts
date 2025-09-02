export interface RoleApplication {
  id: string;
  role_id: string;
  applicant_id: string;
  applied_at: string;
  status: 'pending' | 'accepted' | 'rejected';
}

export interface RoleApplicationWithProfile {
  id: string;
  role_id: string;
  applicant_id: string;
  applied_at: string;
  status: 'pending' | 'accepted' | 'rejected';
  applicant: {
    id: string;
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    avatar_url: string | null;
    bio: string | null;
    skills: string[];
  };
}
