import { supabase } from "@/lib/supabase/supabase"
import type { UserProfile } from "./auth-service"

/**
 * Service for managing wallet address persistence
 */
export const walletPersistenceService = {
  /**
   * Save a wallet address for a user
   */
  saveWalletAddress: async (userId: string, walletAddress: string): Promise<boolean> => {
    try {
      // Check if the user exists in the profiles table
      const { data: existingProfile, error: fetchError } = await supabase
        .from("profiles")
        .select("id")
        .eq("id", userId)
        .single()

      if (fetchError && fetchError.code !== "PGRST116") {
        console.error("Error checking for existing profile:", fetchError)
        return false
      }

      if (!existingProfile) {
        // Create a new profile if it doesn't exist
        const { error: insertError } = await supabase.from("profiles").insert({
          id: userId,
          wallet_address: walletAddress,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })

        if (insertError) {
          console.error("Error creating profile with wallet address:", insertError)
          return false
        }
      } else {
        // Update existing profile with the wallet address
        const { error: updateError } = await supabase
          .from("profiles")
          .update({
            wallet_address: walletAddress,
            updated_at: new Date().toISOString(),
          })
          .eq("id", userId)

        if (updateError) {
          console.error("Error updating wallet address:", updateError)
          return false
        }
      }

      return true
    } catch (error) {
      console.error("Unexpected error saving wallet address:", error)
      return false
    }
  },

  /**
   * Remove a wallet address for a user
   */
  removeWalletAddress: async (userId: string): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          wallet_address: null,
          updated_at: new Date().toISOString(),
        })
        .eq("id", userId)

      if (error) {
        console.error("Error removing wallet address:", error)
        return false
      }

      return true
    } catch (error) {
      console.error("Unexpected error removing wallet address:", error)
      return false
    }
  },

  /**
   * Get a user's wallet address
   */
  getWalletAddress: async (userId: string): Promise<string | null> => {
    try {
      const { data, error } = await supabase.from("profiles").select("wallet_address").eq("id", userId).single()

      if (error) {
        console.error("Error getting wallet address:", error)
        return null
      }

      return data?.wallet_address || null
    } catch (error) {
      console.error("Unexpected error getting wallet address:", error)
      return null
    }
  },

  /**
   * Check if a wallet address is already associated with any user
   */
  isWalletAddressInUse: async (walletAddress: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase.from("profiles").select("id").eq("wallet_address", walletAddress).limit(1)

      if (error) {
        console.error("Error checking wallet address usage:", error)
        return false
      }

      return data && data.length > 0
    } catch (error) {
      console.error("Unexpected error checking wallet address usage:", error)
      return false
    }
  },

  /**
   * Get all users with connected wallets
   */
  getUsersWithWallets: async (): Promise<UserProfile[]> => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, email:auth.users.email, wallet_address")
        .not("wallet_address", "is", null)
        .join("auth.users", { foreignKey: "id" })

      if (error) {
        console.error("Error getting users with wallets:", error)
        return []
      }

      return (
        data?.map((profile: { id: any; email: any; wallet_address: any }) => ({
          id: profile.id,
          email: profile.email,
          walletAddress: profile.wallet_address,
        })) || []
      )
    } catch (error) {
      console.error("Unexpected error getting users with wallets:", error)
      return []
    }
  },
}
