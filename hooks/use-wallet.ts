"use client"

import { useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import { walletService } from "@/app/services/wallet/wallet-service"

export function useWallet() {
  const { toast } = useToast()
  const [walletAddress, setWalletAddress] = useState<string | null>(null)
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)

  useEffect(() => {
    const checkWallet = async () => {
      const isInstalled = walletService.isMetaMaskInstalled()
      setIsMetaMaskInstalled(isInstalled)

      if (isInstalled) {
        try {
          const accounts = await walletService.getConnectedAccounts()
          if (accounts.length > 0) setWalletAddress(accounts[0])
        } catch (error) {
          console.error("Wallet connection error:", error)
        }
      }
    }

    checkWallet()
  }, [])

  const connectWallet = async () => {
    if (isConnecting) return

    try {
      setIsConnecting(true)
      const walletInfo = await walletService.connectMetaMask()
      setWalletAddress(walletInfo.address)
      toast({
        title: "Wallet Connected",
        description: `Connected to ${formatWalletAddress(walletInfo.address)}`,
      })
    } catch (error: any) {
      toast({
        title: "Connection Failed",
        description: error.message || "Failed to connect wallet",
        variant: "destructive",
      })
    } finally {
      setIsConnecting(false)
    }
  }

  const disconnectWallet = () => {
    setWalletAddress(null)
    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected.",
    })
  }

  const formatWalletAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
  }

  return {
    walletAddress,
    isMetaMaskInstalled,
    isConnecting,
    connectWallet,
    disconnectWallet,
    formatWalletAddress
  }
}