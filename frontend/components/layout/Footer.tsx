import Link from "next/link"
import { Github, Twitter, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Footer() {
  return (
    <footer className="bg-background border-t border-border py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Compact Footer Content */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Left: Brand and Links */}
          <div className="text-sm text-muted-foreground text-center md:text-left space-y-1">
            <p>© {new Date().getFullYear()} LPX</p>
            <div className="flex gap-4 justify-center md:justify-start text-sm">
              <Link href="/privacy" className="hover:text-primary transition-colors">
                Privacy
              </Link>
              <Link href="/contact" className="hover:text-primary transition-colors">
                Contact
              </Link>
            </div>
          </div>

          {/* Right: Social Icons */}
          <div className="flex space-x-2 justify-center">
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
              <Github className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
              <Twitter className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
              <Linkedin className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </footer>
  )
}
