/**
 * Wallet and blockchain related types
 */

export interface WalletState {
  address: string | null
  isConnected: boolean
  chainId: number | null
  balance: string | null
  loading: boolean
  error: string | null
}

export interface WalletConnection {
  address: string
  chainId: number
  provider: any
}

declare global {
  interface Window {
    ethereum?: {
      isMetaMask?: boolean
      request: (request: { method: string; params?: any[] }) => Promise<any>
      on: (event: string, callback: (...args: any[]) => void) => void
      removeListener: (event: string, callback: (...args: any[]) => void) => void
      selectedAddress?: string
      chainId?: string
    }
  }
}
