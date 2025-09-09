import { createProject } from "./create";
import {
  getProject,
  getRole,
  getUserProjects,
  getAllOpenRoles,
  getAllProjects,
  getRoleType,
  getRoleCategory,
  getProjectOwner,
} from "./read";
import { updateProject } from "./update";
import { deleteProject } from "./delete";
import {
  addProjectMember,
  removeProjectMember,
  hasProjectAccess,
} from "./members";
import { getTeamMembers, getProjectRoles, getRoleCategoryCounts } from "./team";
import { skillService } from "../skills";
import { roleService } from "../roles";

import { ApplicationService } from "../applications/application-service";

import { get } from "http";

export const projectService = {
  createProject,
  getProject,
  getRole,
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
  getRoleType,
  getRoleCategory,
  getProjectOwner,
  hasProjectAccess,
  ...skillService,
  ...roleService,
  // Application services
  applyForRole: ApplicationService.applyForRole,
  getApplicationsForRole: ApplicationService.getApplicationsForRole,
  getUserApplicationStatus: ApplicationService.getUserApplicationStatus,
  updateApplicationStatus: ApplicationService.updateApplicationStatus,
};
