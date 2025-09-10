"use client"

import type React from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, Calendar, Heart } from "lucide-react"
import { useRouter } from "next/navigation"
import type { Project } from "@/types"

interface ProjectBrowseCardProps {
  project: Project;
  isMember: boolean;
}

export default function ProjectBrowseCard({ project, isMember }: ProjectBrowseCardProps) {
  const router = useRouter()

  const handleCardClick = () => {
    if (isMember) {
      router.push(`/projects/${project.id}`)
    } else {
      router.push(`/browse/project/${project.id}`)
    }
  }

  const handleFollowClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    // Implement follow functionality
    console.log("Follow project:", project.id)
  }

  return (
    <Card
      className="group overflow-hidden cursor-pointer transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 bg-card border-border backdrop-blur-sm"
      onClick={handleCardClick}
    >
      {/* Banner Image */}
      <div className="relative h-32 overflow">
        {project.banner_url ? (
          <img
            src={project.banner_url || "/placeholder.svg"}
            alt={`${project.name} banner`}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/20 via-primary/10 to-secondary/20" />
        )}

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

        {/* Project Logo */}
        <div className="absolute -bottom-6 left-4">
          <Avatar className="w-12 h-12 border-2 border-background shadow-lg">
            <AvatarImage src={project.logo_url || "/placeholder.svg"} alt={project.name} />
            <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-primary-foreground font-bold text-sm">
              {project.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* Content */}
<div className="p-4 pt-8 flex flex-col h-[260px]"> 

  {/* Header and Description - Now in a scrollable container */}
  <div className="overflow-y-auto flex-grow space-y-4">
    {/* Header */}
    <div className="space-y-2">
      <div className="flex items-start justify-between">
        <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors duration-200 line-clamp-1">
          {project.name}
        </h3>
      </div>
      {project.category && (
        <Badge variant="secondary" className="text-xs font-medium bg-muted/50 text-muted-foreground border-border">
          {project.category}
        </Badge>
      )}
    </div>

    {/* Description */}
    <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
      {project.description}
    </p>
  </div>

  {/* Static Footer Area (always at bottom) */}
  <div className="mt-auto">
    {/* Footer Stats */}
    <div className="pt-2 mt-2 border-t border-border/50">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Users className="w-3 h-3" />
            <span>Team</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span>{new Date(project.created_at).toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      {/* Team Avatars */}
      <div className="flex items-center gap-1 mt-2">
        {[1, 2, 3].map((_, index) => (
          <Avatar key={index} className="w-6 h-6 border border-border">
            <AvatarFallback className="text-xs bg-muted text-muted-foreground">
              {String.fromCharCode(65 + index)}
            </AvatarFallback>
          </Avatar>
        ))}
        <div className="w-6 h-6 rounded-full bg-muted/50 border border-border flex items-center justify-center text-xs text-muted-foreground">
          +2
        </div>
      </div>
    </div>
  </div>
</div>
    </Card>
  )
}
