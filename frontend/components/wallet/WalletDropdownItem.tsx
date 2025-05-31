"use client"

import { Wallet } from "lucide-react"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"

interface WalletDropdownItemProps {
  walletAddress: string | null
  onDisconnect: () => void
}

export function WalletDropdownItem({ walletAddress, onDisconnect }: WalletDropdownItemProps) {
  if (!walletAddress) {
    return null
  }

  const formatWalletAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
  }

  return (
    <>
      <DropdownMenuItem>
        <div className="flex flex-col">
          <span className="text-xs text-muted-foreground">Connected Wallet</span>
          <span className="text-sm font-mono">{formatWalletAddress(walletAddress)}</span>
        </div>
      </DropdownMenuItem>
      <DropdownMenuItem onClick={onDisconnect}>
        <Wallet className="mr-2 h-4 w-4" />
        Disconnect Wallet
      </DropdownMenuItem>
    </>
  )
}
