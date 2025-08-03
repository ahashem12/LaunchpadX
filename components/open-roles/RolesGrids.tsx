import Link from "next/link"
import { RoleCard } from "./RoleCard"
import type { TeamRole } from "@/types/team"

interface RolesGridProps {
  roles: TeamRole[]
}

export function RolesGrid({ roles }: RolesGridProps) {
  if (!roles || roles.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg">No open roles found.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {roles.map((role) =>
        role.project?.id ? (
          <Link href={`/projects/${role.project.id}`} key={role.id}>
            <RoleCard role={role} />
          </Link>
        ) : (
          <RoleCard key={role.id} role={role} />
        ),
      )}
    </div>
  )
}
