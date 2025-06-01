"use client"

import { ExternalLink, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useWallet } from "@/hooks/use-wallet"

export function WalletDialog({ open, onOpenChange }: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const { 
    isMetaMaskInstalled,
    isConnecting,
    connectWallet,
    formatWalletAddress
  } = useWallet()

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Connect Your Wallet</DialogTitle>
          <DialogDescription>
            Connect your wallet to sign agreements and manage your projects.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          {isMetaMaskInstalled ? (
            <Button
              onClick={connectWallet}
              disabled={isConnecting}
              className="flex items-center justify-center gap-2"
            >
              {isConnecting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Connecting...
                </>
              ) : (
                <>
                  <MetaMaskIcon />
                  Connect with MetaMask
                </>
              )}
            </Button>
          ) : (
            <div className="flex flex-col gap-2">
              <p className="text-sm text-amber-600">MetaMask is not installed</p>
              <Button
                variant="outline"
                onClick={() => window.open("https://metamask.io/download/", "_blank")}
                className="flex items-center justify-center gap-2"
              >
                <MetaMaskIcon />
                Install MetaMask
                <ExternalLink className="h-3 w-3 ml-1" />
              </Button>
            </div>
          )}
        </div>
        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <p className="text-xs text-muted-foreground">
            By connecting your wallet, you agree to our Terms of Service and Privacy Policy.
          </p>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function MetaMaskIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 35 33" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* MetaMask SVG paths */}
    </svg>
  )
}