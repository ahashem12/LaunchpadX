import { createProject } from "./create"
import { getProject, getUserProjects, getAllOpenRoles } from "./read"
import { updateProject } from "./update"
import { deleteProject } from "./delete"
import { addProjectMember, removeProjectMember, hasProjectAccess } from "./members"
import { getTeamMembers, getProjectRoles, getRoleCategoryCounts } from "./team"

export const projectService = {
  createProject,
  getProject,
  updateProject,
  deleteProject,
  getUserProjects,
  addProjectMember,
  removeProjectMember,
  getTeamMembers,
  getProjectRoles,
  getAllOpenRoles,
  getRoleCategoryCounts,
  hasProjectAccess,
}