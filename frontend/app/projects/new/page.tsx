import { CreateProjectForm } from "@/components/projects"

export default function NewProjectPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Create New Project</h1>
        <CreateProjectForm />
      </div>
    </div>
  )
}
