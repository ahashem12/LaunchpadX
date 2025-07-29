/**
 * Service for interacting with the Aosis blockchain network
 */
export const aosisService = {
  /**
   * Deploy a token contract to the Aosis network
   */
  async deployToken(input: {
    name: string
    symbol: string
    decimals: number
    initialSupply: number
    recipients: Array<{ address: string; percentage: number }>
  }) {
    try {
      console.log("Deploying token with input:", input)

      // Call the deploy-token endpoint
      const response = await fetch("http://akovdtzkof.a.pinggy.link/deploy-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`Failed to deploy token: ${errorText}`)
      }

      const result = await response.json()
      return result
    } catch (error) {
      console.error("Error deploying token:", error)
      throw error
    }
  },

  /**
   * Generate a link to the Oasis Explorer for a token address
   */
  getTokenExplorerUrl(tokenAddress: string) {
    return `https://explorer.oasis.io/testnet/sapphire/address/${tokenAddress}`
  },

  /**
   * Generate a link to the Oasis Explorer for a transaction
   */
  getTransactionExplorerUrl(txHash: string) {
    return `https://explorer.oasis.io/testnet/sapphire/tx/${txHash}`
  },

  /**
   * Generate a link to the Oasis Explorer for an address
   */
  getAddressExplorerUrl(address: string) {
    return `https://explorer.oasis.io/testnet/sapphire/address/${address}`
  },
}
