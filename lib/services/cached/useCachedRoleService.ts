import { useCallback } from "react";
import { RoleCategory, roleService, RoleType } from "@/app/services/roles";
import { CACHE_KEYS, useDataProvider } from "@/lib/providers/DataProviderContext";

export const useCachedRoleService = () => {
  const { getCachedData } = useDataProvider();

  const getRoleTypes = useCallback(async (): Promise<{
    data: RoleType[] | null;
    error: any;
  }> => {
    try {
      return await getCachedData<{ data: RoleType[] | null; error: any }>(
        CACHE_KEYS.ROLE_TYPES,
        roleService.getRoleTypes,
      );
    } catch (e) {
      console.error("Error in getRoleTypes:", e);
      return await roleService.getRoleTypes();
    }
  }, [getCachedData]);

  const getRoleCategories = useCallback(async (): Promise<{
    data: RoleCategory[] | null;
    error: any;
  }> => {
    try {
      return await getCachedData<{ data: RoleCategory[] | null; error: any }>(
        CACHE_KEYS.ROLE_CATEGORIES,
        roleService.getRoleCategories,
      );
    } catch (e) {
      console.error("Error in getRoleCategories:", e);
      return await roleService.getRoleCategories();
    }
  }, [getCachedData]);

  return {
    getRoleTypes,
    getRoleCategories,
  };
};