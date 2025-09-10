"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Code, User, MoreHorizontal, Share2 } from "lucide-react";
import { useApplicationCounts } from "@/hooks/use-application-counts";
import type { TeamRole } from "@/types";

interface OpenRolesTableProps {
  roles: TeamRole[];
  onViewApplications?: (roleId: string) => void;
}

export function OpenRolesTable({
  roles,
  onViewApplications,
}: OpenRolesTableProps) {
  const roleIds = roles.map((role) => role.id);
  const { counts, isLoading } = useApplicationCounts(roleIds);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Open Roles</h2>
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40%]">Role Type</TableHead>
              <TableHead>Opened On</TableHead>
              <TableHead>Candidates</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {roles.map((role) => {
              const candidateCount = counts[role.id] || 0;

              return (
                <TableRow key={role.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8 bg-muted">
                        <AvatarFallback>
                          <Code className="h-4 w-4 text-muted-foreground" />
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{role.title}</div>
                        <Badge
                          variant="outline"
                          className="text-orange-500 border-orange-200"
                        >
                          {role.role_category?.name.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {new Date(role.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span>{isLoading ? "..." : candidateCount}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end space-x-2">
                      {onViewApplications && candidateCount > 0 && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onViewApplications(role.id)}
                        >
                          View Applications ({candidateCount})
                        </Button>
                      )}
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
