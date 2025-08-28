"use client"

import Link from "next/link"
import { Plus, ArrowRight, Shield } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { projectService } from "@/app/services/projects/project-service"
import { adminService } from "@/app/services/admin"
import { AdminDashboardSection } from "@/components/admin"
import { useState, useEffect } from "react"
import type { Project } from "@/types"

export default function DashboardPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const [recentActivity, setRecentActivity] = useState<Array<{id: string, name: string, status: string, updatedAt: string}>>([])
  const [aiInsights, setAiInsights] = useState<Array<{id: string, message: string}>>([])

  useEffect(() => {
    loadDashboardData()
    checkAdminStatus()
  }, [])

  const checkAdminStatus = async () => {
    const adminStatus = await adminService.isAdmin()
    setIsAdmin(adminStatus)
  }

  const loadDashboardData = async () => {
    setIsLoading(true)
    try {
      // Fetch user's projects
      const userProjects = await projectService.getUserProjects()
      setProjects(userProjects)

      // Generate recent activity from projects (simulate activity feed)
      const activity = userProjects.slice(0, 3).map(project => ({
        id: project.id,
        name: project.name,
        status: project.status || 'active',
        updatedAt: project.updated_at || project.created_at || new Date().toISOString()
      }))
      setRecentActivity(activity)

      // Generate AI insights based on projects (placeholder logic)
      const insights = [
        {
          id: '1',
          message: userProjects.length > 0 
            ? `Your "${userProjects[0].name}" project is progressing well, but consider adding more resources to meet the deadline.`
            : 'Start a new project to get personalized AI insights.'
        },
        {
          id: '2', 
          message: userProjects.length > 1
            ? `The "${userProjects[1].name}" project plan needs more detailed milestones.`
            : 'Consider collaborating with community members on your projects.'
        }
      ]
      setAiInsights(insights)
    } catch (error) {
      console.error('Failed to load dashboard data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const inProgressCount = projects.filter((p) => p.status === "in-progress").length
  const planningCount = projects.filter((p) => p.status === "planning").length
  const completedCount = projects.filter((p) => p.status === "completed").length

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <Link href="/projects/new">
            <Button className="bg-watermelon-green hover:bg-watermelon-green/90">
              <Plus className="h-4 w-4 mr-2" />
              New Project
            </Button>
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="bg-muted border-border animate-pulse">
              <CardHeader className="pb-2">
                <div className="h-6 bg-gray-800 rounded"></div>
                <div className="h-4 bg-gray-800 rounded w-3/4"></div>
              </CardHeader>
              <CardContent>
                <div className="h-12 bg-gray-800 rounded mb-2"></div>
                <div className="h-4 bg-gray-800 rounded w-1/2"></div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">Recent Projects</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 rounded-lg bg-muted border border-border animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">      
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">
          {isAdmin ? (
            <span className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-yellow-400" />
              Admin Dashboard
            </span>
          ) : (
            'Dashboard'
          )}
        </h1>
        <Link href="/projects/new">
          <Button className="bg-watermelon-green hover:bg-watermelon-green/90">
            <Plus className="h-4 w-4 mr-2" />
            New Project
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="bg-muted border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-white">Projects</CardTitle>
            <CardDescription className="text-gray-400">Your project statistics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-white">{projects.length}</div>
            <p className="text-sm text-gray-400">Total projects</p>
            <div className="mt-4 grid grid-cols-3 gap-2 text-center">
              <div className="rounded-lg bg-black/20 p-2">
                <div className="text-lg font-medium text-white">{inProgressCount}</div>
                <div className="text-xs text-gray-400">In Progress</div>
              </div>
              <div className="rounded-lg bg-black/20 p-2">
                <div className="text-lg font-medium text-white">{planningCount}</div>
                <div className="text-xs text-gray-400">Planning</div>
              </div>
              <div className="rounded-lg bg-black/20 p-2">
                <div className="text-lg font-medium text-white">{completedCount}</div>
                <div className="text-xs text-gray-400">Completed</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-muted border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-white">Recent Activity</CardTitle>
            <CardDescription className="text-gray-400">Your latest project updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.length > 0 ? (
                recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center gap-4">
                    <div className="h-2 w-2 rounded-full bg-watermelon-red" />
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none text-white">{activity.name}</p>
                      <p className="text-xs text-gray-400">Status updated to {activity.status.replace("-", " ")}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-400">No recent activity</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-muted border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-white">AI Insights</CardTitle>
            <CardDescription className="text-gray-400">Recommendations from your AI consultant</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {aiInsights.map((insight) => (
                <div key={insight.id} className="rounded-lg bg-black/20 p-3">
                  <p className="text-sm text-white">{insight.message}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {isAdmin && <AdminDashboardSection />}

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-white">Recent Projects</h2>
          <Link href="/projects">
            <Button variant="ghost" className="text-gray-400 hover:text-white">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projects.length > 0 ? (
            projects.slice(0, 3).map((project) => (
              <Link key={project.id} href={`/projects/${project.id}`}>
                <div className="h-full rounded-lg bg-muted border border-border overflow-hidden transition-all hover:border-watermelon-green">
                  <div className="p-4">
                    <h3 className="font-medium text-white line-clamp-1 mb-2">{project.name}</h3>
                    <p className="line-clamp-2 text-sm text-gray-400">{project.description || 'No description available'}</p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center py-8">
              <p className="text-gray-400 mb-4">No projects yet</p>
              <Link href="/projects/new">
                <Button className="bg-watermelon-green hover:bg-watermelon-green/90">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Your First Project
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
