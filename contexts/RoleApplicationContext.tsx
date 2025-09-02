"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { ApplicationService } from "@/app/services/applications/application-service";
import { createClient } from "@/lib/supabase/client";
import type { RoleApplication } from "@/types/application";

interface RoleApplicationState {
  application: RoleApplication | null;
  isApplying: boolean;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface RoleApplicationContextType {
  applicationStates: Record<string, RoleApplicationState>;
  updateApplicationState: (roleId: string, state: Partial<RoleApplicationState>) => void;
  getApplicationState: (roleId: string) => RoleApplicationState;
  refreshApplicationStatus: (roleId: string) => Promise<void>;
}

const RoleApplicationContext = createContext<RoleApplicationContextType | undefined>(undefined);

export function RoleApplicationProvider({ children }: { children: ReactNode }) {
  const [applicationStates, setApplicationStates] = useState<Record<string, RoleApplicationState>>({});

  const updateApplicationState = (roleId: string, state: Partial<RoleApplicationState>) => {
    setApplicationStates(prev => ({
      ...prev,
      [roleId]: {
        ...prev[roleId],
        ...state,
      }
    }));
  };

  const getApplicationState = (roleId: string): RoleApplicationState => {
    return applicationStates[roleId] || {
      application: null,
      isApplying: false,
      isAuthenticated: false,
      isLoading: true,
    };
  };

  const refreshApplicationStatus = async (roleId: string) => {
    if (!roleId) return;

    // Get current state to avoid unnecessary loading
    const currentState = applicationStates[roleId];
    if (currentState && !currentState.isLoading && (currentState.isAuthenticated !== undefined)) {
      // Already loaded, don't reload
      return;
    }

    updateApplicationState(roleId, { isLoading: true });

    try {
      // Check authentication
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      const authenticated = !!user;

      // If authenticated, check application status
      let application = null;
      if (authenticated) {
        const { data } = await ApplicationService.getUserApplicationStatus(roleId);
        application = data;
      }

      updateApplicationState(roleId, {
        isAuthenticated: authenticated,
        application,
        isLoading: false,
      });
    } catch (error) {
      console.error("Failed to refresh application status:", error);
      updateApplicationState(roleId, { isLoading: false });
    }
  };

  const value = {
    applicationStates,
    updateApplicationState,
    getApplicationState,
    refreshApplicationStatus,
  };

  return (
    <RoleApplicationContext.Provider value={value}>
      {children}
    </RoleApplicationContext.Provider>
  );
}

export function useRoleApplicationContext() {
  const context = useContext(RoleApplicationContext);
  if (context === undefined) {
    throw new Error('useRoleApplicationContext must be used within a RoleApplicationProvider');
  }
  return context;
}
