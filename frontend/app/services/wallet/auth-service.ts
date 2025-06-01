import { supabase, checkSupabaseConnection, isOnline, shouldUseMockData } from "@/lib/supabase/supabase"
import { isDevelopment } from "@/lib/supabase/env"
import { walletPersistenceService } from "./wallet-persistence"
export interface UserProfile {
  id: string
  email: string | null
  walletAddress: string | null
}

// Local storage keys
const USER_STORAGE_KEY = "consulti_user_profile"
const AUTH_STATE_KEY = "consulti_auth_state"

// Mock users for development/testing
const MOCK_USERS = {
  "test@example.com": {
    id: "test-user-id",
    email: "test@example.com",
    password: "password",
    walletAddress: "0x123456789",
  },
}

// Helper to store user in local storage
const storeUserLocally = (user: UserProfile | null) => {
  if (typeof window === "undefined") return

  if (user) {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user))
  } else {
    localStorage.removeItem(USER_STORAGE_KEY)
  }
}

// Helper to get user from local storage
const getUserFromLocalStorage = (): UserProfile | null => {
  if (typeof window === "undefined") return null

  const storedUser = localStorage.getItem(USER_STORAGE_KEY)
  if (!storedUser) return null

  try {
    return JSON.parse(storedUser)
  } catch (error) {
    console.error("Error parsing stored user:", error)
    return null
  }
}

// Store authentication state
const storeAuthState = (isAuthenticated: boolean) => {
  if (typeof window === "undefined") return
  localStorage.setItem(AUTH_STATE_KEY, String(isAuthenticated))
}

// Get authentication state
const getAuthState = (): boolean => {
  if (typeof window === "undefined") return false
  return localStorage.getItem(AUTH_STATE_KEY) === "true"
}

// Helper to safely execute a function with fallback
const safeExecute = async <T>(
  fn: () => Promise<T>,
  fallback: T,
  errorMessage = "Operation failed"
)
: Promise<T> =>
{
  try {
    return await fn()
  } catch (error) {
    console.error(`${errorMessage}:`, error)
    return fallback
  }
}

export const authService = {
  /**
   * Get the current authenticated user
   */
  getCurrentUser: async (): Promise<UserProfile | null> => {
    const localUser = getUserFromLocalStorage()
    try {
      if (!isOnline()) {
        console.log("Browser is offline. Using local storage fallback.")
        return localUser
      }

      const useMock = await safeExecute(shouldUseMockData, false)
      if (useMock) {
        console.log("Using mock data for getCurrentUser")
        return localUser
      }

      const isAvailable = await safeExecute(checkSupabaseConnection, false)
      if (!isAvailable) {
        console.log("Supabase is not available. Using local storage fallback.")
        return localUser
      }

      const getUserResult = await safeExecute(
        () => supabase.auth.getUser(),
        { data: { user: null }, error: null },
        "Error getting user",
      )
      const { data: userData, error: userError } = getUserResult

      if (userError) {
        if (
          userError &&
          typeof userError === "object" &&
          "message" in userError &&
          typeof (userError as any).message === "string" &&
          (userError as any).message.includes("Auth session missing")
        ) {
          console.log("No active auth session found")
          storeUserLocally(null)
          storeAuthState(false)
          return null
        }
        console.error("Error getting user:", userError)
        return localUser
      }

      const user = userData.user
      if (!user) {
        storeUserLocally(null)
        storeAuthState(false)
        return null
      }

      // Explicitly type user as any or as the expected user type
      const typedUser = user as { id: string; email: string | null }
      const basicUser = { id: typedUser.id, email: typedUser.email, walletAddress: null }

      try {
        const getProfileResult = await safeExecute(
          () =>
            supabase
              .from("profiles")
              .select("wallet_address")
              .eq("id", (user as { id: string }).id)
              .single(),
          { data: null, error: null },
          "Error getting profile",
        )
        const { data: profile, error: profileError } = getProfileResult

        if (profileError) {
          console.error("Error getting profile:", profileError)
          if (
            typeof profileError === "object" &&
            profileError !== null &&
            "code" in profileError &&
            (profileError as any).code === "PGRST116"
          ) {
            storeUserLocally(basicUser)
            storeAuthState(true)
            return basicUser
          }
          if (
            typeof profileError === "object" &&
            profileError !== null &&
            "message" in profileError &&
            typeof (profileError as any).message === "string" &&
            (profileError as any).message.match(/(API key|apikey|authentication)/i)
          ) {
            console.warn("API key issue detected, using local storage fallback")
            return localUser
          }
          return localUser
        }

        const typedProfile = profile as { wallet_address?: string } | null
        const userProfile = {
          ...basicUser,
          walletAddress: typedProfile?.wallet_address || null,
        }
        storeUserLocally(userProfile)
        storeAuthState(true)
        return userProfile
      } catch (error) {
        console.error("Error in profile fetch:", error)
        storeUserLocally(basicUser)
        storeAuthState(true)
        return basicUser
      }
    } catch (error) {
      console.error("Unexpected error in getCurrentUser:", error)
      return localUser
    }
  },

  /**
   * Check if user is authenticated (works offline)
   */
  isAuthenticated: async (): Promise<boolean> => {
    if (getAuthState() && getUserFromLocalStorage()) {
      return true
    }
    if (!isOnline()) {
      return getAuthState()
    }

    const useMock = await safeExecute(shouldUseMockData, false)
    if (useMock) {
      return getAuthState()
    }

    try {
      const getSessionResult = await safeExecute(
        () => supabase.auth.getSession(),
        { data: { session: null }, error: null },
        "Error checking session",
      )
      const { data, error } = getSessionResult

      if (error) {
        console.error("Error checking session:", error)
        return getAuthState()
      }

      const isAuth = !!data.session
      storeAuthState(isAuth)
      return isAuth
    } catch (error) {
      console.error("Error checking authentication:", error)
      return getAuthState()
    }
  },

  /**
   * Update the user's wallet address
   */
  updateWalletAddress: async (walletAddress: string): Promise<void> => {
    try {
      const storedUser = getUserFromLocalStorage()
      if (storedUser) {
        storeUserLocally({ ...storedUser, walletAddress })
      }

      if (!isOnline()) {
        console.log("Browser is offline. Wallet address stored locally only.")
        return
      }

      const useMock = await safeExecute(shouldUseMockData, false)
      if (useMock) {
        console.log("Using mock data. Wallet address stored locally only.")
        return
      }

      const isAvailable = await safeExecute(checkSupabaseConnection, false)
      if (!isAvailable) {
        console.log("Supabase is not available. Wallet address stored locally only.")
        return
      }

      const getUserResult = await safeExecute(
        () => supabase.auth.getUser(),
        { data: { user: null }, error: null },
        "Error getting user for wallet update",
      )
      const { data: userData, error: userError } = getUserResult
      if (userError) {
        console.error("Error getting user:", userError)
        return
      }

      const user = userData.user as { id: string } | null
      if (!user) return

      const success = await walletPersistenceService.saveWalletAddress(user.id, walletAddress)
      if (!success) {
        console.error("Failed to save wallet address using persistence service")
      }
    } catch (error) {
      console.error("Error in updateWalletAddress:", error)
    }
  },

  /**
   * Remove the user's wallet address
   */
  removeWalletAddress: async (): Promise<void> => {
    try {
      const storedUser = getUserFromLocalStorage()
      if (storedUser) {
        storeUserLocally({ ...storedUser, walletAddress: null })
      }

      if (!isOnline()) {
        console.log("Browser is offline. Wallet address removed locally only.")
        return
      }

      const useMock = await safeExecute(shouldUseMockData, false)
      if (useMock) {
        console.log("Using mock data. Wallet address removed locally only.")
        return
      }

      const isAvailable = await safeExecute(checkSupabaseConnection, false)
      if (!isAvailable) {
        console.log("Supabase is not available. Wallet address removed locally only.")
        return
      }

      const getUserResult = await safeExecute(
        () => supabase.auth.getUser(),
        { data: { user: null }, error: null },
        "Error getting user for wallet removal",
      )
      const { data: userData, error: userError } = getUserResult
      if (userError) {
        console.error("Error getting user:", userError)
        return
      }

      const user = userData.user as { id: string } | null
      if (!user) return

      const success = await walletPersistenceService.removeWalletAddress(user.id)
      if (!success) {
        console.error("Failed to remove wallet address using persistence service")
      }
    } catch (error) {
      console.error("Error in removeWalletAddress:", error)
    }
  },

  /**
   * Sign in with email and password
   */
  signInWithEmail: async (email: string, password: string) => {
    try {
      if (!isOnline()) {
        throw new Error("Cannot sign in while offline. Please check your internet connection.")
      }

      const useMock = await safeExecute(shouldUseMockData, false)
      if (useMock) {
        console.log("Using mock data for signInWithEmail")
        const mockUser = MOCK_USERS[email as keyof typeof MOCK_USERS]
        if (!mockUser || mockUser.password !== password) {
          if (isDevelopment() && email === "test@example.com" && password === "password") {
            const testUser = {
              id: "test-user-id",
              email: "test@example.com",
              walletAddress: null,
            }
            storeAuthState(true)
            storeUserLocally(testUser)
            return { user: testUser }
          }
          throw new Error("Invalid login credentials")
        }

        storeAuthState(true)
        storeUserLocally({
          id: mockUser.id,
          email: mockUser.email,
          walletAddress: mockUser.walletAddress,
        })
        return { user: mockUser }
      }

      const isAvailable = await safeExecute(checkSupabaseConnection, false)
      if (!isAvailable) {
        if (isDevelopment() && email === "test@example.com" && password === "password") {
          console.log("Using test credentials in development mode")
          const testUser = {
            id: "test-user-id",
            email: "test@example.com",
            walletAddress: null,
          }
          storeAuthState(true)
          storeUserLocally(testUser)
          return { user: testUser }
        }
        throw new Error("Authentication service is currently unavailable. Please try again later.")
      }

      const signInResult = await safeExecute(
        () =>
          supabase.auth.signInWithPassword({
            email,
            password,
          }),
        { data: { user: null, session: null }, error: { message: "Failed to sign in" } },
        "Error signing in",
      )
      const { data, error } = signInResult
      if (error) {
        console.error("Sign in error:", error)
        throw error
      }

      storeAuthState(true)
      if (data.user && typeof data.user === "object" && "id" in data.user && "email" in data.user) {
        const user = data.user as { id: string; email: string | null }
        storeUserLocally({
          id: user.id,
          email: user.email,
          walletAddress: null,
        })
      }
      return data
    } catch (error) {
      console.error("Error in signInWithEmail:", error)
      throw error
    }
  },

  /**
   * Sign up with email and password
   */
  signUpWithEmail: async (email: string, password: string) => {
    try {
      if (!isOnline()) {
        throw new Error("Cannot sign up while offline. Please check your internet connection.")
      }

      const useMock = await safeExecute(shouldUseMockData, false)
      if (useMock) {
        console.log("Using mock data for signUpWithEmail")
        const newUser = {
          id: `user-${Date.now()}`,
          email,
          walletAddress: null,
        }
        storeAuthState(true)
        storeUserLocally(newUser)
        return { user: newUser }
      }

      const isAvailable = await safeExecute(checkSupabaseConnection, false)
      if (!isAvailable) {
        if (isDevelopment()) {
          console.log("Using mock signup in development mode")
          const newUser = {
            id: `user-${Date.now()}`,
            email,
            walletAddress: null,
          }
          storeAuthState(true)
          storeUserLocally(newUser)
          return { user: newUser }
        }
        throw new Error("Authentication service is currently unavailable. Please try again later.")
      }

      const signUpResult = await safeExecute(
        () =>
          supabase.auth.signUp({
            email,
            password,
          }),
        { data: { user: null }, error: { message: "Failed to sign up" } },
        "Error signing up",
      )
      const { data, error } = signUpResult
      if (error) {
        console.error("Sign up error:", error)
        throw error
      }

      if (data.user && typeof data.user === "object" && "id" in data.user && "email" in data.user) {
        storeAuthState(true)
        storeUserLocally({
          id: (data.user as { id: string }).id,
          email: (data.user as { email: string | null }).email,
          walletAddress: null,
        })
      }
      return data
    } catch (error) {
      console.error("Error in signUpWithEmail:", error)
      throw error
    }
  },

  /**
   * Sign out
   */
  signOut: async () => {
    try {
      storeUserLocally(null)
      storeAuthState(false)

      if (!isOnline()) {
        return
      }

      const useMock = await safeExecute(shouldUseMockData, false)
      if (useMock) {
        return
      }

      const signOutResult = await safeExecute(() => supabase.auth.signOut(), { error: null }, "Error signing out")
      if (signOutResult.error) {
        console.error("Sign out error:", signOutResult.error)
      }
    } catch (error) {
      console.error("Error in signOut:", error)
    }
  },
}
