import { useCallback } from "react";
import { skillService, Skill } from "@/app/services/skills";
import { CACHE_KEYS, useDataProvider } from "@/lib/providers/DataProviderContext";
import { isArrayEmpty } from "@/lib/utils";

const generateSkillsByIdsKey = (ids: string[]): string | null => {
  if (isArrayEmpty(ids)) {
    return null;
  }

  const sortedIds = ids.sort();
  return `skills-by-ids-${sortedIds.join("-")}`;
};

export const useCachedSkillService = () => {
  const { getCachedData } = useDataProvider();

  const getAllSkills = useCallback(async (): Promise<Skill[]> => {
    try {
      return await getCachedData<Skill[]>(
        CACHE_KEYS.ALL_SKILLS,
        skillService.getAllSkills,
      );
    } catch (e) {
      console.error("Error in getAllSkills:", e);
      return await skillService.getAllSkills();
    }
  }, [getCachedData]);

  const getSkillsByIds = useCallback(async (ids: string[]): Promise<Skill[]> => {
    try {
      const cacheKey = generateSkillsByIdsKey(ids);

      if (!cacheKey) {
        return await skillService.getSkillsByIds(ids);
      }

      return await getCachedData<Skill[]>(cacheKey, () =>
        skillService.getSkillsByIds(ids),
      );
    } catch (e) {
      console.error("Error in getSkillsByIds:", e);
      return await skillService.getSkillsByIds(ids);
    }
  }, [getCachedData]);

  return {
    getAllSkills,
    getSkillsByIds,
  };
};