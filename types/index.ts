// Re-export all types from organized modules
export * from "./auth";
export * from "./project";
export * from "./role";
export * from "./role-type";
export * from "./role-category";
export * from "./profile";
export * from "./team";
export * from "./application";
export * from "./agreements";
export * from "./documents";
export * from "./financial";
export * from "./governance";
export * from "./wallet";
export * from "./api";
export * from "./database";

// Common utility types
export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface FilterOption extends SelectOption {
  count?: number;
}

export interface SortOption {
  field: string;
  direction: "asc" | "desc";
  label: string;
}

export interface PaginationState {
  page: number;
  limit: number;
  total: number;
}

export interface LoadingState {
  loading: boolean;
  error: string | null;
}
