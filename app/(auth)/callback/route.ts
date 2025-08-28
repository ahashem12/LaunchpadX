import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get("code")
  const next = requestUrl.searchParams.get("next") || "/change-password" 

  if (!code) {
    return NextResponse.redirect(new URL("/forgot-password?error=missing_code", requestUrl.origin)) 
  }

  const supabase = await createClient() 
  const { data, error } = await supabase.auth.exchangeCodeForSession(code) 

  console.log("Session exchange result:", { success: !!data?.session, error: error?.message })

  if (error) {
    return NextResponse.redirect(
      new URL(`/forgot-password?error=${encodeURIComponent(error.message)}`, requestUrl.origin),
    ) 
  }

  return NextResponse.redirect(new URL(next, requestUrl.origin))
}
