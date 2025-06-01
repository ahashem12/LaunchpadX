"use client"

import { LogOut, User, Wallet } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useWallet } from "@/hooks/use-wallet"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

export function UserDropdown() {
  const { walletAddress, disconnectWallet, formatWalletAddress } = useWallet()
  const router = useRouter()

  const handleLogout = async () => {
    try {
      const supabase = createClient()
      await supabase.auth.signOut()
    } catch (error) {
      console.error("Error signing out from Supabase:", error)
    }

    // Clear local user and auth state
    localStorage.removeItem("consulti_user_profile")
    localStorage.removeItem("consulti_auth_state")

    // Disconnect wallet if connected
    disconnectWallet?.()

    // Clear mock auth cookie (if used in dev)
    document.cookie = "mock_auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"

    // Redirect to login
    router.push("/login")
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/diverse-avatars.png" alt="User" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4" />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
        {walletAddress && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground">Connected Wallet</span>
                <span className="text-sm font-mono">{formatWalletAddress(walletAddress)}</span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={disconnectWallet}>
              <Wallet className="mr-2 h-4 w-4" />
              Disconnect Wallet
            </DropdownMenuItem>
          </>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
