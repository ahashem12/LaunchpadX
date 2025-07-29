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
import { useToast } from "@/hooks/use-toast"
import { walletService } from "@/app/services/wallet/wallet-service"

interface WalletConnectionDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  walletAddress: string | null
  userWalletAddress: string | null
  onConnect: () => Promise<void>
  isConnecting: boolean
}

export function WalletConnectionDialog({
  isOpen,
  onOpenChange,
  walletAddress,
  userWalletAddress,
  onConnect,
  isConnecting,
}: WalletConnectionDialogProps) {
  const { toast } = useToast()
  const isMetaMaskInstalled = typeof window !== "undefined" ? walletService.isMetaMaskInstalled() : false

  const formatWalletAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {userWalletAddress && !walletAddress ? "Reconnect Your Wallet" : "Connect Your Wallet"}
          </DialogTitle>
          <DialogDescription>
            {userWalletAddress && !walletAddress
              ? `Your account has a wallet (${userWalletAddress ? formatWalletAddress(userWalletAddress) : ""}) associated with it. Please reconnect.`
              : "Connect your wallet to sign agreements and manage your projects."}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          {isMetaMaskInstalled ? (
            <Button onClick={onConnect} disabled={isConnecting} className="flex items-center justify-center gap-2">
              {isConnecting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Connecting...
                </>
              ) : (
                <>
                  <svg className="h-5 w-5" viewBox="0 0 35 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M32.9582 1L19.8241 10.7183L22.2665 4.99099L32.9582 1Z"
                      fill="#E17726"
                      stroke="#E17726"
                      strokeWidth="0.25"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M2.04184 1L15.0036 10.809L12.7336 4.99098L2.04184 1Z"
                      fill="#E27625"
                      stroke="#E27625"
                      strokeWidth="0.25"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M28.2291 23.5335L24.7545 28.8538L32.2447 30.8936L34.3947 23.6545L28.2291 23.5335Z"
                      fill="#E27625"
                      stroke="#E27625"
                      strokeWidth="0.25"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M0.6146 23.6545L2.7646 30.8936L10.2447 28.8538L6.7802 23.5335L0.6146 23.6545Z"
                      fill="#E27625"
                      stroke="#E27625"
                      strokeWidth="0.25"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {userWalletAddress && !walletAddress ? "Reconnect with MetaMask" : "Connect with MetaMask"}
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
                <svg className="h-5 w-5" viewBox="0 0 35 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M32.9582 1L19.8241 10.7183L22.2665 4.99099L32.9582 1Z"
                    fill="#E17726"
                    stroke="#E17726"
                    strokeWidth="0.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2.04184 1L15.0036 10.809L12.7336 4.99098L2.04184 1Z"
                    fill="#E27625"
                    stroke="#E27625"
                    strokeWidth="0.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M28.2291 23.5335L24.7545 28.8538L32.2447 30.8936L34.3947 23.6545L28.2291 23.5335Z"
                    fill="#E27625"
                    stroke="#E27625"
                    strokeWidth="0.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M0.6146 23.6545L2.7646 30.8936L10.2447 28.8538L6.7802 23.5335L0.6146 23.6545Z"
                    fill="#E27625"
                    stroke="#E27625"
                    strokeWidth="0.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
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
