import { NextResponse, type NextRequest } from "next/server"
import { updateSession } from "@/lib/supabase/middleware"
import { createServerClient } from "@supabase/ssr"

export async function middleware(request: NextRequest) {
  // Update the session first
  const response = await updateSession(request)

  // Add this near the top of the middleware function, after the updateSession call
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name) {
          return request.cookies.get(name)?.value
        },
        set() {
          // We don't need to set cookies in this middleware check
        },
        remove() {
          // We don't need to remove cookies in this middleware check
        },
      },
    },
  )

  // Get the pathname from the URL
  const pathname = request.nextUrl.pathname

  // Check for mock authentication
  const mockAuth = request.cookies.get("mock_auth")

  // Check if the pathname is for authentication pages
  const isAuthPage = pathname === "/login" || pathname === "/signup" || pathname === "/forgot-password"

  // Check if the pathname is for protected pages
  const isProtectedPage =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/projects") ||
    pathname.startsWith("/browse") ||
    pathname.startsWith("/roles") ||
    pathname.startsWith("/community") ||
    pathname.startsWith("/partners") ||
    pathname.startsWith("/grants") ||
    pathname.startsWith("/ventures") ||
    pathname.startsWith("/legal")

  // Get authentication status from Supabase session
  let isAuthenticated = false
  try {
    // Get the session from Supabase
    const {
      data: { session },
    } = await supabase.auth.getSession()
    isAuthenticated = !!session

    // If no session but mockAuth cookie exists (for development testing)
    if (!isAuthenticated && !!mockAuth) {
      isAuthenticated = true
    }
  } catch (error) {
    console.error("Error checking authentication:", error)
    // Fallback to cookie check if Supabase auth check fails
    const hasSupabaseAuthCookie = Array.from(request.cookies.getAll()).some(
      (cookie) => cookie.name.startsWith("sb-") && cookie.name.includes("-auth-token"),
    )
    isAuthenticated = hasSupabaseAuthCookie || !!mockAuth
  }

  // If the user is on an auth page and is authenticated, redirect to dashboard
  if (isAuthPage && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  // If user is authenticated and on root path, redirect to dashboard
  if (pathname === "/" && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  // If the user is on a protected page and is not authenticated, redirect to login
  if (isProtectedPage && !isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  return response
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
}
