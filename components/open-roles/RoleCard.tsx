import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Euro, Percent } from "lucide-react"
import type { TeamRole } from "@/types"

interface RoleCardProps {
  role: TeamRole
}

export function RoleCard({ role }: RoleCardProps) {
  const getCompensationText = () => {
    if (role.flat_money_min && role.flat_money_max) {
      return `€${role.flat_money_min} - €${role.flat_money_max}`
    }
    if (role.equity_percentage) {
      return `${role.equity_percentage}% equity`
    }
    return "Undisclosed"
  }

  const getCompensationIcon = () => {
    if (role.equity_percentage) {
      return <Percent className="h-4 w-4" />
    }
    if (role.flat_money_min || role.flat_money_max) {
      return <Euro className="h-4 w-4" />
    }
    return null
  }

  return (
    <Card className="group overflow-hidden bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card/80 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
      <div className="relative h-32 overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5"
          style={{
            // NOTE: banner_url is not on the project type, you may need to add it.
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

        {/* Project Logo */}
        <div className="absolute bottom-4 left-4">
          <div className="w-12 h-12 rounded-full bg-background/90 backdrop-blur-sm border-2 border-primary/20 flex items-center justify-center">
            {role.project?.logo_url ? (
              <img src={role.project.logo_url} alt={role.project.name} className="w-8 h-8 rounded-full" />
            ) : (
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                <span className="text-primary-foreground text-xs font-bold">{role.project?.name?.charAt(0)}</span>
              </div>
            )}
          </div>
        </div>

        {/* Project Name */}
        <div className="absolute top-4 left-4 right-4">
          <h3 className="text-white font-semibold text-sm truncate">{role.project?.name}</h3>
          {/* NOTE: tagline is not on the project type, you may need to add it. */}
        </div>
      </div>

      <CardContent className="p-4 space-y-3">
        <div>
          <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">{role.title}</h4>
          <p className="text-sm text-muted-foreground">by {role.project?.name}</p>
        </div>

        {role.role_category && (
          <Badge variant="secondary" className="text-xs">
            {role.role_category.name.toUpperCase()}
          </Badge>
        )}

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          {getCompensationIcon()}
          <span>{getCompensationText()}</span>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2">{role.description}</p>

        {role.requiredSkills && role.requiredSkills.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {role.requiredSkills.slice(0, 2).map((skill: string) => (
              <Badge key={skill} variant="outline" className="text-xs">
                {skill}
              </Badge>
            ))}
            {role.requiredSkills.length > 2 && (
              <Badge variant="outline" className="text-xs">
                +{role.requiredSkills.length - 2}
              </Badge>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
