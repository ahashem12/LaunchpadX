import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Euro, Percent } from "lucide-react"
import type { Role } from "@/lib/mock-roles-data"

interface RoleCardProps {
  role: Role
}

export function RoleCard({ role }: RoleCardProps) {
  const getCompensationIcon = () => {
    if (role.compensation.type === "equity") {
      return <Percent className="h-4 w-4" />
    }
    return <Euro className="h-4 w-4" />
  }

  const getCompensationText = () => {
    if (role.compensation.type === "undisclosed") {
      return "Undisclosed"
    }
    if (role.compensation.type === "equity") {
      return `${role.compensation.value} equity / total`
    }
    return role.compensation.value
  }

  return (
    <Card className="group overflow-hidden bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card/80 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
      <div className="relative h-32 overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5"
          style={{
            backgroundImage: role.bannerUrl ? `url(${role.bannerUrl})` : undefined,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

        {/* Project Logo */}
        <div className="absolute bottom-4 left-4">
          <div className="w-12 h-12 rounded-full bg-background/90 backdrop-blur-sm border-2 border-primary/20 flex items-center justify-center">
            {role.logoUrl ? (
              <img src={role.logoUrl || "/placeholder.svg"} alt={role.company} className="w-8 h-8 rounded-full" />
            ) : (
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                <span className="text-primary-foreground text-xs font-bold">{role.company.charAt(0)}</span>
              </div>
            )}
          </div>
        </div>

        {/* Project Name */}
        <div className="absolute top-4 left-4 right-4">
          <h3 className="text-white font-semibold text-sm truncate">{role.company}</h3>
          <p className="text-white/80 text-xs">{role.projectTagline}</p>
        </div>
      </div>

      <CardContent className="p-4 space-y-3">
        <div>
          <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">{role.title}</h4>
          <p className="text-sm text-muted-foreground">by {role.company}</p>
        </div>

        <Badge variant="secondary" className="text-xs">
          {role.category.toUpperCase()}
        </Badge>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          {getCompensationIcon()}
          <span>{getCompensationText()}</span>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2">{role.description}</p>

        <div className="flex flex-wrap gap-1">
          {role.skills.slice(0, 2).map((skill) => (
            <Badge key={skill} variant="outline" className="text-xs">
              {skill}
            </Badge>
          ))}
          {role.skills.length > 2 && (
            <Badge variant="outline" className="text-xs">
              +{role.skills.length - 2}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
