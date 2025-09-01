"use client";

import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { useState, useEffect } from "react";
import { updateProject } from "@/app/services/projects/update";

interface ProjectDescriptionProps {
  description?: string | null;
  category?: string | null;
  projectId: string;
}

export function ProjectDescription({ description, projectId }: ProjectDescriptionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [currentDescription, setCurrentDescription] = useState(description || "");
  const [editedDescription, setEditedDescription] = useState(description || "");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setCurrentDescription(description || "");
    setEditedDescription(description || "");
  }, [description]);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedDescription(currentDescription);
  };

  const handleSave = async () => {
    setIsSaving(true);
    const success = await updateProject(projectId, { description: editedDescription });
    setIsSaving(false);
    if (success) {
      setCurrentDescription(editedDescription);
      setIsEditing(false);
    } else {
      // Handle error, maybe show toast
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedDescription(currentDescription);
  };

  return (
    <div className="bg-muted rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Edit className="h-5 w-5 text-green-500" />
          <h2 className="text-xl font-semibold text-white">
            Project Description
          </h2>
        </div>
        {!isEditing ? (
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-white"
            onClick={handleEdit}
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit Section
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-white"
              onClick={handleCancel}
              disabled={isSaving}
            >
              Cancel
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={handleSave}
              disabled={isSaving}
            >
              {isSaving ? "Saving..." : "Save"}
            </Button>
          </div>
        )}
      </div>
      <div className="text-gray-300 leading-relaxed">
        {isEditing ? (
          <textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            className="w-full bg-transparent text-gray-300 border border-gray-600 rounded p-2"
            rows={4}
            placeholder="Enter project description..."
          />
        ) : currentDescription ? (
          <p>{currentDescription}</p>
        ) : (
          <div className="text-gray-400 italic">
            No description added for this project yet.
          </div>
        )}
      </div>
    </div>
  );
}
