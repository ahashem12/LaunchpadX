export interface WalletInfo {
  address: string
  chainId: string
}

export const walletService = {
  /**
   * Check if MetaMask is installed
   */
  isMetaMaskInstalled: (): boolean => {
    return typeof window !== "undefined" && typeof window.ethereum !== "undefined" && !!window.ethereum.isMetaMask
  },

  /**
   * Connect to MetaMask wallet
   */
  connectMetaMask: async (): Promise<WalletInfo> => {
    if (!walletService.isMetaMaskInstalled()) {
      throw new Error("MetaMask is not installed")
    }

    try {
      if (!window.ethereum) {
        throw new Error("MetaMask is not available on window.ethereum")
      }

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      })

      const chainId = await window.ethereum.request({
        method: "eth_chainId",
      })

      return {
        address: accounts[0],
        chainId,
      }
    } catch (error: any) {
      // Check if the error is because a request is already pending
      if (error.message && error.message.includes("already pending")) {
        throw new Error("Connection request already pending. Please check MetaMask.")
      }

      throw error
    }
  },

  /**
   * Get the current connected accounts
   */
  getConnectedAccounts: async (): Promise<string[]> => {
    if (!walletService.isMetaMaskInstalled()) {
      return []
    }

    try {
      if (!window.ethereum) {
        console.error("MetaMask is not available on window.ethereum")
        return []
      }
      return await window.ethereum.request({
        method: "eth_accounts",
      })
    } catch (error) {
      console.error("Error getting accounts:", error)
      return []
    }
  },
}
