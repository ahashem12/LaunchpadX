import { FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { Document } from "@/types"

interface DocumentCardProps {
  document: Document
}

export function DocumentCard({ document }: DocumentCardProps) {
  return (
    <Card className="border-border bg-card overflow-hidden">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-full bg-muted">
              <FileText className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <h4 className="font-medium text-foreground">{document.name}</h4>
              <p className="text-xs text-muted-foreground">
                {document.type === 'custom' ? 'Private' : 'Public'}
              </p>
            </div>
          </div>

          <div className="flex space-x-2">
            {document.canGenerate && (
              <Button variant="outline" size="sm" className="text-sm h-8 border-border text-foreground hover:bg-muted">
                Generate with AI
              </Button>
            )}
            <Button variant="outline" size="sm" className="text-sm h-8 border-border text-foreground hover:bg-muted">
              {document.url ? 'View' : 'Upload'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}