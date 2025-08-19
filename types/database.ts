/**
 * Database schema types
 */

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          firstName: string | null
          lastName: string | null
          avatar_url: string
          skills: never[]
          id: string
          wallet_address: string | null
          created_at: string
          updated_at: string
          name: string | null
          email: string | null
        }
        Insert: {
          id: string
          wallet_address?: string | null
          created_at?: string
          updated_at?: string
          name?: string | null
          email?: string | null
        }
        Update: {
          id?: string
          wallet_address?: string | null
          created_at?: string
          updated_at?: string
          name?: string | null
          email?: string | null
        }
      }
      projects: {
        Row: {
          id: string
          name: string
          description: string
          short_description?: string | null
          status: string
          created_at: string
          updated_at: string
          logo_url?: string | null
          banner_url?: string | null
          category?: string | null
        }
        Insert: {
          name: string
          description: string
          short_description?: string | null
          status?: string
          logo_url?: string | null
          banner_url?: string | null
          category?: string | null
        }
        Update: {
          name?: string
          description?: string
          short_description?: string | null
          status?: string
          logo_url?: string | null
          banner_url?: string | null
          category?: string | null
        }
      }
      project_members: {
        Row: {
          id: string
          project_id: string
          user_id: string
          role: string
          created_at: string
          updated_at: string
        }
        Insert: {
          project_id: string
          user_id: string
          role: string
        }
        Update: {
          role?: string
        }
      }
    }
  }
}
