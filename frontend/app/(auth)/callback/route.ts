import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get("code")

  if (code) {
    const supabase = createClient()
    const { data, error } = await (await supabase).auth.exchangeCodeForSession(code)

    // Log the result for debugging (this will appear in server logs)
    console.log("Session exchange result:", {
      success: !!data.session,
      error: error?.message,
    })

    if (error) {
      console.error("Error exchanging code for session:", error)
      // Even if there's an error, we'll redirect to dashboard and let the middleware handle authentication
    }
  }

  // Redirect to dashboard after authentication
  return NextResponse.redirect(`${requestUrl.origin}/dashboard`)
}
