export interface Profile {
  id: string;
  email: string | null;
  username: string | null;
  avatar_url: string | null;
  banner_url: string | null;
  bio: string | null;
  role: string | null;
  skills: string[];
  is_active: boolean;
  wallet_address: string | null;
  reputation: number;
  achievements: string[];
  created_at: string;
  updated_at: string;
}

export interface ProfileUpdateInput {
  username?: string;
  skills?: string[];
  avatar_url?: string;
  banner_url?: string;
  bio?: string;
  wallet_address?: string | null;
  profile_picture?: string;
}
