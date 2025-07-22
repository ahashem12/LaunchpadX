"use client"

import { FileText, Download, Eye, Sparkles } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { UploadButton } from "./UploadButton"
import type { Document } from "@/types"
import { toast } from "sonner"

interface DocumentCard {
  document: Document
}

export function DocumentCard({ document }: DocumentCard) {
  const handleUpload = async (file: File) => {
    // TODO: Implement Supabase upload
    console.log("Uploading file:", file.name, "for document:", document.name)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // In the future, this will upload to Supabase Storage
    // const { data, error } = await supabase.storage
    //   .from('documents')
    //   .upload(`${document.project_id}/${document.id}/${file.name}`, file)
  }

  const handleGenerateWithAI = () => {
    toast.info(`Generating ${document.name} with AI...`)
    // TODO: Implement AI generation
  }

  const handleView = () => {
    toast.info(`Opening ${document.name}...`)
    // TODO: Implement document viewing
  }

  const handleDownload = () => {
    toast.info(`Downloading ${document.name}...`)
    // TODO: Implement document download
  }

  // Check if document has been uploaded (for demo, we'll use document.url)
  const hasDocument = document.url && document.url !== ""

  return (
    <Card className="border-border bg-card hover:bg-card/80 transition-colors">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-full bg-muted">
              <FileText className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <h4 className="font-medium text-foreground">{document.name}</h4>
              <p className="text-xs text-muted-foreground">{document.type === "custom" ? "Private" : "Public"}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* AI Generate button - only show if document can be generated and no document exists */}
            {document.canGenerate && !hasDocument && (
              <Button variant="outline" size="sm" className="text-xs h-7 bg-transparent" onClick={handleGenerateWithAI}>
                <Sparkles className="h-3 w-3 mr-1" />
                Generate
              </Button>
            )}

            {/* Upload button - only show if no document exists */}
            {!hasDocument && (
              <UploadButton
                onUpload={handleUpload}
                acceptedTypes=".pdf,.doc,.docx,.txt"
                maxSize={10}
                className="text-xs h-7"
              />
            )}

            {/* View and Download buttons - only show if document exists */}
            {hasDocument && (
              <>
                <Button variant="outline" size="sm" onClick={handleView} className="text-xs h-7 bg-transparent">
                  <Eye className="h-3 w-3 mr-1" />
                  View
                </Button>
                <Button variant="outline" size="sm" onClick={handleDownload} className="text-xs h-7 bg-transparent">
                  <Download className="h-3 w-3 mr-1" />
                  Download
                </Button>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
