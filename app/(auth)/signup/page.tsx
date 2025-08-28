import { JoinWaitingList } from "@/components/auth/JoinWaitingList"
import Link from "next/link"
import { PigeonIcon } from "@/components/icons/PigeonIcon" 
import { Button } from "@/components/ui/button"

export default function SignupPage() {
  return (
    <div className="container flex min-h-screen flex-col bg-background lg:max-w-screen-xl">
      <header className="w-full border-b border-border">
        <div className="container flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <PigeonIcon size={32} className="text-white" />
            <span className="text-xl font-bold text-white">LPX</span>
          </Link>
          <nav className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" className="text-white text-base md:text-lg">
                Log In
              </Button>
            </Link>
          </nav>
        </div>
      </header>
      <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 lg:max-w-screen-xl">
        <JoinWaitingList />
      </div>
    </div>

  )
}
