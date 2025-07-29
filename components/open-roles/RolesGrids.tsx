import { RoleCard } from "./RoleCard"
import type { Role } from "@/lib/mock-roles-data"

interface RolesGridProps {
  roles: Role[]
}

export function RolesGrid({ roles }: RolesGridProps) {
  if (roles.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg">No roles found matching your criteria.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {roles.map((role) => (
        <RoleCard key={role.id} role={role} />
      ))}
    </div>
  )
}
