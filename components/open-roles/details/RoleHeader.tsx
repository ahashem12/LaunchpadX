"use client";
import type { Role } from "@/types/role";
import { PigeonIcon } from "@/components/icons/PigeonIcon";
import { RoleCategory, RoleType } from "@/types";

interface RoleHeaderProps {
  role: Role | null;
  roleType: RoleType | null;
  roleCategory: RoleCategory | null;
}

export function RoleHeader({ role, roleType,roleCategory }: RoleHeaderProps) {
  const hasBanner = false; // If you add a banner field to Role, update this
  if (!role) {
    return <div className="text-red-500">Role not found.</div>;
  }
  return (
    <div className={`relative w-full h-48 rounded-lg overflow-hidden ${!hasBanner ? "bg-gradient-to-r from-green-900 to-green-600" : ""}`}>
      {/* Banner Image (if exists) */}
      {hasBanner && role.bannerUrl ? (
        <img 
          src={role.bannerUrl}
          alt="Role banner" 
          className="w-full h-full object-cover" 
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/placeholder.svg";
          }}
        />
      ) : (
        <>
          {/* Pigeon Icons */}
          <div className="absolute bottom-4 right-4 opacity-90">
            <PigeonIcon size={80} className="" />
          </div>
          <div className="absolute top-4 left-4 opacity-90">
            <PigeonIcon size={80} className="" />
          </div>
        </>
      )}

      {/* Role Info */}
      <div className="absolute bottom-4 left-6 right-6">
        <div className="flex items-end justify-between">
          <div className="flex items-end gap-4">
            {/* Role Logo Placeholder */}
            <div className="flex-shrink-0 w-20 h-20 rounded-lg border-2 border-white/20 overflow-hidden bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center">
              <span className="text-white font-bold text-xl">
                {(role.title ?? "").substring(0, 2).toUpperCase()}
              </span>
            </div>

            {/* Role Metadata */}
            <div className="flex flex-col">
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold text-white drop-shadow-md">{role.title ?? "No Title"}</h1>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span className="text-sm text-white drop-shadow-md">{role.status ?? "No Status"}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm text-white drop-shadow-md">
                  Type: <span className="text-green-300 font-medium">{roleType?.name ?? "No Type"}</span>
                </span>
                <span className="text-sm text-white/80 tracking-wide drop-shadow-md">
                  Category: {roleCategory?.name ?? "No Category"}
                </span>
              </div>
              <div className="flex items-center gap-4 mt-2">
                <span className="text-xs text-white/80">Last updated: {role.updated_at ? new Date(role.updated_at).toLocaleDateString() : "-"}</span>
                <span className="text-xs text-white/80">Created: {role.created_at ? new Date(role.created_at).toLocaleDateString() : "-"}</span>
                <span className="text-xs text-white/80">Opened: {role.opened_at ? new Date(role.opened_at).toLocaleDateString() : "-"}</span>
                <span className="text-xs text-white/80">Closed: {role.closed_at ? new Date(role.closed_at).toLocaleDateString() : "-"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
