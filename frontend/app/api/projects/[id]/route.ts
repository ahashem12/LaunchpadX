import { type NextRequest, NextResponse } from "next/server"
import { validateApiAuth } from "@/lib/auth/api-auth"
import { createClient } from "@/lib/supabase/server"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  // 🔒 SECURE: Validate authentication
  const { user, error } = await validateApiAuth(request)
  if (error) return error

  try {
    const supabase = await createClient()

    // 🔒 SECURE: Verify user owns the project or has access
    const { data: project, error: projectError } = await supabase
      .from("projects")
      .select("*")
      .eq("id", params.id)
      .eq("user_id", user!.id) // Ensure user owns the project
      .single()

    if (projectError || !project) {
      return NextResponse.json(
        {
          error: "Project not found or access denied",
          code: "PROJECT_NOT_FOUND",
        },
        { status: 404 },
      )
    }

    return NextResponse.json({ project })
  } catch (error) {
    console.error("Get project error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  // 🔒 SECURE: Validate authentication
  const { user, error } = await validateApiAuth(request)
  if (error) return error

  try {
    const body = await request.json()
    const supabase = await createClient()

    // 🔒 SECURE: Verify ownership before update
    const { data: existingProject } = await supabase.from("projects").select("user_id").eq("id", params.id).single()

    if (!existingProject || existingProject.user_id !== user!.id) {
      return NextResponse.json(
        {
          error: "Project not found or access denied",
          code: "PROJECT_ACCESS_DENIED",
        },
        { status: 403 },
      )
    }

    const { data: project, error: updateError } = await supabase
      .from("projects")
      .update({
        name: body.name,
        description: body.description,
        updated_at: new Date().toISOString(),
      })
      .eq("id", params.id)
      .eq("user_id", user!.id) // Double-check ownership
      .select()
      .single()

    if (updateError) {
      return NextResponse.json({ error: "Failed to update project" }, { status: 500 })
    }

    return NextResponse.json({ project })
  } catch (error) {
    console.error("Update project error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
