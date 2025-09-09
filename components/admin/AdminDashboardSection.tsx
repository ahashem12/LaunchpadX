import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { adminService, type PendingUser } from "@/app/services/admin"
import type { Project } from "@/types"
import { formatDisplayName } from "@/lib/utils/string-utils"

// Format date to a consistent format
const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  })
}

// Data access should go through services only

export function AdminDashboardSection() {
  const [pendingProjects, setPendingProjects] = useState<Project[]>([])
  const [pendingUsers, setPendingUsers] = useState<PendingUser[]>([])
  const [selectedItem, setSelectedItem] = useState<Project | PendingUser | null>(null)
  const [detailsLoading, setDetailsLoading] = useState(false)
  const [selectedUserProfile, setSelectedUserProfile] = useState<any | null>(null)
  const [selectedProjectOwner, setSelectedProjectOwner] = useState<any | null>(null)
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

  // Handlers to open details and fetch more info
  const handleProjectClick = async (project: Project) => {
    setSelectedItem(project)
    setSelectedProjectOwner(null)
    setSelectedUserProfile(null)
    setDetailsLoading(true)
    try {
      const owner = await adminService.getProjectOwner(project.id)
      if (owner) setSelectedProjectOwner(owner)
    } catch (e) {
      console.error("Error loading project owner details:", e)
    } finally {
      setDetailsLoading(false)
    }
  }

  const handleUserClick = async (user: PendingUser) => {
    setSelectedItem(user)
    setSelectedProjectOwner(null)
    setSelectedUserProfile(null)
    setDetailsLoading(true)
    try {
      const profile = await adminService.getProfileById(user.id)
      if (profile) setSelectedUserProfile(profile)
    } catch (e) {
      console.error("Error loading user details:", e)
    } finally {
      setDetailsLoading(false)
    }
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
                  <div key={project.id} className="p-4 rounded-lg bg-gray-800/50 cursor-pointer hover:bg-gray-800" onClick={() => handleProjectClick(project)}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-white">{project.name}</h3>
                        <p className="text-sm text-gray-400 line-clamp-1">
                          {project.description || 'No description'}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Created: {formatDate(project.created_at)}
                        </p>
                      </div>
                      <Button
                        size="sm"
                        onClick={(e) => { e.stopPropagation(); handleApproveProject(project.id) }}
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
                  <div key={user.id} className="p-4 rounded-lg bg-gray-800/50 cursor-pointer hover:bg-gray-800" onClick={() => handleUserClick(user)}>
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
                          Joined: {formatDate(user.created_at)}
                        </p>
                      </div>
                      <Button
                        size="sm"
                        onClick={(e) => { e.stopPropagation(); handleApproveUser(user.id) }}
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

      {selectedItem && (
        <Dialog open={!!selectedItem} onOpenChange={(isOpen) => !isOpen && setSelectedItem(null)}>
          <DialogContent className="bg-muted border-border text-white max-w-3xl">
            <DialogHeader>
              <DialogTitle className="text-xl">Details</DialogTitle>
            </DialogHeader>
            {detailsLoading ? (
              <div className="py-6 text-sm text-gray-400">Loading details…</div>
            ) : 'name' in selectedItem ? (
              // Project Details
              <div className="space-y-6">
                {/* Header */}
                <div>
                  <h3 className="font-bold text-2xl">{selectedItem.name}</h3>
                  <p className="text-sm text-gray-300 mt-1">
                    Created on {formatDate(selectedItem.created_at)}
                    {selectedItem.updated_at !== selectedItem.created_at && (
                      <span> • Updated {formatDate(selectedItem.updated_at)}</span>
                    )}
                  </p>
                </div>

                {/* Basic Information */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold border-b pb-2">Project Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-400">Status</p>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                        selectedItem.status === 'completed' ? 'bg-green-100 text-green-800' :
                        selectedItem.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {selectedItem.status.replace('-', ' ')}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-400">Category</p>
                      <p className="text-white">{selectedItem.category || 'Not specified'}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-400">Created</p>
                      <p className="text-white">{formatDate(selectedItem.created_at)}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-400">Last Updated</p>
                      <p className="text-white">{formatDate(selectedItem.updated_at)}</p>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <h4 className="text-lg font-semibold border-b pb-2">Description</h4>
                  <p className="text-gray-300 whitespace-pre-wrap">
                    {selectedItem.description || 'No description provided.'}
                  </p>
                </div>

                {/* Short Description */}
                {selectedItem.short_description && (
                  <div className="space-y-2">
                    <h4 className="text-lg font-semibold border-b pb-2">Short Description</h4>
                    <p className="text-gray-300">{selectedItem.short_description}</p>
                  </div>
                )}

                {/* Media Links */}
                {(selectedItem.logo_url || selectedItem.banner_url) && (
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold border-b pb-2">Media</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {selectedItem.logo_url && (
                        <div>
                          <p className="text-sm font-medium text-gray-400 mb-1">Logo URL</p>
                          <a 
                            href={selectedItem.logo_url} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-blue-400 hover:underline text-sm break-all"
                          >
                            {selectedItem.logo_url}
                          </a>
                        </div>
                      )}
                      {selectedItem.banner_url && (
                        <div>
                          <p className="text-sm font-medium text-gray-400 mb-1">Banner URL</p>
                          <a 
                            href={selectedItem.banner_url} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-blue-400 hover:underline text-sm break-all"
                          >
                            {selectedItem.banner_url}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                <hr className="border-border" />
                <div className="mt-6 space-y-4">
                  <h4 className="text-lg font-semibold border-b pb-2">Project Owner</h4>
                  {selectedProjectOwner ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-gray-400">Name</p>
                          <p className="text-white">
                            {formatDisplayName({ 
                              firstName: selectedProjectOwner.firstName, 
                              lastName: selectedProjectOwner.lastName, 
                              email: selectedProjectOwner.email 
                            })}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-400">Email</p>
                          <p className="text-white break-all">{selectedProjectOwner.email || '—'}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-400">Role</p>
                          <p className="text-white">{selectedProjectOwner.role || '—'}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-400">Reputation</p>
                          <p className="text-white">{selectedProjectOwner.reputation ?? 0} points</p>
                        </div>
                      </div>
                      
                      {(selectedProjectOwner.githubUrl || selectedProjectOwner.websiteUrl) && (
                        <div className="pt-2">
                          <h5 className="text-sm font-medium text-gray-400 mb-2">Social Links</h5>
                          <div className="flex flex-wrap gap-4">
                            {selectedProjectOwner.githubUrl && (
                              <a 
                                href={selectedProjectOwner.githubUrl} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="flex items-center space-x-1 text-blue-400 hover:underline text-sm"
                              >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                                </svg>
                                <span>GitHub</span>
                              </a>
                            )}
                            {selectedProjectOwner.websiteUrl && (
                              <a 
                                href={selectedProjectOwner.websiteUrl} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="flex items-center space-x-1 text-blue-400 hover:underline text-sm"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/>
                                </svg>
                                <span>Website</span>
                              </a>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-400">Owner information not available.</p>
                  )}
                </div>
              </div>
            ) : (
              // User Details
              <div className="space-y-6">
                {/* Header */}
                <div>
                  <h3 className="font-bold text-2xl">{formatDisplayName(selectedUserProfile || selectedItem)}</h3>
                  <p className="text-sm text-gray-300 mt-1">Member since {formatDate(selectedUserProfile?.created_at || (selectedItem as PendingUser).created_at)}</p>
                </div>

                {/* Basic Information */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold border-b pb-2">Basic Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-400">First Name</p>
                      <p className="text-white">{selectedUserProfile?.firstName ?? (selectedItem as PendingUser).firstName ?? '—'}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-400">Last Name</p>
                      <p className="text-white">{selectedUserProfile?.lastName ?? (selectedItem as PendingUser).lastName ?? '—'}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-400">Email</p>
                      <p className="text-white break-all">{(selectedUserProfile?.email ?? (selectedItem as PendingUser).email) || '—'}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-400">Phone</p>
                      <p className="text-white">{(selectedItem as PendingUser).phoneNumber || '—'}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-400">Field of Expertise</p>
                      <p className="text-white">{(selectedItem as PendingUser).fieldOfExpertise || selectedUserProfile?.fieldOfExpertise || '—'}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-400">Reason for Joining</p>
                      <p className="text-white">{(selectedItem as PendingUser).joiningReason || '—'}</p>
                    </div>
                  </div>
                </div>

                {/* Profile Details */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold border-b pb-2">Profile Details</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-400">City</p>
                      <p className="text-white">{selectedUserProfile?.city || 'Not specified'}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-400">Status</p>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        selectedUserProfile?.is_active 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {selectedUserProfile?.is_active ? 'Active' : 'Pending Approval'}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-400">Reputation</p>
                      <p className="text-white">{selectedUserProfile?.reputation || 0} points</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-400">Wallet Address</p>
                      <p className="font-mono text-sm text-white break-all">
                        {selectedUserProfile?.wallet_address || 'Not connected'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bio */}
                {(selectedUserProfile?.bio || (selectedItem as PendingUser).bio) && (
                  <div className="space-y-2">
                    <h4 className="text-lg font-semibold border-b pb-2">About</h4>
                    <p className="text-gray-300 whitespace-pre-wrap">
                      {selectedUserProfile?.bio || (selectedItem as PendingUser).bio}
                    </p>
                  </div>
                )}

                {/* Skills */}
                {selectedUserProfile?.skills?.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-lg font-semibold border-b pb-2">Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedUserProfile.skills.map((skill: string, idx: number) => (
                        <span
                          key={idx}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Social Links */}
                {(selectedUserProfile?.githubUrl || selectedUserProfile?.linkedinUrl || 
                  selectedUserProfile?.twitterUrl || selectedUserProfile?.websiteUrl ||
                  selectedUserProfile?.discordUrl || selectedUserProfile?.telegramUrl) && (
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold border-b pb-2">Social Links</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {selectedUserProfile?.githubUrl && (
                        <div className="flex items-center space-x-2">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                          </svg>
                          <a href={selectedUserProfile.githubUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                            {selectedUserProfile.githubUrl}
                          </a>
                        </div>
                      )}
                      {selectedUserProfile?.linkedinUrl && (
                        <div className="flex items-center space-x-2">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                          </svg>
                          <a href={selectedUserProfile.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                            {selectedUserProfile.linkedinUrl}
                          </a>
                        </div>
                      )}
                      {selectedUserProfile?.twitterUrl && (
                        <div className="flex items-center space-x-2">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.4 0-.79-.023-1.17-.068a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                          </svg>
                          <a href={selectedUserProfile.twitterUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                            {selectedUserProfile.twitterUrl}
                          </a>
                        </div>
                      )}
                      {selectedUserProfile?.websiteUrl && (
                        <div className="flex items-center space-x-2">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/>
                          </svg>
                          <a href={selectedUserProfile.websiteUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                            {selectedUserProfile.websiteUrl}
                          </a>
                        </div>
                      )}
                      {selectedUserProfile?.discordUrl && (
                        <div className="flex items-center space-x-2">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.84 19.84 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.95-2.419 2.157-2.419 1.21 0 2.176 1.088 2.157 2.42 0 1.333-.95 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.953-2.419 2.157-2.419 1.21 0 2.176 1.088 2.157 2.42 0 1.333-.95 2.418-2.157 2.418z"/>
                          </svg>
                          <a href={selectedUserProfile.discordUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                            {selectedUserProfile.discordUrl}
                          </a>
                        </div>
                      )}
                      {selectedUserProfile?.telegramUrl && (
                        <div className="flex items-center space-x-2">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                          </svg>
                          <a href={selectedUserProfile.telegramUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                            {selectedUserProfile.telegramUrl}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
