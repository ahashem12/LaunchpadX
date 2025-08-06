import Link from "next/link"
import { Button } from "@/components/ui/button"
import { WatermelonIcon } from "@/components/icons/WatermelonIcon" // Import your SVG component

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="w-full border-b border-border">
        <div className="container flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <WatermelonIcon size={32} className="text-white rotate-[145deg]" /> {/* Replaced PNG with SVG */}
            <span className="text-xl font-bold text-white">LPX</span>
          </Link>
          <nav className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" className="text-white">
                Log In
              </Button>
            </Link>
            <Link href="/signup">
              <Button variant="outline" className="text-white border-white">
                Sign Up
              </Button>
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1 flex">
        <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-8 py-12 md:py-24">
          <div className="max-w-[600px]">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-white">
              Simplify Venture Building.
            </h1>
          <h3 className="text-2xl italic tracking-tighter sm:text-3xl md:text-4xl text-white">
            Where Talents Meet Projects. Where Projects Meet Capital.
          </h3>
            <p className="mt-4 text-lg text-gray-400 max-w-[550px]">
              LPX simplifies how you build, contribute, and get funded — all in one ecosystem.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link href="/signup">
                <Button
                  size="lg"
                  className="bg-watermelon-green hover:bg-watermelon-green/90 text-white w-full sm:w-auto"
                >
                  Get Started
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="outline" className="border-gray-700 text-white w-full sm:w-auto">
                  Log In
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="hidden lg:block lg:w-[40%] bg-gradient-to-br from-blue-500 to-purple-600 relative">
          <div className="absolute bottom-1/4 right-1/4">
            <WatermelonIcon size={180} className="text-white rotate-[145deg]" /> {/* Replaced PNG with SVG */}
          </div>
        </div>
      </main>
    </div>
  )
}
