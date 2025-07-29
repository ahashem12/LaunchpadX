export interface Role {
  id: string
  title: string
  company: string
  projectTagline: string
  category: string
  type: string
  description: string
  skills: string[]
  compensation: {
    type: "undisclosed" | "salary" | "equity" | "hourly"
    value?: string
  }
  postedAt: string
  bannerUrl?: string
  logoUrl?: string
}

export const mockRoles: Role[] = [
  {
    id: "1",
    title: "User Experience Designer",
    company: "IdeaSketch",
    projectTagline: "FROM TOPIC TO PATENT",
    category: "product",
    type: "co-founder",
    description:
      "We are seeking a visionary UI/UX Designer to join our team as a co-founder - someone who truly believes in the project and treats it with the...",
    skills: ["UI Design", "UX Design", "Figma", "User Research"],
    compensation: {
      type: "undisclosed",
    },
    postedAt: "2024-01-15T10:00:00Z",
    bannerUrl: "/placeholder.svg?height=128&width=400&query=gradient+purple+blue+tech",
  },
  {
    id: "2",
    title: "CTO - Technical",
    company: "IdeaSketch",
    projectTagline: "FROM TOPIC TO PATENT",
    category: "executive",
    type: "co-founder",
    description:
      "CTO Technical role for innovative patent management platform. Looking for technical leadership and vision.",
    skills: ["Full Stack Development", "System Architecture", "Leadership", "AI/ML"],
    compensation: {
      type: "undisclosed",
    },
    postedAt: "2024-01-14T10:00:00Z",
    bannerUrl: "/placeholder.svg?height=128&width=400&query=gradient+purple+blue+tech",
  },
  {
    id: "3",
    title: "Operations Manager",
    company: "Scriptonia",
    projectTagline: "SPARK IDEAS. SHIP PROJECTS. DONE.",
    category: "operations",
    type: "team-member",
    description:
      "Seeking an Operations Manager to streamline strategy, community, and growth. Ideal for someone with marketing, people, and biz dev...",
    skills: ["Operations", "Strategy", "Marketing", "Business Development"],
    compensation: {
      type: "undisclosed",
    },
    postedAt: "2024-01-13T10:00:00Z",
    bannerUrl: "/placeholder.svg?height=128&width=400&query=white+minimal+clean",
  },
  {
    id: "4",
    title: "CTO - Technical",
    company: "Scriptonia",
    projectTagline: "SPARK IDEAS. SHIP PROJECTS. DONE.",
    category: "executive",
    type: "co-founder",
    description:
      "Looking for a CTO to lead AI, cloud, and system architecture for Prompt Enhancer. Must be skilled in LLMs, infrastructure, and full-stack de...",
    skills: ["AI/ML", "Cloud Architecture", "Full Stack Development", "LLMs"],
    compensation: {
      type: "equity",
      value: "25",
    },
    postedAt: "2024-01-12T10:00:00Z",
    bannerUrl: "/placeholder.svg?height=128&width=400&query=white+minimal+clean",
  },
  {
    id: "5",
    title: "Product Designer",
    company: "SavAI",
    projectTagline: "AI-POWERED SAVINGS",
    category: "product",
    type: "freelancer",
    description:
      "Improve the usability and design of our AI-powered savings platform. Looking for creative design solutions.",
    skills: ["UI Design", "UX Design", "Product Design", "Prototyping"],
    compensation: {
      type: "undisclosed",
    },
    postedAt: "2024-01-11T10:00:00Z",
    bannerUrl: "/placeholder.svg?height=128&width=400&query=dark+orange+gradient+finance",
  },
  {
    id: "6",
    title: "Front End Developer",
    company: "HealthHarmony",
    projectTagline: "HARMONIZING HEALTH",
    category: "engineering",
    type: "team-member",
    description:
      "1st year UI/UX designer looking to build innovative healthcare solutions with modern web technologies.",
    skills: ["Frontend Development", "React", "TypeScript", "UI Design"],
    compensation: {
      type: "undisclosed",
    },
    postedAt: "2024-01-10T10:00:00Z",
    bannerUrl: "/placeholder.svg?height=128&width=400&query=dark+orange+gradient+healthcare",
  },
  {
    id: "7",
    title: "Member",
    company: "Namaste to Health",
    projectTagline: "WELLNESS JOURNEY",
    category: "business",
    type: "team-member",
    description: "Join our wellness platform team to help people on their health journey. Multiple roles available.",
    skills: ["Frontend Development", "Backend Development", "Marketing", "Content"],
    compensation: {
      type: "undisclosed",
    },
    postedAt: "2024-01-09T10:00:00Z",
    bannerUrl: "/placeholder.svg?height=128&width=400&query=dark+orange+gradient+wellness",
  },
  {
    id: "8",
    title: "Full Stack Developer",
    company: "ChainCred",
    projectTagline: "BLOCKCHAIN CREDENTIALS",
    category: "engineering",
    type: "team-member",
    description:
      "Maintain The Project - looking for full stack developers to work on blockchain credential verification system.",
    skills: ["Full Stack Development", "Blockchain", "Smart Contracts", "Web3"],
    compensation: {
      type: "undisclosed",
    },
    postedAt: "2024-01-08T10:00:00Z",
    bannerUrl: "/placeholder.svg?height=128&width=400&query=dark+orange+gradient+blockchain",
  },
]
