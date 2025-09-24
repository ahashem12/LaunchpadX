import { useCallback } from "react";
import { ecosystemService } from "@/app/services/ecosystem";
import { EcosystemItem } from "@/components/ecosystem/EcosystemContainer";
import { CACHE_KEYS, useDataProvider } from "@/lib/providers/DataProviderContext";

export const useCachedEcosystemService = () => {
  const { getCachedData } = useDataProvider();

  const getGrants = useCallback(async (): Promise<EcosystemItem[]> => {
    try {
      return await getCachedData<EcosystemItem[]>(
        CACHE_KEYS.ECOSYSTEM_GRANTS,
        ecosystemService.getGrants,
      );
    } catch (e) {
      console.error("Error in getGrants:", e);
      return await ecosystemService.getGrants();
    }
  }, [getCachedData]);

  const getPartners = useCallback(async (): Promise<EcosystemItem[]> => {
    try {
      return await getCachedData<EcosystemItem[]>(
        CACHE_KEYS.ECOSYSTEM_PARTNERS,
        ecosystemService.getPartners,
      );
    } catch (e) {
      console.error("Error in getPartners:", e);
      return await ecosystemService.getPartners();
    }
  }, [getCachedData]);

  const getVentures = useCallback(async (): Promise<EcosystemItem[]> => {
    try {
      return await getCachedData<EcosystemItem[]>(
        CACHE_KEYS.ECOSYSTEM_VENTURES,
        ecosystemService.getVentures,
      );
    } catch (e) {
      console.error("Error in getVentures:", e);
      return await ecosystemService.getVentures();
    }
  }, [getCachedData]);

  const getLegalServices = useCallback(async (): Promise<EcosystemItem[]> => {
    try {
      return await getCachedData<EcosystemItem[]>(
        CACHE_KEYS.ECOSYSTEM_LEGAL,
        ecosystemService.getLegalServices,
      );
    } catch (e) {
      console.error("Error in getLegalServices:", e);
      return await ecosystemService.getLegalServices();
    }
  }, [getCachedData]);

  return {
    getGrants,
    getPartners,
    getVentures,
    getLegalServices,
  };
};