"use client"

import { useState, useEffect } from "react"
import { Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { WalletConnectionDialog } from "./WalletConnectionDialog"
import { useToast } from "@/hooks/use-toast"
import { walletService } from "@/app/services/wallet/wallet-service"
import { authService, type UserProfile } from "@/app/services/wallet/auth-service"

export function WalletButton() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null)
  const [isWalletDialogOpen, setIsWalletDialogOpen] = useState(false)
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [user, setUser] = useState<UserProfile | null>(null)
  const { toast } = useToast()

  // Format wallet address for display
  const formatWalletAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
  }

  // Check if we're on the client side and if MetaMask is installed
  useEffect(() => {
    setIsClient(true)
    const isInstalled = walletService.isMetaMaskInstalled()
    setIsMetaMaskInstalled(isInstalled)

    // Get current user
    const getCurrentUser = async () => {
      const currentUser = await authService.getCurrentUser()
      setUser(currentUser)

      // If user has a wallet address in their profile, try to connect automatically
      if (currentUser?.walletAddress && isInstalled) {
        try {
          // Check if the wallet is already connected
          const accounts = await walletService.getConnectedAccounts()

          if (accounts.length > 0) {
            // If the wallet is already connected, use the first account
            setWalletAddress(accounts[0])

            // If the stored wallet address is different from the connected one,
            // update the stored address
            if (currentUser.walletAddress !== accounts[0]) {
              await authService.updateWalletAddress(accounts[0])
              toast({
                title: "Wallet Updated",
                description: `Your wallet address has been updated to ${formatWalletAddress(accounts[0])}`,
              })
            }
          } else {
            // If the wallet is not connected, we don't auto-connect
            // Just show the stored address
            setWalletAddress(currentUser.walletAddress)
          }
        } catch (error) {
          console.error("Error auto-connecting wallet:", error)
        }
      }
    }

    getCurrentUser()

    // Listen for account changes if MetaMask is installed
    if (isInstalled && typeof window !== "undefined" && window.ethereum) {
      const handleAccountsChanged = async (accounts: string[]) => {
        if (accounts.length === 0) {
          // User disconnected their wallet
          setWalletAddress(null)
          const currentUser = await authService.getCurrentUser()
          if (currentUser) {
            await authService.removeWalletAddress()
            toast({
              title: "Wallet Disconnected",
              description: "Your wallet has been disconnected.",
            })
          }
        } else {
          // User switched accounts
          setWalletAddress(accounts[0])
          const currentUser = await authService.getCurrentUser()
          if (currentUser) {
            await authService.updateWalletAddress(accounts[0])
            toast({
              title: "Wallet Account Changed",
              description: `Your wallet has been updated to ${formatWalletAddress(accounts[0])}`,
            })
          }
        }
      }

      window.ethereum.on("accountsChanged", handleAccountsChanged)

      // Cleanup listener on unmount
      return () => {
        if (typeof window !== "undefined" && window.ethereum) {
          window.ethereum.removeListener("accountsChanged", handleAccountsChanged)
        }
      }
    }
  }, [toast])

  const connectWallet = async () => {
    // Prevent multiple connection attempts
    if (isConnecting) return

    try {
      setIsConnecting(true)

      // Connect to MetaMask
      const walletInfo = await walletService.connectMetaMask()
      setWalletAddress(walletInfo.address)

      // If user is logged in, update their profile with the wallet address
      const currentUser = await authService.getCurrentUser()
      if (currentUser) {
        await authService.updateWalletAddress(walletInfo.address)
      }

      // Close dialog after successful connection
      setIsWalletDialogOpen(false)

      toast({
        title: "Wallet Connected",
        description: `Connected to ${formatWalletAddress(walletInfo.address)}`,
      })
    } catch (error: any) {
      console.error("Error connecting wallet:", error)

      // Handle the specific "already pending" error
      if (error.message && error.message.includes("already pending")) {
        toast({
          title: "Connection Already in Progress",
          description: "Please check your MetaMask extension and approve or reject the pending connection request.",
          variant: "destructive",
        })
      } else {
        toast({
          title: "Connection Failed",
          description: error.message || "Failed to connect wallet. Please try again.",
          variant: "destructive",
        })
      }
    } finally {
      setIsConnecting(false)
    }
  }

  if (!isClient) {
    return null
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={walletAddress ? "outline" : "secondary"}
            size="sm"
            className="flex items-center gap-2"
            onClick={() => setIsWalletDialogOpen(true)}
          >
            <Wallet className="h-4 w-4" />
            {walletAddress
              ? formatWalletAddress(walletAddress)
              : user?.walletAddress
                ? "Reconnect Wallet"
                : "Connect Wallet"}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          {walletAddress
            ? "Wallet Connected"
            : user?.walletAddress
              ? "Reconnect your previously used wallet"
              : "Connect your wallet"}
        </TooltipContent>
      </Tooltip>

      <WalletConnectionDialog
        isOpen={isWalletDialogOpen}
        onOpenChange={setIsWalletDialogOpen}
        walletAddress={walletAddress}
        userWalletAddress={user?.walletAddress || null}
        onConnect={connectWallet}
        isConnecting={isConnecting}
      />
    </TooltipProvider>
  )
}
