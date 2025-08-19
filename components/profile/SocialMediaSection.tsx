"use client"

import { useState } from "react"
import type React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Edit2, Check, X, Github, Linkedin, MessageCircle, Globe, Send } from "lucide-react"

interface SocialMediaSectionProps {
  discordUrl: string;
  githubUrl: string;
  linkedinUrl: string;
  twitterUrl: string;
  telegramUrl: string;
  websiteUrl: string;
  isEditable?: boolean;
  showIconsOnly?: boolean;
  validationErrors?: Record<string, string>;
  onDiscordChange?: (value: string) => void;
  onGithubChange?: (value: string) => void;
  onLinkedinChange?: (value: string) => void;
  onTwitterChange?: (value: string) => void;
  onTelegramChange?: (value: string) => void;
  onWebsiteChange?: (value: string) => void;
}

interface SocialField {
  key: string;
  label: string;
  value: string;
  placeholder: string;
  icon: React.ReactNode;
  onChange: (value: string) => void;
}

export function SocialMediaSection({
  discordUrl,
  githubUrl,
  linkedinUrl,
  twitterUrl,
  telegramUrl,
  websiteUrl,
  isEditable = true,
  showIconsOnly = false,
  validationErrors = {},
  onDiscordChange = () => {},
  onGithubChange = () => {},
  onLinkedinChange = () => {},
  onTwitterChange = () => {},
  onTelegramChange = () => {},
  onWebsiteChange = () => {},
}: SocialMediaSectionProps) {
  const [editingField, setEditingField] = useState<string | null>(null)
  const [tempValues, setTempValues] = useState<Record<string, string>>({})

  const socialFields: SocialField[] = [
    {
      key: 'discord',
      label: 'Discord',
      value: discordUrl,
      placeholder: 'Discord URL',
      icon: <MessageCircle className="h-4 w-4" />,
      onChange: onDiscordChange,
    },
    {
      key: 'github',
      label: 'Github',
      value: githubUrl,
      placeholder: 'Github URL',
      icon: <Github className="h-4 w-4" />,
      onChange: onGithubChange,
    },
    {
      key: 'linkedin',
      label: 'LinkedIn',
      value: linkedinUrl,
      placeholder: 'LinkedIn URL',
      icon: <Linkedin className="h-4 w-4" />,
      onChange: onLinkedinChange,
    },
    {
      key: 'twitter',
      label: 'Twitter X',
      value: twitterUrl,
      placeholder: 'Twitter/X URL',
      icon: <X className="h-4 w-4" />,
      onChange: onTwitterChange,
    },
    {
      key: 'telegram',
      label: 'Telegram',
      value: telegramUrl,
      placeholder: 'Telegram URL',
      icon: <Send className="h-4 w-4" />,
      onChange: onTelegramChange,
    },
    {
      key: 'website',
      label: 'Website',
      value: websiteUrl,
      placeholder: 'Website address',
      icon: <Globe className="h-4 w-4" />,
      onChange: onWebsiteChange,
    },
  ]

  const handleEditClick = (field: SocialField) => {
    setTempValues({ ...tempValues, [field.key]: field.value })
    setEditingField(field.key)
  }

  const handleSaveClick = (field: SocialField) => {
    const newValue = tempValues[field.key] || ""
    field.onChange(newValue)
    setEditingField(null)
  }

  const handleCancelClick = (field: SocialField) => {
    setTempValues({ ...tempValues, [field.key]: field.value })
    setEditingField(null)
  }

  const handleKeyDown = (e: React.KeyboardEvent, field: SocialField) => {
    if (e.key === "Enter") {
      handleSaveClick(field)
    } else if (e.key === "Escape") {
      handleCancelClick(field)
    }
  }

  const handleInputChange = (fieldKey: string, value: string) => {
    setTempValues({ ...tempValues, [fieldKey]: value })
  }

  // Filter fields with values for icons-only mode
  const fieldsWithValues = socialFields.filter(field => field.value && field.value.trim() !== '')

  // Icons-only display mode
  if (showIconsOnly) {
    if (fieldsWithValues.length === 0) {
      return null // Don't render anything if no social media links
    }
    
    return (
      <div className="grid grid-cols-3 gap-2">
        {fieldsWithValues.map((field) => (
          <a 
            key={field.key} 
            href={field.value} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors cursor-pointer text-xs whitespace-nowrap justify-center"
          >
            {field.icon}
            <span className="font-medium">{field.label}</span>
          </a>
        ))}
      </div>
    )
  }

  return (
    <div className="bg-card rounded-lg border p-6 space-y-6">
      <div>
        <h3 className="text-lg font-semibold">Social Media Links</h3>
        {isEditable && (
          <p className="text-sm text-muted-foreground mt-1">Connect your social media profiles</p>
        )}
      </div>

      <div className="space-y-4">
        {socialFields.map((field) => (
          <div key={field.key} className="space-y-2">
            <Label htmlFor={field.key} className="flex items-center gap-2">
              {field.icon}
              {field.label}
            </Label>
            <div className="flex items-center gap-2">
              {isEditable ? (
                editingField === field.key ? (
                  <>
                    <Input
                      id={field.key}
                      value={tempValues[field.key] || ""}
                      onChange={(e) => handleInputChange(field.key, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(e, field)}
                      className={validationErrors[field.key] ? "border-destructive" : ""}
                      placeholder={field.placeholder}
                      autoFocus
                    />
                    <Button size="sm" onClick={() => handleSaveClick(field)} variant="outline">
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button size="sm" onClick={() => handleCancelClick(field)} variant="outline">
                      <X className="h-4 w-4" />
                    </Button>
                  </>
                ) : (
                  <>
                    <Input 
                      id={field.key} 
                      value={field.value || ""} 
                      readOnly 
                      className="cursor-pointer" 
                      onClick={() => handleEditClick(field)}
                      placeholder={field.placeholder}
                    />
                    <Button size="sm" onClick={() => handleEditClick(field)} variant="outline">
                      <Edit2 className="h-4 w-4" />
                    </Button>
                  </>
                )
              ) : (
                <Input 
                  id={field.key} 
                  value={field.value || ""} 
                  readOnly 
                  placeholder={field.placeholder}
                />
              )}
            </div>
            {isEditable && validationErrors[field.key] && (
              <p className="text-sm text-destructive">{validationErrors[field.key]}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
