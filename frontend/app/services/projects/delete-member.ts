"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function deleteTeamMember(memberId: string, projectId: string) {
  const supabase = await createClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  
  if (authError || !user) redirect('/login')

  try {
    const { data: member, error: memberError } = await supabase
      .from("project_members")
      .select("user_id, project_id")
      .eq("id", memberId)
      .single()

    if (memberError || !member) throw new Error("Team member not found")
    if (member.project_id !== projectId) throw new Error("Member does not belong to this project")

    const { data: currentUserMembership } = await supabase
      .from("project_members")
      .select("role")
      .eq("project_id", projectId)
      .eq("user_id", user.id)
      .single()

    if (!currentUserMembership) throw new Error("Failed to verify permissions")
    if (currentUserMembership.role !== 'owner') throw new Error("Only project owners can remove members")
    if (member.user_id === user.id) throw new Error("Cannot remove yourself")

    const { error: deleteError } = await supabase
      .from("project_members")
      .delete()
      .eq("id", memberId)

    if (deleteError) throw new Error(`Failed to delete member: ${deleteError.message}`)

    revalidatePath(`/projects/${projectId}/team`)
    return { success: true }

  } catch (error) {
    throw error
  }
}