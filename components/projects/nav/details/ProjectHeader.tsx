"use client"

import { Edit, Camera } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PigeonIcon } from "@/components/icons/PigeonIcon"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { EditDropdown } from "./EditDropdown"

interface ProjectHeaderProps {
  project: {
    name: string
    status: string
    logo_url?: string | null
    category?: string | null
    bannerUrl?: string | null
  }
  bannerUrl?: string | null
}

export function ProjectHeader({ project, bannerUrl }: ProjectHeaderProps) {
  const hasBanner = bannerUrl || project.bannerUrl;
  
  return (
    <div className={`relative w-full h-48 rounded-lg overflow-hidden ${!hasBanner ? "bg-gradient-to-r from-green-900 to-green-600" : ""}`}>
      {/* Banner Image (if exists) */}
      {hasBanner ? (
        <img 
          src={hasBanner} 
          alt="Project banner" 
          className="w-full h-full object-cover" 
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/placeholder.svg";
          }}
        />
      ) : (
        <>
          {/* Watermelon Icons */}
          <div className="absolute bottom-4 right-4 opacity-90">
            <PigeonIcon size={80} className="" />
          </div>
          <div className="absolute top-4 left-4 opacity-90">
            <PigeonIcon size={80} className="" />
          </div>
        </>
      )}

      {/* Edit Dropdown */}
<EditDropdown />
      {/* Project Info */}
      <div className="absolute bottom-4 left-6 right-6">
        <div className="flex items-end justify-between">
          <div className="flex items-end gap-4">
            {/* Project Logo with Error Handling */}
            <div className="flex-shrink-0 w-20 h-20 rounded-lg border-2 border-white/20 overflow-hidden">
              {project.logo_url ? (
                <img
                  src={project.logo_url}
                  alt={`${project.name} logo`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%234f46e5'/%3E%3Ctext x='50%' y='50%' font-size='40' fill='white' text-anchor='middle' dominant-baseline='middle'%3E${project.name.substring(0, 2).toUpperCase()}%3C/text%3E%3C/svg%3E";
                  }}
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">
                    {project.name.substring(0, 2).toUpperCase()}
                  </span>
                </div>
              )}
            </div>

            {/* Project Metadata */}
            <div className="flex flex-col">
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold text-white drop-shadow-md">{project.name}</h1>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span className="text-sm text-white drop-shadow-md">Updated 0</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm text-white drop-shadow-md">
                  Founded by <span className="text-green-300 font-medium">You</span>
                </span>
                {project.category && (
                  <span className="text-sm text-white/80 uppercase tracking-wide drop-shadow-md">
                    • {project.category}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}