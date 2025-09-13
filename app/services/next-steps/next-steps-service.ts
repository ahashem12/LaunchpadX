// frontend\app\services\next-steps\next-steps-service.ts
import { createClient } from "@/lib/supabase/client";
import type { NextStep } from "@/types";
import { validateId } from "../projects/utils";

export interface CreateNextStepInput {
  project_id: string;
  title: string;
  description?: string;
}

export interface UpdateNextStepInput {
  title?: string;
  description?: string;
  done?: boolean;
}

export class NextStepsService {
  private supabase = createClient();

  async getNextStepsByProjectId(projectId: string): Promise<NextStep[]> {
    try {
      if (!validateId(projectId)) {
        console.error("Invalid UUID format:", projectId);
        return [];
      }

      const { data, error } = await this.supabase
        .from("next_steps")
        .select("*")
        .eq("project_id", projectId)
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Error fetching next steps:", error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error("Unexpected error fetching next steps:", error);
      return [];
    }
  }

  async createNextStep(input: CreateNextStepInput): Promise<NextStep | null> {
    try {
      if (!validateId(input.project_id)) {
        console.error("Invalid UUID format:", input.project_id);
        return null;
      }

      if (!input.title.trim()) {
        console.error("Title is required");
        return null;
      }

      const { data, error } = await this.supabase
        .from("next_steps")
        .insert({
          project_id: input.project_id,
          title: input.title.trim(),
          description: input.description?.trim(),
          done: false, // Explicitly set to false
        })
        .select()
        .single();

      if (error) {
        console.error("Error creating next step:", {
          message: error.message,
          code: error.code,
          details: error.details,
        });
        return null;
      }

      return data;
    } catch (error) {
      console.error("Unexpected error creating next step:", error);
      return null;
    }
  }

  async updateNextStep(
    id: string,
    input: UpdateNextStepInput
  ): Promise<NextStep | null> {
    try {
      const { data, error } = await this.supabase
        .from("next_steps")
        .update({
          ...input,
          title: input.title?.trim(),
          description: input.description?.trim(),
        })
        .eq("id", id)
        .select()
        .single();

      if (error) {
        console.error("Error updating next step:", error);
        return null;
      }

      return data;
    } catch (error) {
      console.error("Unexpected error updating next step:", error);
      return null;
    }
  }

  async deleteNextStep(id: string): Promise<boolean> {
    try {
      const { error } = await this.supabase
        .from("next_steps")
        .delete()
        .eq("id", id);

      if (error) {
        console.error("Error deleting next step:", error);
        return false;
      }

      return true;
    } catch (error) {
      console.error("Unexpected error deleting next step:", error);
      return false;
    }
  }

  async toggleNextStepDone(
    id: string,
    done: boolean
  ): Promise<NextStep | null> {
    return this.updateNextStep(id, { done });
  }
}

export const nextStepsService = new NextStepsService();
