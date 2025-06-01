import type { Project } from "@/types"

export const projectTabFilters = [
  { value: "all", label: "All Projects", filter: () => true },
  { value: "in-progress", label: "In Progress", filter: (p: Project) => p.status === "in-progress" },
  { value: "planning", label: "Planning", filter: (p: Project) => p.status === "planning" },
  { value: "completed", label: "Completed", filter: (p: Project) => p.status === "completed" },
]
