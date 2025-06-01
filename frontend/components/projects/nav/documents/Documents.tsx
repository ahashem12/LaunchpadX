import { DocumentsSection } from "./DocumentsSection"
import type { Document } from "@/types"

export function Documents() {
  const publicDocuments: Document[] = [
    {
      id: "1",
      name: "Business Plan",
      type: "business-plan",
      canGenerate: true,
      project_id: "static",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: "2",
      name: "Pitchdeck",
      type: "pitchdeck",
      canGenerate: false,
      project_id: "static",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    // Add other documents with required fields
  ]

  const privateDocuments: Document[] = []

  return (
    <>
      <DocumentsSection title="Documentation" documents={publicDocuments} />
      <DocumentsSection title="Private Documentation" documents={privateDocuments} isPrivate />
    </>
  )
}