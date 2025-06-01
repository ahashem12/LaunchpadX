import Link from "next/link"
import { Plus, ArrowRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getAllProjects } from "@/lib/mock-data"

export default function DashboardPage() {
  const projects = getAllProjects()
  const inProgressCount = projects.filter((p) => p.status === "in-progress").length
  const planningCount = projects.filter((p) => p.status === "planning").length
  const completedCount = projects.filter((p) => p.status === "completed").length

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
              {projects.slice(0, 3).map((project) => (
                <div key={project.id} className="flex items-center gap-4">
                  <div className="h-2 w-2 rounded-full bg-watermelon-red" />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none text-white">{project.name}</p>
                    <p className="text-xs text-gray-400">Status updated to {project.status.replace("-", " ")}</p>
                  </div>
                </div>
              ))}
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
              <div className="rounded-lg bg-black/20 p-3">
                <p className="text-sm text-white">
                  Your "AI-Powered Market Analysis" project is progressing well, but consider adding more resources to
                  meet the deadline.
                </p>
              </div>
              <div className="rounded-lg bg-black/20 p-3">
                <p className="text-sm text-white">
                  The "Blockchain Supply Chain Tracker" project plan needs more detailed milestones.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

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
          {projects.slice(0, 3).map((project) => (
            <Link key={project.id} href={`/projects/${project.id}`}>
              <div className="h-full rounded-lg bg-muted border border-border overflow-hidden transition-all hover:border-watermelon-green">
                <div className="p-4">
                  <h3 className="font-medium text-white line-clamp-1 mb-2">{project.name}</h3>
                  <p className="line-clamp-2 text-sm text-gray-400">{project.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
