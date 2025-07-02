import { DocumentCard } from "./DocumentCard"
import { PrivateDocumentsUpload } from "./PrivateDocumentsUpload"
import type { Document } from "@/types"

interface DocumentsSectionProps {
  title: string
  documents: Document[]
  isPrivate?: boolean
}

export function DocumentsSection({ title, documents, isPrivate }: DocumentsSectionProps) {
  return (
    <div className="space-y-6 mt-8">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-foreground">{title}</h3>
      </div>

      {isPrivate ? (
        <PrivateDocumentsUpload />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {documents.map((doc) => (
            <DocumentCard key={doc.id} document={doc} />
          ))}
        </div>
      )}
    </div>
  )
}
