import { type NextRequest, NextResponse } from "next/server"
import { validateApiAuth, requireRole } from "@/lib/auth/api-auth"
import { createClient } from "@/lib/supabase/server"

export async function GET(request: NextRequest) {
  // 🔒 SECURE: Validate authentication
  const { user, error } = await validateApiAuth(request)
  if (error) return error

  try {
    const supabase = await createClient()

    // Fetch projects user has access to
    const { data: projects, error: projectsError } = await supabase.from("projects").select("*").eq("user_id", user!.id)

    if (projectsError) {
      return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 })
    }

    return NextResponse.json({ projects })
  } catch (error) {
    console.error("Projects API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  // 🔒 SECURE: Validate authentication
  const { user, error } = await validateApiAuth(request)
  if (error) return error

  // 🔒 SECURE: Role-based authorization (optional)
  if (!requireRole(user!.role, ["admin", "creator"])) {
    return NextResponse.json(
      {
        error: "Forbidden",
        message: "Insufficient permissions to create projects",
        code: "INSUFFICIENT_PERMISSIONS",
      },
      { status: 403 },
    )
  }

  try {
    const body = await request.json()

    // 🔒 SECURE: Input validation (add Zod schema here)
    if (!body.name || !body.description) {
      return NextResponse.json({ error: "Missing required fields: name, description" }, { status: 400 })
    }

    const supabase = await createClient()

    const { data: project, error: createError } = await supabase
      .from("projects")
      .insert({
        name: body.name,
        description: body.description,
        user_id: user!.id,
        created_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (createError) {
      return NextResponse.json({ error: "Failed to create project" }, { status: 500 })
    }

    return NextResponse.json({ project }, { status: 201 })
  } catch (error) {
    console.error("Create project error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
