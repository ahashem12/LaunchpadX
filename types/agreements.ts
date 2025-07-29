/**
 * Agreement and legal document types
 */

export interface AgreementOption {
  id: string
  title: string
  description: string
  features: string[]
  color: string
  recommended: boolean
}

export interface AgreementData {
  organization: {
    name: string
    tokenName: string
    tokenSymbol: string
    tokenDecimals: number
    coFounders: Array<{
      id: string
      name: string
      role: string
      tag?: string
      avatar?: string
    }>
  }
  equity: {
    limitTokenAmount: boolean
    totalTokens: number
    enableVesting: boolean
    allocations: Array<{
      userId: string
      percentage: number
      tokenAmount: number
    }>
  }
  governance: {
    model: "proportional" | "quadratic" | "cooperative"
  }
  document?: {
    file: File | null
    name: string
    size: number
    ipfsCid: string
    uploading: boolean
    uploaded: boolean
  }
}

export interface ValidationErrors {
  [key: string]: string
}
