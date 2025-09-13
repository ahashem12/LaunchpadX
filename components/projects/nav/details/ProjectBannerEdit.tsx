"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Camera, Upload, X, Save, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { updateProject } from "@/app/services/projects/update";
import { ProjectBannerService } from "@/app/services/projects/banner-service";

interface ProjectBannerEditProps {
  projectId: string;
  currentBannerUrl: string | null;
  projectName: string;
  isOpen: boolean;
  onClose: () => void;
  onBannerUpdated: (newBannerUrl: string | null) => void;
}

export function ProjectBannerEdit({
  projectId,
  currentBannerUrl,
  projectName,
  isOpen,
  onClose,
  onBannerUpdated,
}: ProjectBannerEditProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false); // Track if user explicitly removed banner
  const { toast } = useToast();

  // Cleanup preview URL when component unmounts or dialog closes
  useEffect(() => {
    if (!isOpen) {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
        setPreviewUrl(null);
      }
      setSelectedFile(null);
      setIsRemoved(false); // Reset removed state when dialog closes
    }
  }, [isOpen]);

  // Cleanup preview URL when component unmounts
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      // Check file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select an image smaller than 5MB.",
          variant: "destructive",
        });
        return;
      }

      // Cleanup previous preview URL
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }

      // Create new preview URL for immediate display
      const newPreviewUrl = URL.createObjectURL(file);
      setPreviewUrl(newPreviewUrl);
      setSelectedFile(file);
      setIsRemoved(false); // Reset removed state when new file is selected

      toast({
        title: "Banner selected",
        description: "Click 'Save Changes' to update the project banner.",
      });
    } else {
      toast({
        title: "Invalid file type",
        description: "Please select a valid image file (JPG, PNG, GIF).",
        variant: "destructive",
      });
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(false);

    const file = event.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select an image smaller than 5MB.",
          variant: "destructive",
        });
        return;
      }

      // Cleanup previous preview URL
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }

      // Create new preview URL for immediate display
      const newPreviewUrl = URL.createObjectURL(file);
      setPreviewUrl(newPreviewUrl);
      setSelectedFile(file);
      setIsRemoved(false); // Reset removed state when new file is selected
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(false);
  };

  const handleRemoveBanner = () => {
    // Cleanup preview URL when removing
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    setSelectedFile(null);
    setIsRemoved(true); // Mark as explicitly removed
    toast({
      title: "Banner removed",
      description: "Click 'Save Changes' to use the default project banner.",
    });
  };

  const uploadFile = async (file: File): Promise<string | null> => {
    const { url, error } = await ProjectBannerService.uploadBanner(
      file,
      projectId
    );

    if (error) {
      throw new Error(error);
    }

    return url;
  };

  const handleSave = async () => {
    setIsUploading(true);

    try {
      let bannerUrl = currentBannerUrl;

      // If removing banner
      if (isRemoved && !selectedFile) {
        bannerUrl = null;
      }
      // If uploading new banner
      else if (selectedFile) {
        const uploadedUrl = await uploadFile(selectedFile);
        if (uploadedUrl) {
          bannerUrl = uploadedUrl;
        } else {
          throw new Error("Failed to upload banner image");
        }
      }

      // Update project in database
      const success = await updateProject(projectId, {
        banner_url: bannerUrl || undefined,
      });

      if (success) {
        onBannerUpdated(bannerUrl);
        onClose();
        toast({
          title: "Banner updated",
          description: "Project banner has been successfully updated.",
        });
      } else {
        throw new Error("Failed to update project");
      }
    } catch (error) {
      console.error("Error updating banner:", error);
      toast({
        title: "Update failed",
        description: "Failed to update project banner. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleCancel = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    setSelectedFile(null);
    setIsRemoved(false); // Reset removed state on cancel
    onClose();
  };

  const hasChanges = selectedFile !== null || isRemoved;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Project Banner</DialogTitle>
        </DialogHeader>

        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="relative">
              {/* Banner Display */}
              <div
                className={`relative h-48 bg-gradient-to-r from-green-900 to-green-600 flex items-center justify-center ${
                  isDragOver ? "opacity-80" : ""
                }`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                style={{
                  backgroundImage:
                    previewUrl ||
                    (!selectedFile && !isRemoved && currentBannerUrl)
                      ? `url(${previewUrl || currentBannerUrl})`
                      : undefined,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              >
                {/* Overlay for better text visibility */}
                {(previewUrl ||
                  (!selectedFile && !isRemoved && currentBannerUrl)) && (
                  <div className="absolute inset-0 bg-black/20" />
                )}

                {/* Default Banner Message (when user removes banner) */}
                {isRemoved && !previewUrl && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                    <Camera className="w-12 h-12 mb-4 opacity-60" />
                    <p className="text-lg font-medium mb-2">
                      Using Default Banner
                    </p>
                    <p className="text-sm opacity-80 text-center max-w-xs">
                      Your project will use the default gradient banner
                    </p>
                  </div>
                )}

                {/* Upload Area (only show when no banner or when dragging) */}
                {(!previewUrl &&
                  !isRemoved &&
                  !(!selectedFile && currentBannerUrl)) ||
                isDragOver ? (
                  <div
                    className={`absolute inset-0 flex flex-col items-center justify-center text-white ${
                      isDragOver ? "bg-black/50" : ""
                    }`}
                  >
                    <Camera className="w-12 h-12 mb-2 opacity-80" />
                    <p className="text-lg font-medium mb-1">
                      {isDragOver ? "Drop your banner here" : "Add a banner"}
                    </p>
                    <p className="text-sm opacity-80">
                      Drag & drop or click to upload
                    </p>
                  </div>
                ) : null}

                {/* Action Buttons */}
                <div className="absolute top-4 right-4 flex gap-2">
                  {(previewUrl ||
                    (!selectedFile && !isRemoved && currentBannerUrl)) && (
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={handleRemoveBanner}
                      className="bg-black/50 hover:bg-black/70 text-white border-0"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                  <Button
                    variant="secondary"
                    size="sm"
                    className="bg-black/50 hover:bg-black/70 text-white border-0"
                    onClick={() =>
                      document.getElementById("project-banner-upload")?.click()
                    }
                  >
                    <Upload className="w-4 h-4 mr-1" />
                    {previewUrl ||
                    (!selectedFile && !isRemoved && currentBannerUrl)
                      ? "Change"
                      : "Upload"}
                  </Button>
                </div>
              </div>

              {/* Hidden File Input */}
              <Input
                id="project-banner-upload"
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>

            {/* Banner Info */}
            <div className="p-4 border-t">
              <Label className="text-sm text-muted-foreground">
                Recommended size: 1200x300px. Supports JPG, PNG, and GIF up to
                5MB.
              </Label>
            </div>
          </CardContent>
        </Card>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={handleCancel}
            disabled={isUploading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={!hasChanges || isUploading}
            className="min-w-[100px]"
          >
            {isUploading ? (
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
