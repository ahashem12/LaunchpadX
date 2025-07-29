"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

interface ProjectNavProps {
  projectId: string
}

export function ProjectNav({ projectId }: ProjectNavProps) {
  const pathname = usePathname()

  const tabs = [
    {
      name: "Project Details",
      href: `/projects/${projectId}`,
    },
    {
      name: "Events",
      href: `/projects/${projectId}/events`,
    },
    {
      name: "Next Steps",
      href: `/projects/${projectId}/next-steps`,
    },
    {
      name: "Team & Roles",
      href: `/projects/${projectId}/team`,
    },
    {
      name: "Updates",
      href: `/projects/${projectId}/updates`,
    },
    {
      name: "Agreement",
      href: `/projects/${projectId}/agreement`,
    },
    {
      name: "Fundraising",
      href: `/projects/${projectId}/fundraising`,
    },
    {
      name: "Treasury",
      href: `/projects/${projectId}/treasury`,
    },
    {
      name: "Token",
      href: `/projects/${projectId}/token`,
    },
    {
      name: "Governance",
      href: `/projects/${projectId}/governance`,
    },
    {
      name: "Documents",
      href: `/projects/${projectId}/documents`,
    },
  ]

  return (
    <div className="bg-muted rounded-lg overflow-x-auto ">
      <div className="flex justify-between min-w-max">
        {tabs.map((tab) => (
          <Link
            key={tab.href}
            href={tab.href}
            className={cn(
              "px-4 py-3 text-sm font-medium",
              pathname === tab.href
                ? "bg-green-900 rounded-2xl h-fit  text-white"
                : "text-gray-400 rounded-3xl hover:text-white hover:bg-muted/80",
            )}
          >
            {tab.name}
          </Link>
        ))}
      </div>
    </div>
  )
}
