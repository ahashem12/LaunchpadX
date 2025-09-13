"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Edit, Save, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { updateProject } from "@/app/services/projects/update";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProjectSectionEditProps {
  projectId: string;
  project: {
    name: string;
    description?: string | null;
    category?: string | null;
    status?: string | null;
  };
  isOpen: boolean;
  onClose: () => void;
  onProjectUpdated: (updatedProject: any) => void;
}

const PROJECT_CATEGORIES = [
  "DeFi",
  "NFT",
  "Gaming",
  "Infrastructure",
  "Social",
  "DAO",
  "Metaverse",
  "AI/ML",
  "Education",
  "Climate",
  "Other",
];

const PROJECT_STATUSES = [
  { value: "planning", label: "Planning" },
  { value: "in-progress", label: "In Progress" },
  { value: "completed", label: "Completed" },
];

export function ProjectSectionEdit({
  projectId,
  project,
  isOpen,
  onClose,
  onProjectUpdated,
}: ProjectSectionEditProps) {
  const [formData, setFormData] = useState({
    name: project.name || "",
    description: project.description || "",
    category: project.category || "",
    status: project.status || "planning",
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const { toast } = useToast();

  // Reset form data when dialog opens or project changes
  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: project.name || "",
        description: project.description || "",
        category: project.category || "",
        status: project.status || "planning",
      });
    }
  }, [isOpen, project]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    // Validation
    if (!formData.name.trim()) {
      toast({
        title: "Validation Error",
        description: "Project name is required.",
        variant: "destructive",
      });
      return;
    }

    setIsUpdating(true);

    try {
      // Prepare update data
      const updateData = {
        name: formData.name.trim(),
        description: formData.description.trim() || undefined,
        category: formData.category || undefined,
        status: formData.status as "planning" | "in-progress" | "completed",
      };

      // Update project in database
      const success = await updateProject(projectId, updateData);

      if (success) {
        onProjectUpdated({ ...project, ...updateData });
        onClose();
        toast({
          title: "Project updated",
          description: "Project details have been successfully updated.",
        });
      } else {
        throw new Error("Failed to update project");
      }
    } catch (error) {
      console.error("Error updating project:", error);
      toast({
        title: "Update failed",
        description: "Failed to update project details. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCancel = () => {
    // Reset form data
    setFormData({
      name: project.name || "",
      description: project.description || "",
      category: project.category || "",
      status: project.status || "planning",
    });
    onClose();
  };

  const hasChanges =
    formData.name !== project.name ||
    formData.description !== (project.description || "") ||
    formData.category !== (project.category || "") ||
    formData.status !== (project.status || "planning");

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Edit className="w-5 h-5" />
            Edit Project Details
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Project Name */}
          <div className="space-y-2">
            <Label htmlFor="project-name" className="text-sm font-medium">
              Project Name *
            </Label>
            <Input
              id="project-name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="Enter project name"
              className="w-full"
            />
          </div>

          {/* Project Description */}
          <div className="space-y-2">
            <Label
              htmlFor="project-description"
              className="text-sm font-medium"
            >
              Description
            </Label>
            <Textarea
              id="project-description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Describe your project..."
              className="w-full min-h-[120px] resize-none"
            />
            <p className="text-xs text-muted-foreground">
              A detailed description of your project, its goals, and what makes
              it unique.
            </p>
          </div>

          {/* Project Category */}
          <div className="space-y-2">
            <Label htmlFor="project-category" className="text-sm font-medium">
              Category
            </Label>
            <Select
              value={formData.category}
              onValueChange={(value) => handleInputChange("category", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">No category</SelectItem>
                {PROJECT_CATEGORIES.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Project Status */}
          <div className="space-y-2">
            <Label htmlFor="project-status" className="text-sm font-medium">
              Status
            </Label>
            <Select
              value={formData.status}
              onValueChange={(value) => handleInputChange("status", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {PROJECT_STATUSES.map((status) => (
                  <SelectItem key={status.value} value={status.value}>
                    {status.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={handleCancel}
            disabled={isUpdating}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={!hasChanges || isUpdating}
            className="min-w-[100px]"
          >
            {isUpdating ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
