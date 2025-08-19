"use client"

import { useState } from "react"
import type React from "react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Edit2, Check, X } from "lucide-react"

interface PersonalInfoSectionProps {
  firstName: string;
  lastName: string;
  email: string;
  isEditable?: boolean;
  validationErrors?: Record<string, string>;
  onFirstNameChange?: (firstName: string) => void;
  onLastNameChange?: (lastName: string) => void;
}

export function PersonalInfoSection({
  firstName,
  lastName,
  email,
  isEditable = true,
  validationErrors = {},
  onFirstNameChange = () => {},
  onLastNameChange = () => {},
}: PersonalInfoSectionProps) {
  const [isEditingFirstName, setIsEditingFirstName] = useState(false)
  const [isEditingLastName, setIsEditingLastName] = useState(false)
  const [tempFirstName, setTempFirstName] = useState(firstName)
  const [tempLastName, setTempLastName] = useState(lastName)

  // First Name handlers
  const handleFirstNameEditClick = () => {
    setTempFirstName(firstName)
    setIsEditingFirstName(true)
  }

  const handleFirstNameSaveClick = () => {
    onFirstNameChange(tempFirstName)
    setIsEditingFirstName(false)
  }

  const handleFirstNameCancelClick = () => {
    setTempFirstName(firstName)
    setIsEditingFirstName(false)
  }

  const handleFirstNameKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleFirstNameSaveClick()
    } else if (e.key === "Escape") {
      handleFirstNameCancelClick()
    }
  }

  // Last Name handlers
  const handleLastNameEditClick = () => {
    setTempLastName(lastName)
    setIsEditingLastName(true)
  }

  const handleLastNameSaveClick = () => {
    onLastNameChange(tempLastName)
    setIsEditingLastName(false)
  }

  const handleLastNameCancelClick = () => {
    setTempLastName(lastName)
    setIsEditingLastName(false)
  }

  const handleLastNameKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleLastNameSaveClick()
    } else if (e.key === "Escape") {
      handleLastNameCancelClick()
    }
  }

  return (
    <div className="bg-card rounded-lg border p-6 space-y-6">
      <div>
        <h3 className="text-lg font-semibold">Personal Information</h3>
        {isEditable && (
          <p className="text-sm text-muted-foreground mt-1">Update your personal details</p>
        )}
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <div className="flex items-center gap-2">
            {isEditable ? (
              isEditingFirstName ? (
                <>
                  <Input
                    id="firstName"
                    value={tempFirstName}
                    onChange={(e) => setTempFirstName(e.target.value)}
                    onKeyDown={handleFirstNameKeyDown}
                    className={validationErrors.firstName ? "border-destructive" : ""}
                    autoFocus
                  />
                  <Button size="sm" onClick={handleFirstNameSaveClick} variant="outline">
                    <Check className="h-4 w-4" />
                  </Button>
                  <Button size="sm" onClick={handleFirstNameCancelClick} variant="outline">
                    <X className="h-4 w-4" />
                  </Button>
                </>
              ) : (
                <>
                  <Input id="firstName" value={firstName} readOnly className="cursor-pointer" onClick={handleFirstNameEditClick} />
                  <Button size="sm" onClick={handleFirstNameEditClick} variant="outline">
                    <Edit2 className="h-4 w-4" />
                  </Button>
                </>
              )
            ) : (
              <Input id="firstName" value={firstName} readOnly />
            )}
          </div>
          {isEditable && validationErrors.firstName && (
            <p className="text-sm text-destructive">{validationErrors.firstName}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <div className="flex items-center gap-2">
            {isEditable ? (
              isEditingLastName ? (
                <>
                  <Input
                    id="lastName"
                    value={tempLastName}
                    onChange={(e) => setTempLastName(e.target.value)}
                    onKeyDown={handleLastNameKeyDown}
                    className={validationErrors.lastName ? "border-destructive" : ""}
                    autoFocus
                  />
                  <Button size="sm" onClick={handleLastNameSaveClick} variant="outline">
                    <Check className="h-4 w-4" />
                  </Button>
                  <Button size="sm" onClick={handleLastNameCancelClick} variant="outline">
                    <X className="h-4 w-4" />
                  </Button>
                </>
              ) : (
                <>
                  <Input id="lastName" value={lastName} readOnly className="cursor-pointer" onClick={handleLastNameEditClick} />
                  <Button size="sm" onClick={handleLastNameEditClick} variant="outline">
                    <Edit2 className="h-4 w-4" />
                  </Button>
                </>
              )
            ) : (
              <Input id="lastName" value={lastName} readOnly />
            )}
          </div>
          {isEditable && validationErrors.lastName && (
            <p className="text-sm text-destructive">{validationErrors.lastName}</p>
          )}
        </div>


        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" value={email} readOnly className="bg-muted" />
          {isEditable && (
            <p className="text-xs text-muted-foreground">Email cannot be changed</p>
          )}
        </div>
      </div>
    </div>
  );
}
