import { createClient } from "@supabase/supabase-js"
import { SUPABASE_URL, SUPABASE_ANON_KEY, USE_MOCK_DATA, isDevelopment, validateEnv } from "./env"

// Check if we're in a browser environment
const isBrowser = typeof window !== "undefined"

// Helper to check if we're online
export const isOnline = () => {
  return isBrowser ? navigator.onLine : true
}

// Create a dummy client that doesn't throw errors for operations
const createDummyClient = () => {
  console.warn("Creating dummy Supabase client - all operations will be mocked")

  // Return a mock client that doesn't throw errors
  return {
    auth: {
      getUser: async () => ({ data: { user: null }, error: null }),
      getSession: async () => ({ data: { session: null }, error: null }),
      signInWithPassword: async ({ email, password }: { email: string; password: string }) => {
        // For testing, allow sign in with test@example.com/password
        if (email === "test@example.com" && password === "password") {
          return {
            data: {
              user: {
                id: "test-user-id",
                email: "test@example.com",
              },
              session: {
                access_token: "mock-token",
              },
            },
            error: null,
          }
        }
        return { data: { user: null, session: null }, error: { message: "Invalid login credentials" } }
      },
      signUp: async ({ email }: { email: string }) => ({
        data: {
          user: {
            id: "new-user-id",
            email,
          },
        },
        error: null,
      }),
      signOut: async () => ({ error: null }),
      onAuthStateChange: () => ({
        data: { subscription: { unsubscribe: () => {} } },
      }),
    },
    from: () => ({
      select: () => ({
        eq: () => ({
          single: async () => ({ data: null, error: null }),
        }),
      }),
      update: () => ({
        eq: async () => ({ error: null }),
      }),
    }),
  }
}

// Safe fetch wrapper that doesn't throw network errors
const safeFetch = async (input: RequestInfo | URL, options?: RequestInit): Promise<Response> => {
  try {
    return await fetch(input, options)
  } catch (error) {
    console.error("Network error in safeFetch:", error)
    // Return a fake response that won't throw when json() is called
    return {
      ok: false,
      status: 0,
      statusText: "Network Error",
      json: async () => ({ error: "Network Error" }),
      text: async () => "Network Error",
      headers: new Headers(),
    } as Response
  }
}

// Validate environment variables
const envValidation = validateEnv()
if (!envValidation.isValid && !USE_MOCK_DATA) {
  console.warn(`Missing required environment variables: ${envValidation.missingVars.join(", ")}`)
  console.warn("Using mock data as fallback due to missing environment variables")
}

// Initialize Supabase client
export const supabase = (() => {
  // If we're using mock data, return a dummy client
  if (USE_MOCK_DATA) {
    return createDummyClient() as any
  }

  // Check if Supabase URL and anon key are available
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.warn("Supabase URL or anon key is missing. Using dummy client.")
    return createDummyClient() as any
  }

  try {
    // Create the real Supabase client
    return createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
      global: {
        fetch: safeFetch,
      },
    })
  } catch (error) {
    console.error("Error creating Supabase client:", error)
    return createDummyClient() as any
  }
})()

// Check if Supabase is available
export const checkSupabaseConnection = async (): Promise<boolean> => {
  // If we're using mock data, always return true
  if (USE_MOCK_DATA) {
    return true
  }

  // If we're offline, return false
  if (!isOnline()) {
    return false
  }

  // If Supabase URL or anon key is missing, return false
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    return false
  }

  try {
    // Try to get the current session as a lightweight check
    const { error } = await supabase.auth.getSession()

    // If there's an error, log it and return false
    if (error) {
      console.error("Supabase connection check failed:", error)
      return false
    }

    // If we got here, Supabase is available
    return true
  } catch (error) {
    console.error("Supabase connection check failed:", error)
    return false
  }
}

// Force mock mode if we're in development and Supabase is not available
export const shouldUseMockData = async (): Promise<boolean> => {
  // If mock mode is explicitly enabled, use it
  if (USE_MOCK_DATA) {
    return true
  }

  // If we're in development, check if Supabase is available
  if (isDevelopment()) {
    try {
      const isAvailable = await checkSupabaseConnection()
      return !isAvailable
    } catch (error) {
      return true
    }
  }

  return false
}
