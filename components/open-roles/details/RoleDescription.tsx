import type { Role } from "@/types/role";

interface RoleDescriptionProps {
  role: Role;
}

export function RoleDescription({ role }: RoleDescriptionProps) {
  return (
    <div className="bg-muted rounded-lg p-6">
      <h2 className="text-xl font-semibold text-white mb-4">Role Description</h2>
      <div className="text-gray-300 leading-relaxed">
        {role.description ? (
          <p>{role.description}</p>
        ) : (
          <div className="text-gray-400 italic">No description added for this role yet.</div>
        )}
      </div>
    </div>
  );
}
