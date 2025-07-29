/**
 * Financial and treasury related types
 */

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
