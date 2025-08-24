import Link from "next/link"
import { RoleCard } from "./RoleCard"
import type { TeamRole } from "@/types/team"

interface RolesGridProps {
  roles: TeamRole[];
  userProjectIds: Set<string>;
}

export function RolesGrid({ roles, userProjectIds }: RolesGridProps) {
  if (!roles || roles.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg">No open roles found.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {roles.map((role) => {
        if (role.id) {
          const isMember = userProjectIds.has(role.id);
          const linkHref = `/open-roles/${role.id}`
          return (
            <Link href={linkHref}
              key={role.id}>
              <RoleCard role={role} />
            </Link>
          );
        }
        return (
          <RoleCard key={role.id} role={role} />
        );
      })}
    </div>
  )
}
