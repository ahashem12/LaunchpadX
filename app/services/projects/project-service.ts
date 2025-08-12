import { createProject } from "./create"
import { getProject, getUserProjects, getAllOpenRoles, getAllProjects } from "./read"
import { updateProject } from "./update"
import { deleteProject } from "./delete"
import { addProjectMember, removeProjectMember, hasProjectAccess } from "./members"
import { getTeamMembers, getProjectRoles, getRoleCategoryCounts } from "./team"
import { skillService } from "../skills"
import { roleService } from "../roles"

export const projectService = {
  createProject,
  getProject,
  updateProject,
  deleteProject,
  getUserProjects,
  getAllProjects,
  addProjectMember,
  removeProjectMember,
  getTeamMembers,
  getProjectRoles,
  getAllOpenRoles,
  getRoleCategoryCounts,
  hasProjectAccess,
  ...skillService,
  ...roleService,
}