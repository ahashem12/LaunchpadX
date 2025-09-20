import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Camera } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EditDropdownProps {
  onEditBanner: () => void;
}

export function EditDropdown({ onEditBanner }: EditDropdownProps) {
  return (
    <div className="absolute top-4 right-4 z-10">
      <Button
        variant="ghost"
        size="sm"
        className="bg-black/50 text-white hover:bg-black/30 backdrop-blur-sm"
        onClick={onEditBanner}
      >
        <Camera className="h-4 w-4 mr-2" />
        Edit Banner
      </Button>
    </div>
  );
}
