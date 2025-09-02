import { useState, useEffect } from "react";
import { ApplicationService } from "@/app/services/applications/application-service";
import { useToast } from "@/hooks/use-toast";
import { createClient } from "@/lib/supabase/client";
import type { RoleApplication } from "@/types/application";

// Simple shared state for synchronization
const applicationCache = new Map<string, RoleApplication | null>();
const loadingStates = new Map<string, boolean>();
const subscribers = new Map<string, Set<() => void>>();

export function useRoleApplication(roleId: string) {
  const [application, setApplication] = useState<RoleApplication | null>(
    applicationCache.get(roleId) || null
  );
  const [isApplying, setIsApplying] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Subscribe to updates for this roleId
  useEffect(() => {
    const updateState = () => {
      setApplication(applicationCache.get(roleId) || null);
      setIsLoading(loadingStates.get(roleId) || false);
    };

    if (!subscribers.has(roleId)) {
      subscribers.set(roleId, new Set());
    }
    subscribers.get(roleId)!.add(updateState);

    return () => {
      subscribers.get(roleId)?.delete(updateState);
    };
  }, [roleId]);

  useEffect(() => {
    async function loadInitialData() {
      // Don't reload if already loaded
      if (applicationCache.has(roleId) && !loadingStates.get(roleId)) {
        setApplication(applicationCache.get(roleId) || null);
        setIsLoading(false);
        return;
      }

      loadingStates.set(roleId, true);
      setIsLoading(true);

      // Notify all subscribers
      subscribers.get(roleId)?.forEach((callback) => callback());

      // Check authentication
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const authenticated = !!user;
      setIsAuthenticated(authenticated);

      // If authenticated, check application status
      if (authenticated && roleId) {
        const { data } = await ApplicationService.getUserApplicationStatus(
          roleId
        );
        applicationCache.set(roleId, data);
        setApplication(data);
      }

      loadingStates.set(roleId, false);
      setIsLoading(false);

      // Notify all subscribers
      subscribers.get(roleId)?.forEach((callback) => callback());
    }

    loadInitialData();
  }, [roleId]);

  const handleApply = async () => {
    if (!roleId) return;

    if (!isAuthenticated) {
      // Redirect to login
      window.location.href = `/login?redirect=${encodeURIComponent(
        window.location.pathname
      )}`;
      return;
    }

    setIsApplying(true);
    const { data, error } = await ApplicationService.applyForRole(roleId);

    if (error) {
      toast({
        title: "Application Failed",
        description: error,
        variant: "destructive",
      });
    } else if (data) {
      // Update cache and notify all subscribers
      applicationCache.set(roleId, data);
      setApplication(data);
      subscribers.get(roleId)?.forEach((callback) => callback());

      toast({
        title: "Application Submitted!",
        description: "Your application has been sent to the project owner.",
      });
    }
    setIsApplying(false);
  };

  const getButtonContent = (compact = false) => {
    if (isLoading) {
      return "Loading...";
    }

    if (!isAuthenticated) {
      return "Login to Apply";
    }

    if (application) {
      switch (application.status) {
        case "pending":
          return compact ? "Applied" : "Application Submitted";
        case "accepted":
          return compact ? "Accepted" : "Application Accepted";
        case "rejected":
          return compact ? "Rejected" : "Application Rejected";
        default:
          return "Apply";
      }
    }

    return isApplying ? "Applying..." : "Apply Now";
  };

  const getButtonVariant = () => {
    if (application?.status === "accepted") return "default";
    if (application?.status === "rejected") return "outline";
    if (application?.status === "pending") return "secondary";
    return "default";
  };

  const isButtonDisabled = () => {
    return isLoading || !!application || isApplying;
  };

  return {
    application,
    isApplying,
    isAuthenticated,
    isLoading,
    handleApply,
    getButtonContent,
    getButtonVariant,
    isButtonDisabled,
  };
}
