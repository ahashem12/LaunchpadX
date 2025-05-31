/**
 * Governance and voting types
 */

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
