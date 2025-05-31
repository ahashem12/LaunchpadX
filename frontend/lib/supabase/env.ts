/**
 * Environment variables utility
 *
 * This file provides a centralized way to access environment variables
 * with proper type checking and default values.
 */

// Supabase Configuration
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
export const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || ""
export const SUPABASE_JWT_SECRET = process.env.SUPABASE_JWT_SECRET || ""

// Database Configuration
export const POSTGRES_URL = process.env.POSTGRES_URL || ""
export const POSTGRES_PRISMA_URL = process.env.POSTGRES_PRISMA_URL || ""
export const POSTGRES_URL_NON_POOLING = process.env.POSTGRES_URL_NON_POOLING || ""
export const POSTGRES_HOST = process.env.POSTGRES_HOST || ""
export const POSTGRES_USER = process.env.POSTGRES_USER || ""
export const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD || ""
export const POSTGRES_DATABASE = process.env.POSTGRES_DATABASE || ""

// Application Configuration
// export const USE_MOCK_DATA = process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true"
export const USE_MOCK_DATA = "true"
export const API_URL = process.env.NEXT_PUBLIC_API_URL || ""

// Authentication
export const JWT_SECRET = process.env.JWT_SECRET || ""
export const NEXTAUTH_URL = process.env.NEXTAUTH_URL || ""
export const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET || ""

// Feature Flags
export const ENABLE_WALLET_FEATURES = process.env.NEXT_PUBLIC_ENABLE_WALLET_FEATURES !== "false"

/**
 * Validates that required environment variables are set
 * @returns An object with validation results
 */
export function validateEnv() {
  const requiredVars = {
    supabase: {
      url: SUPABASE_URL,
      anonKey: SUPABASE_ANON_KEY,
    },
  }

  const missingVars = []

  // Check Supabase variables if not using mock data
  if (!USE_MOCK_DATA) {
    if (!requiredVars.supabase.url) missingVars.push("NEXT_PUBLIC_SUPABASE_URL")
    if (!requiredVars.supabase.anonKey) missingVars.push("NEXT_PUBLIC_SUPABASE_ANON_KEY")
  }

  return {
    isValid: missingVars.length === 0,
    missingVars,
  }
}

/**
 * Gets the environment name
 * @returns The current environment name (development, production, etc.)
 */
export function getEnvironment() {
  return process.env.NODE_ENV || "development"
}

/**
 * Checks if the application is running in development mode
 * @returns True if in development mode
 */
export function isDevelopment() {
  return getEnvironment() === "development"
}

/**
 * Checks if the application is running in production mode
 * @returns True if in production mode
 */
export function isProduction() {
  return getEnvironment() === "production"
}
