import { useState, useEffect } from "react";
import { ApplicationService } from "@/app/services/applications/application-service";

export function useApplicationCounts(roleIds: string[]) {
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadCounts() {
      if (roleIds.length === 0) {
        setCounts({});
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      const { data, error: fetchError } = await ApplicationService.getApplicationCountsForRoles(roleIds);

      if (fetchError) {
        setError(fetchError);
      } else {
        setCounts(data);
      }

      setIsLoading(false);
    }

    loadCounts();
  }, [roleIds.join(',')]); // Re-run when roleIds change

  return { counts, isLoading, error };
}
