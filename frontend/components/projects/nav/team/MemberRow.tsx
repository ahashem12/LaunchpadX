import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Pencil, Trash2, AlertCircle } from "lucide-react"
import type { TeamMember } from "@/types"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface MemberRowProps {
  member: TeamMember
}

export function MemberRow({ member }: MemberRowProps) {
  return (
    <div className="grid grid-cols-5 gap-4 items-center p-4 hover:bg-muted transition-colors">
      <div className="flex items-center space-x-3">
        <Avatar className="h-10 w-10 rounded-lg border border-border bg-muted">
          <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
          <AvatarFallback className="rounded-lg bg-primary text-primary-foreground font-bold">
          </AvatarFallback>
        </Avatar>
        <div>
          <div className="font-medium text-foreground">{member.name}</div>
          <div className="text-sm text-muted-foreground">{member.email}</div>
        </div>
      </div>

      <div>
        {member.role && (
          <Badge
            className={`${
              member.role.toLowerCase().includes("ceo") || member.role.toLowerCase().includes("founder")
                ? "bg-primary/20 text-primary hover:bg-primary/30 border-none"
                : "bg-cyan-500/20 text-cyan-500 hover:bg-cyan-500/30 border-none"
            }`}
          >
            {member.role}
          </Badge>
        )}
      </div>

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

      <div className="flex items-center space-x-2">
        {member.insight && (
          <Badge className="bg-purple-500/20 text-purple-500 hover:bg-purple-500/30 border-none">
            {member.insight}
          </Badge>
        )}

        {member.has_connected_wallet===false && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <AlertCircle className="h-4 w-4 text-amber-500" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Wallet not connected</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>

      <div className="flex space-x-2">
        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground h-8 w-8 p-0">
          <Pencil className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-400 h-8 w-8 p-0">
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
