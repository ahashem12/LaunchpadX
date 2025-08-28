export interface Profile {
  id: string;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  avatar_url: string | null;
  banner_url: string | null;
  bio: string | null;
  role: string | null;
  skills: string[];
  fieldOfExpertise: string | null;
  is_active: boolean;
  wallet_address: string | null;
  reputation: number;
  achievements: string[];
  discordUrl: string | null;
  githubUrl: string | null;
  linkedinUrl: string | null;
  twitterUrl: string | null;
  telegramUrl: string | null;
  websiteUrl: string | null;
  created_at: string;
  updated_at: string;
}

export interface ProfileUpdateInput {
  firstName?: string;
  lastName?: string;
  skills?: string[];
  avatar_url?: string | null;
  banner_url?: string | null;
  bio?: string;
  wallet_address?: string | null;
  fieldOfExpertise?: string | null;
  discordUrl?: string | null;
  githubUrl?: string | null;
  linkedinUrl?: string | null;
  twitterUrl?: string | null;
  telegramUrl?: string | null;
  websiteUrl?: string | null;
}
