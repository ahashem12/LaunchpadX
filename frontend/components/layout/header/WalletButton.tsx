"use client"

import { useState } from "react"
import { Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { WalletDialog } from "./WalletDialog"
import { useWallet } from "@/hooks/use-wallet" // Create this custom hook

export function WalletButton() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { walletAddress, formatWalletAddress } = useWallet()

  return (
    <>
      <Button
        variant={walletAddress ? "outline" : "secondary"}
        size="sm"
        className="mr-2 flex items-center gap-2"
        onClick={() => setIsDialogOpen(true)}
      >
        <Wallet className="h-4 w-4" />
        {walletAddress ? formatWalletAddress(walletAddress) : "Connect Wallet"}
      </Button>

      <WalletDialog 
        open={isDialogOpen} 
        onOpenChange={setIsDialogOpen} 
      />
    </>
  )
}