"use client";

import { useState, useEffect } from "react";
import { ApplicationService } from "@/app/services/applications/application-service";
import { ProfileDialog } from "@/components/profile/ProfileDialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ArrowLeft,
  CheckCircle,
  XCircle,
  Clock,
  User,
  Eye,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { RoleApplicationWithProfile, TeamRole } from "@/types";

interface ApplicationsListProps {
  role: TeamRole;
  onBack: () => void;
}

export function ApplicationsList({ role, onBack }: ApplicationsListProps) {
  const [applications, setApplications] = useState<
    RoleApplicationWithProfile[]
  >([]);
  const [selectedApplication, setSelectedApplication] =
    useState<RoleApplicationWithProfile | null>(null);
  const [profileDialogOpen, setProfileDialogOpen] = useState(false);
  const [profileToView, setProfileToView] =
    useState<RoleApplicationWithProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    async function loadApplications() {
      setIsLoading(true);
      const { data, error } = await ApplicationService.getApplicationsForRole(
        role.id
      );

      if (error) {
        toast({
          title: "Error",
          description: "Failed to load applications",
          variant: "destructive",
        });
      } else {
        setApplications(data);
      }

      setIsLoading(false);
    }

    loadApplications();
  }, [role.id, toast]);

  const handleStatusUpdate = async (
    applicationId: string,
    status: "accepted" | "rejected"
  ) => {
    setIsUpdating(applicationId);

    const { data, error } = await ApplicationService.updateApplicationStatus(
      applicationId,
      status
    );

    if (error) {
      toast({
        title: "Error",
        description: `Failed to ${status} application`,
        variant: "destructive",
      });
    } else {
      // Update the local state
      setApplications((prev) =>
        prev.map((app) => (app.id === applicationId ? { ...app, status } : app))
      );

      // Update selected application if it's the one being updated
      if (selectedApplication?.id === applicationId) {
        setSelectedApplication((prev) => (prev ? { ...prev, status } : null));
      }

      toast({
        title: "Success",
        description: `Application ${status} successfully`,
      });
    }

    setIsUpdating(null);
  };

  const handleViewProfile = (application: RoleApplicationWithProfile) => {
    setProfileToView(application);
    setProfileDialogOpen(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="secondary">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        );
      case "accepted":
        return (
          <Badge variant="default" className="bg-green-500">
            <CheckCircle className="h-3 w-3 mr-1" />
            Accepted
          </Badge>
        );
      case "rejected":
        return (
          <Badge variant="destructive">
            <XCircle className="h-3 w-3 mr-1" />
            Rejected
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Roles
          </Button>
        </div>
        <div className="text-center py-8">
          <div className="text-lg">Loading applications...</div>
        </div>
      </div>
    );
  }

  if (selectedApplication) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={() => setSelectedApplication(null)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Applications
          </Button>
          <div className="flex items-center space-x-2">
            {getStatusBadge(selectedApplication.status)}
            {selectedApplication.status === "pending" && (
              <div className="flex space-x-2">
                <Button
                  onClick={() =>
                    handleStatusUpdate(selectedApplication.id, "accepted")
                  }
                  disabled={isUpdating === selectedApplication.id}
                  className="bg-green-500 hover:bg-green-600"
                >
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Accept
                </Button>
                <Button
                  variant="destructive"
                  onClick={() =>
                    handleStatusUpdate(selectedApplication.id, "rejected")
                  }
                  disabled={isUpdating === selectedApplication.id}
                >
                  <XCircle className="h-4 w-4 mr-1" />
                  Reject
                </Button>
              </div>
            )}
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Applied for: {role.title}</CardTitle>
            <p className="text-sm text-muted-foreground">
              Applied on{" "}
              {new Date(selectedApplication.applied_at).toLocaleDateString()}
            </p>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage
                    src={selectedApplication.applicant.avatar_url || ""}
                  />
                  <AvatarFallback>
                    {selectedApplication.applicant.firstName?.[0] || ""}
                    {selectedApplication.applicant.lastName?.[0] || ""}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold">
                    {selectedApplication.applicant.firstName}{" "}
                    {selectedApplication.applicant.lastName}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedApplication.applicant.email}
                  </p>
                  {selectedApplication.applicant.bio && (
                    <p className="text-sm text-muted-foreground mt-1 max-w-md">
                      {selectedApplication.applicant.bio}
                    </p>
                  )}
                </div>
              </div>
              <Button
                variant="outline"
                onClick={() => handleViewProfile(selectedApplication)}
              >
                View Full Profile
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Roles
        </Button>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">
          Applications for: {role.title}
        </h2>

        {applications.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <User className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No applications yet</h3>
              <p className="text-muted-foreground">
                When candidates apply for this role, they will appear here.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {applications.map((application) => (
              <Card key={application.id} className="transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 flex-1">
                      <Avatar className="h-12 w-12">
                        <AvatarImage
                          src={application.applicant.avatar_url || ""}
                        />
                        <AvatarFallback>
                          {application.applicant.firstName?.[0] || ""}
                          {application.applicant.lastName?.[0] || ""}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-medium">
                            {application.applicant.firstName}{" "}
                            {application.applicant.lastName}
                          </h3>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleViewProfile(application)}
                            className="h-6 px-3 py-1 text-xs"
                          >
                            <Eye className="h-3 w-3 mr-1" />
                            View Profile
                          </Button>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {application.applicant.email}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Applied on{" "}
                          {new Date(
                            application.applied_at
                          ).toLocaleDateString()}
                        </p>
                        {application.applicant.bio && (
                          <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                            {application.applicant.bio}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      {getStatusBadge(application.status)}

                      {application.status === "pending" && (
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleStatusUpdate(application.id, "accepted");
                            }}
                            disabled={isUpdating === application.id}
                            className="bg-green-500 hover:bg-green-600"
                          >
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Accept
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleStatusUpdate(application.id, "rejected");
                            }}
                            disabled={isUpdating === application.id}
                          >
                            <XCircle className="h-3 w-3 mr-1" />
                            Reject
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Profile Dialog */}
      <ProfileDialog
        profile={profileToView?.applicant || null}
        open={profileDialogOpen}
        onOpenChange={setProfileDialogOpen}
      />
    </div>
  );
}
