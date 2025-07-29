"use client"

import { useState } from "react"
import type React from "react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Edit2, Check, X } from "lucide-react"

interface PersonalInfoSectionProps {
  username: string
  email: string
  validationErrors: Record<string, string>
  onUsernameChange: (username: string) => void
}

export function PersonalInfoSection({
  username,
  email,
  validationErrors,
  onUsernameChange,
}: PersonalInfoSectionProps) {
  const [isEditingUsername, setIsEditingUsername] = useState(false)
  const [tempUsername, setTempUsername] = useState(username)

  const handleEditClick = () => {
    setTempUsername(username)
    setIsEditingUsername(true)
  }

  const handleSaveClick = () => {
    onUsernameChange(tempUsername)
    setIsEditingUsername(false)
  }

  const handleCancelClick = () => {
    setTempUsername(username)
    setIsEditingUsername(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSaveClick()
    } else if (e.key === "Escape") {
      handleCancelClick()
    }
  }

  return (
    <div className="bg-card rounded-lg border p-6 space-y-6">
      <div>
        <h3 className="text-lg font-semibold">Personal Information</h3>
        <p className="text-sm text-muted-foreground mt-1">Update your personal details</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <div className="flex items-center gap-2">
            {isEditingUsername ? (
              <>
                <Input
                  id="username"
                  value={tempUsername}
                  onChange={(e) => setTempUsername(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className={validationErrors.username ? "border-destructive" : ""}
                  autoFocus
                />
                <Button size="sm" onClick={handleSaveClick} variant="outline">
                  <Check className="h-4 w-4" />
                </Button>
                <Button size="sm" onClick={handleCancelClick} variant="outline">
                  <X className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <>
                <Input id="username" value={username} readOnly className="cursor-pointer" onClick={handleEditClick} />
                <Button size="sm" onClick={handleEditClick} variant="outline">
                  <Edit2 className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>
          {validationErrors.username && (
            <p className="text-sm text-destructive">{validationErrors.username}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" value={email} readOnly className="bg-muted" />
          <p className="text-xs text-muted-foreground">Email cannot be changed</p>
        </div>
      </div>
    </div>
  )
}
