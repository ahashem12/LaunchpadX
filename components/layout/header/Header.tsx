"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Bell, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { WatermelonIcon } from "@/components/icons/WatermelonIcon"
// import { NavLinks } from "./NavLinks"
import { WalletButton } from "./WalletButton"
import { UserDropdown } from "./UserDropdown"
// import { ThemeToggle } from "./ThemeToggle"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full h-16 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        {/* Left side - Logo + Nav */}
        <div className="mr-4 hidden md:flex">
          {/* <Link href="/" className="mr-6 flex items-center space-x-2">
            <WatermelonIcon className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">LPX</span>
          </Link> */}
          {/* <NavLinks /> */}
        </div>

        {/* Mobile menu button */}
        <Button variant="outline" size="icon" className="mr-2 md:hidden" aria-label="Toggle Menu">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>

        {/* Right side - Actions */}
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/* Search would go here */}
          </div>
          
          <nav className="flex items-center">
            <WalletButton />
            {/* <ThemeToggle /> */}
            <Button variant="ghost" size="icon" aria-label="Notifications" className="mr-2">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </Button>
            <UserDropdown />
          </nav>
        </div>
      </div>
    </header>
  )
}