import { createProject } from "./create"
import { getProject, getUserProjects, getProjectRoles, getAllOpenRoles } from "./read"
import { updateProject } from "./update"
import { deleteProject } from "./delete"
import { addProjectMember, removeProjectMember, hasProjectAccess } from "./members"
import { getTeamMembers } from "./team"

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
  hasProjectAccess,
}