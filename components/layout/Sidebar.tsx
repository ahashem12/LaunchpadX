"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  FolderKanban,
  Search,
  Users,
  Building2,
  Award,
  Briefcase,
  Scale,
  ChevronLeft,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { PigeonIcon } from "../icons/PigeonIcon"

interface SidebarProps {
  isCollapsed: boolean
  onToggle: () => void
}

export function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
  const pathname = usePathname()

  const navItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "My Projects",
      href: "/projects",
      icon: FolderKanban,
    },
    {
      title: "Browse Projects",
      href: "/browse",
      icon: Search,
    },
    {
      title: "Open Roles",
      href: "/open-roles",
      icon: Users,
    },
    {
      title: "Community",
      href: "/community",
      icon: Users,
    },
    {
      title: "Partners",
      href: "/partners",
      icon: Building2,
    },
    {
      title: "Grants",
      href: "/grants",
      icon: Award,
    },
    {
      title: "Venture Studios",
      href: "/ventures",
      icon: Briefcase,
    },
    {
      title: "Legal",
      href: "/legal",
      icon: Scale,
    },
  ]

  return (
    <div
      className={cn(
        "h-screen bg-background border-r border-border flex flex-col transition-all duration-300",
        isCollapsed ? "w-16" : "w-64",
      )}
    >
      <div className="h-16 border-b border-border flex items-center px-4">
        <Link href="/" className="flex items-center gap-2">
          <PigeonIcon size={32} className="text-white" /> {/* Replaced PNG with SVG */}
          {!isCollapsed && <span className="text-xl font-bold text-white">LPX</span>}
        </Link>
        <button onClick={onToggle} className="ml-auto text-gray-400 hover:text-white">
          <ChevronLeft className={cn("h-5 w-5", isCollapsed && "rotate-180")} />
        </button>
      </div>
      <div className="flex-1 py-4 overflow-y-auto">
        <nav className="space-y-1 px-2">
          {navItems.map((item) => {
            let isActive;
            if (item.href === "/open-roles") {
              isActive = pathname.startsWith("/open-roles") || pathname.startsWith("/browse/open-roles");
            } else if (item.href === "/browse") {
              // Only active for /browse and its subpages, but NOT /browse/open-roles
              isActive = (pathname === "/browse" || (pathname.startsWith("/browse/") && !pathname.startsWith("/browse/open-roles")));
            } else {
              isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            }
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-300 ease-in-out transform",
                  isActive
                    ? "bg-watermelon-green bg-opacity-50 text-white scale-[1.03] shadow-md"
                    : "text-muted-foreground hover:bg-muted hover:scale-[1.02]",
                  isCollapsed && "justify-center",
                )}
              >
                <item.icon className="h-5 w-5 transition-transform duration-300" />
                {!isCollapsed && <span className="transition-opacity duration-300">{item.title}</span>}
              </Link>
            )
          })}
        </nav>
      </div>
    </div>
  )
}
