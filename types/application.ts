import type { Profile } from "./profile";

export interface RoleApplication {
  id: string;
  role_id: string;
  applicant_id: string;
  applied_at: string;
  status: "pending" | "accepted" | "rejected";
}

export interface RoleApplicationWithProfile {
  id: string;
  role_id: string;
  applicant_id: string;
  applied_at: string;
  status: "pending" | "accepted" | "rejected";
  applicant: Profile;
}
