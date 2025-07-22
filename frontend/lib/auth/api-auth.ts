import { createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

export interface AuthenticatedUser {
  id: string
  email: string
  role?: string
}

export async function validateApiAuth(request: NextRequest): Promise<{
  user: AuthenticatedUser | null
  error: NextResponse | null
}> {
  try {
    const supabase = await createClient()

    // Get session from Supabase
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession()

    if (sessionError || !session?.user) {
      return {
        user: null,
        error: NextResponse.json(
          {
            error: "Unauthorized",
            message: "Valid authentication required",
            code: "AUTH_REQUIRED",
          },
          { status: 401 },
        ),
      }
    }

    // Verify user exists and is active
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("id, email, role, status")
      .eq("id", session.user.id)
      .single()

    if (userError || !userData || userData.status !== "active") {
      return {
        user: null,
        error: NextResponse.json(
          {
            error: "Forbidden",
            message: "User account is not active",
            code: "USER_INACTIVE",
          },
          { status: 403 },
        ),
      }
    }

    return {
      user: {
        id: userData.id,
        email: userData.email,
        role: userData.role,
      },
      error: null,
    }
  } catch (error) {
    console.error("API Auth validation error:", error)
    return {
      user: null,
      error: NextResponse.json(
        {
          error: "Internal Server Error",
          message: "Authentication validation failed",
          code: "AUTH_ERROR",
        },
        { status: 500 },
      ),
    }
  }
}

// Role-based authorization helper
export function requireRole(userRole: string | undefined, requiredRoles: string[]): boolean {
  if (!userRole) return false
  return requiredRoles.includes(userRole)
}
