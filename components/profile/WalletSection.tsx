"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Copy, Wallet } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface WalletSectionProps {
  walletAddress: string
}

export function WalletSection({ walletAddress }: WalletSectionProps) {
  const { toast } = useToast()

  const handleCopyAddress = () => {
    if (walletAddress) {
      navigator.clipboard.writeText(walletAddress)
      toast({
        title: "Address copied",
        description: "Wallet address copied to clipboard",
      })
    }
  }

  const formatAddress = (address: string) => {
    if (!address) return "Not connected"
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  return (
    <div className="bg-card rounded-lg border p-6 space-y-4">
      <div>
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Wallet className="h-5 w-5" />
          Wallet
        </h3>
        <p className="text-sm text-muted-foreground mt-1">Your connected wallet address</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="wallet">Wallet Address</Label>
        <div className="flex items-center gap-2">
          <Input
            id="wallet"
            value={formatAddress(walletAddress)}
            readOnly
            className="bg-muted font-mono text-sm"
          />
          {walletAddress && (
            <Button size="sm" onClick={handleCopyAddress} variant="outline">
              <Copy className="h-4 w-4" />
            </Button>
          )}
        </div>
        {!walletAddress && (
          <p className="text-xs text-muted-foreground">
            Connect your wallet to see address
          </p>
        )}
      </div>
    </div>
  )
}
