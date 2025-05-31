import { Card, CardContent } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"

export function AlertCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="border-l-4 border-l-amber-500 border-t-border border-r-border border-b-border bg-card">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <p className="text-foreground">
              Your team has no agreement in place. This means you can only create and manage co-founder roles. If you
              want to hire freelancers and compensate them with tokens, sign an agreement with your co-founder(s).
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-amber-500 border-t-border border-r-border border-b-border bg-card">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <p className="text-foreground">
              There are currently no open roles for this project. You can create the recommended roles below or other
              ones, of your choice.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
