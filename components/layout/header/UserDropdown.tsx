"use client"

import { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User, Settings, ChevronDown } from "lucide-react"
import { useRouter } from "next/navigation"
import { ProfileService } from "@/app/services/profile/profile-service"
import type { ProfileData } from "@/types/profile"
import { LogoutButton } from "./LogoutButton"

export function UserDropdown() {
  const [profile, setProfile] = useState<ProfileData | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    loadProfile()
  }, [])

  const loadProfile = async () => {
    try {
      const { data } = await ProfileService.getCurrentUserProfile()
      if (data) {
        setProfile(data)
      }
    } catch (error) {
      console.error("Failed to load profile:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleProfileClick = () => {
    router.push("/profile")
  }

  const getDisplayName = () => {
    return profile?.username || profile?.email?.split("@")[0] || "User"
  }

  if (loading) {
    return (
      <Button variant="ghost" size="sm" disabled>
        <div className="h-6 w-6 rounded-full bg-muted animate-pulse" />
        <ChevronDown className="ml-2 h-4 w-4" />
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-auto px-2">
          <Avatar className="h-7 w-7">
            {profile?.profile_picture ? (
              <AvatarImage 
                src={profile.profile_picture} 
                alt="Profile" 
                className="object-cover"
              />
            ) : (
              <AvatarFallback className="bg-transparent">
                <User className="h-4 w-4 text-muted-foreground" />
              </AvatarFallback>
            )}
          </Avatar>
          <span className="ml-2 text-sm font-medium hidden sm:inline-block">
            {getDisplayName()}
          </span>
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{getDisplayName()}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {profile?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleProfileClick} className="cursor-pointer">
          <Settings className="mr-2 h-4 w-4" />
          <span>Profile Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <LogoutButton />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}