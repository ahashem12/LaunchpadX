/**
 * Type definitions for API data models
 */

// Project Details
export interface ProjectDetails {
  id: string
  name: string
  logo: string
  banner: string
  description: string
  shortDescription: string
  category: string
  status: "active" | "inactive" | "completed"
  createdAt: string
  updatedAt: string
  foundedBy: {
    id: string
    name: string
  }
  media: ProjectMedia[]
}

export interface ProjectMedia {
  id: string
  type: "image" | "video"
  url: string
  title: string
  description?: string
}

// Project Events
export interface ProjectEvent {
  id: string
  title: string
  description: string
  startDate: string
  endDate: string
  location?: string
  virtual: boolean
  link?: string
  attendees?: number
}
// Project Roles
export interface ProjectRole {
  id: string
  title: string
  category: "business" | "technical" | "design"
  type: "team-member" | "co-founder" | "freelancer"
  description: string
  requiredSkills: string[]
  assigned: boolean
  assignedTo?: string
  compensation?: {
    flatMoney?: {
      min: number
      max: number
      currency: string
    }
    equity?: number
  }
}

// Project Updates
export interface ProjectUpdate {
  id: string
  title: string
  content: string
  author: {
    id: string
    name: string
    avatar?: string
  }
  createdAt: string
  attachments?: {
    id: string
    name: string
    url: string
    type: string
  }[]
}

// Agreement Options
export interface AgreementOption {
  id: string
  title: string
  description: string
  features: string[]
  color: string
  recommended: boolean
}

// Fundraising Data
export interface FundraisingData {
  enabled: boolean
  rounds?: FundingRound[]
  collections?: NFTCollection[]
  webpage?: {
    url: string
    status: "active" | "inactive" | "draft"
  }
}

export interface FundingRound {
  id: string
  name: string
  target: number
  raised: number
  currency: string
  startDate: string
  endDate: string
  status: "upcoming" | "active" | "completed" | "failed"
}

export interface NFTCollection {
  id: string
  name: string
  description: string
  items: number
  price: number
  currency: string
  sold: number
  imageUrl: string
}

// Treasury Data
export interface TreasuryData {
  balance: {
    fiat: {
      amount: number
      currency: string
    }[]
    crypto: {
      amount: number
      currency: string
      usdValue: number
    }[]
  }
  transactions: TreasuryTransaction[]
}

export interface TreasuryTransaction {
  id: string
  type: "income" | "expense"
  amount: number
  currency: string
  description: string
  date: string
  category: string
}

// Token Data
export interface TokenData {
  name: string
  symbol: string
  totalSupply: number
  distribution: {
    category: string
    percentage: number
    amount: number
  }[]
  price?: number
  marketCap?: number
  contractAddress?: string
  blockchain?: string
}

// Governance Data
export interface GovernanceData {
  enabled: boolean
  proposals: GovernanceProposal[]
  votingPower: {
    userId: string
    power: number
  }[]
}

export interface GovernanceProposal {
  id: string
  title: string
  description: string
  creator: {
    id: string
    name: string
  }
  status: "draft" | "active" | "passed" | "rejected"
  votesFor: number
  votesAgainst: number
  startDate: string
  endDate: string
}

// Documents
export interface Document {
  id: string
  name: string
  type: "business-plan" | "pitchdeck" | "litepaper" | "whitepaper" | "tokenomics" | "custom"
  url?: string
  canGenerate: boolean
  createdAt: string
  updatedAt: string
  createdBy?: {
    id: string
    name: string
  }
}

// Next Steps
export interface NextStep {
  id: string
  title: string
  description?: string
  done: boolean
  priority: number
}
