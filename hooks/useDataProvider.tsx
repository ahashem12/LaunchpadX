import {
  DataProviderContext,
  DataProviderContextType,
} from "@/lib/providers/DataProviderContext";
import { useContext } from "react";

export const useDataProvider = (): DataProviderContextType => {
  const context = useContext(DataProviderContext);
  if (context === undefined) {
    throw new Error("useDataProvider must be used within a DataProvider");
  }
  return context;
};
