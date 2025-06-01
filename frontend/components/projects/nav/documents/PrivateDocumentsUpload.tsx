import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export function PrivateDocumentsUpload() {
  return (
    <Card className="border-border bg-card overflow-hidden">
      <CardContent className="p-6">
        <h4 className="font-medium mb-4 text-foreground">Upload New File</h4>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              New Document Label <span className="text-red-500">*</span>
            </label>
            <Input
              type="text"
              placeholder="Label for your document"
              className="w-full bg-muted border-border text-foreground placeholder:text-muted-foreground"
            />
            <p className="text-xs text-red-500 mt-1">This field is required.</p>
          </div>

          <div className="flex justify-end">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Plus className="h-4 w-4 mr-1" />
              Upload
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
