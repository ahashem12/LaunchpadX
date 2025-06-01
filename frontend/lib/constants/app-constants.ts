// Application-wide constants

// Theme
export const THEME_STORAGE_KEY = "consulti-theme"

// API
export const API_ENDPOINTS = {
  AGREEMENTS: "/api/agreements",
  PROJECTS: "/api/projects",
  USERS: "/api/users",
  TEAMS: "/api/teams",
  DOCUMENTS: "/api/documents",
}

// Colors
export const BRAND_COLORS = {
  PRIMARY: "#007A3D",
  SECONDARY: "#FF4136",
  SUCCESS: "#10B981",
  WARNING: "#F59E0B",
  ERROR: "#EF4444",
}

// Routes
export const ROUTES = {
  HOME: "/",
  DASHBOARD: "/dashboard",
  PROJECTS: "/projects",
  AGREEMENTS: "/agreements",
  SETTINGS: "/settings",
  PROFILE: "/profile",
}

// Dashboard tabs
export const DASHBOARD_TABS = [
  { id: "project-details", label: "Project Details" },
  { id: "events", label: "Events" },
  { id: "next-steps", label: "Next Steps" },
  { id: "team-roles", label: "Team & Roles" },
  { id: "updates", label: "Updates" },
  { id: "agreement", label: "Agreement" },
  { id: "fundraising", label: "Fundraising" },
  { id: "treasury", label: "Treasury" },
  { id: "token", label: "Token" },
  { id: "governance", label: "Governance" },
  { id: "documents", label: "Documents" },
]
