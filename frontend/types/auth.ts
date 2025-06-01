/**
 * Authentication and user related types
 */

export interface User {
  id: string
  email: string
  name?: string
  avatar_url?: string
  wallet_address?: string
  created_at?: string
  updated_at?: string
}

export interface AuthState {
  user: User | null
  loading: boolean
  error: string | null
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface SignupCredentials {
  email: string
  password: string
  name?: string
}
