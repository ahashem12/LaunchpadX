"use client";

import { useState } from "react";
import { AlertCards } from "./AlertCards";
import { CreateRoleModal } from "./CreateRoleModal/CreateRoleModal";
import { OpenRolesTable } from "./OpenRolesTable";
import { ApplicationsList } from "./ApplicationsList";
import { RoleFilterBadges } from "./RoleFilterBadges";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { TeamMember, TeamRole } from "@/types";

interface TeamRolesProps {
  roles: TeamRole[];
  teamMembers: TeamMember[];
  isProjectOwner: boolean;
  projectId: string;
  roleCounts: Record<string, number>;
  onCreateRoleClick: () => void;
  isCreateRoleModalOpen: boolean;
  onCloseCreateRoleModal: () => void;
}

export function TeamRoles({
  roles,
  isProjectOwner,
  roleCounts,
  onCreateRoleClick,
  isCreateRoleModalOpen,
  onCloseCreateRoleModal,
  projectId,
}: TeamRolesProps) {
  const [selectedRoleForApplications, setSelectedRoleForApplications] =
    useState<TeamRole | null>(null);

  const handleViewApplications = (roleId: string) => {
    const role = roles.find((r) => r.id === roleId);
    if (role) {
      setSelectedRoleForApplications(role);
    }
  };

  if (selectedRoleForApplications) {
    return (
      <ApplicationsList
        role={selectedRoleForApplications}
        onBack={() => setSelectedRoleForApplications(null)}
      />
    );
  }

  return (
    <div className="space-y-8">
      {isProjectOwner && (
        <RoleFilterBadges
          roleCounts={roleCounts}
          onCreateRoleClick={onCreateRoleClick}
        />
      )}

      <AlertCards roles={roles} />

      {roles.length > 0 ? (
        <Tabs defaultValue="roles" className="w-full">
          <TabsList>
            <TabsTrigger value="roles">Open Roles</TabsTrigger>
            {isProjectOwner && (
              <TabsTrigger value="applications">Applications</TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="roles" className="mt-6">
            <OpenRolesTable
              roles={roles}
              onViewApplications={
                isProjectOwner ? handleViewApplications : undefined
              }
            />
          </TabsContent>

          {isProjectOwner && (
            <TabsContent value="applications" className="mt-6">
              <div className="text-center py-8">
                <h3 className="text-lg font-medium mb-2">
                  Select a role to view applications
                </h3>
                <p className="text-muted-foreground">
                  Click "View Applications" on any role in the Open Roles tab to
                  see candidate applications.
                </p>
              </div>
            </TabsContent>
          )}
        </Tabs>
      ) : (
        <div className="text-center py-8">
          <h3 className="text-lg font-medium mb-2">No open roles</h3>
          <p className="text-muted-foreground">
            Create your first role to start building your team.
          </p>
        </div>
      )}

      {isProjectOwner && (
        <CreateRoleModal
          isOpen={isCreateRoleModalOpen}
          onClose={onCloseCreateRoleModal}
          projectId={projectId}
        />
      )}
    </div>
  );
}
