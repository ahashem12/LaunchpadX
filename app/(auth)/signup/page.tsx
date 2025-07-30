import { JoinWaitingList } from "@/components/auth/JoinWaitingList"
import Link from "next/link"
import { WatermelonIcon } from "@/components/icons/WatermelonIcon" 
import { Button } from "@/components/ui/button"

export default function SignupPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
            <header className="w-full border-b border-border">
    <div className="container flex h-16 items-center justify-between px-4">
      <Link href="/" className="flex items-center gap-2">
        <WatermelonIcon size={32} className="text-white rotate-[145deg]" />
        <span className="text-xl font-bold text-white">LPX</span>
      </Link>
      <nav className="flex items-center gap-4">
        <Link href="/login">
          <Button variant="ghost" className="text-white">
            Log In
          </Button>
        </Link>
      </nav>
    </div>
  </header>
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <JoinWaitingList />
    </div>
    </div>

  )
}
