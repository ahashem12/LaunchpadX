"use client";

import { Edit, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PigeonIcon } from "@/components/icons/PigeonIcon";
import { projectService } from "@/app/services/projects/project-service";
import { useEffect, useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { EditDropdown } from "./EditDropdown";
import { ProjectBannerEdit } from "./ProjectBannerEdit";

interface ProjectHeaderProps {
  project: {
    id: string;
    name: string;
    status: string;
    logo_url?: string | null;
    category?: string | null;
    bannerUrl?: string | null;
    description?: string | null;
    banner_url?: string | null;
  };
  bannerUrl?: string | null;
}

export function ProjectHeader({ project, bannerUrl }: ProjectHeaderProps) {
  const [owner, setOwner] = useState<{ user_id: string; profile?: any } | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [currentProject, setCurrentProject] = useState(project);
  const [currentBannerUrl, setCurrentBannerUrl] = useState(
    bannerUrl || project.banner_url || project.bannerUrl
  );

  // Modal states
  const [isBannerEditOpen, setIsBannerEditOpen] = useState(false);
  const [bannerLoading, setBannerLoading] = useState(false);
  const [bannerError, setBannerError] = useState(false);

  useEffect(() => {
    async function fetchOwner() {
      try {
        setIsLoading(true);
        const ownerData = await projectService.getProjectOwner(project.id);
        setOwner(ownerData);
      } catch (error) {
        console.error("Error fetching project owner:", error);
        setOwner(null);
      } finally {
        setIsLoading(false);
      }
    }

    fetchOwner();
  }, [project.id]);

  // Update project data when props change
  useEffect(() => {
    setCurrentProject(project);
  }, [project]);

  useEffect(() => {
    setCurrentBannerUrl(bannerUrl || project.banner_url || project.bannerUrl);
  }, [bannerUrl, project.banner_url, project.bannerUrl]);

  const handleBannerUpdated = (newBannerUrl: string | null) => {
    setCurrentBannerUrl(newBannerUrl);
    setCurrentProject((prev) => ({ ...prev, banner_url: newBannerUrl }));
    setBannerError(false); // Reset error state when banner is updated
  };

  const hasBanner = currentBannerUrl;
  return (
    <div
      className={`relative w-full h-48 rounded-lg overflow-hidden ${
        !hasBanner ? "bg-gradient-to-r from-green-900 to-green-600" : ""
      }`}
    >
      {/* Banner Image (if exists) */}
      {hasBanner ? (
        <img
          src={hasBanner}
          alt="Project banner"
          className="w-full h-full object-cover"
          onLoad={() => setBannerLoading(false)}
          onLoadStart={() => setBannerLoading(true)}
          onError={(e) => {
            setBannerLoading(false);
            setBannerError(true);
            (e.target as HTMLImageElement).src = "/placeholder.svg";
          }}
        />
      ) : (
        <>
          {/* Watermelon Icons */}
          <div className="absolute bottom-4 right-4 opacity-90">
            <PigeonIcon size={80} className="" />
          </div>
          <div className="absolute top-4 left-4 opacity-90">
            <PigeonIcon size={80} className="" />
          </div>
        </>
      )}

      {/* Edit Dropdown */}
      <EditDropdown onEditBanner={() => setIsBannerEditOpen(true)} />
      {/* Project Info */}
      <div className="absolute bottom-4 left-6 right-6">
        <div className="flex items-end justify-between">
          <div className="flex items-end gap-4">
            {/* Project Logo with Error Handling */}
            <div className="flex-shrink-0 w-20 h-20 rounded-lg border-2 border-white/20 overflow-hidden">
              {currentProject.logo_url ? (
                <img
                  src={currentProject.logo_url}
                  alt={`${currentProject.name} logo`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%234f46e5'/%3E%3Ctext x='50%' y='50%' font-size='40' fill='white' text-anchor='middle' dominant-baseline='middle'%3E${currentProject.name.substring(0, 2).toUpperCase()}%3C/text%3E%3C/svg%3E";
                  }}
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">
                    {currentProject.name.substring(0, 2).toUpperCase()}
                  </span>
                </div>
              )}
            </div>

            {/* Project Metadata */}
            <div className="flex flex-col">
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold text-white drop-shadow-md">
                  {currentProject.name}
                </h1>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span className="text-sm text-white drop-shadow-md">
                    Updated 0
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm text-white drop-shadow-md">
                  Founded by{" "}
                  <span className="text-green-300 font-medium">
                    {isLoading
                      ? "Loading..."
                      : owner?.profile
                      ? `${owner.profile.firstName || ""} ${
                          owner.profile.lastName || ""
                        }`.trim() || "Unknown"
                      : "Unknown"}
                  </span>
                </span>
                {currentProject.category && (
                  <span className="text-sm text-white/80 uppercase tracking-wide drop-shadow-md">
                    • {currentProject.category}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modals */}
      <ProjectBannerEdit
        projectId={currentProject.id}
        currentBannerUrl={currentBannerUrl || null}
        projectName={currentProject.name}
        isOpen={isBannerEditOpen}
        onClose={() => setIsBannerEditOpen(false)}
        onBannerUpdated={handleBannerUpdated}
      />
    </div>
  );
}
