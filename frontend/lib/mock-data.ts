import type { Project, User, TeamMember, NextStep } from "@/types"

// Mock user data
export const mockUsers: User[] = [
  {
    id: "1",
    email: "user@example.com",
    name: "Demo User",
    avatar_url: "/diverse-avatars.png",
  },
]

// Mock project data
export const mockProjects: Project[] = [
  {
    id: "1",
    name: "AI-Powered Market Analysis",
    description:
      "Develop an AI system that analyzes market trends and provides actionable insights for investment decisions.",
    status: "in-progress",
    created_at: "2023-01-15T10:00:00Z",
    updated_at: "2023-05-20T14:30:00Z",
  },
  {
    id: "2",
    name: "Blockchain Supply Chain Tracker",
    description: "Create a blockchain-based system to track and verify supply chain operations with immutable records.",
    status: "planning",
    created_at: "2023-03-10T09:15:00Z",
    updated_at: "2023-05-18T11:45:00Z",
  },
  {
    id: "3",
    name: "Sustainable Energy Marketplace",
    description:
      "Build a platform connecting renewable energy producers with consumers, facilitating direct energy trading.",
    status: "completed",
    created_at: "2022-11-05T16:20:00Z",
    updated_at: "2023-04-30T13:10:00Z",
  },
  {
    id: "4",
    name: "Healthcare Data Exchange",
    description:
      "Develop a secure system for healthcare providers to exchange patient data while maintaining privacy and compliance.",
    status: "in-progress",
    created_at: "2023-02-20T08:45:00Z",
    updated_at: "2023-05-15T09:30:00Z",
  },
  {
    id: "5",
    name: "Smart City Infrastructure",
    description:
      "Design IoT infrastructure for urban environments to improve efficiency, sustainability, and quality of life.",
    status: "planning",
    created_at: "2023-04-12T13:40:00Z",
    updated_at: "2023-05-10T15:20:00Z",
  },
  {
    id: "6",
    name: "Decentralized Finance Platform",
    description:
      "Create a DeFi platform offering lending, borrowing, and yield farming services without traditional intermediaries.",
    status: "in-progress",
    created_at: "2023-01-30T11:25:00Z",
    updated_at: "2023-05-05T10:15:00Z",
  },
]

export const mockTeamMembers: TeamMember[] = [
  {
    id: "tm-1",
    project_id: "1",
    user_id: "1",
    role: "owner",
    title: "CEO - BUSINESS",
    name: "USER1 (YOU)",
    email: "example@gmail.com",
    avatar: "/diverse-avatars.png",
    bio: "Project founder and CEO",
    skills: ["Business Strategy", "Leadership", "Product Management"],
  },
  {
    id: "tm-2",
    project_id: "1",
    user_id: "2",
    role: "admin",
    title: "CTO - TECHNICAL",
    name: "ahmadhashem2806",
    email: "ahmad@example.com",
    avatar: "/diverse-user-avatar-set-2.png",
    bio: "Technical lead and blockchain expert",
    skills: ["Blockchain", "Smart Contracts", "Full Stack Development"],
    },
]

// Function to get all projects
export function getAllProjects(): Project[] {
  return mockProjects
}
// Function to get a project by ID
export function getProjectById(id: string): Project | undefined {
  return mockProjects.find((project) => project.id === id)
}

// Function to get the current user
export function getCurrentUser(): User {
  return mockUsers[0]
}

export function getAllTeamMembers(): TeamMember[] {
  return mockTeamMembers
}

// Function to get team members by project ID
export function getTeamMembersByProjectId(projectId: string): TeamMember[] {
  return mockTeamMembers.filter((member) => member.project_id === projectId)
}

// Function to get a team member by ID
export function getTeamMemberById(id: string): TeamMember | undefined {
  return mockTeamMembers.find((member) => member.id === id)
}
