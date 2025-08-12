"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Camera, Upload, X } from "lucide-react"

interface BannerSectionProps {
  bannerUrl: string | null
  onBannerChange: (file: File | null) => void
  isEditable?: boolean
}

export function BannerSection({ bannerUrl, onBannerChange, isEditable = true }: BannerSectionProps) {
  const [isDragOver, setIsDragOver] = useState(false)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type.startsWith('image/')) {
      onBannerChange(file)
    }
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsDragOver(false)
    
    const file = event.dataTransfer.files?.[0]
    if (file && file.type.startsWith('image/')) {
      onBannerChange(file)
    }
  }

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsDragOver(false)
  }

  const handleRemoveBanner = () => {
    onBannerChange(null)
  }

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="relative">
          {/* Banner Display */}
          <div 
            className={`relative h-48 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center ${
              isDragOver ? 'opacity-80' : ''
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            style={{
              backgroundImage: bannerUrl ? `url(${bannerUrl})` : undefined,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            {/* Overlay for better text visibility */}
            {bannerUrl && (
              <div className="absolute inset-0 bg-black/20" />
            )}
            
            {/* Upload Area (only show when no banner or when dragging) */}
            {(!bannerUrl || isDragOver) && isEditable && (
              <div className={`absolute inset-0 flex flex-col items-center justify-center text-white ${
                isDragOver ? 'bg-black/50' : ''
              }`}>
                <Camera className="w-12 h-12 mb-2 opacity-80" />
                <p className="text-lg font-medium mb-1">
                  {isDragOver ? 'Drop your banner here' : 'Add a banner'}
                </p>
                <p className="text-sm opacity-80">
                  Drag & drop or click to upload
                </p>
              </div>
            )}

            {/* Action Buttons */}
            {isEditable && (
              <div className="absolute top-4 right-4 flex gap-2">
                {bannerUrl && (
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
                  onClick={() => document.getElementById('banner-upload')?.click()}
                >
                  <Upload className="w-4 h-4 mr-1" />
                  {bannerUrl ? 'Change' : 'Upload'}
                </Button>
              </div>
            )}
          </div>

          {/* Hidden File Input */}
          {isEditable && (
            <Input
              id="banner-upload"
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
          )}
        </div>

        {/* Banner Info */}
        {isEditable && (
          <div className="p-4 border-t">
            <Label className="text-sm text-muted-foreground">
              Recommended size: 1200x300px. Supports JPG, PNG, and GIF up to 5MB.
            </Label>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
