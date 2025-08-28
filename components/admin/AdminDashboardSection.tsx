import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { adminService, type PendingUser } from "@/app/services/admin"
import type { Project } from "@/types"
import { formatDisplayName } from "@/lib/utils/string-utils"

export function AdminDashboardSection() {
  const [pendingProjects, setPendingProjects] = useState<Project[]>([])
  const [pendingUsers, setPendingUsers] = useState<PendingUser[]>([])
  const [loading, setLoading] = useState({
    projects: true,
    users: true,
    approving: {
      projectId: "",
      userId: ""
    }
  })

  const loadPendingItems = async () => {
    setLoading(prev => ({ ...prev, projects: true, users: true }))
    try {
      const [projects, users] = await Promise.all([
        adminService.getPendingProjects(),
        adminService.getPendingUsers()
      ])
      setPendingProjects(projects)
      setPendingUsers(users)
    } catch (error) {
      console.error("Error loading pending items:", error)
    } finally {
      setLoading(prev => ({ ...prev, projects: false, users: false }))
    }
  }

  useEffect(() => {
    loadPendingItems()
  }, [])

  const handleApproveProject = async (projectId: string) => {
    setLoading(prev => ({
      ...prev,
      approving: { ...prev.approving, projectId }
    }))

    const success = await adminService.approveProject(projectId)
    if (success) {
      setPendingProjects(prev => prev.filter(p => p.id !== projectId))
    }

    setLoading(prev => ({
      ...prev,
      approving: { ...prev.approving, projectId: "" }
    }))
  }

  const handleApproveUser = async (userId: string) => {
    setLoading(prev => ({
      ...prev,
      approving: { ...prev.approving, userId }
    }))

    const success = await adminService.approveUser(userId)
    if (success) {
      setPendingUsers(prev => prev.filter(u => u.id !== userId))
    }

    setLoading(prev => ({
      ...prev,
      approving: { ...prev.approving, userId: "" }
    }))
  }

  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex-shrink-0">
        <h2 className="text-2xl font-bold text-white">Approval Management</h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2 flex-1 min-h-0">
        {/* Pending Projects */}
        <Card className="bg-muted border-border h-full flex flex-col max-h-[50vh] pb-4">
          <CardHeader className="border-b border-border bg-muted/50">
            <CardTitle className="text-white">Pending Projects</CardTitle>
            <CardDescription>Projects waiting for approval</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
            {loading.projects ? (
              <div className="space-y-4">
                {[1, 2].map(i => (
                  <div key={i} className="h-16 bg-gray-800 rounded animate-pulse"></div>
                ))}
              </div>
            ) : pendingProjects.length > 0 ? (
              <div className="space-y-4">
                {pendingProjects.map(project => (
                  <div key={project.id} className="p-4 rounded-lg bg-gray-800/50">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-white">{project.name}</h3>
                        <p className="text-sm text-gray-400 line-clamp-1">
                          {project.description || 'No description'}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Created: {new Date(project.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => handleApproveProject(project.id)}
                        disabled={loading.approving.projectId === project.id}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        {loading.approving.projectId === project.id ? 'Approving...' : 'Approve'}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-400">No pending projects</p>
            )}
          </CardContent>
        </Card>

        {/* Pending Users */}
        <Card className="bg-muted border-border h-full flex flex-col max-h-[50vh] pb-4">
          <CardHeader className="border-b border-border bg-muted/50">
            <CardTitle className="text-white">Pending Users</CardTitle>
            <CardDescription>Users waiting for approval</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
            {loading.users ? (
              <div className="space-y-4">
                {[1, 2].map(i => (
                  <div key={i} className="h-16 bg-gray-800 rounded animate-pulse"></div>
                ))}
              </div>
            ) : pendingUsers.length > 0 ? (
              <div className="space-y-4">
                {pendingUsers.map(user => (
                  <div key={user.id} className="p-4 rounded-lg bg-gray-800/50">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium text-white">
                          {formatDisplayName({
                            firstName: user.firstName,
                            lastName: user.lastName,
                            email: user.email
                          })}
                        </h3>
                        <p className="text-sm text-gray-400">{user.email}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          Joined: {new Date(user.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => handleApproveUser(user.id)}
                        disabled={loading.approving.userId === user.id}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        {loading.approving.userId === user.id ? 'Approving...' : 'Approve'}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-400">No pending users</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
