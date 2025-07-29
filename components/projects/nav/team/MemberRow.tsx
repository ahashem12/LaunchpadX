"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Pencil, Trash2, CheckCircle, XCircle } from "lucide-react"
import type { TeamMember } from "@/types"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useState } from "react"
import { deleteTeamMember } from "@/app/services/projects/delete-member"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"

interface MemberRowProps {
  member: TeamMember
  currentUserId: string | undefined
  isProjectOwner: boolean
  onDeleteMember: (memberId: string) => void
  showActions: boolean
}

export function MemberRow({ 
  member, 
  currentUserId, 
  isProjectOwner, 
  onDeleteMember,
  showActions 
}: MemberRowProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const router = useRouter()

  const initials = (member.username || '')
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

  const handleDelete = async () => {
    try {
      await deleteTeamMember(member.id, member.project_id)
      toast({
        title: "Success",
        description: `${member.username} has been removed from the project.`,
      })
      onDeleteMember(member.id)
      setIsDeleteDialogOpen(false)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove team member. Please try again.",
        variant: "destructive",
      })
    }
  }

  const isCurrentUser = member.user_id === currentUserId
  const isFounderRole = member.role?.toLowerCase().includes("ceo") || 
                      member.role?.toLowerCase().includes("founder")

  return (
    <div className={`grid ${showActions ? 'grid-cols-5' : 'grid-cols-4'} gap-4 items-center p-4 hover:bg-muted transition-colors`}>
      {/* User Column */}
      <div className="flex items-center space-x-3">
        <Avatar className="h-10 w-10 rounded-lg border border-border bg-muted">
          <AvatarImage src={member.profile_picture || "/placeholder.svg"} alt={member.username} />
          <AvatarFallback className="rounded-lg bg-primary text-primary-foreground font-bold">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div>
          <div className="font-medium text-foreground">{member.username}</div>
          <div className="text-sm text-muted-foreground">{member.email}</div>
        </div>
      </div>

      {/* Role Column */}
      <div>
        {member.role && (
          <Badge className={isFounderRole ? 
            "bg-primary/20 text-primary hover:bg-primary/30 border-none" : 
            "bg-cyan-500/20 text-cyan-500 hover:bg-cyan-500/30 border-none"}>
            {member.role}
          </Badge>
        )}
      </div>

      {/* Skills Column */}
      <div>
        {Array.isArray(member.skills) && member.skills.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {member.skills.slice(0, 2).map((skill, index) => (
              <Badge key={index} variant="outline" className="bg-muted">
                {skill}
              </Badge>
            ))}
            {member.skills.length > 2 && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Badge variant="outline" className="bg-muted cursor-help">
                      +{member.skills.length - 2}
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    <div className="space-y-1">
                      {member.skills.slice(2).map((skill, index) => (
                        <div key={index}>{skill}</div>
                      ))}
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        )}
      </div>

      {/* Wallet Column */}
      <div className="flex items-center space-x-2">
        {member.has_connected_wallet ? (
          <Badge className="bg-green-500/20 text-green-500 hover:bg-green-500/30 border-none flex items-center gap-1">
            <CheckCircle className="h-3 w-3" /> Connected
          </Badge>
        ) : (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge className="bg-red-500/20 text-red-500 hover:bg-red-500/30 border-none flex items-center gap-1 cursor-help">
                  <XCircle className="h-3 w-3" /> Not Connected
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p>Wallet not connected</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>

      {/* Actions Column */}
      {showActions && isProjectOwner && !isCurrentUser && (
        <div className="flex space-x-2">
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground h-8 w-8 p-0">
            <Pencil className="h-4 w-4" />
          </Button>
          <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-400 h-8 w-8 p-0">
                <Trash2 className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to remove <span className="font-semibold">{member.username}</span> from the project?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete} className="bg-red-500 hover:bg-red-600">
                  Confirm Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      )}
    </div>
  )
}