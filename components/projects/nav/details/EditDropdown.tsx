import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Edit, Camera } from "lucide-react";
import { Button } from "@/components/ui/button"

export function EditDropdown() {
  return (
      <div className="absolute top-4 right-4 z-10">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm" 
              className="bg-black/50 text-white hover:bg-black/30 backdrop-blur-sm"
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            align="end" 
            className="bg-black/80 backdrop-blur-sm border border-white/20 rounded-lg p-1"
          >
            <DropdownMenuItem className="hover:bg-white/10 focus:bg-white/10 px-3 py-2 text-sm cursor-pointer rounded-md">
              <Camera className="h-4 w-4 mr-2" />
              Edit Banner
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-white/20 mx-1" />
            <DropdownMenuItem className="hover:bg-white/10 focus:bg-white/10 px-3 py-2 text-sm cursor-pointer rounded-md">
              <Edit className="h-4 w-4 mr-2" />
              Edit Section
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

  )
}