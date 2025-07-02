"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { UploadButton } from "./UploadButton"
import { toast } from "sonner"

export function PrivateDocumentsUpload() {
  const [documentLabel, setDocumentLabel] = useState("")
  const [isLabelValid, setIsLabelValid] = useState(true)

  const handleUpload = async (file: File) => {
    if (!documentLabel.trim()) {
      setIsLabelValid(false)
      toast.error("Please enter a document label before uploading")
      return
    }

    setIsLabelValid(true)

    // TODO: Implement Supabase upload
    console.log("Uploading private document:", file.name, "with label:", documentLabel)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Reset form after successful upload
    setDocumentLabel("")
    toast.success(`${documentLabel} uploaded successfully!`)
  }

  const handleLabelChange = (value: string) => {
    setDocumentLabel(value)
    if (value.trim()) {
      setIsLabelValid(true)
    }
  }

  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="text-lg">Upload Private Document</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="document-label">Document Label</Label>
          <div className="flex items-center gap-2">
            <Input
              id="document-label"
              placeholder="e.g., Financial Projections, Internal Memo"
              value={documentLabel}
              onChange={(e) => handleLabelChange(e.target.value)}
              className={`flex-1 ${!isLabelValid ? "border-red-500" : ""}`}
            />
            <UploadButton
              onUpload={handleUpload}
              acceptedTypes=".pdf,.doc,.docx,.txt,.xls,.xlsx,.ppt,.pptx"
              maxSize={25}
              className="text-xs h-8"
            >
              Upload
            </UploadButton>
          </div>
          {!isLabelValid && <p className="text-sm text-red-500">Document label is required</p>}
        </div>
      </CardContent>
    </Card>
  )
}