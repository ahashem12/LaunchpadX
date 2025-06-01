import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export function CompensationTab() {
  return (
    <div className="space-y-6 focus-visible:outline-none focus-visible:ring-0">
      <div>
        <h4 className="text-lg font-medium mb-4 text-foreground">Compensation Details (optional)</h4>

        <div className="space-y-6">
          <div>
            <Label htmlFor="flat-money" className="text-foreground mb-3 block">
              Flat Money (monthly)
            </Label>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <span className="mr-2 text-muted-foreground">€</span>
                <Input
                  type="number"
                  placeholder="0"
                  className="w-32 bg-muted border-border text-foreground placeholder:text-muted-foreground"
                />
              </div>
              <span className="text-muted-foreground">to</span>
              <div className="flex items-center">
                <span className="mr-2 text-muted-foreground">€</span>
                <Input
                  type="number"
                  placeholder="0"
                  className="w-32 bg-muted border-border text-foreground placeholder:text-muted-foreground"
                />
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="equity-percentage" className="text-foreground mb-3 block">
              Equity Percentage (total)
            </Label>
            <div className="flex items-center">
              <span className="mr-2 text-muted-foreground">%</span>
              <Input
                type="number"
                placeholder="0"
                className="w-32 bg-muted border-border text-foreground placeholder:text-muted-foreground"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
