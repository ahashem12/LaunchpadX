import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { useWallet } from "@/hooks/use-wallet"

export function LogoutButton() {
  const router = useRouter()
  const { disconnectWallet } = useWallet()

  const handleLogout = async () => {
    const supabase = createClient()

    // 1. Sign out from Supabase
    await supabase.auth.signOut()

    // 2. Disconnect wallet (local state cleanup)
    disconnectWallet()

    // 3. Optional: Clear mock_auth cookie (dev mode)
    document.cookie = "mock_auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"

    // 4. Redirect to login
    router.push("/login")
  }

  return (
    <button onClick={handleLogout} className="text-sm text-red-500 hover:underline">
      Logout
    </button>
  )
}
