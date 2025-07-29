"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { UploadButton } from "./UploadButton"
import { toast } from "sonner"

interface PrivateDocumentsUploadProps {
  projectId: string
  onUploadSuccess?: () => void
}

export function PrivateDocumentsUpload({ projectId, onUploadSuccess }: PrivateDocumentsUploadProps) {
  const [documentTitle, setDocumentTitle] = useState("")
  const [isPrivate, setIsPrivate] = useState(true)
  const [isTitleValid, setIsTitleValid] = useState(true)

  const handleUploadSuccess = (document: any) => {
    setDocumentTitle("")
    setIsPrivate(true)
    setIsTitleValid(true)
    toast.success(`${document.title} uploaded successfully!`)

    if (onUploadSuccess) {
      onUploadSuccess()
    }
  }

  const handleTitleChange = (value: string) => {
    setDocumentTitle(value)
    setIsTitleValid(value.trim().length > 0)
  }

  const isTitleEmpty = !documentTitle.trim()

  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="text-lg">Upload New Document</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="document-title" className="flex items-center">
            Document Title
            <span className="text-red-500 ml-1">*</span>
          </Label>
          <Input
            id="document-title"
            placeholder="e.g., Financial Projections, Internal Memo"
            value={documentTitle}
            onChange={(e) => handleTitleChange(e.target.value)}
            className={`${!isTitleValid ? "border-red-500 focus:border-red-500" : ""}`}
          />
          {!isTitleValid && <p className="text-sm text-red-500">Document title is required</p>}
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="is-private"
            checked={isPrivate}
            onCheckedChange={(checked) => setIsPrivate(checked as boolean)}
          />
          <Label htmlFor="is-private" className="text-sm">
            Private document (only visible to project members)
          </Label>
        </div>

        <div className="flex justify-end">
          <UploadButton
            projectId={projectId}
            title={documentTitle}
            isPrivate={isPrivate}
            onUploadSuccess={handleUploadSuccess}
            acceptedTypes=".pdf,.doc,.docx,.txt,.xls,.xlsx,.ppt,.pptx"
            maxSize={25}
            className="text-xs h-8"
            isPredefined={false}
            disabled={isTitleEmpty}
          >
            Upload Document
          </UploadButton>
        </div>
      </CardContent>
    </Card>
  )
}
