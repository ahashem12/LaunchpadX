import { createContext, useCallback, useMemo, useState } from "react";
import { CacheManager, CacheStats } from "../cache/CacheManager";

export type DataProviderContextType = {
  getCachedData<T>(
    cacheKey: string,
    fetchFunction: () => Promise<T>,
  ): Promise<T>;
  invalidateCache(cacheKey: string): void;
  clearAllCaches(): void;
  isLoading(cacheKey: string): boolean;
  getError(cacheKey: string): string | null;
  getCacheStats(cacheKey: string): CacheStats | null;
};

export const CACHE_KEYS = {
  // Roles
  ROLE_TYPES: "role-types",
  ROLE_CATEGORIES: "role-categories",

  // Skills
  ALL_SKILLS: "all-skills",
  SKILLS_BY_IDS: "skills-by-ids", // For getSkillsByIds

  // Ecosystem
  ECOSYSTEM_PARTNERS: "ecosystem-partners",
  ECOSYSTEM_VENTURES: "ecosystem-ventures",
  ECOSYSTEM_GRANTS: "ecosystem-grants",
  ECOSYSTEM_LEGAL: "ecosystem-legal",

  // Projects
  ALL_PROJECTS: "all-projects",
  USER_PROJECTS: "user-projects", // Could be dynamic: "user-projects-{userId}"
} as const;

export const DataProviderContext = createContext<
  DataProviderContextType | undefined
>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cacheManager] = useState(new CacheManager<any>());
  const [loadingStates, setLoadingStates] = useState(
    () => new Map<string, boolean>(),
  );
  const [errorStates, setErrorStates] = useState(
    () => new Map<string, string | null>(),
  );

  const setLoadingState = (cacheKey: string, isLoading: boolean) => {
    setLoadingStates((prev) => {
      const newMap = new Map(prev);
      newMap.set(cacheKey, isLoading);
      return newMap;
    });
  };

  const setErrorState = (cacheKey: string, error: string | null) => {
    setErrorStates((prev) => {
      const newMap = new Map(prev);
      newMap.set(cacheKey, error);
      return newMap;
    });
  };
  const getCachedData = useCallback(
    async <T,>(cacheKey: string, fetchFunction: () => Promise<T>) => {
      setLoadingState(cacheKey, true);
      try {
        const cacheData = cacheManager.get(cacheKey) as T | null;
        if (cacheData !== null) {
          setLoadingState(cacheKey, false);
          setErrorState(cacheKey, null);
          return cacheData;
        } else {
          const freshData = await fetchFunction();
          cacheManager.set(cacheKey, freshData);
          setLoadingState(cacheKey, false);
          setErrorState(cacheKey, null);
          return freshData;
        }
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error";
        setErrorState(cacheKey, errorMessage);
        setLoadingState(cacheKey, false);
        throw error;
      }
    },
    [setLoadingState, setErrorState, cacheManager],
  );

  const invalidateCache = useCallback(
    (cacheKey: string) => {
      cacheManager.delete(cacheKey);
    },
    [cacheManager],
  );

  const clearAllCaches = useCallback(() => {
    cacheManager.clear();
    setLoadingStates(new Map());
    setErrorStates(new Map());
  }, [cacheManager]);

  const isLoading = useCallback(
    (cacheKey: string) => {
      return loadingStates.get(cacheKey) || false;
    },
    [loadingStates],
  );

  const getError = useCallback(
    (cacheKey: string) => {
      return errorStates.get(cacheKey) || null;
    },
    [errorStates],
  );

  const getCacheStats = useCallback(
    (cacheKey: string): CacheStats | null => {
      return cacheManager.getStats();
    },
    [cacheManager],
  );

  const contextValue: DataProviderContextType = useMemo(
    () => ({
      getCachedData,
      invalidateCache,
      clearAllCaches,
      isLoading,
      getError,
      getCacheStats,
    }),
    [
      getCachedData,
      invalidateCache,
      clearAllCaches,
      isLoading,
      getError,
      getCacheStats,
    ],
  );

  return (
    <DataProviderContext.Provider value={contextValue}>
      {children}
    </DataProviderContext.Provider>
  );
};
