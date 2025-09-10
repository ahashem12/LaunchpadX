"use client";

import { useState, useEffect } from "react";
import { ApplicationService } from "@/app/services/applications/application-service";
import { ProfileView } from "@/components/profile/ProfileView";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, Mail, User, Calendar } from "lucide-react";
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
  const [isLoading, setIsLoading] = useState(true);
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

  const copyEmailToClipboard = (email: string) => {
    navigator.clipboard
      .writeText(email)
      .then(() => {
        toast({
          title: "Email Copied!",
          description: `${email} copied to clipboard`,
        });
      })
      .catch(() => {
        toast({
          title: "Copy Failed",
          description: `Please manually copy: ${email}`,
          variant: "destructive",
        });
      });
  };

  if (selectedApplication) {
    return (
      <div className="space-y-6">
        <Button
          variant="ghost"
          onClick={() => setSelectedApplication(null)}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Applications
        </Button>

        <div className="space-y-6">
          {/* Profile Header Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage
                    src={selectedApplication.applicant.avatar_url || ""}
                    alt={selectedApplication.applicant.firstName || ""}
                  />
                  <AvatarFallback>
                    {selectedApplication.applicant.firstName?.charAt(0) ||
                      selectedApplication.applicant.email?.charAt(0) ||
                      "?"}
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
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="h-4 w-4 mr-2" />
                Applied{" "}
                {new Date(selectedApplication.applied_at).toLocaleDateString()}
              </div>

              {/* Contact Information */}
              <div className="space-y-3 p-3 bg-muted rounded-lg">
                <h4 className="font-medium text-sm">Contact Applicant</h4>
                <div className="flex items-center justify-between">
                  <span className="text-sm">
                    {selectedApplication.applicant.email}
                  </span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      copyEmailToClipboard(selectedApplication.applicant.email!)
                    }
                  >
                    Copy Email
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Click to copy their email address
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Profile Details */}
          <Card>
            <CardHeader>
              <h4 className="text-lg font-semibold">Applicant Profile</h4>
            </CardHeader>
            <CardContent>
              <ProfileView profile={selectedApplication.applicant} />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Roles
        </Button>
      </div>

      <div className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold">Applications for {role.title}</h2>
          <p className="text-muted-foreground">
            {applications.length} application
            {applications.length !== 1 ? "s" : ""} received
          </p>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 rounded-full bg-muted animate-pulse" />
                    <div className="space-y-2 flex-1">
                      <div className="h-4 bg-muted animate-pulse rounded w-1/4" />
                      <div className="h-3 bg-muted animate-pulse rounded w-1/2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : applications.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <User className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                No Applications Yet
              </h3>
              <p className="text-muted-foreground">
                When candidates apply for this role, they will appear here.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {applications.map((application) => (
              <Card
                key={application.id}
                className="hover:shadow-md transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage
                          src={application.applicant.avatar_url || ""}
                          alt={application.applicant.firstName || ""}
                        />
                        <AvatarFallback>
                          {application.applicant.firstName?.charAt(0) ||
                            application.applicant.email?.charAt(0) ||
                            "?"}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">
                          {application.applicant.firstName}{" "}
                          {application.applicant.lastName}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {application.applicant.email}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Applied{" "}
                          {new Date(
                            application.applied_at
                          ).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          copyEmailToClipboard(application.applicant.email!)
                        }
                      >
                        <Mail className="h-4 w-4 mr-2" />
                        Email
                      </Button>
                      <Button
                        variant="default"
                        onClick={() => setSelectedApplication(application)}
                      >
                        View Profile
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
