import { ViewToggle } from "./ViewToggle"
import { CreateProjectButton } from "./CreateProjectButton"

interface ProjectsHeaderProps {
  view: "grid" | "list"
  setView: (view: "grid" | "list") => void
  onProjectCreated?: () => void
}

export function ProjectsHeader({ view, setView, onProjectCreated = () => {} }: ProjectsHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">My Projects</h1>
        <p className="text-muted-foreground">Manage and track all your projects in one place.</p>
      </div>
      <div className="flex items-center gap-2 self-end sm:self-auto">
        <CreateProjectButton onProjectCreated={onProjectCreated} />
        <ViewToggle view={view} onChange={setView} />
      </div>
    </div>
  )
}
