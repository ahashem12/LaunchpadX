"use client"

import { useState } from "react"
import type React from "react"

import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { X, Plus } from "lucide-react"

interface SkillsSectionProps {
  skills: string[];
  isEditable?: boolean;
  onChange?: (skills: string[]) => void;
}

export function SkillsSection({
  skills,
  isEditable = true,
  onChange = () => {},
}: SkillsSectionProps) {
  const [inputValue, setInputValue] = useState("")

  const addSkill = () => {
    const trimmedValue = inputValue.trim()
    if (trimmedValue && !skills.includes(trimmedValue)) {
      onChange([...skills, trimmedValue])
      setInputValue("")
    }
  }

  const removeSkill = (skillToRemove: string) => {
    onChange(skills.filter((skill) => skill !== skillToRemove))
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addSkill()
    }
  }

  return (
    <div className="bg-card rounded-lg border p-6 space-y-6">
      <div>
        <h3 className="text-lg font-semibold">Skills & Expertise</h3>
        {isEditable && (
          <p className="text-sm text-muted-foreground mt-1">
            Add skills that represent your expertise
          </p>
        )}
      </div>

      <div className="space-y-4">
        {isEditable && (
          <div className="flex gap-2">
            <Input
              placeholder="Add a skill..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1"
            />
            <Button onClick={addSkill} disabled={!inputValue.trim()} size="sm">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        )}

        {skills && skills.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                {skill}
                {isEditable && (
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-4 w-4 p-0 hover:bg-destructive hover:text-destructive-foreground"
                    onClick={() => removeSkill(skill)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                )}
              </Badge>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            {isEditable ? "No skills added yet. Add your first skill above." : "No skills listed."}
          </p>
        )}
      </div>
    </div>
  );
}
