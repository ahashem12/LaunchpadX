export interface ProfileData {
  id: string
  email: string
  username: string | null
  profile_picture: string | null
  skills: string[]
  wallet_address: string | null
  created_at: string
  updated_at: string
}

export interface ProfileUpdateInput {
  username: string
  skills: string[]
  profile_picture: string
}
